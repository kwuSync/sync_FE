import React from "react";
import * as S from "./NewsListPage.style"; // NewsList의 스타일을 그대로 사용
import { SkeletonBox, SkeletonText } from "../../components/common/Skeleton/Skeleton.style";

// 하나의 스켈레톤 카드
const SkeletonCard = () => (
  <S.NewsCard>
    {/* NewsCardTitle */}
    <SkeletonBox width="80%" height="20px" mb="12px" />
    
    {/* CardKeywordList */}
    <S.CardKeywordList>
      <SkeletonBox width="60px" height="22px" style={{ borderRadius: "16px" }} />
      <SkeletonBox width="80px" height="22px" style={{ borderRadius: "16px" }} />
    </S.CardKeywordList>
    
    {/* NewsSummary */}
    <SkeletonText>
      <SkeletonBox height="14px" />
      <SkeletonBox height="14px" width="90%" />
    </SkeletonText>
  </S.NewsCard>
);

// NewsList 페이지 전체 스켈레톤
const NewsListSkeleton = () => {
  return (
    <S.PageWrapper>
      {/* KeywordSection */}
      <S.KeywordSection>
        <SkeletonBox width="120px" height="20px" mb="12px" />
        <S.KeywordList>
          <SkeletonBox width="70px" height="28px" style={{ borderRadius: "16px" }} />
          <SkeletonBox width="90px" height="28px" style={{ borderRadius: "16px" }} />
          <SkeletonBox width="60px" height="28px" style={{ borderRadius: "16px" }} />
        </S.KeywordList>
      </S.KeywordSection>

      {/* NewsSection - 카드 3개 반복 */}
      <S.NewsSection>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </S.NewsSection>
    </S.PageWrapper>
  );
};

export default NewsListSkeleton;