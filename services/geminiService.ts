
import { GoogleGenAI } from "@google/genai";
import type { DrivingData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development.
  // In a real environment, the API key should be securely managed.
  console.warn("API_KEY environment variable not set. Using a placeholder. AI features will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" });

export const getMileageTips = async (data: DrivingData): Promise<string> => {
  if (!API_KEY) {
    return "API Key is not configured. Please set the API_KEY environment variable.";
  }

  const prompt = `
    As a motorcycle expert focused on fuel efficiency, analyze the following riding data and provide 3-5 concise, actionable tips to improve mileage. The user is on a commuter bike.
    
    Riding Data:
    - Average Speed: ${data.speed.toFixed(1)} km/h
    - Acceleration Events (hard): ${data.acceleration.toFixed(0)} times
    - Hard Braking Events: ${data.brakes.toFixed(0)} times
    - Total Distance: ${data.distance.toFixed(2)} km

    Format the response as a simple text message. Start with a brief, encouraging summary and then list the tips.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Failed to get AI tips: ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI assistant.";
  }
};
