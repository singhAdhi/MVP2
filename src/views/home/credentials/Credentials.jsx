import React, { useEffect, useState } from "react";
import "./credentials.css";
import BtnSecondary from "../../../components/global/buttons/btn-secondary/BtnSecondary";
import BtnTransparent from "../../../components/global/buttons/btn-transparent/BtnTransparent";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";

const Credentials = () => {
  const credentialsData = {
    title: "Discover, Earn, & Redeem Rewards",
  };
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (Object.keys(credentialsData).length > 0) {
        setData(credentialsData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    }, 1000);

    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return <Loading loadingText="Credentials" />;
  }

  if (isError) {
    return <Error errorText="Credentials not found" />;
  }

  return (
    <>
      <div className="dvCredentials text-center">
        <div className="container-xl">
          <h2 className="h5 heading-semibold text-white mb-2">{data.title}</h2>
          <div className="row">
            <div className="col-12">
              <div className="bg-white shadow-sm b-radius p-3">
                <div className="dvLoginBtn">
                  <BtnSecondary className="mb-1 w-50" type="button">
                    login
                  </BtnSecondary>
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="heading-regular">Not a Member?</p>
                    <BtnTransparent className="p-0 ps-3">
                      Sign Up Now
                    </BtnTransparent>
                  </div>
                </div>
                <div className="dvLoginInfo d-none">
                  <p className="heading-regular">
                    <span className="text-blue">Hello!</span>
                    <span className="text-blue">Jhon Right</span>
                  </p>
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="heading-regular">
                      Membership: <u>Gold</u>
                    </p>
                    <p className="mx-2">|</p>
                    <p className="heading-regular">
                      Balance: <u>65,150 Pts</u>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Credentials;
