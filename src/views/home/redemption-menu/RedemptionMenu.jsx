import React, { useState, useEffect } from "react";
import "./redemptionmenu.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import CategoryCard from "../../../components/global/swiper/category-card/CategoryCard";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";
import { useNavigate } from "react-router-dom";

const RedemptionMenu = (props) => {
  const navigate = useNavigate();

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

  const colorlist = ["bg-blue", "bg-lightblue", "bg-darkblue"];
  useEffect(() => {
    const delay = setTimeout(() => {
      if (props.data.length > 0) {
        let i = 0;
        let list = props.data
          .map((x) => {
            x.bgColour = colorlist[i];
            if (i === 2) i = 0;
            else i++;
            return x;
          })
          .sort((a, b) => a.Priorty - b.Priorty);
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
    return <Loading loadingText="Categories" />;
  }

  if (isError) {
    return <Error errorText="Categories not found" />;
  }

  //handle redemption or category navigation
  const redemptionMenuItems = (title) => {
    navigate(`/${title.toLowerCase()}`);
  };

  return (
    <>
      <Heading headingText="Categories" show="no" />
      <SwiperSlider
        slides={data.map((slide) => (
          <CategoryCard
            key={slide.Id}
            slide={slide}
            onClick={() => redemptionMenuItems(slide.Name)}
          />
        ))}
        options={options}
      />
    </>
  );
};

export default RedemptionMenu;
