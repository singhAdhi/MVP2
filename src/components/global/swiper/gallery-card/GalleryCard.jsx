import React from "react";
import "./gallerycard.css";

const GalleryCard = ({ slide }) => {
  return (
    <>
      <div className="dvGalleryCard" key={slide.id}>
        <a className="card bg-transparent border-0">
          <img src={slide.imgUrl} className="card-img" alt="..." />
          <div className="bg-blur b-radius position-absolute bottom-0 start-0 end-0 p-3">
            <h2 className="h5 heading-semibold text-white mb-1 text-truncate- text-capitalize">
              {slide.title}
            </h2>
          </div>
        </a>
      </div>
    </>
  );
};

export default GalleryCard;
