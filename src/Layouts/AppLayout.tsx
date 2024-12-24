import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../Components/Header/Header";
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
    <div className="p-1 flex flex-col gap-2 ">
      <Header />
      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default AppLayout;
