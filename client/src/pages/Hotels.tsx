import { useState } from "react";
import HotelResults from "../components/HotelResults";
import HotelSearch from "../components/HotelSearch";
import { HotelDataType } from "../types";
import Navbar from "../components/Navbar";

const Hotels = () => {
  const [hotelData,setHotelData] = useState<HotelDataType[]>([])
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center gap-10 items-center">
        <HotelSearch setHotelData={setHotelData}/>
        <HotelResults hotelData={hotelData}/>
      </div>
    </div>
  );
};

export default Hotels;
