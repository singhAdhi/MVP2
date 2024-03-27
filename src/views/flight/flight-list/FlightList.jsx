import React, { useEffect, useState } from "react";
import "./flightlist.css";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { flightApi } from "../../../api/services";
// import FlightSearchForm from "../../../components/flightSearchForm/FlightSearchForm";
import FlightListCard from "./FlightListCard";
import FlightFilter from "./FlightFilter";
import FlightSearchWait from "./FlightSearchWait";

const FlightList = () => {
  const [flightResult, setflightResult] = useState(null);
  const [isBookingForm, setisBookingForm] = useState(false);
  const paramsData = useParams();

  const [bookingFormDefaultValues, setbookingFormDefaultValues] =
    useState(null);
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    let defaultVal = paramsData;
    setTimeout(() => {
      setShowSearch(false);
    }, 1000);
    setbookingFormDefaultValues({
      ...defaultVal,
      DepartureDate: new Date(defaultVal.DepartureDate),
      ReturnDate: new Date(defaultVal.ReturnDate),
    });
    getFlightList();
  }, []);

  const getFlightList = async (data = paramsData) => {
    try {
      let body = {
        Adults: 1, //Mandatory, no. of adult passengers
        Childrens: 0, //Mandatory, no. of child passenger(below the age of 12 years)
        Infants: 0, //Mandatory, no. of infant passengers(below the age of 2 years)
        AirlinePrefCode: data.AirlinePrefCode, //Mandatory, Possible values - Carrier Code from the GetAllCarriers api response e.g - GF, AI etc, otherwise put "Any" for all airlines
        Cabin: data.travelClass, //Mandatory, possible values - Economy, Business, First
        DepartureDate: data.DepartureDate, //Mandatory, Departure date in yyyy-mm-dd formate
        ReturnDate: data.ReturnDate, //Mandatory(In case of return Journey), Return date in yyyy-mm-dd format
        OriginLocation: data.OriginLocation, //Mandatory , Origin Air Field IATA Code from the GetAllAirFields api response
        DestinationLocation: data.DestinationLocation, //Mandatory, Destination Air Field IATA Code from the GetAllAirFields api response
        IPAddress: "1", //Mandatory, IP address of the client, otherwise put 1
        IsReturn: true, //Mandatory. true if return journey, false if oneway journey
        MemberId: "313545", //Mandatory in case member logged in, put a unique identifier
        ResultCount: "10", //Optional, no. of search results required in the response
        PointRate: 1, //Mandatory, to be provided by Giift
      };
      // let url = `https://ibeapi.giift.com/IBENEW/api/Hotel/GetHotelSearchResponse`;

      let url = "src/dummyApiData/flight/AirSearchRequest_DATA.json";
      flightApi
        .get(url)
        .then(({ data: { AirSearchRequest_DATA } }) => {
          setflightResult(AirSearchRequest_DATA.results.ItineraryDetailsList);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // setisloading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (value) => {
    await getFlightList(value);
    setisBookingForm(false);
    setbookingFormDefaultValues({
      ...value,
      DepartureDate: new Date(value.DepartureDate),
      ReturnDate: new Date(value.ReturnDate),
    });
  };

  return (
    <>
      {showSearch ? (
        <FlightSearchWait data={paramsData} />
      ) : (
        <div className="dvMain">
          <div className="dvFlightList dvProductList pb-5">
            <div className="container-lg">
              <div className="row">
                <div
                  class="offcanvas offcanvas-bottom"
                  tabindex="-1"
                  id="offcanvasBottom"
                  aria-labelledby="offcanvasBottomLabel"
                >
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasBottomLabel">
                      Filter
                    </h5>
                    <button
                      type="button"
                      class="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="offcanvas-body small">
                    <FlightFilter />
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row">
                    <div className="dvModify col-12 my-3">
                      <div className="bg-white d-flex flex-wrap justify-content-between align-items-center p-4 px-lg-3 mb-1">
                        <div className="from-div">
                          <p className="flightlist-heading px-0">From</p>
                          <p className="heading-flight px-0 mt-1">
                            JFK
                            <span className="d-block">NY, USA</span>
                          </p>
                        </div>
                        <div class="img-div d-flex">
                          <img
                            src="/src/assets/images/icons/flight/planeIcon.svg"
                            alt=""
                            class="w-100 mt-3"
                          />
                        </div>
                        <div className="to-div">
                          <p className="flightlist-heading px-0">To</p>
                          <p className="heading-flight px-0 mt-1">
                            DAC
                            <span className="d-block">Dhaka, BD</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {isBookingForm && (
                      <FlightSearchForm
                        defaultValues={bookingFormDefaultValues}
                        handleSearch={handleSearch}
                      />
                    )}
                    <div className="d-flex justify-content-between">
                      <div className="total-product">
                        <p className="p-3">
                          Total Hotels Found: <span>10</span>
                        </p>
                      </div>
                      <div className="filter">
                        <button
                          class="btn"
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasBottom"
                          aria-controls="offcanvasBottom"
                        >
                          <img
                            src="/src/assets/images/icons/flight/filter.svg"
                            alt=""
                            className="filter-img"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="dvProducts col-12">
                      <div className="row equal-col">
                        {flightResult &&
                          flightResult.map((item) => (
                            <div key={item.FareKey}>
                              <FlightListCard
                                {...item}
                                travellerData={paramsData}
                              />
                            </div>
                          ))}
                        <div className="col-12 text-center">
                          <button className="btn btn-primary">
                            Show More Flights
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightList;
