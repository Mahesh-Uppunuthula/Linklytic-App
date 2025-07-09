import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootRoutes, AuthRoutes, AppRoutes } from "./routes";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import Error from "./pages/Errors/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Spinner from "./components/ui/Loader/SimpleLoader";
const Page404 = lazy(() => import("./pages/Errors/Page404"));

export default function App() {
  const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Suspense fallback={<Spinner fullPage />}>
            <RouterProvider router={router} />
          </Suspense>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
