import React from "react";

const BtnTransparent = ({ children, className, ...attributes }) => {
  return (
    <>
      <button className={`btn ${className}`} {...attributes}>
        {children}
      </button>
    </>
  );
};

export default BtnTransparent;
