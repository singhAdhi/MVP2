import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="dvFooter fixed-bottom">
        <div className="bg-white shadow b-radius p-3 d-flex justify-content-between align-items-center">
          <a href="">
            <img
              src="/src/assets/images/icons/common/sticky-footer-nav/dashboard.svg"
              alt=""
            />
          </a>
          <a href="">
            <img
              src="/src/assets/images/icons/common/sticky-footer-nav/offers.svg"
              alt=""
            />
          </a>
          <Link to="/">
            <img
              src="/src/assets/images/icons/common/sticky-footer-nav/home-active.svg"
              alt=""
            />
          </Link>
          <a href="">
            <img
              src="/src/assets/images/icons/common/sticky-footer-nav/shop.svg"
              alt=""
            />
          </a>
          <a href="">
            <img
              src="/src/assets/images/icons/common/sticky-footer-nav/profile.svg"
              alt=""
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
