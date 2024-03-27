import React from "react";

const Loading = ({ loadingText }) => {
  return (
    <>
      <div className="text-center my-3">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="h2 heading-semibold text-capitalize">
          Loading {loadingText}
        </h2>
      </div>
    </>
  );
};

export default Loading;
