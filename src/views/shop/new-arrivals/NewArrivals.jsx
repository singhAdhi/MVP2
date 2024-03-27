import React, { useState, useEffect } from "react";
import "./newarrivals.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import ProductCard from "../../../components/global/swiper/product-card/ProductCard";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";
import axios from "axios";
import ProductCardNew from "../../../components/global/swiper/product-card-new/ProductCardNew";

const NewArrivals = () => {
  const slides = [
    {
      id: 1,
      imgUrl: "/src/assets/images/banners/shop/new-arrivals/banner1.svg",
      title: "Bag pack HD Cuzy",
      pts: "15,250 Pts",
      deletedPts: "3,901 Pts",
    },
    {
      id: 2,
      imgUrl: "/src/assets/images/banners/shop/new-arrivals/banner2.svg",
      title: "LED Smart Google Tv",
      pts: "1,201 Pts",
      deletedPts: "1,901 Pts",
    },
    {
      id: 3,
      imgUrl: "/src/assets/images/banners/shop/new-arrivals/banner3.svg",
      title: "Apple Watch Series 8",
      pts: "1,201 Pts",
      deletedPts: "1,901 Pts",
    },
    {
      id: 4,
      imgUrl: "/src/assets/images/banners/shop/new-arrivals/banner4.svg",
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
        GetSearchProductsNewArrival();
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1000);

    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, []);

  const GetSearchProductsNewArrival = () => {
    let url = "/src/dummyApiData/shop/SearchProducts_NewArrival_DATA.json";
    axios
      .post(url)
      .then(({ data }) => {
        setData(data.SearchProducts_NewArrival_DATA.Products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loading loadingText="New Arrivals" />;
  }

  if (isError) {
    return <Error errorText="New Arrivals not found" />;
  }

  return (
    <>
      <Heading headingText="New Arrivals" />
      <SwiperSlider
        options={options}
        slides={data.map((slide) => (
          <ProductCardNew key={slide.id} slide={slide} />
        ))}
      />
    </>
  );
};

export default NewArrivals;
