import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_BARD_API_KEY);

export interface ItineraryRequest {
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  currency: string;
  preferences?: string[];
}

export interface GeneratedItinerary {
  dailyPlans: Array<{
    date: string;
    activities: Array<{
      time: string;
      activity: string;
      description: string;
      estimatedCost?: number;
    }>;
  }>;
  totalCost: number;
  recommendations: string[];
}

export async function generateAIItinerary(request: ItineraryRequest): Promise<GeneratedItinerary> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Create a detailed travel itinerary for ${request.destination} from ${request.startDate.toLocaleDateString()} to ${request.endDate.toLocaleDateString()} with a budget of ${request.currency} ${request.budget}. Include daily activities, estimated costs, and local recommendations. Consider these preferences: ${request.preferences?.join(', ') || 'general tourism'}.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the AI response into structured data
    // This is a simplified version - you'll need to adjust based on actual AI output format
    return parseAIResponse(text);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate itinerary');
  }
}

function parseAIResponse(text: string): GeneratedItinerary {
  // Implement parsing logic based on the actual AI response format
  // This is a placeholder implementation
  return {
    dailyPlans: [],
    totalCost: 0,
    recommendations: []
  };
}