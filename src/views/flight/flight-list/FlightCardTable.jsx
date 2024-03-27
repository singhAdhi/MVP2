import { useDispatch } from "react-redux";
import { addFlightValues } from "../../../redux/features/flight/index";
import { useEffect } from "react";

const FlightCardTable = (props) => {
  let {
    DisplayDepartureTime,
    DepartureAirField: { City, IATACode },
    TotalDurationHrs,
    TotalDurationMins,
    DisplayArrivalTime,
    ArrivalAirField,
    Carrier: { CarrierLogoPath, CarrierName },
    Stops,
  } = props;

  return (
    <div className="align-items-end d-flex row">
      <div className="col-8">
        <div className="align-items-center d-flex">
          <span className="heading-sm-medium CarrierName">{CarrierName}</span>
          <img src={CarrierLogoPath} alt={CarrierName} className="px-2" />
        </div>
        <div className="d-flex py-1">
          <span className="total-time">{DisplayDepartureTime}</span>
          <span className="total-time px-1">-</span>
          <span className="total-time">{DisplayArrivalTime}</span>
        </div>

        <div className="d-flex align-items-center">
          <div className="text-center">
            <div className="">
              <span className="country">{IATACode}</span>
            </div>
          </div>
          <span className="country px-1">-</span>
          <div className=" text-center">
            <div className="">
              <span className="country">{ArrivalAirField.IATACode}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="align-items-end col-4 d-flex flex-column">
        <div className="mb-2">
          <span className="total-time ">
            {TotalDurationHrs} h {TotalDurationMins} m
          </span>
        </div>
        <div className="stop">
          <span>{Stops} Stop</span>
        </div>
      </div>
    </div>
  );
};
export default FlightCardTable;
