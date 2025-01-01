import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { TripPlan } from '../types';
import { currencies } from './currency';

export const generateItinerary = (tripPlan: TripPlan) => {
  const pdf = new jsPDF();
  const currency = currencies[tripPlan.currency as keyof typeof currencies];

  pdf.setFontSize(20);
  pdf.text('Travel Itinerary', 20, 20);
  
  pdf.setFontSize(12);
  pdf.text(`Generated on ${format(new Date(), 'PPP')}`, 20, 30);
  
  pdf.setFontSize(16);
  pdf.text(`Trip to ${tripPlan.destination.name}, ${tripPlan.destination.country}`, 20, 45);
  
  pdf.setFontSize(12);
  pdf.text(`Dates: ${format(tripPlan.startDate, 'PPP')} - ${format(tripPlan.endDate, 'PPP')}`, 20, 60);
  pdf.text(`Budget: ${currency.symbol}${tripPlan.budget}`, 20, 70);
  
  pdf.text('Activities:', 20, 85);
  tripPlan.activities.forEach((activity, index) => {
    pdf.text(`• ${activity}`, 25, 95 + (index * 10));
  });
  
  pdf.text('Accommodation:', 20, 95 + (tripPlan.activities.length * 10) + 10);
  pdf.text(`${tripPlan.accommodation.name}`, 25, 95 + (tripPlan.activities.length * 10) + 20);
  pdf.text(`Price per night: ${currency.symbol}${tripPlan.accommodation.pricePerNight}`, 25, 95 + (tripPlan.activities.length * 10) + 30);
  pdf.text(`Rating: ${tripPlan.accommodation.rating}/5`, 25, 95 + (tripPlan.activities.length * 10) + 40);
  
  // Add watermark
  pdf.setTextColor(200);
  pdf.setFontSize(24);
  pdf.text('Created by Aryan Acharya', 50, 150, { angle: 45 });
  
  return pdf;
};