import React from "react";

const BtnClose = ({ children, className, ...attributes }) => {
  return (
    <>
      <button className={`btn-close ${className}`} {...attributes}>
        {children}
      </button>
    </>
  );
};

export default BtnClose;
