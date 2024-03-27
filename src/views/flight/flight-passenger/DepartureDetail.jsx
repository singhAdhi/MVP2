import React from "react";

const DepartureDetail = (departure) => {
  const { ListOfFlightSegments } = departure?.departure;
  console.log(ListOfFlightSegments);
  return (
    <div>
      {ListOfFlightSegments?.map((item, i) => {
        let {
          DisplayDepartureDate,
          DisplayDepartureTime,
          DepartureAirField,
          TotalDurationHrs,
          TotalDurationMins,
          DisplayArrivalDate,
          DisplayArrivalTime,
          ArrivalAirField,
          OperatingCarrier,
        } = item;
        return (
          <div key={i}>
            <strong
              class="mb-2 txt-depart-flight"
              data-i18n="flightpassenger-departure"
            >
              Departure Flight
            </strong>
            <div class="row mb-3 mt-3">
              <div class="col-md-2 col-12">
                <img
                  class="img-fluid"
                  src="https://ibe.infiplanets.com/Images/AirlinesLogo/EtihadAirwayslogo.png"
                />
              </div>
              <div class="col-md-3 col-4">
                <p>
                  {DepartureAirField?.City} {DepartureAirField?.IATACode}
                </p>
                <p>{DisplayDepartureTime} AM</p>
                <p>{DisplayDepartureDate}</p>
              </div>
              <div class="col-md-3 col-4 text-blk">
                <i class="fa fa-clock-o"></i>
                {TotalDurationHrs} hr {TotalDurationMins} m
              </div>
              <div class="col-md-3 col-4">
                <p>
                  {ArrivalAirField?.City} {ArrivalAirField?.IATACode}
                </p>
                <p>{DisplayArrivalTime} AM</p>
                <p>{DisplayArrivalDate}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DepartureDetail;
