import React, { useState, useEffect } from "react";
import "./turnpointsintodiscounts.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import BoxCard from "../../../components/global/swiper/box-card/BoxCard";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";

const TurnPointsIntoDiscounts = (props) => {
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
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
      1400: {
        slidesPerView: 7,
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
    return <Loading loadingText="Turn Points into Discount" />;
  }

  if (isError) {
    return <Error errorText="Turn Points into Discount not found" />;
  }

  return (
    <>
      <Heading headingText="Turn Points into Discount" />
      <SwiperSlider
        options={options}
        slides={data.map((slide) => {
          let title = slide.Name.split("|")[0];
          let offer = slide.Name.split("|")[1];
          let url = slide.PrimaryImage.Url;
          let item = { title, offer, url };
          return <BoxCard key={slide.Id} slide={item} />;
        })}
      />
    </>
  );
};

export default TurnPointsIntoDiscounts;
