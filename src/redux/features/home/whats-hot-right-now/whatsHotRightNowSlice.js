import { createSlice } from "@reduxjs/toolkit";
import { fetchCommonData } from "../common/thunk";

// const url = "http://localhost:8000";

const fetchUrl = [
  {
    id: 1,
    imgUrl: "/src/assets/images/banners/home/whats-hot/banner1.svg",
    title: "Trip to Dhaka",
    rating: "5.0",
    points: "19,200 Pts",
  },
  {
    id: 2,
    imgUrl: "/src/assets/images/banners/home/whats-hot/banner2.svg",
    title: "Another Trip",
    rating: "4.5",
    points: "15,000 Pts",
  },
  {
    id: 3,
    imgUrl: "/src/assets/images/banners/home/whats-hot/banner3.svg",
    title: "Another Trip 3",
    rating: "4.5",
    points: "15,000 Pts",
  },
  {
    id: 4,
    imgUrl: "/src/assets/images/banners/home/whats-hot/banner4.svg",
    title: "Another Trip 4",
    rating: "4.5",
    points: "15,000 Pts",
  },
];

//whatsHotRightNow thunk
export const fetchWhatsHotRightNow = () => async (dispatch) => {
  await dispatch(
    fetchCommonData(
      fetchUrl,
      fetchWhatsHotRightNowStart,
      fetchWhatsHotRightNowSuccess,
      fetchWhatsHotRightNowFailure
    )
  );
};

const initialState = {
  data: [],
  isLoading: false,
  isError: null,
  errorText: "",
};

const whatsHotRightNowSlice = createSlice({
  name: "whatsHotRightNow",
  initialState,
  reducers: {
    fetchWhatsHotRightNowStart(state) {
      state.isLoading = true;
      state.isError = null;
      state.errorText = null;
    },
    fetchWhatsHotRightNowSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.errorText = null;
    },
    fetchWhatsHotRightNowFailure(state, action) {
      state.isLoading = false;
      (state.isError = true), (state.errorText = "whatsHotRightNow slider not found");
    },
  },
});

export const {
  fetchWhatsHotRightNowStart,
  fetchWhatsHotRightNowSuccess,
  fetchWhatsHotRightNowFailure,
} = whatsHotRightNowSlice.actions;

export default whatsHotRightNowSlice.reducer;
