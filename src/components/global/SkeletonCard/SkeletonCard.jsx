import React from "react";
import SkeletonImg from "../SkeletonImg/SkeletonImg";

const SkeletonCard = () => {
  return (
    <div>
      <div class="card w-100" aria-hidden="true">
        <SkeletonImg height={"100px"} />
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
