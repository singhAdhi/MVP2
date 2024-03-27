import React from "react";

const BtnSecondary = ({ children, className, ...attributes }) => {
  return (
    <>
      <button className={`btn btn-secondary ${className}`} {...attributes}>
        {children}
      </button>
    </>
  );
};

export default BtnSecondary;
