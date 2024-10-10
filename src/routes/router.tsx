import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import moviesLoader from "../loaders/movieInfo.loader";
import userInfoLoader from "../loaders/userInfo.loader";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import NotFound from "../pages/NotFound";
import SignUp from "../pages/SignUp";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
        loader: () => moviesLoader(),
      },
    ],
    loader: () => userInfoLoader(),
  },
  {
    element: <PublicRouter />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
    loader: () => userInfoLoader(),
  },
  {
    element: <PrivateRouter />,
    children: [
      {
        path: "/mypage",
        element: <MyPage />,
        loader: () => userInfoLoader(),
      },
    ],
    loader: () => userInfoLoader(),
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
