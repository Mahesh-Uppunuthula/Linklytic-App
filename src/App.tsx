import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootRoutes, AuthRoutes, AppRoutes } from "./Routes";
import RootLayout from "./Layouts/RootLayout";
import AuthLayout from "./Layouts/AuthLayout";
import AppLayout from "./Layouts/AppLayout";
const Page404 = lazy(() => import("./Pages/Errors/Page404"));

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: RootRoutes,
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: AuthRoutes,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: AppRoutes,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
