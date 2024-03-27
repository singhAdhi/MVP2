import React, { useEffect } from "react";
import "./whatshotrightnow.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import { useDispatch, useSelector } from "react-redux";
import { fetchWhatsHotRightNow } from "../../../redux/features/home/whats-hot-right-now/whatsHotRightNowSlice";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";

const WhatsHotRightNow = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, errorText } = useSelector(
    (state) => state.whatsHotRightNowReducer
  );
  // console.log(data, isLoading, isError, errorText);

  //handle api call
  useEffect(() => {
    dispatch(fetchWhatsHotRightNow());
  }, []);

  const options = {
    direction: "horizontal",
    loop: false,
    speed: 500,
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

  if (isLoading) {
    return <Loading loadingText="Whats Hot Right Now" />;
  }

  if (isError) {
    return <Error errorText={errorText} />;
  }

  return (
    <>
      <Heading headingText="What's Hot Right Now" />
      <SwiperSlider
        slides={data.map((slide) => (
          <div className="dvHotSlide" key={slide.id}>
            <a className="card bg-transparent border-0">
              <img src={slide.imgUrl} className="card-img" alt="..." />
              <div className="position-absolute bottom-0 start-0 end-0 p-3">
                <h2 className="h5 heading-semibold text-white mb-1 text-truncate">{slide.title}</h2>
                <div className="d-flex align-items-center">
                  <div className="dvRatings d-flex align-items-center">
                    <img src="/src/assets/images/icons/common/star-icon.svg" alt="" />
                    <span className="h8 heading-light text-white ms-1 d-block">5.0</span>
                  </div>
                  <i className="fa-solid fa-circle mx-2 text-white"></i>
                  <div className="dvPoints">
                    <span className="h8 heading-light text-white d-block">19,200 Pts</span>
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

export default WhatsHotRightNow;
