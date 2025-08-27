
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Pet } from "../types";

// IMPORTANT: This check is to prevent crashing in environments where process.env is not defined.
// In a real-world scenario, the API key would be securely managed.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const MODEL_NAME = 'gemini-2.5-flash';

export interface AIResourceResponse {
    text: string;
    sources?: Array<{ web: { uri: string, title: string } }>;
}

const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

export const getAIBasedCarePlan = async (pet: Pet): Promise<string> => {
  if (!ai) return "AI features are disabled. Please set your API_KEY.";
  
  const petAge = calculateAge(pet.birthDate);

  try {
    const prompt = `
      Based on the following pet profile, generate a personalized care plan. 
      The plan should include recommendations for diet, exercise/activity, and a suggested grooming schedule.
      Format the output as a friendly, easy-to-read text. Be concise and practical.

      Pet Profile:
      - Name: ${pet.name}
      - Species: ${pet.species}
      - Breed: ${pet.breed}
      - Age: ${petAge} years
      - Gender: ${pet.gender}
      - Known Health Issues/Allergies: ${pet.healthRecords.filter(hr => hr.type === 'Allergy').map(a => a.title).join(', ') || 'None'}

      Generate the care plan now.
    `;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating care plan:", error);
    return "Sorry, I couldn't generate a care plan at this time. Please try again later.";
  }
};

export const getAISymptomTriage = async (pet: Pet, symptoms: string): Promise<string> => {
    if (!ai) return "AI features are disabled. Please set your API_KEY.";

    const petAge = calculateAge(pet.birthDate);
    
    try {
      const prompt = `
        Act as a helpful pet care assistant providing triage advice. THIS IS NOT A SUBSTITUTE FOR PROFESSIONAL VETERINARY ADVICE.
        A pet owner is reporting symptoms for their pet. Provide a calm, clear assessment with potential causes and a recommendation on the urgency of seeking veterinary care (e.g., "monitor at home," "schedule a vet visit soon," "seek emergency care immediately").
        
        IMPORTANT: Start your response with the disclaimer: "Disclaimer: I am an AI assistant and not a veterinarian. This advice is for informational purposes only. Please consult a licensed veterinarian for any health concerns."

        Pet Details:
        - Species: ${pet.species}
        - Breed: ${pet.breed}
        - Age: ${petAge} years

        Reported Symptoms:
        "${symptoms}"

        Provide your triage advice now.
      `;

      const response = await ai.models.generateContent({
          model: MODEL_NAME,
          contents: prompt,
          config: {
              temperature: 0.5,
          }
      });
      
      return response.text;

    } catch (error) {
        console.error("Error getting symptom triage:", error);
        return "Sorry, I couldn't analyze the symptoms at this time. If you are concerned, please contact your veterinarian.";
    }
};

export const getAIResourceInfo = async (query: string): Promise<AIResourceResponse> => {
    if (!ai) {
        return { 
            text: "AI features are disabled. Please set your API_KEY."
        };
    }

    try {
        const prompt = `
            Act as a helpful and knowledgeable pet care expert. Provide a comprehensive, easy-to-understand answer for the following query from a pet owner: "${query}".
            Structure the answer with clear headings, paragraphs, and bullet points where appropriate to make it easy to read.
            Focus on providing practical and safe advice.
            Do not repeat the user's query in your response.
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                temperature: 0.2,
            },
        });

        const sources: any[] | undefined = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

        return {
            text: response.text,
            sources: sources?.filter(s => s.web?.uri && s.web?.title),
        };
    } catch (error) {
        console.error("Error generating AI resource info:", error);
        return {
            text: "Sorry, I couldn't find information on that topic. Please try rephrasing your search or check your connection."
        };
    }
};
