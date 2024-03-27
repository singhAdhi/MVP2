import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const FlightSearchWait = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const {
    OriginLocation,
    DestinationLocation,
    IsReturn,
    travelClass,
    DepartureDate,
    ReturnDate,
    Adults,
    Childrens,
    Infants,
  } = data;
  return (
    <div className="container d-flex justify-content-center align-items-center flex-column searchwait">
      <div className="px-0 px-lg-3 mt-n2">
        <Link to="/">
          <img src="/assets/images/logos/siddhartha-logo.svg" alt="" />
        </Link>
      </div>
      <div>
        <p>Please wait while we search for best available rates...</p>
      </div>
      <div className="d-flex flex-wrap my-3">
        <span className="fw-bolder fs-5">
          {OriginLocation} <span className="mx-1">to</span>
        </span>
        <span className="me-2 fw-bolder fs-5">{DestinationLocation},</span>
        <span className="me-2 fw-bolder fs-5">
          {IsReturn ? "Round Trip" : "One Way"},
        </span>
        <span className="me-2 fw-bolder fs-5">{`${travelClass}, `}</span>
        <span className="me-2 fw-bolder fs-5">{DepartureDate} -</span>
        <span className="me-2 fw-bolder fs-5">{ReturnDate},</span>
        <span className="me-2 fw-bolder fs-5">{`${Adults} Adults, `}</span>
        <span className="me-2 fw-bolder fs-5">{`${Childrens} Childrens, `}</span>
        <span className="fw-bolder fs-5">{`${Infants} Infants`}</span>
      </div>
      <div class="text-center mt-3">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchWait;
