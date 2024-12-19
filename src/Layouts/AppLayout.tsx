import { Outlet } from "react-router-dom";
import { Suspense } from "react";

function AppLayout() {
  return (
    <div className="p-1 flex flex-col gap-2 ">
      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default AppLayout;
