import axios from "axios";

interface HotelSearchParams {
  adults_number: number;
  checkin_date: string;
  dest_id: number;
  checkout_date: string;
  room_number: number;
  dest_type: string;
}

const getHotels = async({adults_number,checkin_date,dest_id,checkout_date,room_number,dest_type}:HotelSearchParams) => {
  
  const options = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v2/hotels/search",
    params: {
      order_by: "popularity",
      adults_number: adults_number,
      checkin_date: checkin_date,
      filter_by_currency: "INR",
      dest_id: dest_id,
      locale: "en-gb",
      checkout_date: checkout_date,
      units: "metric",
      room_number: room_number,
      dest_type: dest_type,
      include_adjacency: "true",
      // children_number:children_number,
      page_number: 0,
      categories_filter_ids: "class::2,class::4,free_cancellation::1",
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_HOTEL_API_KEY,
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export default getHotels