import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `NEXT_PUBLIC_GEMINI_API_KEY`.

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
// Your custom Q&A knowledge base device repair service
const knowledgeBase = `
- We offer device repair services for smartphones, tablets, and laptops.
- Our service fee starts at $50.
- Response time is typically under 2 hours.
- We provide a 90-day warranty on all repairs.
- We are located in downtown and offer both in-store and on-site repair options.
- Our technicians are certified and have over 5 years of experience in device repair.
- We use only high-quality replacement parts for all repairs.
- location: 123 Repair Street, Tech City, TC 12345.
- Hours: Monday to Friday, 9 AM to 6 PM, and Saturday from 10 AM to 4 PM. We are closed on Sundays and public holidays.
- Contacts: (123) 456-7890 or email at info@servicepulsehub.com.
`;
async function getChatbotResponse({ prompt }) {
  console.log("Received prompt for chatbot:", prompt);
  const systemPrompt = `You are the official ServicePulseHub Assistant. STRICT LIMIT: Use ONLY the following information to answer:\n${knowledgeBase}\nIf a user asks about something else, politely tell them you can only assist with ServicePulseHub inquiries. Be helpful, professional, and concise.`;
  const fullPrompt = `System: ${systemPrompt}\nUser: ${prompt}\n`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: fullPrompt,
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.3,
      },
    });

    console.log("Full response object:", response);
    const text = response.text;
    console.log("Generated content:", text);
    return text;
  } catch (error) {
    console.error("Chatbot API Error:", error.message);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}

export { getChatbotResponse };
