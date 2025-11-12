import React from "react";
import * as S from "./NewsDetailPage.style"; // NewsDetail의 스타일을 그대로 사용
import { SkeletonBox, SkeletonText } from "../../components/common/Skeleton/Skeleton.style";

const NewsDetailSkeleton = () => {
  return (
    <S.PageWrapper>
      {/* Title */}
      <S.Title style={{ paddingTop: "40px", paddingBottom: "24px", marginBottom: 0 }}>
        <SkeletonText>
          <SkeletonBox height="28px" width="90%" />
          <SkeletonBox height="28px" width="70%" />
        </SkeletonText>
      </S.Title>
      
      <S.Divider />

      {/* Section (뉴스 요약) */}
      <S.Section>
        <SkeletonBox width="100px" height="20px" mb="10px" />
        <SkeletonText>
          <SkeletonBox height="15px" />
          <SkeletonBox height="15px" />
          <SkeletonBox height="15px" />
          <SkeletonBox height="15px" width="80%" />
        </SkeletonText>
      </S.Section>

      {/* Section (뉴스 배경지식) */}
      <S.Section>
        <SkeletonBox width="120px" height="20px" mb="10px" />
        <SkeletonText>
          <SkeletonBox height="15px" />
          <SkeletonBox height="15px" />
          <SkeletonBox height="15px" width="90%" />
        </SkeletonText>
      </S.Section>

      <S.Divider />

      {/* 댓글 섹션 (입력창은 로딩과 상관없이 보여줄 수 있으므로 생략) */}
      {/* 댓글 목록도 스켈레톤으로 처리할 수 있지만, 우선 본문만 처리했습니다. */}
    </S.PageWrapper>
  );
};

export default NewsDetailSkeleton;