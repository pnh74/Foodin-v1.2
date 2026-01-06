import { GoogleGenAI } from "@google/genai";

const getClient = (): GoogleGenAI => {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
        console.warn("Gemini API Key is missing. AI features will respond with mock data.");
    }
    return new GoogleGenAI({ apiKey });
};

export const getAIRecommendation = async (query: string, context: string): Promise<string> => {
    const apiKey = process.env.API_KEY;
    
    // Fallback if no API key is present (for demo robustness)
    if (!apiKey) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("I see you're looking for something special! Based on your location in District 1, I'd highly recommend trying **Cục Gạch Quán** for an authentic family meal, or **Pizza 4P's** if you're craving some cheesy goodness. Would you like more details on either?");
            }, 1000);
        });
    }

    try {
        const ai = getClient();
        const model = "gemini-3-flash-preview"; 
        
        const systemInstruction = `You are Foodin AI, a helpful and witty culinary concierge for Vietnam. 
        You help users decide what to eat. Keep answers concise, fun, and helpful. 
        Context provided: ${context}.
        Format your response with bold text for restaurant names.`;

        const response = await ai.models.generateContent({
            model,
            contents: [{
                role: 'user',
                parts: [{ text: query }]
            }],
            config: {
                systemInstruction: systemInstruction,
            }
        });

        return response.text || "I couldn't find a recommendation right now, try swiping!";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm having trouble connecting to the food universe right now. Try again in a moment!";
    }
};