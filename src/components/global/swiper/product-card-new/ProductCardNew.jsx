import React from "react";
import "./productcardnew.css";

const ProductCardNew = ({ slide }) => {
  return (
    <div className="dvProductCardNew">
      <a className="card bg-white b-radius border-0 p-1">
        <img
          src={slide.PrimaryImage.Url}
          className="img-fluid b-radius"
          alt="..."
        />
        <div className="card-body">
          <h2 className="h7 heading-semibold mb-1 text-capitalize text-truncate">
            {slide.Name}
          </h2>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <p className="h7 heading-regular text-blue me-2">
              {"From "}
              {slide.Price.ActualPrice && slide.Price.ActualPrice.Amount}
              {" Pts"}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCardNew;
