import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
};
const flightSlice = createSlice({
  name: "flightData",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
  },
});

export const { setFlights } = flightSlice.actions;

export default flightSlice.reducer;
