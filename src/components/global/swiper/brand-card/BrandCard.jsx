import React from "react";

const BrandCard = ({ title, imgUrl }) => {
  let name = title.split(".")[0].toUpperCase();
  return (
    <>
      <div className="dvBrands bg-white b-radius d-flex flex-column justify-content-center align-items-center p-3">
        <img src={imgUrl} alt="" />
        <p className="text-capitalize">{name}</p>
      </div>
    </>
  );
};

export default BrandCard;
