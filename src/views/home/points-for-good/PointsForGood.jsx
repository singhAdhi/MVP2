import React, { useState, useEffect } from "react";
import "./pointsforgood.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import HorizontalCard from "../../../components/global/swiper/horizontal-card/HorizontalCard";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";

const PointsForGood = (props) => {
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

  if (isLoading) {
    return <Loading loadingText="Points for good" />;
  }

  if (isError) {
    return <Error errorText="Points for good not found" />;
  }

  return (
    <>
      <Heading headingText="Points for good" />
      <SwiperSlider
        options={options}
        slides={data.map((slide) => (
          <HorizontalCard key={slide.id} slide={slide} />
        ))}
      />
    </>
  );
};

export default PointsForGood;
