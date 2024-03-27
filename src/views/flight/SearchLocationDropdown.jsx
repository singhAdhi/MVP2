import { useEffect, useState } from "react";

export function SearchLocationDropdown({
  selected,
  airFieldData,
  setfrom,
  setto,
  setismodal,
  setselected,
}) {
  const [isSearchloading, setisSearchloading] = useState(false);
  const [inputTxt, setinputTxt] = useState("");
  const [originData, setoriginData] = useState(null);

  useEffect(() => {
    if (inputTxt != "") {
      const debounceTimeout = setTimeout(() => {
        handleFilter(inputTxt);
        clearTimeout(debounceTimeout);
      }, 1000); // value in ms
    }
  }, [inputTxt]);

  const handleDropdownChange = (e) => {
    if (!e) return;
    const { value } = e.target;
    setinputTxt(value);
  };

  const handleFilter = (value) => {
    setisSearchloading(true);

    // let timeout = setTimeout(() => {
    setoriginData(
      airFieldData.filter(
        (city) =>
          city.City.toLowerCase().includes(value.toLowerCase()) ||
          city.IATACode.toLowerCase().includes(value.toLowerCase())
      )
    );
    setisSearchloading(false);
    //   clearTimeout(timeout);
    // }, 500);
  };

  const handleDestinationLocationClick = (CarrierName) => {
    selected === "Origin" ? setfrom(CarrierName) : setto(CarrierName);
    setoriginData(null);
    setismodal(null);
    setselected(null);
  };

  return (
    <div
      className="modal fade show d-block"
      id="comman_modal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header border-0">
            <img
              loading="lazy"
              src="/src/assets/images/icons/flight/modal-close.svg"
              alt="modal-close"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setismodal(false)}
            />
          </div>
          <div className="modal-body py-0">
            <p className="fw-bold text-center text-darkblue">{`Select Your ${selected}`}</p>
            <div id="searchInput">
              <input
                type="text"
                className="form-control "
                placeholder="Enter City or Airport"
                name="DestinationLocation"
                onChange={handleDropdownChange}
                value={inputTxt}
                autoFocus
              />
            </div>
            <LocationDropdown
              isloading={isSearchloading}
              data={originData}
              handleClick={handleDestinationLocationClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const LocationDropdown = ({ isloading, data, handleClick }) => (
  <>
    <ul className="h-100 mt-2 overflow-y-scroll">
      {isloading ? (
        <div className="p-3 w-100 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {data &&
            data.map((from, i) => {
              const { City, CountryName, IATACode, AirportName, SearchAirfieldDetails } = from;
              return (
                <li
                  key={i}
                  className="border-3 border-bottom py-2"
                  onClick={() => handleClick(SearchAirfieldDetails, IATACode)}
                >
                  <div>
                    <span className="fw-bolder">{City}</span>,
                    <span className="text-uppercase fw-bolder">{CountryName}</span>
                  </div>
                  <div>
                    <span>{AirportName}</span>
                    <span>({IATACode})</span>
                  </div>
                </li>
              );
            })}
        </>
      )}
    </ul>
  </>
);
