// src/pages/NewsListPage/NewsListPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NewsListPage.style";
import { getNewsList, getNewsSummary } from "../../api/newsApi";
import { useTTS } from "../../contexts/TTSContext";
import Header from "../../components/common/Header/Header";
import NewsListSkeleton from "./NewsListSkeleton";

const NEWS_PER_PAGE = 5;

const NewsListPage = () => {
  const navigate = useNavigate();
  const { speak, stop } = useTTS();

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    stop(); 

    const fetchNewsWithKeywords = async () => {
      setLoading(true);
      setError(null);
      try {
        const rawNewsData = await getNewsList(); 

        const newsWithKeywordPromises = rawNewsData.map(async (newsItem) => {
          try {
            const summaryData = await getNewsSummary(newsItem.clusterId);
            return {
              ...newsItem,
              generated_keywords: summaryData.generatedKeywords || [],
            };
          } catch (detailError) {
            console.warn(`뉴스 ID ${newsItem.clusterId}의 키워드를 불러오는 데 실패했습니다.`, detailError);
            return {
              ...newsItem,
              generated_keywords: [], 
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
  }, []); 

  // --- 페이지네이션 계산 ---
  const totalPages = Math.ceil(newsList.length / NEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
  // 현재 페이지에 보여줄 뉴스 5개
  const currentNewsList = newsList.slice(startIndex, startIndex + NEWS_PER_PAGE);

  // --- ⬇️ (수정된 부분) 키워드 계산 ⬇️ ---
  // (기존) const allKeywords = newsList.flatMap((news) => ...);
  // 현재 페이지에 보이는 5개 뉴스의 키워드만 추출합니다.
  const allKeywords = currentNewsList.flatMap((news) => news.generated_keywords || []);
  const uniqueKeywords = [...new Set(allKeywords)];
  // --- ---------------------------------

  const handleTTSClick = () => {
    if (currentNewsList.length === 0) return;
    const combinedText = currentNewsList
      .map((news, i) => `뉴스 ${i + 1}. ${news.title}. 요약 내용: ${news.summaryText}`)
      .join(". ");
    speak(combinedText, { type: 'main' });
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  };


  if (loading) return <NewsListSkeleton />;
  if (error) return <div>오류: {error}</div>;
  if (newsList.length === 0) return <div>표시할 뉴스가 없습니다.</div>;

  return (
    <S.PageWrapper>
      <Header onTTSClick={handleTTSClick} />

      <S.KeywordSection>
        {/*
          이제 uniqueKeywords는 currentNewsList(5개)에서 
          추출되었으므로, 현재 페이지의 키워드만 렌더링됩니다.
        */}
        <S.KeywordTitle>오늘의 키워드</S.KeywordTitle>
        <S.KeywordList>
          {uniqueKeywords.map((keyword, idx) => (
            <S.Keyword key={idx}>#{keyword}</S.Keyword>
          ))}
        </S.KeywordList>
      </S.KeywordSection>

      <S.NewsSection>
        {currentNewsList.map((news) => (
          <S.NewsCard key={news.clusterId}>
            <S.NewsCardTitle onClick={() => navigate(`/news/${news.clusterId}`)}>
              {news.title}
            </S.NewsCardTitle>

            <S.CardKeywordList>
              {news.generated_keywords && news.generated_keywords.map((keyword, idx) => (
                <S.CardKeyword key={idx}>#{keyword}</S.CardKeyword>
              ))}
            </S.CardKeywordList>

            <S.NewsSummary>{news.summaryText}</S.NewsSummary>
          </S.NewsCard>
        ))}
      </S.NewsSection>

      {/* 페이지네이션 UI */}
      {totalPages > 1 && (
        <S.PaginationContainer>
          <S.PageMoveButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </S.PageMoveButton>
          <S.PageIndicator>
            {currentPage} / {totalPages}
          </S.PageIndicator>
          <S.PageMoveButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </S.PageMoveButton>
        </S.PaginationContainer>
      )}
    </S.PageWrapper>
  );
};

export default NewsListPage;