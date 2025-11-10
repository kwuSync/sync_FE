// src/pages/NewsDetailPage/NewsDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// ⬇️ 1. updateComment 임포트
import { 
  getNewsSummary, 
  submitComment, 
  getComments, 
  deleteComment,
  updateComment // 1. 임포트 추가
} from "../../api/newsApi";
import * as S from "./NewsDetailPage.style";
import Button from "../../components/common/Button/Button";
import { useTTS } from "../../contexts/TTSContext";
import Header from "../../components/common/Header/Header";

const NewsDetailPage = () => {
  const { id } = useParams(); // clusterId
  const [clusterDetail, setClusterDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ⬇️ 2. 댓글 상태 (수정 관련 state 추가)
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); 
  const [editingCommentId, setEditingCommentId] = useState(null); // (추가) 수정 중인 댓글 ID
  const [editingText, setEditingText] = useState(""); // (추가) 수정 중인 텍스트

  const { speak, stop } = useTTS();
  const navigate = useNavigate();

  // ... (fetchComments, useEffect, handleCommentSubmit 함수는 변경 없음) ...
  const fetchComments = async () => {
    try {
      const commentsData = await getComments(id); // 'id'는 useParams()에서 온 clusterId
      const processedComments = commentsData.comments.map(c => ({
          ...c,
          isMine: c.isOwner 
      }));
      setComments(processedComments);
    } catch (err) {
      console.error("❌ 댓글 목록 로드 실패:", err.response ? err.response.data : err.message);
      alert("댓글 목록을 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    stop();
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const data = await getNewsSummary(id);
        setClusterDetail(data);
        await fetchComments(); 
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await submitComment(id, comment); 
        setComment(""); 
        await fetchComments(); 
      } catch (err) {
        console.error("❌ 댓글 등록 실패:", err.response ? err.response.data : err.message); 
        alert("댓글 등록에 실패했습니다. (콘솔 확인)");
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("댓글을 정말 삭제하시겠습니까?")) {
      try {
        await deleteComment(id, commentId);
        setComments(comments.filter((c) => c.commentId !== commentId));
      } catch (err) {
        console.error("댓글 삭제 실패:", err);
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  // ⬇️ 3. 수정 시작 핸들러 ⬇️
  const handleEditClick = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditingText(comment.commentText);
  };

  // ⬇️ 4. 수정 취소 핸들러 ⬇️
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  // ⬇️ 5. 댓글 수정 제출 핸들러 ⬇️
  const handleUpdateComment = async () => {
    if (editingText.trim()) {
      try {
        // updateComment(클러스터 ID, 댓글 ID, 수정할 텍스트)
        await updateComment(id, editingCommentId, editingText);
        handleCancelEdit(); // 1. 수정 상태 초기화
        await fetchComments(); // 2. 댓글 목록 새로고침
      } catch (err) {
        console.error("❌ 댓글 수정 실패:", err.response ? err.response.data : err.message);
        alert("댓글 수정에 실패했습니다. (콘솔 확인)");
      }
    }
  };


  // ... (handleTTSClick, handleTitleClick, 로딩/에러 처리는 변경 없음) ...
  const handleTTSClick = () => {
    if (!clusterDetail) return;
    const text = `
      제목: ${clusterDetail.generatedTitle}.
      뉴스 요약: ${clusterDetail.summary.article}.
      뉴스 배경지식: ${clusterDetail.summary.background}.
    `;
    speak(text, { type: 'cluster', id: id });
  };

  const handleTitleClick = () => {
    navigate("/news");
  };

  if (loading) return <div>데이터를 불러오는 중입니다...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!clusterDetail) return <div>뉴스를 찾을 수 없습니다.</div>;


  return (
    <S.PageWrapper>
      {/* ... (Header, Title, Section 등 상단 JSX는 변경 없음) ... */}
      <Header 
        onTTSClick={handleTTSClick} 
        onTitleClick={handleTitleClick} 
      />

      <S.Title>{clusterDetail.generatedTitle}</S.Title>
      <S.Divider />

      <S.Section>
        <S.SubTitle>뉴스 요약</S.SubTitle>
        <S.Paragraph>{clusterDetail.summary.article}</S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SubTitle>뉴스 배경지식</S.SubTitle>
        <S.Paragraph>{clusterDetail.summary.background}</S.Paragraph>
      </S.Section>

      <S.Divider />

      <S.Section>
        <S.CommentLabel>댓글</S.CommentLabel>
        
        {/* ... (댓글 입력창 JSX는 변경 없음) ... */}
        <S.CommentBox>
          <S.CommentInput
            placeholder="댓글을 입력하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            onClick={handleCommentSubmit}
            style={{ width: "70px", borderRadius: "20px", fontSize: "14px" }}
          >
            등록
          </Button>
        </S.CommentBox>

        {/* ⬇️ 6. 댓글 목록 렌더링 (수정 로직 추가) ⬇️ */}
        <S.CommentList>
          {comments.map((c) => (
            <S.Comment key={c.commentId}>
              {editingCommentId === c.commentId ? (
                // --- 1. 수정 중일 때 ---
                <S.EditWrapper>
                  <S.CommentInfo>
                    <S.CommentAuthor>{c.userName} (수정 중)</S.CommentAuthor>
                    <S.ButtonContainer>
                      <S.CommentButton onClick={handleUpdateComment}>저장</S.CommentButton>
                      <S.CommentButton onClick={handleCancelEdit}>취소</S.CommentButton>
                    </S.ButtonContainer>
                  </S.CommentInfo>
                  <S.CommentEditTextarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                </S.EditWrapper>
              ) : (
                // --- 2. 기본 상태일 때 ---
                <>
                  <S.CommentInfo>
                    <S.CommentAuthor>{c.userName}</S.CommentAuthor>
                    
                    {/* isMine (isOwner)이 true일 때만 버튼 노출 */}
                    {c.isMine && ( 
                      <S.ButtonContainer>
                        <S.CommentButton onClick={() => handleEditClick(c)}>수정</S.CommentButton>
                        <S.CommentButton onClick={() => handleDeleteComment(c.commentId)}>삭제</S.CommentButton>
                      </S.ButtonContainer>
                    )}
                  </S.CommentInfo>
                  
                  <S.CommentText>{c.commentText}</S.CommentText>
                </>
              )}
            </S.Comment>
          ))}
        </S.CommentList>
      </S.Section>
    </S.PageWrapper>
  );
};

export default NewsDetailPage;