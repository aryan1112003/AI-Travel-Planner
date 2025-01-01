import React from 'react';
import { format } from 'date-fns';
import { GeneratedItinerary } from '../services/bardApi';
import { Download } from 'lucide-react';

interface ItineraryPreviewProps {
  itinerary: GeneratedItinerary;
  onDownload: () => void;
}

export const ItineraryPreview: React.FC<ItineraryPreviewProps> = ({ itinerary, onDownload }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Your Itinerary</h3>
        <button
          onClick={onDownload}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="space-y-6">
        {itinerary.dailyPlans.map((day, index) => (
          <div key={index} className="border-b pb-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              {format(new Date(day.date), 'EEEE, MMMM d')}
            </h4>
            <div className="space-y-3">
              {day.activities.map((activity, actIndex) => (
                <div key={actIndex} className="flex items-start">
                  <div className="text-gray-500 w-20">{activity.time}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{activity.activity}</div>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                    {activity.estimatedCost && (
                      <div className="text-sm text-gray-500 mt-1">
                        Estimated cost: ${activity.estimatedCost}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Recommendations</h4>
          <ul className="list-disc list-inside space-y-2">
            {itinerary.recommendations.map((rec, index) => (
              <li key={index} className="text-gray-600">{rec}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="text-xl font-semibold text-gray-800">
            Total Estimated Cost: ${itinerary.totalCost}
          </div>
        </div>
      </div>
    </div>
  );
};