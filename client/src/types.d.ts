export type FlightLegDetails = {
  DepartureDateTime: string;
  ArrivalDateTime: string;
  JourneyDuration: string;
  FlightNumber: string;
  ArrivalAirport: {
    FLSLocationName: string;
    LocationCode: string;
  };
  DepartureAirport: {
    FLSLocationName: string;
    LocationCode: string;
  };
  MarketingAirline: {
    CompanyShortName: string;
  };
};

export type FlightDetailsProps = {
  flightDetails: {
    FLSArrivalCode: string;
    FLSArrivalDateTime: string;
    TotalFlightTime: string;
    TotalMiles: string;
    TotalTripTime: string;
    FLSDepartureCode: string;
    FLSDepartureDateTime: string;
    FLSArrivalName: string;
    FLSDepartureName: string;
    FlightLegDetails: FlightLegDetails[] | FlightLegDetails;
  };
};

export type RestaurantDetailsType = {
  restaurantData: {
    currentOpenStatusText: string;
    averageRating: number;
    userReviewCount: number;
    establishmentTypeAndCuisineTags: string[];
    heroImgRawHeight: number;
    heroImgRawWidth: number;
    heroImgUrl: string;
    name: string;
    priceTag: string;
  };
};

export type RootState = {
  auth: {
    isAuthenticated: boolean;
    user: {
      username: string;
      user_id: number;
    };
  };
  flightData: {
    flights: [];
  };
  hotelData: {
    hotels: HotelDataType[];
  };
};

export interface locationDataProps {
  dest_id: number;
  dest_type: string;
  city_name: string;
  image_url: string;
  hotels: string;
  [key: string]: string;
}

export type HotelDataType = {
  photoMainUrl: string;
  price: string;
  name: string;
  reviewScore: number;
  reviewScoreWord: string;
  reviewCount: number;
  priceBreakdown: {
    grossPrice: {
      value: number;
    };
  };
};

export interface HotelSearchFormProps {
  setHotelData: (data: HotelDataType[]) => void;
}

export type DestinationDataType = {
  city_name: string;
  description: string;
  image: string;
  destination_id: string;
};

export type HotelResultsType = {
  hotelData: HotelDataType[];
};

export type UserDetails = {
  username: string;
  password: string;
};
