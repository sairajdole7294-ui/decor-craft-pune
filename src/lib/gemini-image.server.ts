import { createServerFn } from "@tanstack/react-start";
import fs from "node:fs";
import path from "node:path";

function loadDevVars(): Record<string, string> {
  const filePath = path.join(process.cwd(), ".dev.vars");
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf-8");
  const result: Record<string, string> = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key) result[key] = value;
  }
  return result;
}

export const generateAIVisualization = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const env = { ...process.env, ...loadDevVars() };
    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey) {
      return { success: false, message: "AI visualization is temporarily unavailable. Please try again later." };
    }

    try {
      const { imageData, spaceType, description } = ctx.data as any;

      if (!imageData || !spaceType || !description) {
        return { success: false, message: "Missing required information. Please upload an image, select a space type, and describe your requirements." };
      }

      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      if (!base64Data || base64Data.length < 100) {
        return { success: false, message: "Please upload a valid room or space image." };
      }

      const prompt = `You are an interior design visualization AI. Your task is to edit the uploaded ${spaceType} image by adding furniture and interior elements based on the user's description.

CRITICAL RULES:
1. Preserve the existing room structure, walls, flooring, ceiling, windows, doors, and architecture unless explicitly asked to change them.
2. Match the camera perspective, lighting direction, and overall geometry of the original photograph.
3. Add furniture with realistic scale, proportions, shadows, and materials that look physically placed in the room.
4. Do NOT randomly redesign the entire room.
5. Do NOT remove major architectural elements unless explicitly requested.
6. Do NOT invent unrelated furniture.

User requirements: ${description}`;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key=" + apiKey,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  { inlineData: { mimeType: "image/jpeg", data: base64Data } },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 429 || errorText.toLowerCase().includes("quota")) {
          return { success: false, message: "AI visualization is temporarily unavailable. Please try again later." };
        }
        return { success: false, message: "We couldn't create the visualization this time. Please try again." };
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const parts = candidate?.content?.parts || [];
      const imagePart = parts.find((part: any) => part.inlineData?.data);

      if (!imagePart?.inlineData?.data) {
        return { success: false, message: "We couldn't create the visualization this time. Please try again." };
      }

      return {
        success: true,
        image: `data:${imagePart.inlineData.mimeType || "image/png"};base64,${imagePart.inlineData.data}`,
      };
    } catch (error) {
      return { success: false, message: "We couldn't create the visualization this time. Please try again." };
    }
  });
