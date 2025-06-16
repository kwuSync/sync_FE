import styled from "styled-components";

export const PageWrapper = styled.div`
  padding-top: 70px; /* 헤더 공간 확보 */
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  z-index: 999;
`;

export const HeaderTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
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

export const TTSButton = styled.button`
  margin-left: auto;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #f4f4f4;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`;

