import { createBrowserRouter } from "react-router-dom";
import React from "react";
import { routes } from "./routes.jsx";

// 1. 방금 만든 라우트 가드 컴포넌트들을 임포트합니다.
import PrivateRoute from "./PrivateRoute.jsx";
import PublicOnlyRoute from "./PublicOnlyRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // 2. PublicOnlyRoute로 감싸줍니다. (로그인 시 접근 불가)
    element: (
      <PublicOnlyRoute>
        <routes.Intro />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/login",
    // 3. PublicOnlyRoute로 감싸줍니다. (로그인 시 접근 불가)
    element: (
      <PublicOnlyRoute>
        <routes.Login />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/signup",
    // 4. PublicOnlyRoute로 감싸줍니다. (로그인 시 접근 불가)
    element: (
      <PublicOnlyRoute>
        <routes.Signup />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/find-password",
    // 5. PublicOnlyRoute로 감싸줍니다. (로그인 시 접근 불가)
    element: (
      <PublicOnlyRoute>
        <routes.FindPassword />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/news",
    // 6. PrivateRoute로 감싸줍니다. (로그인 필수)
    element: (
      <PrivateRoute>
        <routes.NewsList />
      </PrivateRoute>
    ),
  },
  {
    path: "/news/:id",
    // 7. PrivateRoute로 감싸줍니다. (로그인 필수)
    element: (
      <PrivateRoute>
        <routes.NewsDetail />
      </PrivateRoute>
    ),
  },
]);

export default router;