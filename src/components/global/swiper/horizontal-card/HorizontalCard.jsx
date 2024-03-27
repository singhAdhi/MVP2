import React from "react";
import "./horizontalcard.css";

const HorizontalCard = ({ slide, className }) => {
  return (
    <>
      <div className={`dvHorizontalCard ${className}`}>
        {slide && (
          <a className="card bg-transparent border-0">
            <img
              src={slide.PrimaryImage && slide.PrimaryImage.Url}
              className="card-img"
              alt="..."
            />
            <div className="position-absolute bottom-0 start-0 end-0 p-3">
              <h2 className="h5 heading-semibold text-white mb-1 text-truncate text-capitalize">
                {slide.Name}
              </h2>
              {/* <div className="d-flex align-items-center">
                <div className="dvRatings d-flex align-items-center">
                  <img
                    src="/src/assets/images/icons/common/star-icon.svg"
                    alt=""
                  />
                  <span className="h8 heading-light text-white ms-1 d-block">
                    {slide.rating}
                  </span>
                </div>
                <i className="fa-solid fa-circle mx-2 text-white"></i>
                <div className="dvPoints">
                  <span className="h8 heading-light text-white d-block">
                    {slide.points}
                  </span>
                </div>
              </div> */}
            </div>
          </a>
        )}
      </div>
    </>
  );
};

export default HorizontalCard;
