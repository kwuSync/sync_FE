import React from 'react';
import { Navigate } from 'react-router-dom';
import tokenManager from '../api/tokenManager';

/**
 * 로그인을 *하지 않은* 사용자만 접근해야 하는 페이지를 감싸는 컴포넌트입니다.
 * (예: /, /login, /signup)
 * * @param {{children: JSX.Element}} props 
 * @returns {JSX.Element}
 */
const PublicOnlyRoute = ({ children }) => {
  // 1. 토큰을 확인합니다.
    const isLoggedIn = !!tokenManager.getToken();

  // 2. 만약 *이미* 로그인이 되어있다면,
    if (isLoggedIn) {
    // 3. /news 페이지로 강제로 보냅니다.
        return <Navigate to="/news" replace />;
    }

  // 4. 로그인이 안 되어있다면, 요청한 페이지(children)를 그대로 보여줍니다.
    return children;
};

export default PublicOnlyRoute;