
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export const generateImage = async (prompt: string, aspectRatio: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png',
              aspectRatio: aspectRatio as AspectRatio,
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return base64ImageBytes;
        } else {
            throw new Error('No images were generated. The prompt may have been blocked.');
        }
    } catch (error) {
        console.error("Error generating image with Gemini API:", error);
        throw new Error("Failed to generate image. Please check your prompt or API key.");
    }
};

export const upscaleImage = async (base64ImageDataUrl: string): Promise<string> => {
    try {
        const [header, base64Data] = base64ImageDataUrl.split(',');
        if (!header || !base64Data) {
            throw new Error('Invalid base64 image data URL format.');
        }

        const mimeTypeMatch = header.match(/:(.*?);/);
        if (!mimeTypeMatch || !mimeTypeMatch[1]) {
            throw new Error('Could not determine MIME type from data URL.');
        }
        const mimeType = mimeTypeMatch[1];
        
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType,
            },
        };
        const textPart = {
            text: 'Upscale this image, increasing its resolution and enhancing details without altering the content.',
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [imagePart, textPart],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }

        throw new Error('No upscaled image was returned. The operation may have been blocked.');

    } catch (error) {
        console.error("Error upscaling image with Gemini API:", error);
        throw new Error("Failed to upscale image. Please try again.");
    }
};
