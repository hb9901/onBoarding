import { createBrowserRouter } from "react-router-dom";
import userInfoLoader from "../loaders/userInfo.loader";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MyPage from "../pages/MyPage";
import NotFound from "../pages/NotFound";
import SignUp from "../pages/SignUp";
import DefaultRouter from "./DefaultRouter";
import PrivateRouter from "./PrivateRouter";

const router = createBrowserRouter([
  {
    element: <DefaultRouter />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
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
