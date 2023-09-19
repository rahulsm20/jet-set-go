// const axios = require("axios");
import axios from "axios";
const getLocation = async (city:string) => {
  const options = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
    params: {
      name: city,
      locale: "en-gb",
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_HOTEL_API_KEY,
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const dest_id = response.data[0].dest_id
    const dest_type = response.data[0].dest_type
    const city_name = response.data[0].city_name
    const image_url = response.data[0].image_url
    const hotels = response.data[0].hotels
    return {dest_id,dest_type,city_name,image_url,hotels}
  } catch (error) {
    console.error(error);   
  }
};

export default getLocation;
