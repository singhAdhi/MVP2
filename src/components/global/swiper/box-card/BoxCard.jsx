import React from "react";

const BoxCard = ({ slide }) => {
  return (
    <>
      <div className="dvBoxCard">
        {slide && (
          <a className="card bg-transparent border-0 position-relative">
            <img src={slide.url} className="card-img" alt="..." />
            <div className="position-absolute top-50 start-0 translate-middle-y p-3">
              <h2 className="h2 heading-semibold mb-1">{slide.offer}</h2>
              <p className="card-text text-black text-capitalize">
                {slide.title}
              </p>
            </div>
          </a>
        )}
      </div>
    </>
  );
};

export default BoxCard;
