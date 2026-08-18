import { createServerFn } from "@tanstack/react-start";
import fs from "node:fs";
import path from "node:path";
import { catalogProducts } from "@/lib/catalog-data";
import { allProducts } from "@/data/productRangeData";
import { allProducts as categoryProducts } from "@/data/productCategoriesData";
import { allSolutions } from "@/data/industrySolutionsData";

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

type ShopProduct = {
  name: string;
  image: string;
  desc: string;
  url: string;
  category: string;
  type?: string;
  series?: string;
  applications?: string[];
  materials?: string[];
};

const shopCatalog: ShopProduct[] = [];

for (const p of catalogProducts) {
  shopCatalog.push({
    name: p.name,
    image: p.images[0] || "",
    desc: p.tagline || p.desc,
    url: `/products/${p.slug}`,
    category: p.category,
    type: p.type,
    series: p.series,
    applications: p.applications,
    materials: p.materials,
  });
}

for (const p of categoryProducts) {
  shopCatalog.push({
    name: p.name,
    image: p.image,
    desc: p.desc,
    url: `/product-categories/${p.slug}`,
    category: p.type || "general",
    type: p.type,
    series: p.series,
  });
}

for (const p of allProducts) {
  shopCatalog.push({
    name: p.name,
    image: p.image,
    desc: p.desc,
    url: `/products/${p.id}`,
    category: p.category,
    series: p.series,
  });
}

for (const solution of allSolutions) {
  for (const p of solution.products) {
    shopCatalog.push({
      name: p.name,
      image: p.image || "",
      desc: p.desc || "",
      url: `/industries/${solution.key}/${p.slug}`,
      category: solution.collectionName,
    });
  }
}

const uniqueCatalog = Array.from(new Map(shopCatalog.map(p => [p.name + p.url, p])).values());

console.log("[ShopAI] Catalogue loaded. Total products:", uniqueCatalog.length);

const QUERY_TO_CATEGORIES: Record<string, string[]> = {
  bedroom: ["residential", "hostel", "modular-wardrobe", "general"],
  bed: ["residential", "hostel", "modular-wardrobe", "general"],
  wardrobe: ["residential", "hostel", "modular-wardrobe", "general"],
  mattress: ["residential", "hostel", "general"],
  bedside: ["residential", "hostel", "general"],
  study: ["hostel", "residential", "education-furniture", "general"],
  kitchen: ["modular-kitchen", "modular-interiors", "residential", "general"],
  modular: ["modular-kitchen", "modular-wardrobe", "modular-interiors", "general"],
  office: ["office-workstations", "corporate-office", "technical-furniture", "general"],
  workstation: ["office-workstations", "corporate-office", "technical-furniture", "general"],
  desk: ["office-workstations", "corporate-office", "technical-furniture", "general"],
  chair: ["office-workstations", "corporate-office", "general"],
  ergonomic: ["office-workstations", "corporate-office", "general"],
  conference: ["conference table", "corporate-office", "general"],
  meeting: ["corporate-office", "general"],
  table: ["tables and cupboards", "corporate-office", "residential", "general"],
  hostel: ["hostel", "general"],
  pg: ["hostel", "general"],
  bunk: ["hostel", "general"],
  reception: ["corporate-office", "general"],
  retail: ["retail-space", "general"],
  display: ["retail-space", "general"],
  shelf: ["retail-space", "storage solutions", "general"],
  supermarket: ["retail-space", "general"],
  living: ["residential", "corporate-office", "general"],
  sofa: ["residential", "hostel", "corporate-office", "general"],
  tv: ["residential", "corporate-office", "general"],
  storage: ["storage solutions", "general", "modular-interiors"],
  cabinet: ["storage solutions", "general", "modular-interiors"],
  locker: ["hostel", "general"],
  lab: ["lab-workstations", "technical-furniture", "general"],
  laboratory: ["lab-workstations", "technical-furniture", "general"],
  school: ["school-bench", "education-furniture", "general"],
  education: ["education-furniture", "school-bench", "general"],
  esd: ["esd-workstation", "technical-furniture", "general"],
  partition: ["corporate-office", "modular-interiors", "general"],
  cafeteria: ["hostel", "residential", "general"],
  dining: ["residential", "hostel", "general"],
};

