import { useSelector } from "react-redux";
import FlightResults from "../components/FlightResults";
import FlightSearch from "../components/FlightSearch";
import Navbar from "../components/Navbar";
import { RootState } from "../types";

const Flights = () => {
  const flights = useSelector((state: RootState) => state.flightData.flights);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col  gap-5 justify-center items-center">
        <FlightSearch />
        <div className="md:p-10">
          {flights.length > 0 ? (
            <div className="flex justify-center items-center md:items-start flex-col gap-5">
              <h1 className="font-light">Results</h1>
              <p>All times are local</p>
              <div className="flex flex-col justify-center items-center md:items-start gap-5">
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
