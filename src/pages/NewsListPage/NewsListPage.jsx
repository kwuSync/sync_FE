import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NewsListPage.style";
import { newsClusters } from "../../data/newsData";

const NewsListPage = () => {
  const navigate = useNavigate();

  const allKeywords = newsClusters.flatMap((cluster) => cluster.generated_keywords);
  const uniqueKeywords = [...new Set(allKeywords)];

  const [utterance, setUtterance] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleTTSClick = () => {
    if (!utterance) {
      const combinedText = newsClusters
        .map((c, i) => `뉴스 ${i + 1}. ${c.generated_title}. 요약 내용: ${c.summary.highlight}`)
        .join(". ");

      const newUtterance = new SpeechSynthesisUtterance(combinedText);
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

  return (
    <S.PageWrapper>
      <S.Header>
        <S.HeaderTitle>오늘의 뉴스</S.HeaderTitle>
        <S.TTSButton onClick={handleTTSClick}>
          {isPaused ? "▶️" : isSpeaking ? "⏸️" : "📢"}
        </S.TTSButton>
      </S.Header>

      <S.KeywordSection>
        <S.KeywordTitle>오늘의 키워드</S.KeywordTitle>
        <S.KeywordList>
          {uniqueKeywords.map((keyword, idx) => (
            <S.Keyword key={idx}>#{keyword}</S.Keyword>
          ))}
        </S.KeywordList>
      </S.KeywordSection>

      <S.NewsSection>
        {newsClusters.map((cluster) => (
          <S.NewsCard key={cluster.cluster_id}>
            <S.NewsCardTitle onClick={() => navigate(`/news/${cluster.cluster_id}`)}>
              {cluster.generated_title}
            </S.NewsCardTitle>

            <S.CardKeywordList>
              {cluster.generated_keywords.map((keyword, idx) => (
                <S.CardKeyword key={idx}>#{keyword}</S.CardKeyword>
              ))}
            </S.CardKeywordList>

            <S.NewsSummary>{cluster.summary.highlight}</S.NewsSummary>
          </S.NewsCard>
        ))}
      </S.NewsSection>
    </S.PageWrapper>
  );
};

export default NewsListPage;
