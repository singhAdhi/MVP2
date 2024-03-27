import React from "react";
import "./pagenotfound.css";
import { Link } from "react-router-dom";
import BtnPrimary from "../buttons/btn-primary/BtnPrimary";

const PageNotFound = () => {
  return (
    <>
      <div
        className="dvPageNotFound text-center"
        style={{ paddingTop: "10rem" }}
      >
        <h2 className="h2 heading-semibold text-capitalize m-auto">
          PageNotFound
        </h2>
        <Link to="/" className="btn btn-primary text-capitalize mt-2 mx-1">
          Back to Home
        </Link>
        <Link to="/shop" className="btn btn-primary text-capitalize mt-2 mx-1">
          Back to Shop
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
