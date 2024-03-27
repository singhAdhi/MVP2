import React, { useEffect, useState } from "react";
import "./header.css";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import BtnPrimary from "../../components/global/buttons/btn-primary/BtnPrimary";
import BtnClose from "../../components/global/buttons/btn-close/BtnClose";
import Loading from "../../components/global/loading/Loading";
import Error from "../../components/global/error/Error";
import { useSelector, useDispatch } from "react-redux";
import { fetchHeader } from "../../redux/features/header/headerSlice";

const Header = () => {
  //window scroll state
  const [scroll, setScroll] = useState(0);

  //dispatch hook
  const dispatch = useDispatch();

  //state hook
  const { data, isLoading, isError, errorText } = useSelector((state) => state.headerReducer);
  // console.log(data, isLoading, isError, errorText);

  //handle api call
  useEffect(() => {
    dispatch(fetchHeader());
  }, []);

  //handle onscroll nav
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 10);
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scroll]);

  if (isLoading) {
    return <Loading loadingText="Header" />;
  }

  if (isError) {
    return <Error errorText={errorText} />;
  }

  return (
    <>
      <div
        className={`dvHeader sticky-top ${scroll ? "bg-lightblue shadow-sm" : "bg-transparent"}`}
      >
        <nav className="navbar navbar-expand-lg bg-transparent pb-0 pb-lg-2">
          <div className="container-xl">
            <BtnPrimary
              className="dvToggleBtn btn btn-primary d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar1"
            >
              <img src="/src/assets/images/icons/home/mobile-nav/bar.svg" alt="" />
            </BtnPrimary>
            <a className="dvLogo order-lg-0" href="#">
              <img src="/src/assets/images/giift-rewards-logo.svg" alt="" />
            </a>
            <BtnPrimary className="dvSearchBtn order-lg-2 bg-transparent border-0" type="button">
              <FaMagnifyingGlass />
            </BtnPrimary>
            <div
              className="dvSlideMenu offcanvas offcanvas-start w-75 order-lg-1"
              tabIndex="-1"
              id="offcanvasNavbar1"
            >
              <div className="offcanvas-header justify-content-start align-items-center">
                <div className="dvUserIcon">
                  <img src="/src/assets/images/icons/home/mobile-nav/user.svg" alt="" />
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
                  {data &&
                    data.map((item) => {
                      const { id, imgUrl, title } = item;
                      return (
                        <li className="nav-item col-auto" key={id}>
                          <a className="nav-link d-flex align-items-center" href="#">
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
