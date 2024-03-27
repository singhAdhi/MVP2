import React from "react";
import "../heading.css";

const HeadingLight = ({ headingText }) => {
  return (
    <>
      <h2 className="h6 heading-light text-capitalize">{headingText}</h2>
    </>
  );
};

export default HeadingLight;
