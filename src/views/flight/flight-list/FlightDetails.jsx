const FlightDetails = ({ TravelType, data }) => {
  console.log(data);
  return (
    <div className="dvDeparture row">
      {/* <div className="col-12 bg-white py-2 mb-2">
        <div className="row align-items-center">
          <div className="col-auto col-sm-6">
            <span>
              {`${TravelType}`}{" "}
              <i
                className={`fa ${
                  TravelType == "Departure" ? "fa-arrow-right" : "fa-arrow-left"
                }`}
              ></i>
            </span>
          </div>
        </div>
      </div> */}
      {data &&
        data.ListOfFlightSegments.map((item, idx) => {
          let {
            DisplayDepartureTime,
            DepartureAirField: { City, IATACode, CountryName, AirportName },
            DisplayArrivalTime,
            ArrivalAirField,
            Carrier: { CarrierName, CarrierLogoPath },
            FlightNo,
            BaggageAllowance,
          } = item;
          return (
            <div key={"details" + idx} className="col-12 py-2">
              <div className="row my-3">
                <div className="col-12 col-sm-4 total-time">
                  <span className="me-2">{DisplayDepartureTime}</span>
                  <span className="">{AirportName}</span>
                  <span>-</span>
                  <span className="">{`${IATACode}`}</span>
                </div>
                {
                  <div className="col-auto col-sm-6 text-sm-right my-1">
                    <span className="country">Total Time: {data && data.TotalDurationDisplay}</span>
                  </div>
                }
                <div className="col-12 col-sm-4 ">
                  <span className="me-2 total-time">{DisplayArrivalTime}</span>
                  <span className="total-time">{ArrivalAirField.AirportName} </span>
                  <span className="total-time">-</span>
                  <span className="total-time">{`${ArrivalAirField.IATACode}`}</span>
                </div>
                <div>
                  <div class="card-table my-2"></div>
                  <div className="col-12 col-sm-4 d-flex align-items-center">
                    <span className="detail-text ml-2">{`${CarrierName} (${FlightNo})`}</span>
                    <img src={CarrierLogoPath} alt={CarrierName} />
                  </div>
                  <span className="d-flex detail-text">
                    <img src="/src/assets/images/icons/flight/bag.svg" alt="" className="me-2" />
                    <span className="">Baggage Allowance - {BaggageAllowance}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default FlightDetails;
