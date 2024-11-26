import React from "react";
// import SideNav from "./_component/SideNav";
import Header from "./_component/Header";

function Home({ children }) {
  return (
    <div>
      <div className="">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Home;
