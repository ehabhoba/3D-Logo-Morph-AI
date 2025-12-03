import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Note: In a production environment, you should handle key rotation or backend proxying.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a 3D transformation of a 2D logo using Gemini.
 * @param base64Image The base64 encoded string of the source logo (without data prefix).
 * @param mimeType The mime type of the source image.
 * @param stylePrompt The specific prompt instruction for the desired style.
 * @param removeBackground Whether to instruct the model to isolate the logo from its original background.
 * @returns The base64 string of the generated image.
 */
export const generate3DLogo = async (
  base64Image: string,
  mimeType: string,
  stylePrompt: string,
  removeBackground: boolean
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash-image'; // Using the standard flash image model for editing tasks
    
    let instructions = `You are an expert 3D graphic designer and product photographer. 
    YOUR TASK: ${stylePrompt}
    
    Instructions for processing the input image:
    1. Identify the core symbol/text of the provided logo.
    `;

    if (removeBackground) {
      instructions += `
      2. IGNORE the original background of the input image. Isolate the logo design completely.
      3. INTEGRATE the logo into the requested scene naturally. Match the perspective, lighting, shadows, and texture of the mockup surface (e.g., if it's a wall, show depth; if it's fabric, follow the folds).
      `;
    } else {
      instructions += `
      2. Use the entire image composition as a reference, but prioritize transforming the style to the requested mockup.
      `;
    }

    instructions += `\nOutput a high-resolution, photorealistic image.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: instructions,
          },
        ],
      },
    });

    // Iterate through parts to find the image as per SDK guidelines
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }

    throw new Error("No image data found in the response.");

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};