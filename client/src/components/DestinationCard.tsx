import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DestinationDataType } from "../types";
import RestaurantCard from "./RestaurantCard";

const DestinationCard = () => {
  const { destinationId } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [destinationData, setDestinationData] = useState<DestinationDataType>({
    city_name: "",
    description: "",
    destination_id: "",
    image: "",
  });
  const fetchRestaurants = async (city: string) => {
    if (city) {
      try {
        const result = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/api/location/" + city
        );
        console.log(result);
        const restaurantData = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/api/restaurants/" + result.data
        );
        setRestaurants(restaurantData.data);
        // localStorage.setItem(
        //     "restaurantData",
        //     JSON.stringify(restaurantData.data)
        // );
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    }
  };

  useEffect(() => {
    const getDestination = async () => {
      const result = await axios.get(
        import.meta.env.VITE_SERVER_URL +
          "/api/popular_destinations/" +
          destinationId
      );
      setDestinationData(result.data);
    };
    getDestination();
    fetchRestaurants(destinationData.city_name);
  }, [destinationData.city_name, destinationId]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col bg-zinc-950 border-2 border-zinc-700 justify-center items-start mt-10 gap-2 w-2/3 lg:w-2/4 rounded-2xl">
        <div className="flex justify-end">
          <p className="md:text-5xl italic font-light absolute p-2 md:p-5 text-black bg-white rounded-l-2xl rounded-t-2xl">
            {destinationData.city_name}
          </p>
          <img src={destinationData.image} className=" rounded-t-xl" />
        </div>
        <p className="p-5">{destinationData.description}</p>
      </div>
      <div className="lg:p-40 mt-2 mx-10">
        {destinationData.city_name ? (
          <p className="text-2xl font-medium">
            Restaurants in {destinationData.city_name}
          </p>
        ) : (
          <></>
        )}
        {restaurants.length === 0 ? (
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
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3 lg:gap-24 mt-10">
            {restaurants.map((restaurant, key) => {
              return <RestaurantCard restaurantData={restaurant} key={key} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;
