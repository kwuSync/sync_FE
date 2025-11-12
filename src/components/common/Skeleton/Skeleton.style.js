import styled, { keyframes } from "styled-components";

// shimmer 애니메이션 정의
const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

// 기본 스켈레톤 박스
export const SkeletonBox = styled.div`
  display: inline-block;
  width: ${({ width = "100%" }) => width};
  height: ${({ height = "16px" }) => height};
  margin-bottom: ${({ mb = "0" }) => mb};
  border-radius: 4px;

  background: linear-gradient(
    to right,
    #f0f0f0 8%,
    #e0e0e0 18%,
    #f0f0f0 33%
  );
  background-size: 800px 104px;
  animation: 1.2s ${shimmer} infinite linear;
`;

// 여러 줄의 텍스트를 위한 래퍼
export const SkeletonText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;