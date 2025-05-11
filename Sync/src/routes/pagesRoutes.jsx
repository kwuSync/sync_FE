import { createBrowserRouter } from "react-router-dom";
import React from "react";
import { routes } from "./routes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <routes.Intro />,
  },
  {
    path: "/login",
    element: <routes.Login />,
  },
  {
    path: "/signup",
    element: <routes.Signup />,
  },
  {
    path: "/find-password",
    element: <routes.FindPassword />,
  },
  {
    path: "/news",
    element: <routes.NewsList />,
  },
  {
    path: "/news/:id",
    element: <routes.NewsDetail />,
  },
]);

export default router;
