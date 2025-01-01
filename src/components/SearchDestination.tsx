import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useTripStore } from '../store/useTripStore';

export const SearchDestination: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { filterDestinationsBySearch } = useTripStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterDestinationsBySearch(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search destinations..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 pl-10 bg-white/10 backdrop-blur-md rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
      />
      <Search className="absolute left-3 top-2.5 w-5 h-5 text-white/70" />
    </div>
  );
};