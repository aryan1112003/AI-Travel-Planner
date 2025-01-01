import { Destination } from '../types';

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with beautiful beaches and rich culture',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    rating: 4.8,
    priceLevel: 'moderate',
    activities: ['Beach', 'Temples', 'Surfing', 'Yoga'],
    weather: {
      temp: 29,
      condition: 'sunny',
    },
  },
  {
    id: '2',
    name: 'Paris',
    country: 'France',
    description: 'City of lights and romance',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    rating: 4.7,
    priceLevel: 'luxury',
    activities: ['Museums', 'Fine Dining', 'Shopping', 'Architecture'],
    weather: {
      temp: 18,
      condition: 'partly cloudy',
    },
  },
  {
    id: '3',
    name: 'Bangkok',
    country: 'Thailand',
    description: 'Vibrant city with amazing street food and temples',
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365',
    rating: 4.5,
    priceLevel: 'budget',
    activities: ['Street Food', 'Temples', 'Markets', 'River Cruise'],
    weather: {
      temp: 32,
      condition: 'sunny',
    },
  },
];