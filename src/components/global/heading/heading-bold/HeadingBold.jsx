import React from "react";
import "../heading.css";

const HeadingBold = ({ headingText }) => {
  return (
    <>
      <h2 className="h6 heading-bold text-capitalize">{headingText}</h2>
    </>
  );
};

export default HeadingBold;
