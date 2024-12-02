"use client";
import React from "react";
import { Provider } from "react-redux";
import Store from "./reduxAuth/store/Store";
import Header from "./(router)/_component/Header";
import Footer from "@/components/Footer";

function HomePage({ children }) {
  return (
    <Provider store={Store}>
      <Header />
      {children}
      <Footer />
    </Provider>
  );
}

export default HomePage;
