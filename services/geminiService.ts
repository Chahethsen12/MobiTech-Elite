
import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly as per guidelines.
export const getAiShoppingAssistantResponse = async (userPrompt: string, productContext: string) => {
  // Initialize a new instance for each call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert mobile phone salesperson for "MobiTech Elite".
      
      Product Context (Our Catalog):
      ${productContext}
      
      User asks: ${userPrompt}
      
      Provide a helpful, professional response. Suggest specific models from the catalog if relevant. Use bullet points for specs. Use search grounding if you need current info about new releases not in context.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    let text = response.text || "I'm sorry, I couldn't process that request.";

    // MUST extract and list website URLs from groundingChunks when using Google Search.
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
      const sources = chunks
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri && web.title)
        .map((web: any) => `* [${web.title}](${web.uri})`)
        .join('\n');
      
      if (sources) {
        text += `\n\n**Web Sources:**\n${sources}`;
      }
    }

    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong while talking to the AI assistant.";
  }
};
