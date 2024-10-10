import { Navigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { getCookie } from "../../utils/cookieFunctions";

const PrivateRouter = () => {
  const accessToken = getCookie("accessToken");

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return <Layout />;
};

export default PrivateRouter;
