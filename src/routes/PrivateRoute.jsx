import React from 'react';
import { Navigate } from 'react-router-dom';
import tokenManager from '../api/tokenManager';

/**
 * 로그인이 *반드시* 필요한 페이지를 감싸는 컴포넌트입니다.
 * (예: /news, /news/:id)
 * * @param {{children: JSX.Element}} props 
 * @returns {JSX.Element}
 */
const PrivateRoute = ({ children }) => {
  // 1. tokenManager에서 메모리에 있는 Access Token을 확인합니다.
    const isLoggedIn = !!tokenManager.getToken();

  // 2. 로그인이 되어있지 않다면,
    if (!isLoggedIn) {
    // 3. /login 페이지로 강제로 보냅니다. (replace: true로 히스토리에서 현재 경로를 지웁니다)
        return <Navigate to="/login" replace />;
    }

  // 4. 로그인이 되어있다면, 요청한 페이지(children)를 그대로 보여줍니다.
    return children;
};

export default PrivateRoute;