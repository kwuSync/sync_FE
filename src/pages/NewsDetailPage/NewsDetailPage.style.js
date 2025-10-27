import styled from "styled-components";

// 전체 페이지
export const PageWrapper = styled.div`
  padding-top: 70px; /* 헤더 공간 확보 */
`;


// 뉴스 제목 (크게)
export const Title = styled.h2`
  padding: 40px 24px 0 ;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: justify;
  color: #111;
`;

// 각 섹션 (요약, 배경지식)
export const Section = styled.section`
  padding: 0 24px;
  margin-bottom: 36px;
`;

// 소제목 (요약/배경지식 제목)
export const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

// 본문 내용
export const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #444;
  white-space: pre-line;
  text-align: justify;
`;

// 구분선
export const Divider = styled.hr`
  margin: 40px 0 20px;
  border: none;
  border-top: 1px solid #ddd;
`;

// 댓글 제목
export const CommentLabel = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #111;
`;

// 댓글 입력 박스
export const CommentBox = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

// 댓글 입력창
export const CommentInput = styled.textarea`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
`;

// 댓글 리스트
export const CommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 개별 댓글
export const Comment = styled.li`
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  font-size: 14px;
  color: #222;
`;
