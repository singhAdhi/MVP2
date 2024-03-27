import { useState } from "react";
import DateRangePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker({ setisdatemodal, handleApply }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  //   console.log(startDate);
  //   console.log(endDate);

  function converDate(date) {
    if (date == null) return;
    const options = { weekday: "short", month: "short", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div
      className="modal fade show d-block "
      id="comman_modal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header border-0 py-2">
            <img
              loading="lazy"
              src="/src/assets/images/icons/flight/modal-close.svg"
              alt="modal-close"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setisdatemodal(false)}
            />
          </div>
          <div className="modal-body px-2 py-0">
            <DateRangePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              inline
            />
            <div className="bg-white mx-3 rounded-4">
              <div className="d-flex justify-content-evenly mb-4">
                <div>
                  <p className="text-darkblue fw-bold">Check In</p>
                  <p
                    className={`fw-bold light-div px-4 rounded-4 ${
                      startDate ? "text-darkblue" : "text-lightblue"
                    }`}
                  >
                    {startDate ? converDate(startDate) : "Select"}
                  </p>
                </div>
                <div>
                  <p className="text-darkblue fw-bold">Check Out</p>
                  <p
                    className={`fw-bold light-div px-4 rounded-4 ${
                      endDate ? "text-darkblue" : "text-lightblue"
                    }`}
                  >
                    {endDate ? converDate(endDate) : "Select"}
                  </p>
                </div>
              </div>
              <div className="d-flex gap-3 justify-content-center pb-4">
                <button
                  className="px-4 btn btn-secondary text-light"
                  onClick={() => setisdatemodal(false)}
                >
                  Clear
                </button>
                <button
                  className="px-4 btn btn-primary"
                  onClick={() => {
                    handleApply(`${converDate(startDate)} - ${converDate(endDate)}`);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
