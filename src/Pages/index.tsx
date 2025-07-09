import { lazy } from "react";
import { PATH_CONSTANTS } from "./pathConstants";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Links from "../pages/Links";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

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

export const AppRoutes = [
  {
    path: PATH_CONSTANTS.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: PATH_CONSTANTS.LINKS,
    element: <Links />,
  },
  {
    path: PATH_CONSTANTS.ACCOUNT,
    element: <Links />,
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
