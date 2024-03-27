import { useState } from "react";
import FlightCardTable from "./FlightCardTable";
import FlightDetails from "./FlightDetails";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFlightValues } from "../../../redux/features/flight/index";

const FlightListCard = ({ travellerData, ...props }) => {
  console.log(travellerData);
  const [isShow, setisShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let TotalPoints = props.FareDetails.TotalPoints;
  let isReturn = props.Type == "Return" ? true : false;
  let depart = props.ListOfFlightDetails[0];
  let arrival = props.ListOfFlightDetails[1];
  let { CarrierName, CarrierLogoPath } =
    props.ListOfFlightDetails[0].ListOfFlightSegments[0].Carrier;

  const passengerDetail = () => {
    const Adults = travellerData?.Adults;
    const Childrens = travellerData?.Childrens;
    const Infants = travellerData?.Infants;
    navigate(`/flightpassenger/${Adults}/${Childrens}/${Infants}`);
    dispatch(addFlightValues(props));
  };

  return (
    <>
      <div className="dvFlightInfo col-12 col-md-6 col-lg-12 mb-4 bg-white p-3">
        <button className="btn p-0 w-100" onClick={passengerDetail}>
          <div className="dvInfo row">
            <div className="col-12">
              {props.ListOfFlightDetails &&
                props.ListOfFlightDetails.map((item, idx) => {
                  return (
                    <div key={idx} className="">
                      {item.ListOfFlightSegments &&
                        item.ListOfFlightSegments.map((x) => (
                          <>
                            <FlightCardTable key={x.FlightNo} {...x} />
                            <div className="card-table my-3"></div>
                          </>
                        ))}
                    </div>
                  );
                })}
            </div>
          </div>
        </button>
        <div className="dvSeeDetails row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <button
              className="heading-xs-medium arrowBtn col-auto d-flex"
              type="button"
              onClick={() => setisShow(!isShow)}
            >
              <span className="d-inline-block flightDetail-text">
                {isShow ? "Hide Details" : "Flight Details"}
              </span>
            </button>
            <h2 className="heading-md-medium points-text">Pts {TotalPoints}</h2>
          </div>
          {isShow && (
            <div className="col-12">
              {depart && (
                <FlightDetails TravelType={"Departure"} data={depart} />
              )}
              {isReturn && arrival && (
                <FlightDetails TravelType={"Return"} data={arrival} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default FlightListCard;
