import React from "react";
import "./swiperslider.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import "./styles.css";

const SwiperSlider = ({ navigation, options, slides }) => {
  console.log(slides);
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="dvSlider">
            <Swiper
              {...options}
              modules={[Navigation]}
              navigation={navigation ? navigation : true}
              className="mySwiper"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>{slide}</SwiperSlide>
              ))}
            </Swiper>
            {/* <div className="swiper-buttons">
              <div className="d-flex justify-content-center">
                <div className="swiper-button-prev pr-3">
                  <FaArrowCircleLeft />
                </div>
                <div className="swiper-button-next">
                  <FaArrowCircleRight />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SwiperSlider;
