import React, { useState, useEffect } from "react";
import "./managebills.css";
import Heading from "../../../components/global/heading/Heading";
import Loading from "../../../components/global/loading/Loading";
import Error from "../../../components/global/error/Error";
import IconHeading from "../../../components/global/icon-heading/IconHeading";

const ManageBills = () => {
  const billOptions = [
    {
      id: 1,
      imgUrl: "/src/assets/images/icons/home/manage-bills/mobile.svg",
      title: "Recharge Prepaid Mobile",
    },
    {
      id: 2,
      imgUrl: "/src/assets/images/icons/home/manage-bills/electricity.svg",
      title: "Pay Electricity Bill",
    },
    {
      id: 3,
      imgUrl: "/src/assets/images/icons/home/manage-bills/dtc.svg",
      title: "Recharge DTC Connection",
    },
    {
      id: 4,
      imgUrl: "/src/assets/images/icons/home/manage-bills/gas.svg",
      title: "Pay Gas Bills",
    },
    {
      id: 5,
      imgUrl: "/src/assets/images/icons/home/manage-bills/broadband.svg",
      title: "Pay Broadband & Landline Bill",
    },
    {
      id: 6,
      imgUrl: "/src/assets/images/icons/home/manage-bills/payment-services.svg",
      title: "All Payment Services",
    },
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (billOptions.length > 0) {
        setData(billOptions);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    }, 1000);

    // Clean up function to clear timeout
    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return <Loading loadingText="Managing Your Bills: Easy Payments" />;
  }

  if (isError) {
    return <Error errorText="Managing Your Bills: Easy Payments not found" />;
  }

  return (
    <>
      <Heading headingText="Managing Your Bills: Easy Payments" show="no" />
      <div className="dvManageBills row">
        <div className="col-12">
          <div className="bg-white b-radius px-3 pt-3">
            <div className="row">
              {data &&
                data.map((item) => {
                  const { id, imgUrl, title } = item;
                  return (
                    <div
                      key={id}
                      className="col-4 col-lg-2 text-center mb-3 px-1"
                    >
                      <IconHeading
                        imgUrl={imgUrl}
                        title={title}
                        css={{
                          height: "50px",
                          bgColour: "bg-lightblue",
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBills;
