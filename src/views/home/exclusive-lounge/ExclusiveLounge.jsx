import React, { useState, useEffect } from "react";
import "./exclusivelounge.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import GalleryCard from "../../../components/global/swiper/gallery-card/GalleryCard";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";

const ExclusiveLounge = () => {
  const jsonData = {
    TotalCount: 1,
    AssetDetails: [
      {
        Size: 208973,
        ContentType: "image/svg+xml",
        Type: "blob",
        Name: "banner1.svg",
        Url: "https://shopgatewayuat.giift.com/assets/stores/MVPT2/exclusivelounge/banner1.svg",
        RelativeUrl: "/stores/MVPT2/exclusivelounge/banner1.svg",
        CreatedDate: "2024-02-17T13:53:19.7943175Z",
        ModifiedDate: "2024-02-17T13:53:19.8255686Z",
      },
    ],
  };
  let imgURL = jsonData.AssetDetails[0].Url;
  const slides = [
    {
      id: 1,
      imgUrl: imgURL,
      title: "Relaxation Awaits: Step into Comfort",
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
        slidesPerView: 2,
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
    return <Loading loadingText="Exclusive Lounge Comfort" />;
  }

  if (isError) {
    return <Error errorText="Exclusive Lounge Comfort not found" />;
  }

  return (
    <>
      <Heading headingText="Exclusive Lounge Comfort" show="no" />
      <SwiperSlider
        navigation={false}
        options={options}
        slides={data.map((slide) => (
          <GalleryCard key={slide.id} slide={slide} />
        ))}
      />
    </>
  );
};

export default ExclusiveLounge;
