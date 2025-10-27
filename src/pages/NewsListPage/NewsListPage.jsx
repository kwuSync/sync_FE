// src/pages/NewsListPage/NewsListPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NewsListPage.style";
import { getNewsList, getNewsSummary } from "../../api/newsApi";
import { useTTS } from "../../contexts/TTSContext";
import Header from "../../components/common/Header/Header"; // 1. 공통 Header 임포트

const NewsListPage = () => {
  const navigate = useNavigate();
  // 2. Header가 TTS 상태를 관리하므로 speak, stop만 가져옵니다.
  const { speak, stop } = useTTS();

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    stop(); // 페이지 진입 시 기존 음성 멈추기

    const fetchNewsWithKeywords = async () => {
      setLoading(true);
      setError(null);
      try {
        const rawNewsData = await getNewsList(); // 1. 뉴스 목록 가져오기

        // 2. 각 뉴스 아이템의 clusterId로 요약 정보(키워드 포함)를 병렬로 가져오기
        const newsWithKeywordPromises = rawNewsData.map(async (newsItem) => {
          try {
            // cluster_id는 image_2caf67.png에서 clusterId로 확인됨.
            const summaryData = await getNewsSummary(newsItem.clusterId);
            return {
              ...newsItem,
              // summary API에서 가져온 generated_keywords를 추가
              generated_keywords: summaryData.generatedKeywords || [],
            };
          } catch (detailError) {
            console.warn(`뉴스 ID ${newsItem.clusterId}의 키워드를 불러오는 데 실패했습니다.`, detailError);
            return {
              ...newsItem,
              generated_keywords: [], // 실패 시 빈 배열로 처리
            };
          }
        });

        const enrichedNewsList = await Promise.all(newsWithKeywordPromises);
        setNewsList(enrichedNewsList);

      } catch (err) {
        setError("뉴스 데이터를 불러오는 데 실패했습니다.");
        console.error("뉴스 목록 또는 키워드 로딩 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsWithKeywords();
  }, []); //

  // newsList가 비동기로 채워지므로, 로딩 상태를 한 번 더 확인합니다.
  const allKeywords = newsList.flatMap((news) => news.generated_keywords || []);
  const uniqueKeywords = [...new Set(allKeywords)];

  const handleTTSClick = () => {
    if (newsList.length === 0) return;
    const combinedText = newsList
      .map((news, i) => `뉴스 ${i + 1}. ${news.title}. 요약 내용: ${news.summaryText}`)
      .join(". ");
    speak(combinedText); //
  };

  if (loading) return <div>뉴스 데이터를 불러오는 중입니다...</div>;
  if (error) return <div>오류: {error}</div>;
  if (newsList.length === 0) return <div>표시할 뉴스가 없습니다.</div>;

  return (
    <S.PageWrapper>
      {/* 3. 기존 S.Header JSX를 Header 컴포넌트로 교체 */}
      <Header onTTSClick={handleTTSClick} />

      <S.KeywordSection>
        <S.KeywordTitle>오늘의 키워드</S.KeywordTitle>
        <S.KeywordList>
          {uniqueKeywords.map((keyword, idx) => (
            <S.Keyword key={idx}>#{keyword}</S.Keyword>
          ))}
        </S.KeywordList>
      </S.KeywordSection>

      <S.NewsSection>
        {newsList.map((news) => (
          <S.NewsCard key={news.clusterId}>
            <S.NewsCardTitle onClick={() => navigate(`/news/${news.clusterId}`)}>
              {news.title}
            </S.NewsCardTitle>

            <S.CardKeywordList>
              {/* generated_keywords 필드를 사용하도록 변경 */}
              {news.generated_keywords && news.generated_keywords.map((keyword, idx) => (
                <S.CardKeyword key={idx}>#{keyword}</S.CardKeyword>
              ))}
            </S.CardKeywordList>

            <S.NewsSummary>{news.summaryText}</S.NewsSummary>
          </S.NewsCard>
        ))}
      </S.NewsSection>
    </S.PageWrapper>
  );
};

export default NewsListPage;