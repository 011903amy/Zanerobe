import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardItem from "./CardItem";

const NewArrival = () => {
  const [isHover, setIsHover] = React.useState(false);

  const newArrivalArray = [
    {
      img1: "na-card-a1.jpg",
      img2: "na-card-a2.jpg",
      title: "lorem ipsum dolo sit amet",
      price: "1499.99",
    },
    {
      img1: "na-card-a2.jpg",
      img2: "na-card-a1.jpg",
      title: "lorem ipsum dolo sit amet",
      price: "1489.99",
    },
    {
      img1: "na-card-a1.jpg",
      img2: "na-card-a2.jpg",
      title: "lorem ipsum dolo sit amet",
      price: "1699.99",
    },
    {
      img1: "na-card-a2.jpg",
      img2: "na-card-a1.jpg",
      title: "lorem ipsum dolo sit amet",
      price: "2499.99",
    },
    {
      img1: "na-card-a1.jpg",
      img2: "na-card-a2.jpg",
      title: "lorem ipsum dolo sit amet",
      price: "499.99",
    },
  ];

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <section>
      <div className="new-arrival py-10">
        <div className="container">
          <Slider {...settings}>
            {newArrivalArray.map((item, key) => (
             <CardItem item={item} key={key}/>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
