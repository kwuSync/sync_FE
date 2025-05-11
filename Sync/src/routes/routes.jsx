import React from "react";

export const routes = {
  Intro: React.lazy(() => import("../pages/IntroPage/IntroPage.jsx")),
  Login: React.lazy(() => import("../pages/LoginPage/LoginPage.jsx")),
  Signup: React.lazy(() => import("../pages/SignupPage/SignupPage.jsx")),
  FindPassword: React.lazy(() => import("../pages/FindPasswordPage/FindPasswordPage.jsx")),
  NewsList: React.lazy(() => import("../pages/NewsListPage/NewsListPage.jsx")),
  NewsDetail: React.lazy(() => import("../pages/NewsDetailPage/NewsDetailPage.jsx")),
};