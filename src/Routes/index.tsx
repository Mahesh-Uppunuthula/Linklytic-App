import { lazy } from "react";
import { PATH_CONSTANTS } from "./pathConstants";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Links from "../pages/Links";
import Account from "../pages/Account";
import FormBuilder from "../pages/FormBuilder";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const RootRoutes = [
  {
    path: PATH_CONSTANTS.HOME,
    element: <Home />,
  },
  {
    path: PATH_CONSTANTS.ABOUT,
    element: <About />,
  },
];

const AppRoutes = [
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
    element: <Account />,
  },
  {
    path: PATH_CONSTANTS.FORM_BUILDER,
    element: <FormBuilder />,
  },
];

const AuthRoutes = [
  {
    path: PATH_CONSTANTS.LOGIN,
    element: <Login />,
  },
  {
    path: PATH_CONSTANTS.SIGNUP,
    element: <Signup />,
  },
];

export { RootRoutes, AppRoutes, AuthRoutes };
