import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import { RootRoutes, AuthRoutes } from "./Routes";
import Page404 from "./Pages/Errors/Page404";
import AuthLayout from "./Layouts/AuthLayout";

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
