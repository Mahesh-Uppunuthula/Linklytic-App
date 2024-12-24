import { Outlet, useNavigate } from "react-router-dom";
import { PATH_CONSTANTS } from "../Routes/pathConstants";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_CONSTANTS.DASHBOARD);
      return;
    }
  }, [isAuthenticated]);
  return (
    <div className="w-dvw h-dvh flex gap-1 justify-between">
      {/* Banner */}
      <div className="w-[50%] h-full flex justify-center place-items-center">
        <div className=" w-[98%] h-[98%] bg-primary-light rounded-lg">
          banner goes here
        </div>
      </div>
      {/* Forms */}
      <div className="w-[50%] h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
