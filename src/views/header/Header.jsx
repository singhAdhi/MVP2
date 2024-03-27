import React, { useEffect, useState } from "react";
import "./header.css";
import { FaMagnifyingGlass, FaXmark, FaAngleLeft } from "react-icons/fa6";
import BtnPrimary from "../../components/global/buttons/btn-primary/BtnPrimary";
import BtnClose from "../../components/global/buttons/btn-close/BtnClose";
import Loading from "../../components/global/loading/Loading";
import Error from "../../components/global/error/Error";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(null);
  const [scroll, setScroll] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const category = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(category);
  const isShopListPage = location.pathname === "/shoplist/trendingproducts";
  const isHomePage = location.pathname === "/";
  const isShopPage = location.pathname === "/shop";

  //temporary get propertyName from trendingproducts data array
  // console.log(location.state);
  const stateKeys = location.state ? Object.keys(location.state) : [];
  // console.log(stateKeys);
  let propertyName = null;
  if (stateKeys.length > 0) {
    propertyName = stateKeys[0];
  }
  // console.log(propertyName);

  const navlinks = [
    {
      id: 1,
      title: "Profile",
      imgUrl: "/src/assets/images/icons/home/mobile-nav/profile.svg",
    },
    {
      id: 2,
      title: "Dashboard",
      imgUrl: "/src/assets/images/icons/home/mobile-nav/dashboard.svg",
    },
    {
      id: 3,
      title: "My Order",
      imgUrl: "/src/assets/images/icons/home/mobile-nav/my-order.svg",
    },
    {
      id: 4,
      title: "About Us",
      imgUrl: "/src/assets/images/icons/home/mobile-nav/about-us.svg",
    },
    {
      id: 5,
      title: "Earn",
      imgUrl: "/src/assets/images/icons/home/mobile-nav/earn.svg",
    },
    {
      id: 6,
      title: "Redeem",
      imgUrl: "/src/assets/images/icons/home/mobile-nav/redeem.svg",
    },
    {
      id: 7,
      title: "FAQs",
      imgUrl: "/src/assets/images/icons/home/mobile-nav/faq.svg",
    },
    {
      id: 8,
      title: "Terms & Conditions",
      imgUrl: "/src/assets/images/icons/home/mobile-nav/terms-conditions.svg",
    },
    {
      id: 9,
      title: "Booking Policy",
      imgUrl: "/src/assets/images/icons/home/mobile-nav/booking-policy.svg",
    },
    {
      id: 10,
      title: "Privacy Policy",
      imgUrl: "/src/assets/images/icons/home/mobile-nav/privacy-policy.svg",
    },
  ];

  //handle onscroll nav
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 10);
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scroll]);

  //handle local state for loading
  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     if (navlinks.length > 0) {
  //       setData(navlinks);
  //       setIsLoading(false);
  //     } else {
  //       setIsError(true);
  //       setIsLoading(false);
  //     }
  //   }, 1000);

  //   // Clean up function to clear timeout
  //   return () => clearTimeout(delay);
  // }, []);

  // Apply backdrop blur class when the mobile  menu is opened
  useEffect(() => {
    if (isMenuOpen) {
      const backdrop = document.querySelector(".offcanvas-backdrop");
      if (backdrop) {
        backdrop.classList.add("bg-blur-black");
      }
    }
  }, [isMenuOpen]);

  const handleBackButtonClick = () => {
    // Go back to the shop page
    navigate(-1);
  };

  // if (isLoading) {
  //   return <Loading loadingText="header" />;
  // }

  // if (isError) {
  //   return <Error errorText="header not found" />;
  // }

  return (
    <>
      <div
        className={
          isHomePage || isShopPage
            ? `dvHeader fixed-top ${
                scroll ? "bg-lightblue shadow-sm" : "bg-transparent"
              }`
            : `dvHeader sticky-top bg-white`
        }
      >
        <nav className="navbar navbar-expand-lg bg-transparent py-0">
          <div
            className={
              Object.keys(category).length > 0 || isShopListPage
                ? `container-xl justify-content-start align-items-center`
                : `container-xl`
            }
          >
            {Object.keys(category).length > 0 || isShopListPage ? (
              <BtnPrimary
                className="dvToggleBtn d-lg-none"
                type="button"
                onClick={handleBackButtonClick}
              >
                <FaAngleLeft className="text-darkblue" />
              </BtnPrimary>
            ) : (
              <BtnPrimary
                className="dvToggleBtn d-lg-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img
                  src="/src/assets/images/icons/home/mobile-nav/bar.svg"
                  alt=""
                />
              </BtnPrimary>
            )}

            {Object.keys(category).length > 0 ||
            (isShopListPage && propertyName) ? (
              <p className="text-capitalize text-darkblue heading-semibold ms-3">
                {category.category || propertyName}
              </p>
            ) : (
              <Link to="/" className="dvLogo order-lg-0">
                <img src="/src/assets/images/giift-rewards-logo.svg" alt="" />
              </Link>
            )}

            <BtnPrimary
              className="dvSearchBtn order-lg-2 bg-transparent border-0"
              type="button"
            >
              {/* <FaMagnifyingGlass /> */}
            </BtnPrimary>
            <div
              className="dvSlideMenu offcanvas offcanvas-start w-75 order-lg-1"
              tabIndex="-1"
              id="offcanvasNavbar1"
            >
              <div className="offcanvas-header justify-content-start align-items-center">
                <div className="dvUserIcon">
                  <img
                    src="/src/assets/images/icons/home/mobile-nav/user.svg"
                    alt=""
                  />
                </div>
                <div className="dvUserName ms-3">
                  <h2 className="h5 heading-bold">John Right</h2>
                </div>
                <BtnClose
                  type="button"
                  className="position-absolute top-0 end-0 d-flex align-items-center justify-content-center rounded-circle"
                  data-bs-dismiss="offcanvas"
                >
                  <FaXmark className="text-white" />
                </BtnClose>
              </div>
              <div className="offcanvas-body pt-0 justify-content-lg-end">
                <ul className="navbar-nav justify-content-end justify-content-lg-start justify-content-xxl-end flex-grow-1 flex-lg-grow-0 overflow-x-auto col-lg-11">
                  {navlinks &&
                    navlinks.map((item) => {
                      const { id, imgUrl, title } = item;
                      return (
                        <li className="nav-item col-auto" key={id}>
                          <a
                            className="nav-link d-flex align-items-center"
                            href="#"
                          >
                            <div className="icon p-2 d-lg-none">
                              <img src={imgUrl} alt="" className="d-block" />
                            </div>
                            <div className="d-inline-block ps-2">{title}</div>
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
