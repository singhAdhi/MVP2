import React, { useState, useEffect } from "react";
import "./footernav.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";
import IconHeading from "../../../components/global/icon-heading/IconHeading";

const FooterNav = () => {
  const slides = [
    {
      id: 1,
      imgUrl: "/src/assets/images/icons/home/footer-nav/about-us.svg",
      title: "About Us",
    },
    {
      id: 2,
      imgUrl: "/src/assets/images/icons/home/footer-nav/contact-us.svg",
      title: "Contact Us",
    },
    {
      id: 3,
      imgUrl: "/src/assets/images/icons/home/footer-nav/faq.svg",
      title: "FAQs",
    },
    {
      id: 4,
      imgUrl: "/src/assets/images/icons/home/footer-nav/how-to-earn.svg",
      title: "How to Earn",
    },
    {
      id: 5,
      imgUrl: "/src/assets/images/icons/home/footer-nav/how-to-redeem.svg",
      title: "How to Redeem",
    },
    {
      id: 6,
      imgUrl: "/src/assets/images/icons/home/footer-nav/tier-benefits.svg",
      title: "Tier Benefits",
    },
    {
      id: 7,
      imgUrl: "/src/assets/images/icons/home/footer-nav/about-us.svg",
      title: "About Us 2",
    },
    {
      id: 8,
      imgUrl: "/src/assets/images/icons/home/footer-nav/contact-us.svg",
      title: "Contact Us 2",
    },
    {
      id: 9,
      imgUrl: "/src/assets/images/icons/home/footer-nav/faq.svg",
      title: "FAQs 2",
    },
    {
      id: 10,
      imgUrl: "/src/assets/images/icons/home/footer-nav/how-to-earn.svg",
      title: "How to Earn 2",
    },
    {
      id: 11,
      imgUrl: "/src/assets/images/icons/home/footer-nav/how-to-redeem.svg",
      title: "How to Redeem 2",
    },
    {
      id: 12,
      imgUrl: "/src/assets/images/icons/home/footer-nav/tier-benefits.svg",
      title: "Tier Benefits 2",
    },
  ];

  const firstSlide = slides.slice(0, 6);
  const secondSlide = slides.slice(6);

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
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
      },
      1400: {
        slidesPerView: 2,
      },
    },
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (firstSlide.length > 0 && secondSlide.length > 0) {
        setData([firstSlide, secondSlide]);
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
    return <Loading loadingText="footer nav" />;
  }

  if (isError) {
    return <Error errorText="footer nav not found" />;
  }

  return (
    <>
      <SwiperSlider
        slides={data.map((slideGroup) => (
          <div className="dvFooterNav b-radius bg-white px-3 pt-3">
            <div className="row">
              {slideGroup.map((slide) => (
                <div className="col-6 text-center mb-3" key={slide.id}>
                  <IconHeading
                    imgUrl={slide.imgUrl}
                    title={slide.title}
                    css={{
                      height: "",
                      bgColour: "bg-transparent",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        options={options}
      />
    </>
  );
};

export default FooterNav;
