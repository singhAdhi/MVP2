import React, { useEffect, useState } from "react";
import "./PaymentSplit.css";
import ProgressBar from "./ProgressBar";
import BtnPrimary from "../../../components/global/buttons/btn-primary/BtnPrimary";
import { useNavigate } from "react-router";

const PaymentSplit = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    overflow();
  }, []);
  const overflow = () => {
    if (value >= 100) {
      setValue(100);
    }
  };
  const handleSubmit = () => {
    navigate("/FlightTicket");
  };
  return (
    <div className="container-lg mb-5">
      <div className="row mx-1">
        <div className="bg-white col-12 mt-4 points px-4 py-4">
          <div className="d-flex mb-4 justify-content-between">
            <p className="pts-avl">Points Available</p>
            <p className="actual-pts">65,150 Pts</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="pts-avl-grey">Air Ticket Value</p>
            <p className="actual-pts-grey">12,000 Pts</p>
          </div>
        </div>
        <p className="text-payment my-4">
          Please Note: Deducted Points or Money Amount may vary upon final
          checkout.
        </p>
        <div className="bg-white col-12 points px-4 py-4 d-flex justify-content-center align-items-center">
          <ProgressBar percentage={value} />
        </div>
        <div className="my-3">
          <form className="d-flex gap-4">
            <div className="col-md-4 mb-3">
              <label htmlFor={`Points`} className="form-label">
                Points
              </label>
              <input
                type="text"
                className="form-control bg-input"
                id={`Points`}
                name={`Points`}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor={`lastName`} className="form-label">
                Money (USD)
              </label>
              <input
                className="form-control bg-input"
                type="text"
                value={value}
                name="progress"
                id="progress"
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </form>
          <p className="text-payment my-4">
            Please Note: Deducted Points or Money Amount may vary upon final
            checkout.
          </p>
          <div className="d-flex justify-content-center">
            <BtnPrimary
              children={"CONTINUE"}
              className="my-3"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSplit;
