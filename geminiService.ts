
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getShoppingAdvice = async (query: string, products: any[]) => {
  try {
    const productListString = products.map(p => `- ${p.name} (Catégorie: ${p.category}, Prix: ${p.price} FCFA)`).join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Tu es un assistant shopping expert pour une boutique de vêtements appelée AfriStyle. 
      Basé sur la demande du client: "${query}", recommande des produits parmi notre inventaire:
      ${productListString}
      
      Réponds de manière chaleureuse, courte et utilise des emojis. Suggère 1 ou 2 produits spécifiques si possible.`,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, je rencontre une petite difficulté technique. Comment puis-je vous aider autrement ?";
  }
};
