import React, { useState, useEffect } from "react";
import "./bestsellers.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import ProductCard from "../../../components/global/swiper/product-card/ProductCard";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";
import axios from "axios";
import ProductCardNew from "../../../components/global/swiper/product-card-new/ProductCardNew";

const BestSellers = () => {
  const slides = [
    {
      id: 1,
      imgUrl: "/src/assets/images/banners/shop/best-sellers/banner1.svg",
      title: "Apple Iphone 15 Pro",
      pts: "11,250 Pts",
      deletedPts: "1,901 Pts",
    },
    {
      id: 2,
      imgUrl: "/src/assets/images/banners/shop/best-sellers/banner2.svg",
      title: "Samsung Galaxy S23 Ultra",
      pts: "1,201 Pts",
      deletedPts: "1,901 Pts",
    },
    {
      id: 3,
      imgUrl: "/src/assets/images/banners/shop/best-sellers/banner3.svg",
      title: "Apple Watch Series 8",
      pts: "1,201 Pts",
      deletedPts: "1,901 Pts",
    },
    {
      id: 4,
      imgUrl: "/src/assets/images/banners/shop/best-sellers/banner4.svg",
      title: "Bose Quite Comfort",
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
        // setData(slides);
        GetSearchProductsBestSeller();
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1000);

    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, []);

  const GetSearchProductsBestSeller = () => {
    let url = "/src/dummyApiData/shop/SearchProducts_BestSeller_DATA.json";
    axios
      .post(url)
      .then(({ data }) => {
        setData(data.SearchProducts_BestSeller_DATA.Products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loading loadingText="Best Sellers" />;
  }

  if (isError) {
    return <Error errorText="Best Sellers not found" />;
  }

  return (
    <>
      <Heading headingText="Best Sellers" />
      <SwiperSlider
        options={options}
        slides={data.map((slide) => (
          <ProductCardNew key={slide.id} slide={slide} />
        ))}
      />
    </>
  );
};

export default BestSellers;
