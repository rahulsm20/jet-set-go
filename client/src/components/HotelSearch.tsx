import React, { FormEvent, useState } from "react";
import getHotels from "../api/getHotels";
import getLocation from "../api/getLocation";
import { HotelSearchFormProps, locationDataProps } from "../types";
import { useDispatch } from "react-redux";
import { setHotels } from "../store/hotelSlice";

const HotelSearchForm: React.FC<HotelSearchFormProps> = ({ setHotelData }) => {
  const dispatch = useDispatch()
  const [city, setCity] = useState("");
  const [locationData, setLocationData] = useState<locationDataProps>();
  const [formData, setFormData] = useState({
    adults_number: 0,
    categories_filter_ids: "class::2,class::4,free_cancellation::1",
    checkin_date: "",
    checkout_date: "",
    children_number: 0,
    dest_id: 0,
    dest_type: "",
    locale: "en-gb",
    room_number: "1",
    units: "metric",
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCityChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCity(value);
  };
  console.log(city);

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    try {
      const locationData = await getDestinationID(city)
      setLocationData(locationData)
      if(locationData){
        setFormData({
          ...formData,
          dest_type: locationData.dest_type,
          dest_id: locationData.dest_id,
        });
      }
      if(formData.dest_id&&formData.dest_type){
        getHotelInfo();
      }
      console.log(formData);
    } catch (err) {
      console.log(err);
    }
  };

  const getDestinationID = async (city:string) => {
    const locationData = await getLocation(city);
    console.log(locationData)
    return locationData
  };

  const getHotelInfo = async () => {
    const hotelData = await getHotels({
      adults_number: formData.adults_number,
      checkin_date: formData.checkin_date,
      dest_id: formData.dest_id,
      // children_number:formData.children_number,
      checkout_date: formData.checkout_date,
      room_number: parseInt(formData.room_number),
      dest_type: formData.dest_type,
    });
    // localStorage.setItem("hotelData", JSON.stringify(hotelData));
    setHotelData(hotelData);
    dispatch(setHotels(hotelData))
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-start p-5 mt-5 bg-zinc-950 border-2 border-zinc-800 w-2/3 mx-5 rounded-lg">
        <p className="text-2xl font-medium">Search for hotels 🏨</p>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-end flex-wrap gap-5 mt-5"
        >
          <div className="flex flex-col gap-5 justify-center items-start">
            <label htmlFor="city">City </label>
            <input
              className="input bg-black text-white border border-gray-800"
              type="text"
              id="city"
              name="city"
              value={city}
              placeholder="Enter city name"
              onChange={handleCityChange}
            />
          </div>

          <div className="flex flex-col gap-5 justify-start items-start">
            <label htmlFor="checkin_date">Check-in Date </label>
            <input
              className="input bg-black text-white border border-gray-800"
              type="date"
              id="checkin_date"
              name="checkin_date"
              value={formData.checkin_date}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-5 justify-start items-start">
            <label htmlFor="checkout_date">Check-out Date </label>
            <input
              className="input bg-black text-white border border-gray-800"
              type="date"
              id="checkout_date"
              name="checkout_date"
              value={formData.checkout_date}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-5">
            <label htmlFor="adults_number">Number of Adults </label>
            <input
              className="input bg-black text-white border border-gray-800"
              type="number"
              id="adults_number"
              name="adults_number"
              value={formData.adults_number}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-5 justify-start items-start">
            <label htmlFor="children_number">Number of Children </label>
            <input
              className="input bg-black text-white border border-gray-800"
              type="number"
              id="children_number"
              name="children_number"
              value={formData.children_number}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-5 justify-start items-start ">
            <label htmlFor="room_number">Number of rooms </label>
            <input
              className="input bg-black text-white border border-gray-800"
              type="text"
              id="room_number"
              name="room_number"
              value={formData.room_number}
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <button
              type="submit"
              className="btn normal-case btn-primary  text-white"
              onSubmit={handleSubmit}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {
        locationData ? 
        <div className="flex flex-col gap-5 justify-start items-start mt-5">
        <h1 className="">{locationData.city_name}</h1>
        <p className="flex gap-5">
          Total number of hotels
          <span>{locationData.hotels}</span>
        </p>
      </div>
      : 
      <></>
      }
    </div>
  );
};

export default HotelSearchForm;
