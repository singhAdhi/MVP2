import React from "react";
import "./BookingDetail.css";
const FlightBookingDetail = () => {
  return (
    <div className="align-items-center d-flex justify-content-center">
      <div className="bg-Subtract p-3">
        <div className="top">
          <img src="/src/assets/images/icons/flight/qr.svg" alt="" />
        </div>
        <div className="mid flex-column">
          <div class="dvModify col-12 my-3">
            <div class=" d-flex flex-wrap justify-content-between align-items-center p-4 px-lg-3 mb-1 rounded-2">
              <div class="from-div">
                <p class="flightlist-heading px-0">From</p>
                <p class="heading-flight px-0 mt-1">
                  JFK<span class="d-block">NY, USA</span>
                </p>
              </div>
              <div class="img-div d-flex">
                <img
                  src="/src/assets/images/icons/flight/planeIcon.svg"
                  alt=""
                  class="w-100 mt-3"
                />
              </div>
              <div class="to-div">
                <p class="flightlist-heading px-0">To</p>
                <p class="heading-flight px-0 mt-1">
                  DAC<span class="d-block">Dhaka, BD</span>
                </p>
              </div>
            </div>
          </div>
          <img src="/src/assets/images/icons/flight/flight.png" alt="" />
        </div>
        <div className="lower">
          <div className="d-flex info justify-content-between w-100 mx-3">
            <div className="left">
              <div className="left-info mb-4">
                <p className="form-label mb-2">Amount Paid</p>
                <p className="text-ans">$261.89</p>
              </div>
              <div className="left-info mb-4">
                <p className="form-label mb-2">Amount Paid</p>
                <p className="text-ans">$261.89</p>
              </div>
              <div className="left-info mb-4">
                <p className="form-label mb-2">Amount Paid</p>
                <p className="text-ans">$261.89</p>
              </div>
              <div className="left-info mb-4">
                <p className="form-label mb-2">Amount Paid</p>
                <p className="text-ans">$261.89</p>
              </div>
              <div className="left-info mb-4">
                <p className="form-label mb-2">Amount Paid</p>
                <p className="text-ans">$261.89</p>
              </div>
            </div>
            <div className="right">
              <div className="right-info mb-4">
                <p className="form-label mb-2">source</p>
                <p className="text-ans">Terminal 4 </p>
              </div>
              <div className="right-info mb-4">
                <p className="form-label mb-2">source</p>
                <p className="text-ans">VISA </p>
              </div>
              <div className="right-info mb-4">
                <p className="form-label mb-2">source</p>
                <p className="text-ans">VISA </p>
              </div>
              <div className="right-info mb-4">
                <p className="form-label mb-2">source</p>
                <p className="text-ans">VISA </p>
              </div>
              <div className="right-info mb-4">
                <p className="form-label mb-2">source</p>
                <p className="text-ans">VISA </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingDetail;
