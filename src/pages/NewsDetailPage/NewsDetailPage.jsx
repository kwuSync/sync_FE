import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsClusters } from "../../data/newsData";
import * as S from "./NewsDetailPage.style";
import Button from "../../components/common/Button/Button";

const NewsDetailPage = () => {
  const { id } = useParams();
  const [cluster, setCluster] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [utterance, setUtterance] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const found = newsClusters.find((c) => c.cluster_id === Number(id));
    setCluster(found);
  }, [id]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleTTSClick = () => {
    if (!cluster) return;

    if (!utterance) {
      const text = `
        제목: ${cluster.generated_title}.
        뉴스 요약: ${cluster.summary.article}.
        뉴스 배경지식: ${cluster.summary.background}.
      `;

      const newUtterance = new SpeechSynthesisUtterance(text);
      newUtterance.lang = "ko-KR";

      newUtterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setUtterance(null);
      };

      window.speechSynthesis.speak(newUtterance);
      setUtterance(newUtterance);
      setIsSpeaking(true);
      setIsPaused(false);
    } else {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    }
  };

  if (!cluster) return <div>뉴스 데이터를 불러오는 중입니다...</div>;

  return (
    <S.PageWrapper>
      <S.Header>
        <S.HeaderTitle>오늘의 뉴스</S.HeaderTitle>
        <S.TTSButton onClick={handleTTSClick}>
          {isPaused ? "▶️" : isSpeaking ? "⏸️" : "📢"}
        </S.TTSButton>
      </S.Header>

      <S.Title>{cluster.generated_title}</S.Title>
      <S.Divider />

      <S.Section>
        <S.SubTitle>뉴스 요약</S.SubTitle>
        <S.Paragraph>{cluster.summary.article}</S.Paragraph>
      </S.Section>

      <S.Section>
        <S.SubTitle>뉴스 배경지식</S.SubTitle>
        <S.Paragraph>{cluster.summary.background}</S.Paragraph>
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
