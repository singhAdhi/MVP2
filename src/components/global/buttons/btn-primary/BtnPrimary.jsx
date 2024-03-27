import React from "react";

const BtnPrimary = ({ children, className, ...attributes }) => {
  return (
    <>
      <button className={`btn btn-primary ${className}`} {...attributes}>
        {children}
      </button>
    </>
  );
};

export default BtnPrimary;
