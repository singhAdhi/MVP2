import React from "react";

const BtnLink = ({ children, className, ...attributes }) => {
  return (
    <>
      <button className={`btn btn-link ${className}`} {...attributes}>
        {children}
      </button>
    </>
  );
};

export default BtnLink;
