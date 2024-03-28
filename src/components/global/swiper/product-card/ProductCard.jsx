import React from "react";
import "./productcard.css";

const ProductCard = ({ slide, removeFrom }) => {
  const fromText = removeFrom === "yes" ? "" : "From ";
  return (
    <>
      <div className="card bg-white b-radius border-0" key={slide.id}>
        <img src={slide.imgUrl} className="img-fluid b-radius" alt="..." />
        <div className="card-body p-3">
          <h2 className="h7 heading-semibold mb-1 text-capitalize text-truncate">
            {slide.title}
          </h2>
          <h2 className="h7 heading-regular text-light text-capitalize text-truncate">
            {slide.title2}
          </h2>
          <div className="d-flex justify-content-between align-items-center mt-2 gap-2">
            <p className="h6 heading-regular text-blue">
              {fromText}
              {slide.pts}
            </p>
            <p className="h6 heading-regular text-end">
              <del>
                {fromText}
                {slide.deletedPts}
              </del>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
