import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./features/header/headerSlice";
import whatsHotRightNowReducer from "./features/home/whats-hot-right-now/whatsHotRightNowSlice";
import flightReducer from "./features/flight/index";

export const store = configureStore({
  reducer: { headerReducer, whatsHotRightNowReducer, flightReducer },
});
