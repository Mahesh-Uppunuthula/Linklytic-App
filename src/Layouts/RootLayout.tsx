import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { Suspense } from "react";

function RootLayout() {
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
