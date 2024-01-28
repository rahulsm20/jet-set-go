import axios from "axios";

const getFlights = async ({from,to}:{from:string,to:string}) => {
  const options = {
    method: "GET",
    url: `https://timetable-lookup.p.rapidapi.com/TimeTable/${from}/${to}/20230920/`,
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_FLIGHT_API_KEY,
      "X-RapidAPI-Host": "timetable-lookup.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getFlights;
