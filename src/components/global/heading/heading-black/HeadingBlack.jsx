import React from "react";
import "../heading.css";

const HeadingBlack = ({ headingText }) => {
  return (
    <>
      <h2 className="h6 heading-black text-capitalize">{headingText}</h2>
    </>
  );
};

export default HeadingBlack;
