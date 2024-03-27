import React from "react";
import "./iconheading.css";

const IconHeading = ({ imgUrl, title, css }) => {
  const { height, bgColour } = css;

  return (
    <>
      <div className="dvIconHeading d-flex flex-column justify-content-center align-items-center">
        <div
          className={`${bgColour} rounded-circle d-flex align-items-center justify-content-center mb-1`}
          style={{ height: `${height}` }}
        >
          <img src={imgUrl} alt="" />
        </div>
        <p className="h7 heading-regular">{title}</p>
      </div>
    </>
  );
};

export default IconHeading;
