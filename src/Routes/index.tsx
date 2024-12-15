import { lazy } from "react";
import { PATH_CONSTANTS } from "./pathConstants";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

const Home = lazy(() => import("../Pages/Home"));
const About = lazy(() => import("../Pages/About"));

export const RootRoutes = [
  {
    path: PATH_CONSTANTS.HOME,
    element: <Home />,
  },
  {
    path: PATH_CONSTANTS.ABOUT,
    element: <About />,
  },
];

export const AuthRoutes = [
  {
    path: PATH_CONSTANTS.LOGIN,
    element: <Login />,
  },
  {
    path: PATH_CONSTANTS.SIGNUP,
    element: <Signup />,
  },
];
