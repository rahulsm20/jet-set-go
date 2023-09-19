import { HotelResultsType } from "../types";


const HotelResults = ({ hotelData }:HotelResultsType) => {
  let HotelCards:JSX.Element[] = [];
  if (hotelData) {
     HotelCards = hotelData.map((hotel,key) => {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-zinc-950 rounded-xl w- transition transform duration-500  hover:drop-shadow-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:scale-105 gap-4" key={key}>
          <img src={hotel.photoMainUrl} className="rounded-t-xl lg:rounded-l-2xl lg:w-48 lg:h-52 w-full h-min" />
          <div className="flex flex-col gap-5 justify-start items-start text-left h-1/2 ">
            <p className="text-xl">{hotel.name}</p>
            <span className="font-bold text-lg">
              {hotel.priceBreakdown.grossPrice.value.toLocaleString('en-IN',{style:"currency",currency:"INR"})}
            </span>
            <div className="flex flex-col gap-2">
              <p>
                {hotel.reviewScore > 5.0 ? (
                  <span className="badge bg-green-300 text-teal-950 badge-accent py-4 text-sm">
                    {hotel.reviewScore} {hotel.reviewScoreWord}
                  </span>
                ) : (
                  <span className="badge bg-red-300 text-red-950">
                    {hotel.reviewScore} {hotel.reviewScoreWord}
                  </span>
                )}
                <span> ({hotel.reviewCount} Reviews) </span>
              </p>
              <button className="btn p-2 text-sm hover:bg-white bg-slate-200 text-black rounded-2xl normal-case">
                <div className="flex justify-center items-center gap-2">
                  Book now
                  <img src="/arrow-right.svg" className="w-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 w-2/3 gap-10">
      {HotelCards}
    </div>
  );
};

export default HotelResults;
