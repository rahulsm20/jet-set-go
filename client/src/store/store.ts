import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import flightReducer from './flightSlice'
import hotelReducer from './hotelSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    flightData:flightReducer,
    hotelData:hotelReducer
  },
});

export default store;