const CATEGORY_ALIASES: Record<string, string> = {
  "office-workstations": "office-workstations",
  "corporate-office": "corporate-office",
  "modular-kitchen": "modular-kitchen",
  "modular-wardrobe": "modular-wardrobe",
  "modular-interiors": "modular-interiors",
  "technical-furniture": "technical-furniture",
  "education-furniture": "education-furniture",
  "lab-workstations": "lab-workstations",
  "esd-workstation": "esd-workstation",
  "school-bench": "school-bench",
  "retail-space": "retail-space",
  "hostel": "hostel",
  "residential": "residential",
  "conference table": "conference table",
  "tables and cupboards": "tables and cupboards",
  "storage solutions": "storage solutions",
  "general": "general",
  "esd workstations": "esd-workstation",
  "school bench": "school-bench",
  "suppliers of chairs and tables": "suppliers of chairs and tables",
  "laboratory": "laboratory",
  "conference tables": "conference table",
  "storage": "storage solutions",
  "workstations": "office-workstations",
  "chairs": "chairs",
  "tables": "tables",
  "seating": "seating",
};

function getRelevantCategories(query: string): string[] {
  const lower = query.toLowerCase();
  const words = lower.split(/[^a-z0-9]+/).filter(w => w.length > 2);
  const categorySet = new Set<string>();

  for (const word of words) {
    if (QUERY_TO_CATEGORIES[word]) {
      for (const cat of QUERY_TO_CATEGORIES[word]) {
        categorySet.add(cat);
      }
    }
  }

  return Array.from(categorySet);
}

function buildFilteredCatalog(query: string): ShopProduct[] {
  const relevantCategories = getRelevantCategories(query);

  if (relevantCategories.length === 0) {
    console.log("[ShopAI] No relevant categories found for query:", query);
    return uniqueCatalog.slice(0, 40);
  }

  const normalizedRelevant = new Set(
    relevantCategories.map(c => CATEGORY_ALIASES[c] || c)
  );

  const filtered = uniqueCatalog.filter(p => {
    const productCat = (p.category || "").toLowerCase();
    const productType = (p.type || "").toLowerCase();
    const productSeries = (p.series || "").toLowerCase();

    for (const cat of normalizedRelevant) {
      const lowerCat = cat.toLowerCase();
      if (
        productCat.includes(lowerCat) ||
        productType.includes(lowerCat) ||
        productSeries.includes(lowerCat) ||
        lowerCat.includes(productCat) ||
        lowerCat.includes(productType) ||
        lowerCat.includes(productSeries)
      ) {
        return true;
      }
    }
    return false;
  }).slice(0, 40);

  console.log("[ShopAI] Filtered catalogue for query:", query, "| Categories:", relevantCategories, "| Filtered count:", filtered.length);

  return filtered;
}

function buildCatalogText(products: ShopProduct[]): string {
  return products
    .map(
      (p, i) =>
        `${i + 1}. ${p.name} | Category: ${p.category} | Type: ${p.type || "N/A"} | Desc: ${p.desc.slice(0, 60)}`
    )
    .join("\n");
}

