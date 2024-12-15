import { lazy } from "react";
import { PATH_CONSTANTS } from "./pathConstants";

const Home = lazy(() => import("../Pages/Home"));
const About = lazy(() => import("../Pages/About"));

const routes = [
  {
    path: PATH_CONSTANTS.HOME,
    element: <Home />,
  },
  {
    path: PATH_CONSTANTS.ABOUT,
    element: <About />,
  },
];

export default routes;
