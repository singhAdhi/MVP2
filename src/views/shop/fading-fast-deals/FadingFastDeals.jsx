import React, { useState, useEffect } from "react";
import "./fadingfastdeals.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import ProductCard from "../../../components/global/swiper/product-card/ProductCard";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";
import axios from "axios";
import ProductCardNew from "../../../components/global/swiper/product-card-new/ProductCardNew";

const FadingFastDeals = () => {
  const slides = [
    {
      id: 1,
      imgUrl: "/src/assets/images/banners/shop/fading-fast-deals/banner1.svg",
      title: "PlayStation V",
      pts: "12,550 Pts",
      deletedPts: "3,901 Pts",
    },
    {
      id: 2,
      imgUrl: "/src/assets/images/banners/shop/fading-fast-deals/banner2.svg",
      title: "QuadCopter Drone",
      pts: "1,101 Pts",
      deletedPts: "1,901 Pts",
    },
    {
      id: 3,
      imgUrl: "/src/assets/images/banners/shop/fading-fast-deals/banner3.svg",
      title: "VR Headset Gear",
      pts: "1,201 Pts",
      deletedPts: "1,901 Pts",
    },
    {
      id: 4,
      imgUrl: "/src/assets/images/banners/shop/fading-fast-deals/banner4.svg",
      title: "HP Gaming Laptop",
      pts: "1,201 Pts",
      deletedPts: "1,901 Pts",
    },
  ];

  const options = {
    direction: "horizontal",
    loop: false,
    speed: 500,
    // slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    spaceBetween: 12,
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
      },
    },
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (slides.length > 0) {
        GetSearchProducts_FadingFastDeals_DATA();
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1000);

    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, []);

  const GetSearchProducts_FadingFastDeals_DATA = () => {
    let url = "/src/dummyApiData/shop/SearchProducts_FadingFastDeals_DATA.json";
    axios
      .post(url)
      .then(({ data }) => {
        setData(data.SearchProducts_FadingFastDeals_DATA.Products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loading loadingText="Fading Fast Deals" />;
  }

  if (isError) {
    return <Error errorText="Fading Fast Deals not found" />;
  }

  return (
    <>
      <Heading headingText="Fading Fast Deals" />
      <SwiperSlider
        options={options}
        slides={data.map((slide) => (
          <ProductCardNew key={slide.id} slide={slide} removeFrom="yes" />
        ))}
      />
    </>
  );
};

export default FadingFastDeals;
