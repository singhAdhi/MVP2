import React from "react";
import "./categorycard.css";

const CategoryCard = ({ slide, onClick }) => {
  return (
    <>
      <div className="dvCategoryCard" onClick={onClick}>
        {slide && (
          <a
            className={`${slide.bgColour} b-radius p-3 d-flex flex-column justify-content-center align-items-center`}
          >
            <img
              src={slide.PrimaryImage && slide.PrimaryImage.Url}
              className="img-fluid"
              alt="..."
            />
            <h2
              className={`h6 heading-semibold text-capitalize ${
                slide.bgColour === "bg-lightblue" ? "text-black" : "text-white"
              } mt-1`}
            >
              {slide.Name}
            </h2>
          </a>
        )}
      </div>
    </>
  );
};

export default CategoryCard;
