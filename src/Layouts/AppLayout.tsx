import { Outlet } from "react-router-dom";
import { Suspense } from "react";
// import Header from "../components/Header/Header";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import SimpleLoader from "../components/ui/Loader/SimpleLoader";
// import useAuth from "../hooks/useAuth";
// import { PATH_CONSTANTS } from "../Routes/pathConstants";

function AppLayout() {
  // const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();
  // // useEffect(() => {
  // //   if (isAuthenticated) {
  // //     navigate(PATH_CONSTANTS.HOME);
  // //     return;
  // //   }
  // // }, [isAuthenticated]);
  return (
    <div className="w-dvw h-dvh flex overflow-clip">
      <div className="w-[5%] h-full">
        <Sidebar />
      </div>
      <div className="w-full h-full overflow-y-auto">
        <Suspense fallback={<SimpleLoader fullPage />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default AppLayout;
