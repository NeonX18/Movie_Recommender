import React from "react";
import { Footer, Navbar } from "../components";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div
        className="h-[5rem] 
      bg-gradient-to-b from-black to-transparent 
      w-full text-white absolute top-0 z-10"
      >
        <Navbar />
      </div>

      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
