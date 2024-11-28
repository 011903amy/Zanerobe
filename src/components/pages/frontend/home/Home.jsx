import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import BannerSlider from "./BannerSlider";
import NewArrival from "./NewArrival";
import FullPageLink from "./FullPageLink";
import WinterCollection from "./WinterCollection";

const Home = () => {
  return (
    <>
    <Header/>
    <BannerSlider/>
    <NewArrival/>
    <FullPageLink img="fullpage.jpg" header="in pursuit" subheader="Latest Collection"/>
    <WinterCollection/>
    <Footer/>
    </>
    
  );
};

export default Home;
