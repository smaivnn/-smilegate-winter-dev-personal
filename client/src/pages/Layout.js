import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";
import { userStore } from "../app/store";
const Layout = () => {
  const { accessToken } = userStore();

  return (
    <div>
      <div>
        <Header />
        <Nav />
        <div className=" border border-1 border-black my-[20px] ">
          <p>현재 토큰 : </p>
          <p className="text-xs">{accessToken}</p>
        </div>
        <section>
          <Outlet />
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
