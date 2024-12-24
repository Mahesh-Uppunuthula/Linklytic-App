import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { Suspense, useEffect } from "react";
import { PATH_CONSTANTS } from "../Routes/pathConstants";
import useAuth from "../hooks/useAuth";

function RootLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_CONSTANTS.DASHBOARD);
      return;
    }
  }, [isAuthenticated]);
  return (
    <div className="p-1 flex flex-col gap-2 ">
      <Header />
      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
