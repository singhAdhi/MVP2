import React, { useState, useEffect } from "react";
import "./trendingproducts.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import HorizontalCard from "../../../components/global/swiper/horizontal-card/HorizontalCard";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";
import { useNavigate } from "react-router";

const TrendingProducts = (props) => {
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
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 4,
      },
    },
  };
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (props.data.length > 0) {
        let list = props.data.sort((a, b) => a.Priorty - b.Priorty);
        setData(list);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1000);

    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, []);

  // handle viewall click
  const handleViewAllClick = () => {
    navigate("/shoplist/trending products", {
      state: { trendingProducts: props.data },
    });
  };

  if (isLoading) {
    return <Loading loadingText="Trending Products" />;
  }

  if (isError) {
    return <Error errorText="Trending Products not found" />;
  }

  return (
    <>
      <Heading
        headingText="Trending Products"
        onViewAllClick={handleViewAllClick}
      />
      <SwiperSlider
        options={options}
        slides={data.map((slide) => (
          <HorizontalCard slide={slide} />
        ))}
      />
    </>
  );
};

export default TrendingProducts;
