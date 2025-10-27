// src/pages/NewsDetailPage/NewsDetailPage.jsx
import React, { useEffect, useState } from "react";
// ⬇️ 1. useNavigate 임포트
import { useParams, useNavigate } from "react-router-dom"; 
import { getNewsSummary, submitComment } from "../../api/newsApi";
import * as S from "./NewsDetailPage.style";
import Button from "../../components/common/Button/Button";
import { useTTS } from "../../contexts/TTSContext";
import Header from "../../components/common/Header/Header";

const NewsDetailPage = () => {
  const { id } = useParams();
  const [clusterDetail, setClusterDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { speak, stop } = useTTS();
  
  // ⬇️ 2. navigate 함수 생성
  const navigate = useNavigate();

  useEffect(() => {
    stop();
    const fetchNewsDetail = async () => {
      try {
        const data = await getNewsSummary(id);
        setClusterDetail(data);
      } catch (err) {
        setError("뉴스 상세 데이터를 불러오는 데 실패했습니다.");
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
        const response = await submitComment(clusterDetail.cluster_id, comment);
        if (response.success) {
          setComments([...comments, comment]);
          setComment("");
        }
      } catch (err) {
        console.error("댓글 등록 실패:", err);
        alert("댓글 등록에 실패했습니다.");
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
    speak(text);
  };

  // ⬇️ 3. 타이틀 클릭 시 /news (목록)로 이동하는 함수
  const handleTitleClick = () => {
    navigate("/news");
  };

  if (loading) return <div>뉴스 데이터를 불러오는 중입니다...</div>;
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

        <S.CommentList>
          {comments.map((c, index) => (
            <S.Comment key={index}>{c}</S.Comment>
          ))}
        </S.CommentList>
      </S.Section>
    </S.PageWrapper>
  );
};

export default NewsDetailPage;