import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-150px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
