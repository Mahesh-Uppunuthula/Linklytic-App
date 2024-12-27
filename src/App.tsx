import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootRoutes, AuthRoutes, AppRoutes } from "./Routes";
import RootLayout from "./Layouts/RootLayout";
import AuthLayout from "./Layouts/AuthLayout";
import AppLayout from "./Layouts/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import Error from "./Pages/Errors/Error";
const Page404 = lazy(() => import("./Pages/Errors/Page404"));

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: RootRoutes,
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: AuthRoutes,
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: AppRoutes,
      errorElement: <Error />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
