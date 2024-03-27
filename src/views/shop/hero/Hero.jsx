import React, { useEffect, useState } from "react";
import "./hero.css";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";
import HeroBanner from "../../../components/global/hero-banner/HeroBanner";

const Hero = () => {
  const heroData = {
    imgUrl: "/src/assets/images/banners/shop/hero/hero-banner.svg",
  };

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (Object.keys(heroData).length > 0) {
        setData(heroData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    }, 1000);

    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return <Loading loadingText="shop hero slider" />;
  }

  if (isError) {
    return <Error errorText="shop hero slider not found" />;
  }

  return (
    <>
      <HeroBanner imgUrl={data.imgUrl} />
    </>
  );
};

export default Hero;
