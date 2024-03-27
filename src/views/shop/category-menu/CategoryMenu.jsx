import React, { useEffect, useState } from "react";
import "./categorymenu.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import IconHeading from "../../../components/global/icon-heading/IconHeading";
import Loading from "../../../components/global/loading/Loading";
import { Link } from "react-router-dom";

const CategoryMenu = ({ category }) => {
  console.log(category);
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
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 6,
      },
      1200: {
        slidesPerView: 10,
      },
      1400: {
        slidesPerView: 10,
      },
    },
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (category.length > 0) {
        setData(category);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1000);

    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, [category]); // Include category in the dependency array

  if (isLoading) {
    return <Loading loadingText="Category Menu" />;
  }

  if (isError) {
    return <Error errorText="Category Menu not found" />;
  }
  console.log(data);
  return (
    <>
      <SwiperSlider
        slides={data.map((slide) => (
          <Link to={`/shop/${slide.Name}/${slide.Id}`}>
            <IconHeading
              key={slide?.Id}
              imgUrl={slide?.PrimaryImage?.Url}
              title={slide?.Name}
              css={{ height: "50px", bgColour: "bg-white" }}
            />
          </Link>
        ))}
        options={options}
      />
    </>
  );
};

export default CategoryMenu;
