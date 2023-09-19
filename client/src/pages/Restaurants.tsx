import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
const Restaurants = () => {
  const [city, setCity] = useState("");

  const { register, handleSubmit } = useForm();

  const [restaurants, setRestaurants] = useState([]);

  const onSubmit = async (data: FieldValues) => {
    if (data) {
      const result = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/location/" + data.city
      );
      const restuarantData = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/restaurants/" + result.data
      );
      setRestaurants(restuarantData.data);
      localStorage.setItem(
        "restaurantData",
        JSON.stringify(restuarantData.data)
      );
      setCity(data.city);
      console.log(restaurants);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex gap-5 justify-center">
        <div className="flex flex-col justify-center items-center m-10 gap-10 mt-10">
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="flex flex-col justify-start items-start text-start gap-5 bg-zinc border-2 border-zinc-800 p-5 rounded-2xl "
          >
            <label htmlFor="city">Search for restaurants </label>
            <input
              id="city"
              className="input"
              {...register("city")}
              placeholder="Enter a city"
            />
            <button
              type="submit"
              className="btn btn-primary normal-case"
              onClick={onSubmit}
            >
              Search
            </button>
          </form>
          <div className="flex justify-start items-start flex-col gap-5">
            {city ? (
              <p className="text-2xl font-light">
                Popular Restaurants in {city}
              </p>
            ) : (
              <></>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
              {restaurants.map((restaurant, key) => {
                return <RestaurantCard restaurantData={restaurant} key={key} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
