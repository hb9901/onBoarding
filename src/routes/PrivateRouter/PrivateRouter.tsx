import { Navigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { getCookie } from "../../utils/cookieFunctions";

const PrivateRouter = () => {
  const accessToken = getCookie("accessToken");

  if (!accessToken) {
    alert("로그인이 필요합니다!");
    return <Navigate to="/" />;
  }
  
  return <Layout />;
};

export default PrivateRouter;
