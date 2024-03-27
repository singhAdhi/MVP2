import React from "react";
import "./heading.css";
import BtnLink from "../../global/buttons/btn-link/BtnLink";
import HeadingBold from "./heading-bold/HeadingBold";

const Heading = ({ headingText, show, onViewAllClick }) => {
  // console.log(onViewAllClick);
  return (
    <>
      <div className="dvHead row mb-2">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <HeadingBold headingText={headingText} />
          {show !== "no" && (
            <BtnLink className="p-0" onClick={onViewAllClick}>
              View All
            </BtnLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Heading;
