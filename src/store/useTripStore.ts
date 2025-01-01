import { create } from 'zustand';
import { TripPlan, Destination } from '../types';
import { mockDestinations } from '../data/mockData';
import { currencies } from '../utils/currency';

interface TripStore {
  destinations: Destination[];
  filteredDestinations: Destination[];
  selectedDestination: Destination | null;
  tripPlans: TripPlan[];
  budget: number;
  currency: string;
  setDestinations: (destinations: Destination[]) => void;
  setSelectedDestination: (destination: Destination | null) => void;
  addTripPlan: (plan: TripPlan) => void;
  setBudget: (budget: number) => void;
  setCurrency: (currency: string) => void;
  filterDestinationsByBudget: () => void;
  filterDestinationsBySearch: (searchTerm: string) => void;
}

export const useTripStore = create<TripStore>((set, get) => ({
  destinations: mockDestinations,
  filteredDestinations: mockDestinations,
  selectedDestination: null,
  tripPlans: [],
  budget: 0,
  currency: 'USD',
  
  setDestinations: (destinations) => set({ destinations, filteredDestinations: destinations }),
  setSelectedDestination: (destination) => set({ selectedDestination: destination }),
  addTripPlan: (plan) => set((state) => ({ tripPlans: [...state.tripPlans, plan] })),
  
  setBudget: (budget) => {
    set({ budget });
    get().filterDestinationsByBudget();
  },
  
  setCurrency: (currency) => {
    set({ currency });
    get().filterDestinationsByBudget();
  },
  
  filterDestinationsByBudget: () => {
    const { destinations, budget, currency } = get();
    if (budget <= 0) {
      set({ filteredDestinations: destinations });
      return;
    }

    const usdBudget = budget / currencies[currency as keyof typeof currencies].rate;
    const filtered = destinations.filter((dest) => {
      if (usdBudget <= 1000) return dest.priceLevel === 'budget';
      if (usdBudget <= 3000) return dest.priceLevel === 'moderate';
      return true;
    });
    
    set({ filteredDestinations: filtered });
  },

  filterDestinationsBySearch: (searchTerm) => {
    const { destinations, budget } = get();
    if (!searchTerm.trim()) {
      get().filterDestinationsByBudget();
      return;
    }

    const filtered = destinations.filter(
      (dest) =>
        (dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
         dest.activities.some(activity => 
           activity.toLowerCase().includes(searchTerm.toLowerCase())
         ))
    );
    
    set({ filteredDestinations: filtered });
  },
}));