import React from "react";
import "./herobanner.css";

const HeroBanner = ({ imgUrl }) => {
  return (
    <>
      <div className="dvHero">
        <img src={imgUrl} alt="" className="img-fluid w-100" />
      </div>
    </>
  );
};

export default HeroBanner;
