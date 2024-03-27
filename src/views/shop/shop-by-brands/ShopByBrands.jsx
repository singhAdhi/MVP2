import React, { useState, useEffect } from "react";
import "./shopbybrands.css";
import SwiperSlider from "../../../components/global/swiper/SwiperSlider";
import Heading from "../../../components/global/heading/Heading";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";
import BrandCard from "../../../components/global/swiper/brand-card/BrandCard";
import axios from "axios";

const ShopByBrands = () => {
  const slides = [
    {
      id: 1,
      imgUrl: "/src/assets/images/banners/shop/shop-by-brands/banner1.svg",
      title: "Apple",
    },
    {
      id: 2,
      imgUrl: "/src/assets/images/banners/shop/shop-by-brands/banner2.svg",
      title: "Jbl",
    },
    {
      id: 3,
      imgUrl: "/src/assets/images/banners/shop/shop-by-brands/banner3.svg",
      title: "Rotex",
    },
    {
      id: 4,
      imgUrl: "/src/assets/images/banners/shop/shop-by-brands/banner4.svg",
      title: "One Plus",
    },
    {
      id: 5,
      imgUrl: "/src/assets/images/banners/shop/shop-by-brands/banner5.svg",
      title: "Dior",
    },
    {
      id: 6,
      imgUrl: "/src/assets/images/banners/shop/shop-by-brands/banner6.svg",
      title: "Samsung",
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
        slidesPerView: 3,
      },
      576: {
        slidesPerView: 4,
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
      if (slides.length > 0) {
        GetStoreAssets_ShopByBrands();
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1000);

    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, []);

  const GetStoreAssets_ShopByBrands = () => {
    let url = "/src/dummyApiData/shop/GetStoreAssets_ShopByBrands.json";
    axios
      .post(url)
      .then(({ data }) => {
        setData(data.GetStoreAssets_ShopByBrands.AssetDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loading loadingText="Shop By  Brands" />;
  }

  if (isError) {
    return <Error errorText="Shop By  Brands not found" />;
  }

  return (
    <>
      <Heading headingText="Shop By  Brands" />
      <SwiperSlider
        options={options}
        slides={data.map((slide) => (
          <BrandCard key={slide.id} title={slide.Name} imgUrl={slide.Url} />
        ))}
      />
    </>
  );
};

export default ShopByBrands;
