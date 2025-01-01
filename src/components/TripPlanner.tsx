import React, { useState } from 'react';
import { useTripStore } from '../store/useTripStore';
import { DestinationCard } from './DestinationCard';
import { PlannerForm } from './PlannerForm';
import { CurrencySelector } from './CurrencySelector';
import { SearchDestination } from './SearchDestination';
import { Footer } from './Footer';
import { Globe2, DollarSign } from 'lucide-react';

export const TripPlanner: React.FC = () => {
  const { filteredDestinations, selectedDestination, setSelectedDestination, budget, setBudget } = useTripStore();
  const [showForm, setShowForm] = useState(false);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    if (value >= 0) {
      setBudget(value);
    }
  };

  const handleDestinationClick = (destination: any) => {
    setSelectedDestination(destination);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <Globe2 className="w-12 h-12 mr-4 text-blue-200" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              AI Travel Planner
            </h1>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            <SearchDestination />
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-lg p-3">
              <div className="flex-1 flex items-center bg-white rounded-lg p-2">
                <DollarSign className="text-gray-400 w-6 h-6" />
                <input
                  type="number"
                  min="0"
                  placeholder="Enter your budget"
                  className="w-full px-3 py-2 outline-none"
                  value={budget || ''}
                  onChange={handleBudgetChange}
                />
              </div>
              <CurrencySelector />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        {showForm && selectedDestination ? (
          <PlannerForm 
            destination={selectedDestination}
            onClose={() => {
              setShowForm(false);
              setSelectedDestination(null);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onClick={() => handleDestinationClick(destination)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};