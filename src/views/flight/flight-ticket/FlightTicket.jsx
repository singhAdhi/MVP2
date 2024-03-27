import React from "react";
import "./FlightTicket.css";
import BtnPrimary from "../../../components/global/buttons/btn-primary/BtnPrimary";
import BtnSecondary from "../../../components/global/buttons/btn-secondary/BtnSecondary";
import { useNavigate } from "react-router-dom";

const FlightTicket = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/FlightBookingDetail");
  };
  return (
    <div>
      <div className="blur-bg d-flex justify-content-center align-items-center">
        <div className="ticket d-flex justify-content-center align-items-center flex-column py-4 px-3 m-3 points">
          <img
            src="/src/assets/images/icons/flight/tick.svg"
            alt=""
            className="mt-3"
          />
          <p className="thanks-text mt-3">Thank You</p>
          <p className="my-3 payment-sucess">
            Your payment is successful.
            <p className=" payment-sucess"> Transaction ID: 202564898496</p>
          </p>

          <div className="d-flex info justify-content-between w-100">
            <div className="left-info">
              <p className="form-label mb-2">Amount Paid</p>
              <p>$261.89</p>
              <p>6,000 Pts</p>
            </div>
            <div className="right-info text-end">
              <p className="form-label mb-2">source</p>
              <p>VISA </p>
              <p>GiiftRewards</p>
            </div>
          </div>
          <div className="my-4">
            <BtnSecondary
              children={"View Ticket"}
              className="me-4"
              onClick={handleClick}
            />
            <BtnPrimary
              children={"CONTINUE"}
              onClick={() => navigate("/flights")}
            />
          </div>
          <p className="para-ticket text-start">
            Note: An email with full booking information has been sent to the
            email address you have registered with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightTicket;
