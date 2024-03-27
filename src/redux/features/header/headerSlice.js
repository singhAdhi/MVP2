import { createSlice } from "@reduxjs/toolkit";
import { fetchCommonData } from "../home/common/thunk";

// const url = "http://localhost:8000";

const fetchUrl = [
  {
    id: 1,
    title: "Profile",
    imgUrl: "/src/assets/images/icons/home/mobile-nav/profile.svg",
  },
  {
    id: 2,
    title: "Dashboard",
    imgUrl: "/src/assets/images/icons/home/mobile-nav/dashboard.svg",
  },
  {
    id: 3,
    title: "My Order",
    imgUrl: "/src/assets/images/icons/home/mobile-nav/my-order.svg",
  },
  {
    id: 4,
    title: "About Us",
    imgUrl: "/src/assets/images/icons/home/mobile-nav/about-us.svg",
  },
  {
    id: 5,
    title: "Earn",
    imgUrl: "/src/assets/images/icons/home/mobile-nav/earn.svg",
  },
  {
    id: 6,
    title: "Redeem",
    imgUrl: "/src/assets/images/icons/home/mobile-nav/redeem.svg",
  },
  {
    id: 7,
    title: "FAQs",
    imgUrl: "/src/assets/images/icons/home/mobile-nav/faq.svg",
  },
  {
    id: 8,
    title: "Terms & Conditions",
    imgUrl: "/src/assets/images/icons/home/mobile-nav/terms-conditions.svg",
  },
  {
    id: 9,
    title: "Booking Policy",
    imgUrl: "/src/assets/images/icons/home/mobile-nav/booking-policy.svg",
  },
  {
    id: 10,
    title: "Privacy Policy",
    imgUrl: "/src/assets/images/icons/home/mobile-nav/privacy-policy.svg",
  },
];

//header thunk
export const fetchHeader = () => async (dispatch) => {
  await dispatch(
    fetchCommonData(fetchUrl, fetchHeaderStart, fetchHeaderSuccess, fetchHeaderFailure)
  );
};

const initialState = {
  data: [],
  isLoading: false,
  isError: null,
  errorText: "",
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    fetchHeaderStart(state) {
      state.isLoading = true;
      state.isError = null;
      state.errorText = null;
    },
    fetchHeaderSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.errorText = null;
    },
    fetchHeaderFailure(state, action) {
      state.isLoading = false;
      (state.isError = true), (state.errorText = "header not found");
    },
  },
});

export const { fetchHeaderStart, fetchHeaderSuccess, fetchHeaderFailure } = headerSlice.actions;

export default headerSlice.reducer;
