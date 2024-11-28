import React from "react";
import SliderItem from "./SliderItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <section className="banner-slider">
    <Slider {...settings}>
      <SliderItem img="slide-1.jpg" header="GRAPHIC TEES CULTURE" subheader="NEW DROP"/>
      <SliderItem img="slide-2.jpg" header="QB LOUNGE TEE" subheader="RESTOCKED WITH NEW COLORS"/>
      <SliderItem img="slide-3.jpg" header="STICHED FOOTBALL TRACKPANT" subheader="LIMITED EDITION ONLINE EXCLUSIVE"/>
    </Slider>
    </section>
  )
};

export default BannerSlider;
