import React from 'react';
import { currencies } from '../utils/currency';
import { useTripStore } from '../store/useTripStore';

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useTripStore();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="px-3 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {Object.entries(currencies).map(([code, { name }]) => (
        <option key={code} value={code}>
          {code} - {name}
        </option>
      ))}
    </select>
  );
};