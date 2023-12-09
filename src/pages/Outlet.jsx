import Header from "@/components/header";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default Layout;
