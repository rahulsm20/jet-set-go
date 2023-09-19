// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import flightReducer from './flightSlice'

const store = configureStore({
  reducer: {
    auth: authReducer, 
    flightData:flightReducer
  },
});

export default store;
