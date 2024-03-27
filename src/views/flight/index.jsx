import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { SearchLocationDropdown } from "./SearchLocationDropdown";
import DatePicker from "./DatePicker";
import PassengerForm from "./PassengerForm";
import { useNavigate } from "react-router-dom";

export default function Flight() {
  const [from, setfrom] = useState(null);
  const [to, setto] = useState(null);
  const [ismodal, setismodal] = useState(false);
  const [airFieldData, setairFieldData] = useState(null);
  const [selected, setselected] = useState(null);
  const [isreturn, setisreturn] = useState(false);
  const [isdatemodal, setisdatemodal] = useState(false);
  const [date, setdate] = useState(null);
  const [carrierData, setcarrierData] = useState(null);
  const [passengerData, setpassengerData] = useState({
    adult: 1,
    children: 0,
    infant: 0,
    selectedAirline: "Any",
    selectedValue: "ECONOMY",
  });
  const [passenger, setpassenger] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getGetAllAirField();
    getGetAllCarriers();
  }, []);

  const getGetAllCarriers = () => {
    try {
      // let url = `https://ibeuat.giift.com/api/flight/GetAllCarriers`;

      let url = "src/dummyApiData/flight/GetAllCarriers_DATA.json";
      axios
        .get(url)
        .then(({ data: { GetAllCarriers_DATA } }) => {
          setcarrierData(GetAllCarriers_DATA.results);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getGetAllAirField = () => {
    try {
      let url = "src/dummyApiData/flight/GetAllAirField_DATA.json";
      axios
        .get(url)
        .then(({ data: { GetAllAirField_DATA } }) => {
          setairFieldData(GetAllAirField_DATA.results);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDirectionClick = (val) => {
    setselected(val);
    setismodal(true);
  };

  const handleApply = (date) => {
    setdate(date);
    setisdatemodal(false);
  };

  const handleContinue = (data) => {
    try {
      console.log(data);
      setpassengerData(data);
      let count =
        parseInt(data.adult) + parseInt(data.children) + parseInt(data.infant);
      let mess = `${count} PASSENGER, ${data.selectedValue}`;
      setpassenger(mess);
    } catch (error) {
      console.log(error);
    }
  };

  function convertDate(date) {
    const year = "2024"; //date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  function handleSearch() {
    const dt = date.split(" - ");
    const { adult, children, infant, selectedAirline, selectedValue } =
      passengerData;
    navigate(
      `/FlightList/${from.split(",")[0]}/${to.split(",")[0]}/${convertDate(
        new Date(dt[0])
      )}/${convertDate(
        new Date(dt[1])
      )}/${adult}/${children}/${infant}/${selectedAirline}/${selectedValue}/${isreturn}`
    );
  }

  return (
    <>
      <div className="flight-div">
        <div className="d-flex justify-content-between mb-4">
          <div className="no-flex">
            <p
              className="from-to text-decoration-underline"
              onClick={() => handleDirectionClick("Origin")}
            >
              From
            </p>
            {from ? (
              <>
                <p className="from-to-txt1">{from && from.split(",")[0]}</p>
                <p className="from-to-txt2">{from && from.split(",")[3]}</p>
              </>
            ) : (
              <img
                loading="lazy"
                type="button"
                src="/src/assets/images/icons/flight/add_location.svg"
                alt="add_location"
                onClick={() => handleDirectionClick("Origin")}
              />
            )}
          </div>
          {from && to ? (
            <>
              {isreturn && (
                <img
                  loading="lazy"
                  className=""
                  src="/src/assets/images/icons/flight/planeIcon.svg"
                  alt="roundtrip"
                />
              )}
              {!isreturn && (
                <img
                  loading="lazy"
                  className=""
                  src="/src/assets/images/icons/flight/oneway.svg"
                  alt="oneway"
                />
              )}
            </>
          ) : (
            <p className="select-destiantion text-center d-grid align-content-center">
              <span>Select your</span> <span>destination</span>
            </p>
          )}

          <div className="no-flex text-end">
            <p
              className="from-to text-decoration-underline"
              onClick={() => handleDirectionClick("Destination")}
            >
              To
            </p>
            {to ? (
              <>
                <p className="from-to-txt1">{to && to.split(",")[0]}</p>
                <p className="from-to-txt2">{to && to.split(",")[3]}</p>
              </>
            ) : (
              <img
                loading="lazy"
                type="button"
                src="/src/assets/images/icons/flight/add_location.svg"
                alt="add_location"
                onClick={() => handleDirectionClick("Destination")}
              />
            )}
          </div>
        </div>
        <div
          aria-disabled={true}
          className="d-flex justify-content-center mb-4 align-items-center"
        >
          <label
            className={`travel pe-2 ${
              isreturn ? "light-blue-txt" : "dark-blue-txt"
            }`}
            htmlFor="flexSwitchCheckDefault"
          >
            Oneway
          </label>
          <div className="form-switch">
            <input
              disabled={!from || !to}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={(e) => setisreturn(e.target.checked)}
            />
          </div>
          <label
            className={`travel ${
              !isreturn ? "light-blue-txt" : "dark-blue-txt"
            }`}
            htmlFor="flexSwitchCheckDefault"
          >
            Roundtrip
          </label>
        </div>
        <div className="text-center mb-4">
          <p className="travel-date-heading">Date of Travel</p>
          <button
            disabled={!from || !to}
            className={`travel-date-btn btn ${
              from && to
                ? date
                  ? ""
                  : "travel-date-btn-enable"
                : "travel-date-btn-disable"
            }`}
            onClick={() => setisdatemodal(true)}
          >
            {date ? (
              <p className="text-black fw-bold">{date}</p>
            ) : (
              "Set Travel Date"
            )}
          </button>
        </div>
        <div className="text-center mb-4">
          <button
            disabled={!from || !to || !date}
            className={`travel-date-btn btn ${
              date
                ? passengerData
                  ? "text-darkblue fw-bold"
                  : "travel-date-btn-enable"
                : "travel-date-btn-disable"
            }`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#form_modal"
            aria-controls="form_modal"
          >
            {passenger ? passenger : "1 Passenger, Economy"}
          </button>
        </div>
        <div className="text-center mb-4">
          <button
            disabled={!from || !to || !date}
            className={`search-btn border-0 px-4 btn ${
              !date ? "light-div text-lightblue" : "btn-primary"
            }`}
            onClick={() => handleSearch()}
          >
            <img
              className="me-2"
              loading="lazy"
              src="/src/assets/images/icons/flight/camera.svg"
              alt="camera"
            />
            Search Ticket
          </button>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-bottom"
        tabIndex="-1"
        id="form_modal"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div className="offcanvas-header justify-content-end">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body small py-0">
          <PassengerForm
            handleContinue={handleContinue}
            carrierData={carrierData}
          />
        </div>
      </div>
      {ismodal && (
        <SearchLocationDropdown
          selected={selected}
          airFieldData={airFieldData}
          setfrom={setfrom}
          setto={setto}
          setismodal={setismodal}
          setselected={setselected}
        />
      )}
      {isdatemodal && (
        <DatePicker setisdatemodal={setisdatemodal} handleApply={handleApply} />
      )}
    </>
  );
}
