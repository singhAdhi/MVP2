import React, { useState, useEffect } from "react";
import "./staysaround.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import VerticalCard from "../../../components/global/swiper/vertical-card/VerticalCard";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";

const StaysAround = (props) => {
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
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
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
    return <Loading loadingText={props.name} />;
  }

  if (isError) {
    return <Error errorText={props.name} />;
  }

  return (
    <>
      <Heading headingText={props.name} />
      <SwiperSlider
        options={options}
        slides={data.map((slide) => (
          <VerticalCard key={slide.id} slide={slide} show={"no"} />
        ))}
      />
    </>
  );
};

export default StaysAround;