export const generateShopAI = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const env = { ...process.env, ...loadDevVars() };
    const apiKey = env.SHOP_AI_GEMINI_API_KEY;

    if (!apiKey) {
      console.log("[ShopAI] API key missing");
      return { success: false, message: "Shop with AI is temporarily unavailable. Please try again later." };
    }

    try {
      const { query } = ctx.data as any;

      if (!query || typeof query !== "string" || query.trim().length < 3) {
        return { success: false, message: "Please describe what furniture or interior solution you need." };
      }

      const trimmedQuery = query.trim();
      const relevantCategories = getRelevantCategories(trimmedQuery);
      let filteredCatalog = buildFilteredCatalog(trimmedQuery);
      const catalogText = buildCatalogText(filteredCatalog);

      if (filteredCatalog.length === 0 && uniqueCatalog.length > 0) {
        console.log("[ShopAI] Filtered catalogue empty, falling back to full catalogue");
        filteredCatalog = uniqueCatalog.slice(0, 40);
      }

      if (uniqueCatalog.length === 0) {
        console.log("[ShopAI] CRITICAL: Empty product catalogue");
        return { success: false, message: "Product catalogue is temporarily unavailable. Please try again later." };
      }

      const prompt = `You are a product matching assistant for Payal Decor, a commercial interiors and furniture company in Pune, India.

The user is shopping for: "${trimmedQuery}"

${relevantCategories.length > 0 ? `Relevant categories for this query: ${relevantCategories.join(", ")}\n\n` : ""}
Here is a filtered Payal Decor product catalogue (name, category, type and short description):

${catalogText}

Your task:
1. Understand what the user is looking for from their description.
2. Find the EXACT product names from the catalogue above that best match the user's requirement.
3. Return ONLY a valid JSON array of product names. Example:
["Product Name 1", "Product Name 2", "Product Name 3"]
4. Return at most 6 products.
5. Do NOT invent products. Only use names exactly as they appear in the catalogue above.
6. If no product matches well, return an empty array [].
7. Do NOT include any text outside the JSON array.`;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=" + apiKey,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 429 || errorText.toLowerCase().includes("quota")) {
          console.log("[ShopAI] Gemini quota exceeded");
          return { success: false, message: "Shop with AI is temporarily unavailable. Please try again later." };
        }
        return { success: false, message: "We couldn't find matches this time. Please try again." };
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const parts = candidate?.content?.parts || [];
      const textPart = parts.find((part: any) => part.text);

      if (!textPart?.text) {
        console.log("[ShopAI] Gemini returned no text");
        return { success: false, message: "We couldn't find matches this time. Please try again." };
      }

      let matchedNames: string[] = [];
      try {
        let text = textPart.text.replace(/```json/g, "").replace(/```/g, "").trim();
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          matchedNames = JSON.parse(jsonMatch[0]);
          if (!Array.isArray(matchedNames)) matchedNames = [];
        } else {
          console.log("[ShopAI] No JSON array found in Gemini response");
          return { success: false, message: "We couldn't find matches this time. Please try again." };
        }
      } catch {
        console.log("[ShopAI] Failed to parse Gemini JSON response");
        return { success: false, message: "We couldn't find matches this time. Please try again." };
      }

      console.log("[ShopAI] Gemini returned names:", matchedNames);

      const matchedProducts = matchedNames
        .map(name => uniqueCatalog.find(p => p.name.toLowerCase() === name.toLowerCase()))
        .filter((p): p is ShopProduct => Boolean(p))
        .slice(0, 6);

      if (matchedProducts.length === 0 && matchedNames.length > 0) {
        console.log("[ShopAI] Gemini returned names but none matched catalogue:", matchedNames);
      }

      if (matchedProducts.length === 0) {
        return { success: false, message: "No exact matches found. Try describing your requirement with more details like room type, furniture type, or material." };
      }

      console.log("[ShopAI] Returning", matchedProducts.length, "matched products");

      return {
        success: true,
        query: trimmedQuery,
        products: matchedProducts.map(p => ({
          name: p.name,
          image: p.image,
          desc: p.desc,
          url: p.url,
          category: p.category,
          type: p.type,
          series: p.series,
          applications: p.applications,
          materials: p.materials,
        })),
      };
    } catch (error) {
      console.log("[ShopAI] Handler error:", error);
      return { success: false, message: "We couldn't find matches this time. Please try again." };
    }
  });
