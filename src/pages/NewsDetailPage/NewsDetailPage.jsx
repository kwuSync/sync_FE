// src/pages/NewsDetailPage/NewsDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// ⬇️ 1. submitComment, getComments, deleteComment 임포트
import { 
  getNewsSummary, 
  submitComment, 
  getComments, 
  deleteComment 
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
  
  // ⬇️ 2. 댓글 상태 (수정 관련 state 제거)
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); 

  const { speak, stop } = useTTS();
  const navigate = useNavigate();

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

  // ⬇️ 3. 페이지 로드 시 뉴스 및 댓글 목록 조회
  useEffect(() => {
    stop();
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const data = await getNewsSummary(id);
        setClusterDetail(data);

        await fetchComments(); // 분리된 함수 호출

      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [id]);

  // ⬇️ 4. 댓글 등록 핸들러
const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await submitComment(id, comment); // 1. 댓글 등록 (await로 완료 대기)
        
        // --- ⬇️ 여기가 핵심 수정 ⬇️ ---
        setComment(""); // 2. 입력창 즉시 비우기
        await fetchComments(); // 3. 댓글 목록 전체를 다시 불러오기
        // --- ⬆️ 수정 완료 ⬆️ ---

      } catch (err) {
        console.error("❌ 댓글 등록 실패:", err.response ? err.response.data : err.message); 
        alert("댓글 등록에 실패했습니다. (콘솔 확인)");
      }
    }
  };

  // ⬇️ 5. 댓글 삭제 핸들러
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

        {/* 댓글 입력창 */}
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

        {/* ⬇️ 6. 댓글 목록 렌더링 (수정 로직 제거) ⬇️ */}
        <S.CommentList>
          {comments.map((c) => (
            <S.Comment key={c.commentId}>
              <S.CommentInfo>
                {/* 로그 기준: userName */}
                <S.CommentAuthor>{c.userName}</S.CommentAuthor>
                
                {/* isMine (isOwner)이 true일 때만 삭제 버튼 노출 */}
                {c.isMine && ( 
                  <S.ButtonContainer>
                    <S.CommentButton onClick={() => handleDeleteComment(c.commentId)}>삭제</S.CommentButton>
                  </S.ButtonContainer>
                )}
              </S.CommentInfo>
              
              {/* 로그 기준: commentText */}
              <S.CommentText>{c.commentText}</S.CommentText>
            </S.Comment>
          ))}
        </S.CommentList>
      </S.Section>
    </S.PageWrapper>
  );
};

export default NewsDetailPage;