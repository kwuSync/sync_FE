import styled from "styled-components";

export const PageWrapper = styled.div`
  padding-top: 70px; /* 헤더 공간 확보 */
`;


export const KeywordSection = styled.section`
  padding: 16px 20px;
`;

export const KeywordTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
`;

export const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Keyword = styled.span`
  background-color: #f5f5f5;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  color: #333;
`;

export const NewsSection = styled.section`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const NewsCard = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 20px;
`;

export const NewsCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
  text-align: justify;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
export const CardKeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

export const CardKeyword = styled.span`
  background-color: #f5f5f5;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 13px;
  color: #555;
`;

export const NewsSummary = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  text-align: justify;
`;

// 페이지네이션 버튼 컨테이너
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 20px;
  gap: 16px;
`;

// '이전', '다음' 버튼
export const PageMoveButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  border-radius: 8px;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  background-color: #fff;
  transition: background-color 0.2s, color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }

  &:disabled {
    color: #ccc;
    border-color: #ddd;
    cursor: not-allowed;
  }
`;

// '1 / 5' 페이지 표시
export const PageIndicator = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #555;
`;