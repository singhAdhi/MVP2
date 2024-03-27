import React from "react";
import { Circle } from "rc-progress";

const ProgressBar = ({ percentage = 0 }) => {
  return (
    <div className="position-relative">
      <Circle
        className="circle"
        percent={percentage}
        strokeWidth={10}
        strokeColor="#035BFF"
        trailWidth={10}
        trailColor="#BDDFFF"
      />
      <div className="percent">{percentage} %</div>
    </div>
  );
};

export default ProgressBar;
