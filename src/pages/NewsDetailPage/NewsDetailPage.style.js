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
  /* ⬇️ 추가: 댓글 내 컨텐츠 정렬 */
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// ⬇️ --- 추가된 스타일 --- ⬇️

// 댓글 상단 (작성자 + 버튼)
export const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 댓글 작성자
export const CommentAuthor = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

// 댓글 본문
export const CommentText = styled.p`
  font-size: 15px;
  color: #444;
  line-height: 1.6;
  white-space: pre-line; /* 줄바꿈 적용 */
`;

// 수정/삭제 버튼 컨테이너
export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

// 수정/삭제 버튼
export const CommentButton = styled.button`
  font-size: 13px;
  color: #777;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  
  &:hover {
    color: #000;
    text-decoration: underline;
  }
`;

// 수정 모드 Wrapper
export const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

// 댓글 수정용 Textarea
export const CommentEditTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  min-height: 60px;
`;