import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../Components/Header/Header";

function AppLayout() {
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
