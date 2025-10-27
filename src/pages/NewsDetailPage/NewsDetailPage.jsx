// src/pages/NewsDetailPage/NewsDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsSummary, submitComment } from "../../api/newsApi"; // API 함수 임포트
import * as S from "./NewsDetailPage.style";
import Button from "../../components/common/Button/Button";
import { useTTS } from "../../contexts/TTSContext";
import Header from "../../components/common/Header/Header"; // 1. 공통 Header 임포트

const NewsDetailPage = () => {
  const { id } = useParams(); // URL 파라미터는 cluster_id
  const [clusterDetail, setClusterDetail] = useState(null); // 클러스터 상세 데이터 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // 2. Header가 TTS 상태를 관리하므로 speak, stop만 가져옵니다.
  const { speak, stop } = useTTS();

  useEffect(() => {
    stop(); // 페이지 진입 시 기존 음성 멈추기
    const fetchNewsDetail = async () => {
      try {
        const data = await getNewsSummary(id); // API에서 클러스터 상세 정보 가져오기
        setClusterDetail(data); // 상태 업데이트
      } catch (err) {
        setError("뉴스 상세 데이터를 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsDetail();
  }, [id]); //

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        // 실제 댓글 API 연동 (NewsDetailPage에서는 clusterId를 newsId로 사용)
        const response = await submitComment(clusterDetail.cluster_id, comment);
        if (response.success) { // submitComment 함수가 success 응답을 반환한다고 가정
          setComments([...comments, comment]);
          setComment("");
        }
      } catch (err) {
        console.error("댓글 등록 실패:", err);
        alert("댓글 등록에 실패했습니다.");
      }
    }
  };

  console.log("clusterDetail:", clusterDetail); // 디버그용 로그
  const handleTTSClick = () => {
    if (!clusterDetail) return;

    const text = `
      제목: ${clusterDetail.generatedTitle}.
      뉴스 요약: ${clusterDetail.summary.article}.
      뉴스 배경지식: ${clusterDetail.summary.background}.
    `;
    speak(text); //
  };

  if (loading) return <div>뉴스 데이터를 불러오는 중입니다...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!clusterDetail) return <div>뉴스를 찾을 수 없습니다.</div>;

  return (
    <S.PageWrapper>
      {/* 3. 기존 S.Header JSX를 Header 컴포넌트로 교체 */}
      <Header onTTSClick={handleTTSClick} />

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