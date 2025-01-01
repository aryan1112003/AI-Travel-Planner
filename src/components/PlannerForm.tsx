import React, { useState } from 'react';
import { Destination, TripPlan } from '../types';
import { useTripStore } from '../store/useTripStore';
import { Calendar, DollarSign, Loader } from 'lucide-react';
import { generateItinerary } from '../utils/itinerary';
import { currencies } from '../utils/currency';
import { DateRangePicker } from './DateRangePicker';
import { ItineraryPreview } from './ItineraryPreview';
import { generateAIItinerary, GeneratedItinerary } from '../services/bardApi';

interface Props {
  destination: Destination;
  onClose: () => void;
}

export const PlannerForm: React.FC<Props> = ({ destination, onClose }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiItinerary, setAiItinerary] = useState<GeneratedItinerary | null>(null);
  const { addTripPlan, budget, currency } = useTripStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const generatedItinerary = await generateAIItinerary({
        destination: destination.name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget,
        currency,
        preferences: destination.activities,
      });

      setAiItinerary(generatedItinerary);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!aiItinerary) return;

    const plan: TripPlan = {
      id: Math.random().toString(),
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      budget,
      currency,
      activities: destination.activities,
      accommodation: {
        name: 'Luxury Resort & Spa',
        pricePerNight: 100,
        rating: 4.5,
      },
    };

    addTripPlan(plan);
    const pdf = generateItinerary(plan);
    pdf.save(`${destination.name}-itinerary.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Plan Your Trip to {destination.name}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ×
          </button>
        </div>

        {!aiItinerary ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Generating Itinerary...
                </>
              ) : (
                'Generate AI Itinerary'
              )}
            </button>
          </form>
        ) : (
          <ItineraryPreview 
            itinerary={aiItinerary}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};