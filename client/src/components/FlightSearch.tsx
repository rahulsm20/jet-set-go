import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFlights } from "../store/flightSlice";

const FlightSearch = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const getFlights=async(requestData:FieldValues)=>{
    const from = requestData.from.trim()
    const to = requestData.to.trim()
    const dept_date = requestData.dept_date.split("-").join("")
    const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/flights/${from}/${to}/${dept_date}`)
    dispatch(setFlights(result.data))
  }
  return (
    <form
      onSubmit={handleSubmit((data) => getFlights(data))}
      className="bg-zinc-950 border border-zinc-800 rounded-xl  p-5 mt-10 gap-5 flex flex-col"
    >
      <div className="flex lg:flex-row flex-col gap-5 justify-start items-start">
        <div className="flex flex-col items-start">
          <label htmlFor="from">From</label>
          <input
            {...register("from")}
            placeholder="Departure IATA code"
            className="input"
            id="from"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="to">To</label>
          <input
            {...register("to")}
            className="input"
            placeholder="Arrival IATA code"
            id="to"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="dept_date">Date of departure</label>
          <input
            {...register("dept_date")}
            className="input"
            type="date"
            id="dept_date"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary normal-case">
        Search
      </button>
      {/* <p>{data}</p> */}
    </form>
  );
};

export default FlightSearch;
