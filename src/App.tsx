import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import routes from "./Routes";
import Page404 from "./Pages/Errors/Page404";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: routes,
      errorElement: <Page404 />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
