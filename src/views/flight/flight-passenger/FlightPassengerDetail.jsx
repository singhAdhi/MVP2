import React, { useEffect, useState } from "react";
import DepartureDetail from "./DepartureDetail";
import ArrivalDetail from "./ArrivalDetail";

const FlightPassengerDetail = (flightData) => {
  const { Type, ListOfFlightDetails } = flightData?.flightData[0];
  const DepartureData = ListOfFlightDetails[0];
  const ArrivalData = ListOfFlightDetails[1];

  return (
    <div>
      <div class="fDetails">
        {Type === "Return" ? (
          <>
            <DepartureDetail departure={DepartureData} />
            <ArrivalDetail arrival={ArrivalData} />
          </>
        ) : (
          <>
            <DepartureDetail departure={DepartureData} />
          </>
        )}
      </div>
    </div>
  );
};

export default FlightPassengerDetail;
