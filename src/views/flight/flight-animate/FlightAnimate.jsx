import React, { useEffect } from "react";
import "./animate.css";
import PaymentSplit from "../flight-paymentSplit/PaymentSplit";
import { useNavigate } from "react-router";

const FlightAnimate = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const delayDuration = 3000;
    const timerId = setTimeout(() => {
      navigate("/PaymentSplit");
    }, delayDuration);
    return () => clearTimeout(timerId);
  }, []);
  return (
    <div className="cloud">
      <div className="cloud-bg"></div>
      <div className="bg-border"></div>
    </div>
  );
};

export default FlightAnimate;
