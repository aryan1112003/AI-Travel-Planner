export const currencies = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.85 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.73 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 110.42 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 74.5 },
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  const from = currencies[fromCurrency as keyof typeof currencies].rate;
  const to = currencies[toCurrency as keyof typeof currencies].rate;
  return (amount / from) * to;
};