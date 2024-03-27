import React, { useState, useEffect } from "react";
import "./earnpoints.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";

const EarnPoints = () => {
  const slides = [
    {
      id: 1,
      imgUrl: "/src/assets/images/banners/home/earn-points/banner1.svg",
      title: "Trip to Thailand",
      rating: "5.0",
      points: "19,200 Pts",
    },
    {
      id: 2,
      imgUrl: "/src/assets/images/banners/home/earn-points/banner2.svg",
      title: "Trip to Mumbai",
      rating: "5.0",
      points: "19,200 Pts",
    },
    {
      id: 3,
      imgUrl: "/src/assets/images/banners/home/earn-points/banner3.svg",
      title: "Trip to Dubai",
      rating: "5.0",
      points: "12,200 Pts",
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
      if (slides.length > 0) {
        setData(slides);
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
    return <Loading loadingText="Earn Points" />;
  }

  if (isError) {
    return <Error errorText="Earn Points not found" />;
  }

  return (
    <>
      <Heading headingText="Earn Points" />
      <SwiperSlider
        slides={data.map((slide) => (
          <div className="dvEarnPointsSlide" key={slide.id}>
            <a className="card bg-transparent border-0">
              <p className="position-absolute top-0 end-0 p-1 px-2 bg-lightblue b-radius m-2 h7 heading-semibold">
                100 Pts
              </p>
              <img src={slide.imgUrl} className="card-img" alt="..." />
              <div className="position-absolute bottom-0 start-0 end-0 p-3">
                <h2 className="h5 heading-semibold text-white mb-1 text-truncate">{slide.title}</h2>
                <div className="d-flex align-items-center">
                  <div className="dvRatings d-flex align-items-center">
                    <img src="/src/assets/images/icons/common/star-icon.svg" alt="" />
                    <span className="h8 heading-light text-white ms-1 d-block">{slide.rating}</span>
                  </div>
                  <i className="fa-solid fa-circle mx-2 text-white"></i>
                  <div className="dvPoints">
                    <span className="h8 heading-light text-white d-block">{slide.points}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
        options={options}
      />
    </>
  );
};

export default EarnPoints;
