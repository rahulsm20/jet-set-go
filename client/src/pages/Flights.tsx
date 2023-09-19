import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import FlightResults from "../components/FlightResults";
import FlightSearch from "../components/FlightSearch";
import Navbar from "../components/Navbar";
import { RootState } from "../types";

const Flights = () => {
  const [flightState, setFlightState] = useState([]);
  const flights = useSelector((state:RootState)=>state.flightData)
  console.log(flights)
  const fetchData = async () => {
    const flightData = localStorage.getItem("flightData");
    if (flightData) {
      if (flightData.length > 0) {
        setFlightState(JSON.parse(flightData));
      }
    } else {
      const result = await axios.get(`http://localhost:8000/api/flights`);
      localStorage.setItem("flightData", JSON.stringify(result.data));
      console.log(result.data);
    }
  };

  console.log(flightState);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col  gap-5 justify-center items-center">
        <FlightSearch />
        <button onClick={fetchData} className="btn normal-case">
          Fetch data
        </button>
        <div>
          {flights.length > 0 ? (
            <div className="flex items-start flex-col gap-5">
              <h1 className="font-light">Results</h1>
              <p>All times are local</p>
              <div className="flex flex-col justify-start item-start gap-5">
                {flights.map((flight, key) => {
                  return <FlightResults flightDetails={flight} key={key} />;
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flights;
