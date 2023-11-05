import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
};
const hotelSlice = createSlice({
  name: "hotelData",
  initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
  },
});

export const { setHotels } = hotelSlice.actions;

export default hotelSlice.reducer;
