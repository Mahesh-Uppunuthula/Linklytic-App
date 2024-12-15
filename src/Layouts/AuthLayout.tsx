import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="w-dvw h-dvh flex gap-1 justify-between">
      {/* Banner */}
      <div className="w-[50%] h-full bg-primary-light"></div>
      {/* Forms */}
      <div className="w-[50%] h-full bg-primary-light">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
