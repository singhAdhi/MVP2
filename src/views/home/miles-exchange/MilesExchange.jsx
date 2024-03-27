import React, { useState, useEffect } from "react";
import "./milesexchange.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import ProductCard from "../../../components/global/swiper/product-card/ProductCard";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCardNew from "../../../components/global/swiper/product-card-new/ProductCardNew";

const MilesExchange = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      imgUrl: "/src/assets/images/banners/home/miles-exchange/image1.svg",
      title: "Trip to Thailand 1",
      title2: "Trip to Thailand 1",
      pts: "1,201 Pts",
      deletedPts: "1,901 Pts",
    },
    {
      id: 2,
      imgUrl: "/src/assets/images/banners/home/miles-exchange/image2.svg",
      title: "Trip to Thailand 2",
      title2: "Trip to Thailand 2",
      pts: "1,201 Pts",
      deletedPts: "1,901 Pts",
    },
    {
      id: 3,
      imgUrl: "/src/assets/images/banners/home/miles-exchange/image3.svg",
      title: "Trip to Thailand 3",
      title2: "Trip to Thailand 3",
      pts: "1,201 Pts",
      deletedPts: "1,901 Pts",
    },
    {
      id: 4,
      imgUrl: "/src/assets/images/banners/home/miles-exchange/image4.svg",
      title: "Trip to Thailand 4",
      title2: "Trip to Thailand 4",
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

  const GetSearchProducts = () => {
    let url = "/src/dummyApiData/shop/SearchProductsMiles_Data.json";
    axios
      .post(url)
      .then(({ data }) => {
        setData(data.SearchProductsMiles_Data.Products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (slides.length > 0) {
        // setData(slides);
        GetSearchProducts();
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1000);

    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return <Loading loadingText="Miles Exchange" />;
  }

  if (isError) {
    return <Error errorText="Miles Exchange not found" />;
  }

  const handleViewAllClick = () => {
    navigate("/shoplist/miles exchange", {
      state: { trendingProducts: data },
    });
  };

  return (
    <>
      <Heading
        headingText="Miles Exchange"
        onViewAllClick={() => handleViewAllClick()}
      />
      <SwiperSlider
        options={options}
        slides={data.map((slide) => (
          <ProductCardNew key={slide.id} slide={slide} />
        ))}
      />
    </>
  );
};

export default MilesExchange;
