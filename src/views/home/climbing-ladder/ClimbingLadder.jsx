import React, { useState, useEffect } from "react";
import "./climbingladder.css";
import Heading from "../../../components/global/heading/Heading";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";

const ClimbingLadder = () => {
  const title = {
    title: "sliver",
  };
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (Object.keys(title).length > 0) {
        setData(title);
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
    return <Loading loadingText="Climbing the ladder" />;
  }

  if (isError) {
    return <Error errorText="Climbing the ladder not found" />;
  }

  return (
    <>
      <Heading headingText="climbing the ladder" show="no" />
      <div className="row">
        <div className="col-12">
          <div className="dvLadder bg-white b-radius p-3">
            <div className="row">
              <div className="col-12 col-xl-8 offset-xl-2">
                <div className="row justify-content-between position-relative mx-0">
                  <div className="col-auto ps-0">
                    <div className="bg-lightblue rounded-circle d-flex align-items-center justify-content-center position-relative z-1">
                      {title.title}
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="bg-blue text-white rounded-circle d-flex align-items-center justify-content-center position-relative z-1">
                      Gold
                    </div>
                  </div>
                  <div className="col-auto d-flex justify-content-end pe-0">
                    <div className="bg-darkblue text-white rounded-circle d-flex align-items-center justify-content-center position-relative z-1">
                      Platinum
                    </div>
                  </div>
                  <div className="dvProgress position-absolute top-50 start-50 translate-middle z-0 w-100">
                    <div className="progress" role="progressbar">
                      <div className="progress-bar bg-darkblue b-radius w-75"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 text-center">
                <p className="text-black">
                  Upgrade to Platinum with
                  <strong>15,000</strong> more points!
                </p>
                <a href="" className="text-decoration-underline text-black">
                  See Your Upcoming Benefits!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClimbingLadder;
