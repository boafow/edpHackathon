import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Layout = () => {
  return (
    <>
      <SearchBar />
      <Outlet />
    </>
  )
};

export default Layout;
