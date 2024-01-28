import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { getLocation, getRestaurants } from "../api";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
const Restaurants = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const [restaurants, setRestaurants] = useState([]);

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const existingData = localStorage.getItem(`restaurantData:${data.city}`);
    if (data) {
      if (existingData) {
        setRestaurants(JSON.parse(existingData));
      } else {
        const result = await getLocation(data.city);
        const restaurantData = await getRestaurants(result.data);
        localStorage.setItem(
          `restaurantData:${data.city}`,
          JSON.stringify(restaurantData.data)
        );
        setRestaurants(restaurantData.data);
        setCity(data.city);
        console.log(restaurants);
      }
    }
    setLoading(false);
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
              {!loading ? (
                restaurants.map((restaurant, key) => {
                  return (
                    <RestaurantCard restaurantData={restaurant} key={key} />
                  );
                })
              ) : (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
