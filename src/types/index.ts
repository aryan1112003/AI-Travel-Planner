export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  rating: number;
  priceLevel: 'budget' | 'moderate' | 'luxury';
  activities: string[];
  weather: {
    temp: number;
    condition: string;
  };
}

export interface TripPlan {
  id: string;
  destination: Destination;
  startDate: Date;
  endDate: Date;
  budget: number;
  currency: string;
  activities: string[];
  accommodation: {
    name: string;
    pricePerNight: number;
    rating: number;
  };
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}