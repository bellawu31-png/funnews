import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const postSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    headline: {
      type: Type.STRING,
      description: "A short, catchy, viral-style headline (max 15 chars).",
    },
    caption: {
      type: Type.STRING,
      description: "An engaging Instagram caption in Traditional Chinese, Taiwan style. Include emojis.",
    },
    hashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 relevant hashtags including #FunNews.",
    },
    emoji_mood: {
        type: Type.STRING,
        description: "A single emoji representing the mood of the post."
    }
  },
  required: ["headline", "caption", "hashtags", "emoji_mood"],
};

export const generateViralPost = async (topic: string): Promise<GeneratedContent> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a fun, viral, entertainment-news style Instagram post about: "${topic}". 
      The tone should be energetic, young, and tailored for a Taiwanese audience (Traditional Chinese). 
      Make it sound like an EBC Fun News editor wrote it.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: postSchema,
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response from Gemini");
    }
    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Error generating post:", error);
    // Fallback content in case of error
    return {
      headline: "AI 休息中...",
      caption: "小編的 AI 助手去喝咖啡了，請稍後再試！ ☕️",
      hashtags: ["#系統忙碌", "#稍後再試"],
      emoji_mood: "🤖"
    };
  }
};