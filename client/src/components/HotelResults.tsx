import { HotelResultsType } from "../types";


const HotelResults = ({ hotelData }:HotelResultsType) => {
  let HotelCards:JSX.Element[] = [];
  if (hotelData) {
     HotelCards = hotelData.map((hotel,key) => {
      return (
        <div className="grid grid-cols-1 bg-zinc-950 rounded-xl text-xs transition transform duration-500  hover:drop-shadow-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:scale-105 hover:border border-gray-400" key={key}>
          <img src={hotel.photoMainUrl} className="rounded-t-xl lg:rounded-t-2xl lg:w-full lg:h-48 w-full h-64" />
          <div className="flex flex-col gap-2 justify-start items-start text-left h-1/2 p-4" id="description">
            <p className="text-sm font-semibold">{hotel.name}</p>
            <span className="font-bold text-blue-500">
              {hotel.priceBreakdown.grossPrice.value.toLocaleString('en-US',{style:"currency",currency:"USD"})}
            </span>
            <div className="flex flex-col gap-2">
              <p>
                {hotel.reviewScore > 5.0 ? (
                  <span className="badge bg-green-300 text-teal-950 badge-accent py-4 text-xs font-bold">
                    {hotel.reviewScore} {hotel.reviewScoreWord}
                  </span>
                ) : (
                  <span className="badge bg-red-300 text-red-950">
                    {hotel.reviewScore} {hotel.reviewScoreWord}
                  </span>
                )}
                <span> ({hotel.reviewCount} Reviews) </span>
              </p>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-3/4 gap-10 p-10">
      {HotelCards}
    </div>
  );
};

export default HotelResults;
