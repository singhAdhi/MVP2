import { createSlice } from "@reduxjs/toolkit";

let INITIAL_VALUE = {
  UrlValue: null,
};

const flightDetails = createSlice({
  name: "flightDetails",
  initialState: INITIAL_VALUE,
  reducers: {
    addFlightValues: (state, action) => {
      state.UrlValue = [action.payload];
      localStorage.setItem("UrlValue", JSON.stringify(action.payload));
    },
  },
});

export default flightDetails.reducer;
export const { addFlightValues } = flightDetails.actions;
