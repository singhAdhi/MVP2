import React from "react";

const Error = ({ errorText }) => {
  return (
    <>
      <div className="alert alert-danger text-center my-3" role="alert">
        <h2 className="h2 heading-semibold text-capitalize text-danger">
          {errorText}
        </h2>
      </div>
    </>
  );
};

export default Error;
