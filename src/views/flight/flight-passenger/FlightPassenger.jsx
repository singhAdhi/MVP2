import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import FlightPassengerDetail from "./FlightPassengerDetail";
import { Navigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./passenger.css";
import { useNavigate } from "react-router-dom";

const FlightPassenger = () => {
  const [startDate, setStartDate] = useState(null);
  const [startNewDate, setStartNewDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const { Adults, Childrens, Infants } = useParams();

  const numberOfAdults = parseInt(Adults);
  const numberOfChildren = parseInt(Childrens);
  const numberOfInfants = parseInt(Infants);
  const data = useSelector((state) => state.flightReducer.UrlValue);

  const generateFormikInstances = (count, role) => {
    return Array.from({ length: count }, (_, index) =>
      useFormik({
        initialValues: {
          title: "Mr.",
          firstName: "",
          lastName: "",
          email: "",
          DateOfBirth: "",
          PassportNumber: "",
          PassportIssuePlace: "",
          PassportIssueDate: "",
          PassportExpiryDate: "",
          mobile: "",
        },
        validationSchema: Yup.object().shape({
          title: Yup.string().required("Title is required"),
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          DateOfBirth: Yup.date().required("Date of Birth is required"),
          PassportNumber: Yup.string().required("Passport Number is required"),
          PassportIssuePlace: Yup.string().required(
            "Passport Issue Place is required"
          ),
          PassportIssueDate: Yup.date().required(
            "Passport Issue Date is required"
          ),
          PassportExpiryDate: Yup.date().required(
            "Passport Expiry Date is required"
          ),
          mobile: Yup.string().required("Mobile is required"),
        }),
        onSubmit: (values) => {
          console.log(JSON.stringify(values, null, 2));
        },
      })
    );
  };
  const adultFormikInstances = generateFormikInstances(numberOfAdults, "adult");
  const childrenFormikInstances = generateFormikInstances(
    numberOfChildren,
    "child"
  );
  const infantFormikInstances = generateFormikInstances(
    numberOfInfants,
    "infant"
  );
  const handleSubmit = () => {
    // Submit all Formik instances
    adultFormikInstances.forEach((formikInstance) =>
      formikInstance.submitForm()
    );
    childrenFormikInstances.forEach((formikInstance) =>
      formikInstance.submitForm()
    );
    infantFormikInstances.forEach((formikInstance) =>
      formikInstance.submitForm()
    );

    // Check if the entire form is valid and modified
    const isFormValid = adultFormikInstances.every(
      (formikInstance) => formikInstance.isValid && formikInstance.dirty
    );

    // Check each dynamic section individually
    const areSectionsValid = adultFormikInstances.every(
      (formikInstance) => formikInstance.isValid
    );

    // Check if form and sections are valid before submission
    if (isFormValid && areSectionsValid) {
      setIsFormValid(true);
      // Handle submission logic for all forms here
      adultFormikInstances.forEach((formikInstance, index) => {
        console.log(`Adult ${index + 1} Form Values:`, formikInstance.values);
      });

      childrenFormikInstances.forEach((formikInstance, index) => {
        console.log(`Child ${index + 1} Form Values:`, formikInstance.values);
      });

      infantFormikInstances.forEach((formikInstance, index) => {
        console.log(`Infant ${index + 1} Form Values:`, formikInstance.values);
      });

      navigate("/FlightAnimate");
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <div>
      <div className="">
        <div className="col-md-12">
          <div className="passenger-form p-4 bg-white mb-5">
            {adultFormikInstances.map((formikInstance, index) => (
              <form
                key={`adult-${index}`}
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent default form submission behavior
                  formikInstance.handleSubmit(); // Use formikInstance's handleSubmit
                }}
              >
                <h1 className="my-3">Adult {index + 1}</h1>
                <div class="col-md-4 mb-3">
                  <label htmlFor="inputState" className="form-label">
                    Title*
                  </label>
                  <select id="inputState" className="form-select bg-input">
                    <option selected>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`firstName-adult-${index}`}
                    className="form-label"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    className="form-control bg-input"
                    id={`firstName-adult-${index}`}
                    name={`firstName`}
                    value={formikInstance.values.firstName}
                    onChange={formikInstance.handleChange}
                    onBlur={formikInstance.handleBlur}
                  />
                  {formikInstance.errors.firstName &&
                    formikInstance.touched.firstName && (
                      <p className="text-danger">
                        {formikInstance.errors.firstName}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`lastName-adult-${index}`}
                    className="form-label"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    className="form-control bg-input"
                    id={`lastName-adult-${index}`}
                    name={`lastName`}
                    value={formikInstance.values.lastName}
                    onChange={formikInstance.handleChange}
                    onBlur={formikInstance.handleBlur}
                  />
                  {formikInstance.errors.lastName &&
                    formikInstance.touched.lastName && (
                      <p className="text-danger">
                        {formikInstance.errors.lastName}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`DateOfBirth-adult-${index}`}
                    className="form-label"
                  >
                    Date Of Birth*
                  </label>
                  <DatePicker
                    className="bg-input"
                    id={`DateOfBirth-adult-${index}`}
                    name={`DateOfBirth`}
                    selected={formikInstance.values.DateOfBirth}
                    onChange={(date) => {
                      setStartDate(date);
                      formikInstance.setFieldValue(`DateOfBirth`, date);
                    }}
                  />
                  {formikInstance.errors.DateOfBirth &&
                    formikInstance.touched.DateOfBirth && (
                      <p className="text-danger">
                        {formikInstance.errors.DateOfBirth}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportNumber-adult-${index}`}
                    className="form-label"
                  >
                    Passport Number*
                  </label>
                  <input
                    type="text"
                    className="form-control bg-input"
                    id={`PassportNumber-adult-${index}`}
                    name={`PassportNumber`}
                    value={formikInstance.values.PassportNumber}
                    onChange={formikInstance.handleChange}
                  />
                  {formikInstance.errors.PassportNumber &&
                    formikInstance.touched.PassportNumber && (
                      <p className="text-danger">
                        {formikInstance.errors.PassportNumber}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`email-adult-${index}`}
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-input"
                    id={`email-adult-${index}`}
                    name={`email`}
                    value={formikInstance.values.email}
                    onChange={formikInstance.handleChange}
                  />
                  {formikInstance.errors.email &&
                    formikInstance.touched.email && (
                      <p className="text-danger">
                        {formikInstance.errors.email}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`mobile-adult-${index}`}
                    className="form-label"
                  >
                    Mobile No (without country code)*
                  </label>
                  <input
                    type="tel"
                    className="form-control bg-input"
                    id={`mobile-adult-${index}`}
                    name={`mobile`}
                    placeholder=""
                    value={formikInstance.values.mobile}
                    onChange={formikInstance.handleChange}
                    onBlur={formikInstance.handleBlur}
                  />
                  {formikInstance.errors.mobile &&
                    formikInstance.touched.mobile && (
                      <p className="text-danger">
                        {formikInstance.errors.mobile}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportIssuePlace-adult-${index}`}
                    className="form-label"
                  >
                    Passport Issue Place*
                  </label>
                  <input
                    type="text"
                    className="form-control bg-input"
                    id={`PassportIssuePlace-adult-${index}`}
                    name={`PassportIssuePlace`}
                    value={formikInstance.values.PassportIssuePlace}
                    onChange={formikInstance.handleChange}
                    onBlur={formikInstance.handleBlur}
                  />
                  {formikInstance.errors.PassportIssuePlace &&
                    formikInstance.touched.PassportIssuePlace && (
                      <p className="text-danger">
                        {formikInstance.errors.PassportIssuePlace}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportIssueDate-adult-${index}`}
                    className="form-label"
                  >
                    Passport Issue Date*
                  </label>
                  <DatePicker
                    className="bg-input"
                    id={`PassportIssueDate-adult-${index}`}
                    name={`PassportIssueDate`}
                    selected={formikInstance.values.PassportIssueDate}
                    onChange={(date) => {
                      setStartNewDate(date);
                      formikInstance.setFieldValue(`PassportIssueDate`, date);
                    }}
                    selectsStart
                    startDate={startNewDate}
                    endDate={endDate}
                  />
                  {formikInstance.errors.PassportIssueDate &&
                    formikInstance.touched.PassportIssueDate && (
                      <p className="text-danger">
                        {formikInstance.errors.PassportIssueDate}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportExpiryDate-adult-${index}`}
                    className="form-label"
                  >
                    Passport Expiry Date
                  </label>
                  <DatePicker
                    className="bg-input"
                    id={`PassportExpiryDate-adult-${index}`}
                    name={`PassportExpiryDate`}
                    selected={formikInstance.values.PassportExpiryDate}
                    onChange={(date) => {
                      setEndDate(date);
                      formikInstance.setFieldValue(`PassportExpiryDate`, date);
                    }}
                    selectsEnd
                    startDate={startNewDate}
                    endDate={endDate}
                    minDate={startNewDate}
                  />
                  {formikInstance.errors.PassportExpiryDate &&
                    formikInstance.touched.PassportExpiryDate && (
                      <p className="text-danger">
                        {formikInstance.errors.PassportExpiryDate}
                      </p>
                    )}
                </div>
              </form>
            ))}

            {childrenFormikInstances.map((formikInstance, index) => (
              <form
                key={`child-${index}`}
                onSubmit={formikInstance.handleSubmit}
              >
                <h1 className="my-3">Child {index + 1}</h1>

                {/* Children Form Fields */}
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`firstName-child-${index}`}
                    className="form-label"
                  >
                    First Name
                  </label>
                  <input
                    className="form-control bg-input"
                    id={`firstName-child-${index}`}
                    name={`firstName`}
                    type="text"
                    onChange={formikInstance.handleChange}
                    value={formikInstance.values.firstName}
                  />
                  {formikInstance.errors.firstName &&
                    formikInstance.touched.firstName && (
                      <p className="text-danger">
                        {formikInstance.errors.firstName}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`lastName-child-${index}`}
                    className="form-label"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    className="form-control bg-input"
                    id={`lastName-child-${index}`}
                    name={`lastName`}
                    value={formikInstance.values.lastName}
                    onChange={formikInstance.handleChange}
                    onBlur={formikInstance.handleBlur}
                  />
                  {formikInstance.errors.lastName &&
                    formikInstance.touched.lastName && (
                      <p className="text-danger">
                        {formikInstance.errors.lastName}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`DateOfBirth-child-${index}`}
                    className="form-label"
                  >
                    Date Of Birth*
                  </label>
                  <DatePicker
                    className="bg-input"
                    id={`DateOfBirth-child-${index}`}
                    name={`DateOfBirth`}
                    selected={formikInstance.values.DateOfBirth}
                    onChange={(date) => {
                      setStartDate(date);
                      formikInstance.setFieldValue(`DateOfBirth`, date);
                    }}
                  />
                  {formikInstance.errors.DateOfBirth &&
                    formikInstance.touched.DateOfBirth && (
                      <p className="text-danger">
                        {formikInstance.errors.DateOfBirth}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportNumber-child-${index}`}
                    className="form-label"
                  >
                    Passport Number*
                  </label>
                  <input
                    type="text"
                    className="form-control  bg-input"
                    id={`PassportNumber-child-${index}`}
                    name={`PassportNumber`}
                    value={formikInstance.values.PassportNumber}
                    onChange={formikInstance.handleChange}
                  />
                  {formikInstance.errors.PassportNumber &&
                    formikInstance.touched.PassportNumber && (
                      <p className="text-danger">
                        {formikInstance.errors.PassportNumber}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`email-child-${index}`}
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-input"
                    id={`email-child-${index}`}
                    name={`email`}
                    value={formikInstance.values.email}
                    onChange={formikInstance.handleChange}
                  />
                  {formikInstance.errors.email &&
                    formikInstance.touched.email && (
                      <p className="text-danger">
                        {formikInstance.errors.email}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`mobile-child-${index}`}
                    className="form-label"
                  >
                    Mobile No (without country code)*
                  </label>
                  <input
                    type="tel"
                    className="form-control bg-input"
                    id={`mobile-child-${index}`}
                    name={`mobile`}
                    placeholder=""
                    value={formikInstance.values.mobile}
                    onChange={formikInstance.handleChange}
                    onBlur={formikInstance.handleBlur}
                  />
                  {formikInstance.errors.mobile &&
                    formikInstance.touched.mobile && (
                      <p className="text-danger">
                        {formikInstance.errors.mobile}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportIssuePlace-child-${index}`}
                    className="form-label"
                  >
                    Passport Issue Place*
                  </label>
                  <input
                    type="text"
                    className="form-control bg-input"
                    id={`PassportIssuePlace-child-${index}`}
                    name={`PassportIssuePlace`}
                    value={formikInstance.values.PassportIssuePlace}
                    onChange={formikInstance.handleChange}
                    onBlur={formikInstance.handleBlur}
                  />
                  {formikInstance.errors.PassportIssuePlace &&
                    formikInstance.touched.PassportIssuePlace && (
                      <p className="text-danger">
                        {formikInstance.errors.PassportIssuePlace}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportIssueDate-child-${index}`}
                    className="form-label"
                  >
                    Passport Issue Date*
                  </label>
                  <DatePicker
                    className="bg-input"
                    id={`PassportIssueDate-child-${index}`}
                    name={`PassportIssueDate`}
                    selected={formikInstance.values.PassportIssueDate}
                    onChange={(date) => {
                      setStartNewDate(date);
                      formikInstance.setFieldValue(`PassportIssueDate`, date);
                    }}
                    selectsStart
                    startDate={startNewDate}
                    endDate={endDate}
                  />
                  {formikInstance.errors.PassportIssueDate &&
                    formikInstance.touched.PassportIssueDate && (
                      <p className="text-danger">
                        {formikInstance.errors.PassportIssueDate}
                      </p>
                    )}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportExpiryDate-child-${index}`}
                    className="form-label"
                  >
                    Passport Expiry Date
                  </label>
                  <DatePicker
                    id={`PassportExpiryDate-child-${index}`}
                    name={`PassportExpiryDate`}
                    selected={formikInstance.values.PassportExpiryDate}
                    onChange={(date) => {
                      setEndDate(date);
                      formikInstance.setFieldValue(`PassportExpiryDate`, date);
                    }}
                    selectsEnd
                    startDate={startNewDate}
                    endDate={endDate}
                    minDate={startNewDate}
                    className="bg-input"
                  />
                  {formikInstance.errors.PassportExpiryDate &&
                    formikInstance.touched.PassportExpiryDate && (
                      <p className="text-danger">
                        {formikInstance.errors.PassportExpiryDate}
                      </p>
                    )}
                </div>
              </form>
            ))}

            {infantFormikInstances.map((formikInstance, index) => (
              <form
                key={`infant-${index}`}
                onSubmit={formikInstance.handleSubmit}
              >
                <h1 className="my-3">infant {index + 1}</h1>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`firstName-infant-${index}`}
                    className="form-label"
                  >
                    First Name
                  </label>
                  <input
                    className="form-control bg-input"
                    id={`firstName-infant-${index}`}
                    name={`firstName`}
                    type="text"
                    onChange={formikInstance.handleChange}
                    value={formikInstance.values.firstName}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`lastName-infant-${index}`}
                    className="form-label"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    className="form-control bg-input"
                    id={`lastName-infant-${index}`}
                    name={`lastName`}
                    value={formikInstance.values.lastName}
                    onChange={formikInstance.handleChange}
                    onBlur={formikInstance.handleBlur}
                  />
                  {/* {errors[`LastName${index}`] &&
                    touched[`LastName${index}`] ? (
                      <p className="text-danger">
                        {errors[`LastName${index}`]}
                      </p>
                    ) : null} */}
                </div>
                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`DateOfBirth-infant-${index}`}
                    className="form-label"
                  >
                    Date Of Birth*
                  </label>
                  <DatePicker
                    className="bg-input"
                    id={`DateOfBirth-infant-${index}`}
                    name={`DateOfBirth`}
                    selected={formikInstance.values.DateOfBirth}
                    onChange={(date) => {
                      setStartDate(date);
                      formikInstance.setFieldValue(`DateOfBirth`, date);
                    }}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportNumber-infant-${index}`}
                    className="form-label"
                  >
                    Passport Number*
                  </label>
                  <input
                    type="text"
                    className="form-control bg-input"
                    id={`PassportNumber-infant-${index}`}
                    name={`PassportNumber`}
                    value={formikInstance.values.PassportNumber}
                    onChange={formikInstance.handleChange}
                  />
                  {/* {errors[`PassportNumber${index}`] &&
                    touched[`PassportNumber${index}`] ? (
                      <p className="text-danger">
                        {errors[`PassportNumber${index}`]}
                      </p>
                    ) : null} */}
                </div>

                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`email-infant-${index}`}
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-input"
                    id={`email-infant-${index}`}
                    name={`email`}
                    value={formikInstance.values.email}
                    onChange={formikInstance.handleChange}
                  />
                  {/* {errors[`EmailID${index}`] && touched[`EmailID${index}`] ? (
                      <p className="text-danger">{errors[`EmailID${index}`]}</p>
                    ) : null} */}
                </div>

                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`mobile-infant-${index}`}
                    className="form-label"
                  >
                    Mobile No (without country code)*
                  </label>
                  <input
                    type="tel"
                    className="form-control bg-input"
                    id={`mobile-infant-${index}`}
                    name={`mobile`}
                    placeholder=""
                    value={formikInstance.values.mobile}
                    onChange={formikInstance.handleChange}
                    onBlur={formikInstance.handleBlur}
                  />
                  {/* {errors[`mobile${index}`] && touched[`mobile${index}`] ? (
                      <p className="text-danger">{errors[`mobile${index}`]}</p>
                    ) : null} */}
                </div>

                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportIssuePlace-infant-${index}`}
                    className="form-label"
                  >
                    Passport Issue Place*
                  </label>
                  <input
                    type="text"
                    className="form-control bg-input"
                    id={`PassportIssuePlace-infant-${index}`}
                    name={`PassportIssuePlace`}
                    value={formikInstance.values.PassportIssuePlace}
                    onChange={formikInstance.handleChange}
                    onBlur={formikInstance.handleBlur}
                  />
                  {/* {errors[`PassportIssuePlace${index}`] &&
                    touched[`PassportIssuePlace${index}`] ? (
                      <p className="text-danger">
                        {errors[`PassportIssuePlace${index}`]}
                      </p>
                    ) : null} */}
                </div>

                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportIssueDate-infant-${index}`}
                    className="form-label"
                  >
                    Passport Issue Date*
                  </label>
                  <DatePicker
                    id={`PassportIssueDate-infant-${index}`}
                    name={`PassportIssueDate`}
                    selected={formikInstance.values.PassportIssueDate}
                    onChange={(date) => {
                      setStartNewDate(date);
                      formikInstance.setFieldValue(`PassportIssueDate`, date);
                    }}
                    selectsStart
                    startDate={startNewDate}
                    endDate={endDate}
                    className="bg-input"
                  />
                  {/* {formikInstance.errors[`PassportIssueDate`] &&
                    formikInstance.touched[`PassportIssueDate`] ? (
                      <p className="text-danger">
                        {formikInstance.errors[`PassportIssueDate`]}
                      </p>
                    ) : null} */}
                </div>

                <div className="col-md-4 mb-3">
                  <label
                    htmlFor={`PassportExpiryDate-infant-${index}`}
                    className="form-label"
                  >
                    Passport Expiry Date
                  </label>
                  <DatePicker
                    className="bg-input"
                    id={`PassportExpiryDate-infant-${index}`}
                    name={`PassportExpiryDate`}
                    selected={formikInstance.values.PassportExpiryDate}
                    onChange={(date) => {
                      setEndDate(date);
                      formikInstance.setFieldValue(`PassportExpiryDate`, date);
                    }}
                    selectsEnd
                    startDate={startNewDate}
                    endDate={endDate}
                    minDate={startNewDate}
                  />
                  {/* {formikInstance.errors[`PassportExpiryDate`] &&
                    formikInstance.touched[`PassportExpiryDate`] ? (
                      <p className="text-danger">
                        {formikInstance.errors[`PassportExpiryDate`]}
                      </p>
                    ) : null} */}
                </div>
              </form>
            ))}
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary px-4 py-2 mt-2"
                onClick={handleSubmit}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
        {/* <div className="col-md-4">
            <div className="row bg-body-secondary rounded p-3">
              <div className="col-12">
                <div class="orderSum">
                  <div class="txt-itinerary">
                    <h3
                      data-i18n="flightpassenger-itinerary"
                      className="mb-4 fw-semibold"
                    >
                      Itinerary
                    </h3>
                  </div>
                  {data && <FlightPassengerDetail flightData={data} />}

                  <div class="card-footer font-weight-bold">
                    <span data-i18n="flightpassenger-total-points">
                      Total Points:{" "}
                    </span>
                    <span id="CP_lblTotalPoints">810</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default FlightPassenger;
