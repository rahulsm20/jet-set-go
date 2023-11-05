import { RestaurantDetailsType } from "../types";
import { parseImageUrl } from "../utils";
const RestaurantCard = ({ restaurantData }: RestaurantDetailsType) => {
  const tags = restaurantData.establishmentTypeAndCuisineTags;
  const imageURL = parseImageUrl(restaurantData.heroImgUrl)
  return (
    <div className="bg-zinc-950 flex flex-col gap-5 rounded-2xl shadow-md hover:shadow-primary transition transform duration-500 hover:-translate-y-1 hover:scale-105 h-98 text-xs">
      <img src={imageURL} className="rounded-t-2xl h-1/2 " />
      <div className="p-5 flex flex-col gap-5">
        <div className="flex justify-between">
          <p className="text-xl font-bold">{restaurantData.name}</p>
        </div>
        <div className="justify-between items-center gap-5 flex text-xs">
          <p className="text-medium font-bold">{restaurantData.priceTag}</p>
          <div className="flex justify-center items-center gap-2">
            <p className="badge p-3 flex gap-2">
              {restaurantData.averageRating}
              <img src="/star.png" className="w-3" />
            </p>
            <span>{restaurantData.userReviewCount} Reviews</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag,key) => {
            return <p className="badge bg-primary text-white p-4 text-xs" key={key}>{tag}</p>;
          })}
        </div>
        
          {restaurantData.currentOpenStatusText && restaurantData.currentOpenStatusText == "Closed Now" ? (
            <span className="badge bg-red-700 p-4 text-white">
              {restaurantData.currentOpenStatusText}
            </span>
          ) : (
            <span className="badge bg-green-500 p-4 text-white">
              {restaurantData.currentOpenStatusText}
            </span>
          )}
      </div>
    </div>
  );
};

export default RestaurantCard;
