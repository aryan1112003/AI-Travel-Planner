import React from 'react';
import { Destination } from '../types';
import { MapPin, Star, ThermometerSun } from 'lucide-react';

interface Props {
  destination: Destination;
  onClick: () => void;
}

export const DestinationCard: React.FC<Props> = ({ destination, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img 
        src={destination.imageUrl} 
        alt={destination.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{destination.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="ml-1">{destination.rating}</span>
          </div>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{destination.country}</span>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <ThermometerSun className="w-4 h-4 mr-1" />
          <span>{destination.weather.temp}°C - {destination.weather.condition}</span>
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2">{destination.description}</p>
        <div className="mt-3">
          <span className={`inline-block px-2 py-1 rounded-full text-sm ${
            destination.priceLevel === 'budget' ? 'bg-green-100 text-green-800' :
            destination.priceLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {destination.priceLevel}
          </span>
        </div>
      </div>
    </div>
  );
};