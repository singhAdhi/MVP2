import React from "react";
import "../heading.css";

const HeadingExtraLight = ({ headingText }) => {
  return (
    <>
      <h2 className="h6 heading-extralight text-capitalize">{headingText}</h2>
    </>
  );
};

export default HeadingExtraLight;
