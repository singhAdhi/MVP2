import { useEffect, useState } from "react";
import { LocationDropdown } from "./SearchLocationDropdown";

export default function PassengerForm({ carrierData, handleContinue }) {
  const [selectedValue, setSelectedValue] = useState("ECONOMY");
  const [isSearchloading, setisSearchloading] = useState(false);
  const [inputTxt, setinputTxt] = useState("");
  const [originData, setoriginData] = useState(null);
  const [selectedAirline, setselectedAirline] = useState("Any");
  const [adult, setadult] = useState(1);
  const [children, setchildren] = useState(0);
  const [infant, setinfant] = useState(0);

  const handleItemClick = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    if (inputTxt != "") {
      const debounceTimeout = setTimeout(() => {
        handleFilter(inputTxt);
        clearTimeout(debounceTimeout);
      }, 1000); // value in ms
    }
  }, [inputTxt]);

  const handleFilter = (value) => {
    setisSearchloading(true);
    setoriginData(
      carrierData.filter((carrier) =>
        carrier.CarrierName.toLowerCase().includes(value.toLowerCase())
      )
    );
    setisSearchloading(false);
  };

  const handleDropdownChange = (e) => {
    if (!e) return;
    const { value } = e.target;
    setinputTxt(value);
  };

  const handleAirlineClick = (CarrierName) => {
    setselectedAirline(CarrierName);
    setinputTxt(CarrierName);
    setoriginData(null);
  };

  const onSubmit = () => {
    handleContinue({
      selectedValue,
      selectedAirline,
      adult,
      children,
      infant,
    });
  };
  return (
    <div className="text-center">
      <div className="d-flex gap-3 justify-content-between mb-2 text-nowrap">
        <button
          className={`w-100 border-0 p-1 rounded-5 text-lightblue ${
            selectedValue == "ECONOMY" ? "btn-primary" : "light-div"
          }`}
          onClick={() => handleItemClick("ECONOMY")}
        >
          ECONOMY
        </button>
        <button
          className={`w-100 border-0 p-1 rounded-5 text-lightblue ${
            selectedValue == "PREMIUM ECONOMY" ? "btn-primary" : "light-div"
          }`}
          onClick={() => handleItemClick("PREMIUM ECONOMY")}
        >
          PREMIUM ECONOMY
        </button>
      </div>
      <div className="d-flex gap-3 justify-content-between mb-2 text-nowrap">
        <button
          className={`w-100 border-0 p-1 rounded-5 text-lightblue ${
            selectedValue == "BUSINESS" ? "btn-primary" : "light-div"
          }`}
          onClick={() => handleItemClick("BUSINESS")}
        >
          BUSINESS
        </button>
        <button
          className={`w-100 border-0 p-1 rounded-5 text-lightblue ${
            selectedValue == "FIRST" ? "btn-primary" : "light-div"
          }`}
          onClick={() => handleItemClick("FIRST")}
        >
          FIRST
        </button>
      </div>
      <div className="d-flex justify-content-between gap-3 mb-4 text-nowrap">
        <div className="w-100">
          <label className="text-darkblue form-label fw-bold">
            Adult Person
          </label>
          <select
            className="bg-body-secondary form-select rounded-4"
            id="dropDownListEconomy"
            onChange={(e) => setadult(e.target.value)}
          >
            <option value="1" defaultValue>
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="w-100">
          <label className="text-darkblue form-label fw-bold">Children</label>
          <select
            className="bg-body-secondary form-select rounded-4"
            id="dropDownListEconomy"
            onChange={(e) => setchildren(e.target.value)}
          >
            <option value="0" defaultValue>
              0
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="w-100">
          <label className="text-darkblue form-label fw-bold">Infant</label>
          <select
            className="bg-body-secondary form-select rounded-4"
            id="dropDownListEconomy"
            onChange={(e) => setinfant(e.target.value)}
          >
            <option value="0" defaultValue>
              0
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="form-control border-0 bg-body-secondary rounded-4"
          placeholder="Enter Airline"
          name="DestinationLocation"
          onChange={handleDropdownChange}
          value={inputTxt}
        />
        <ul
          className="overflow-y-auto rounded-3 dropdown-hotel w-100"
          style={{ maxHeight: 100 }}
        >
          {isSearchloading ? (
            <div className="p-3 w-100 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {originData &&
                originData.map((from, i) => {
                  const { CarrierName } = from;
                  return (
                    <li
                      key={i}
                      className="cityName py-2 px-3"
                      onClick={() => handleAirlineClick(CarrierName)}
                    >
                      <div>
                        <span className="fw-bolder">{CarrierName}</span>
                      </div>
                    </li>
                  );
                })}
            </>
          )}
        </ul>
      </div>
      <button
        className="btn btn-primary px-3"
        type="button"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        onClick={() => onSubmit()}
      >
        Continue
      </button>
    </div>
  );
}
