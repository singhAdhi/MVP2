import React from "react";

const SkeletonImg = ({ height }) => {
  return (
    <div>
      <p class="placeholder-glow">
        <span
          class="placeholder col-12"
          style={{ height: `${height}`, borderRadius: "24px" }}
        ></span>
      </p>
    </div>
  );
};

export default SkeletonImg;
