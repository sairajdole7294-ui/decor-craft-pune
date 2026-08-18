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

const PAYAL_PRODUCTS = [
  { name: "Lobby Sofa Set", category: "hostel", industrySlug: "hostel", slug: "lobby-sofa-set", image: "/media/industries/hostel/Lobby Sofa Set-hostel and pg.jpg", desc: "Comfortable seating arrangement designed for hostel and PG lobbies, reception areas and common spaces.", keywords: ["sofa", "lobby", "seating", "lounge", "waiting", "reception"] },
  { name: "Restaurant Chair", category: "hostel", industrySlug: "hostel", slug: "restaurant-chair", image: "/media/industries/hostel/cafeteria-chairs.jpg", desc: "Ergonomic dining chair built for hostel and PG mess halls, cafeterias and dining areas.", keywords: ["chair", "dining", "cafeteria", "mess", "restaurant"] },
  { name: "Hotel Room Desk", category: "hostel", industrySlug: "hostel", slug: "hotel-room-desk", image: "/media/industries/hostel/bed-with-integrated-study-table.jpg", desc: "Space-saving study desk integrated with bed units, ideal for hostel and PG rooms.", keywords: ["desk", "study", "workstation", "bed", "integrated"] },
  { name: "Conference Table", category: "hostel", industrySlug: "hostel", slug: "conference-table", image: "/media/industries/hostel/reception-counter.jpg", desc: "Large-format meeting table suitable for hostel and PG common rooms.", keywords: ["conference", "meeting", "table", "discussion"] },
  { name: "Single Hostel Bed", category: "hostel", industrySlug: "hostel", slug: "single-hostel-bed", image: "/media/industries/hostel/Single Hostel Bed-hostel and pg.jpg", desc: "Robust single bed frame designed specifically for hostel and PG accommodations.", keywords: ["bed", "single", "hostel", "sleeping"] },
  { name: "Bunk Bed", category: "hostel", industrySlug: "hostel", slug: "bunk-bed", image: "/media/industries/hostel/hostel-bunk-bed.jpg", desc: "Space-saving double-decker bed configuration perfect for shared hostel and PG rooms.", keywords: ["bunk", "bed", "double", "shared", "space-saving"] },
  { name: "Metal Bunk Bed", category: "hostel", industrySlug: "hostel", slug: "metal-bunk-bed", image: "/media/industries/hostel/Metal Bunk Bed-hostel and pg.jpg", desc: "Heavy-duty metal bunk bed engineered for hostel and PG dormitories.", keywords: ["metal", "bunk", "bed", "dormitory", "heavy-duty"] },
  { name: "PG Wardrobe", category: "hostel", industrySlug: "hostel", slug: "pg-wardrobe", image: "/media/industries/hostel/three-door-wardrobe.jpg", desc: "Spacious wardrobe unit with hanging and storage compartments tailored for PG and hostel bedrooms.", keywords: ["wardrobe", "storage", "clothing", "bedroom"] },
  { name: "Study Table", category: "hostel", industrySlug: "hostel", slug: "study-table", image: "/media/industries/hostel/hostel-study-table.jpg", desc: "Dedicated study table designed for hostel and PG rooms.", keywords: ["study", "table", "desk", "books", "learning"] },
  { name: "Study Chair", category: "hostel", industrySlug: "hostel", slug: "study-chair", image: "/media/industries/hostel/visitor-chair.jpg", desc: "Ergonomic chair suited for long study sessions in hostel and PG rooms.", keywords: ["chair", "study", "ergonomic", "seating"] },
  { name: "Hostel Mattress", category: "hostel", industrySlug: "hostel", slug: "hostel-mattress", image: "/media/industries/hostel/Hostel Mattress-hostel and pg.jpg", desc: "High-quality mattress specifically sized for hostel and PG bed frames.", keywords: ["mattress", "bed", "sleep", "comfort"] },
  { name: "Bedside Table", category: "hostel", industrySlug: "hostel", slug: "bedside-table", image: "/media/industries/hostel/bedside-table.jpg", desc: "Compact side table designed to fit beside hostel and PG beds.", keywords: ["bedside", "side", "table", "night"] },
  { name: "Shoe Rack", category: "hostel", industrySlug: "hostel", slug: "shoe-rack", image: "/media/industries/hostel/shoe-rack.jpg", desc: "Organized footwear storage unit for hostel and PG entryways.", keywords: ["shoe", "rack", "storage", "footwear"] },
  { name: "Dining Table", category: "hostel", industrySlug: "hostel", slug: "dining-table", image: "/media/industries/hostel/cafeteria-table.jpg", desc: "Durable dining table built for hostel and PG mess halls.", keywords: ["dining", "table", "mess", "cafeteria"] },
  { name: "Dining Chair", category: "hostel", industrySlug: "hostel", slug: "dining-chair", image: "/media/industries/hostel/library-chair.jpg", desc: "Practical dining chair designed for hostel and PG mess halls.", keywords: ["dining", "chair", "mess", "cafeteria"] },
  { name: "Common Area Sofa", category: "hostel", industrySlug: "hostel", slug: "common-area-sofa", image: "/media/industries/hostel/waiting-lounge-bench.jpg", desc: "Welcoming lounge sofa for hostel and PG common rooms.", keywords: ["sofa", "lounge", "common", "living", "seating"] },
  { name: "TV Unit", category: "hostel", industrySlug: "hostel", slug: "tv-unit", image: "/media/industries/hostel/common-tv-unit.jpg", desc: "Entertainment console designed for hostel and PG common rooms.", keywords: ["tv", "television", "unit", "entertainment", "media"] },
  { name: "Locker Unit", category: "hostel", industrySlug: "hostel", slug: "locker-unit", image: "/media/industries/hostel/locker-unit.jpg", desc: "Secure personal storage locker for hostel and PG residents.", keywords: ["locker", "storage", "secure", "personal"] },
  { name: "Bookshelf", category: "hostel", industrySlug: "hostel", slug: "bookshelf", image: "/media/industries/hostel/wall-mounted-bookshelf.jpg", desc: "Vertical storage unit for hostel and PG common rooms and bedrooms.", keywords: ["bookshelf", "shelf", "storage", "books", "wall"] },
  { name: "Laundry Drying Rack", category: "hostel", industrySlug: "hostel", slug: "laundry-drying-rack", image: "/media/industries/hostel/Laundry Drying Rack-pg and hostel.jpg", desc: "Foldable clothes drying rack designed for hostel and PG rooms.", keywords: ["laundry", "drying", "rack", "clothes"] },
  { name: "Executive Desk", category: "corporate", industrySlug: "corporate", slug: "executive-desk", image: "/media/industries/corporate/Executive Desk.jpg", desc: "Premium executive desk designed for C-suite offices.", keywords: ["executive", "desk", "office", "cabin", "premium"] },
  { name: "Ergonomic Chair", category: "corporate", industrySlug: "corporate", slug: "ergonomic-chair", image: "/media/industries/corporate/Ergonomic Chair.jpg", desc: "High-performance ergonomic chair with adjustable lumbar support.", keywords: ["ergonomic", "chair", "office", "posture", "comfort"] },
  { name: "Conference Table", category: "corporate", industrySlug: "corporate", slug: "conference-table", image: "/media/industries/corporate/conference table .jpeg", desc: "Large-format conference table suitable for boardrooms.", keywords: ["conference", "meeting", "table", "boardroom"] },
  { name: "PVC Aluminium Partition", category: "corporate", industrySlug: "corporate", slug: "pvc-aluminium-partition", image: "/media/industries/corporate/Pvc aluminium partition.jpeg", desc: "Sleek office partition system combining PVC panels with aluminium framing.", keywords: ["partition", "divider", "office", "space", "layout"] },
  { name: "Reception Table", category: "corporate", industrySlug: "corporate", slug: "reception-table", image: "/media/industries/corporate/reception table.jpeg", desc: "Welcoming reception counter designed for corporate lobbies.", keywords: ["reception", "counter", "lobby", "front", "desk"] },
  { name: "Storage", category: "corporate", industrySlug: "corporate", slug: "storage", image: "/media/industries/corporate/storage.jpeg", desc: "Versatile office storage unit with shelving and locking options.", keywords: ["storage", "cabinet", "shelving", "file", "office"] },
  { name: "Living Room Sofa", category: "residential", industrySlug: "residential", slug: "living-room-sofa", image: "/media/industries/residential/Living Room Sofa-residential projects.jpg", desc: "Comfort-focused living room seating designed for residential homes.", keywords: ["sofa", "living", "room", "seating", "residential"] },
  { name: "Dining Table Set", category: "residential", industrySlug: "residential", slug: "dining-table-set", image: "/media/industries/residential/Dining Table Set -residential projects.jpg", desc: "Complete dining solutions including table and matching chairs.", keywords: ["dining", "table", "kitchen", "residential", "family"] },
  { name: "Kitchen Trolley", category: "residential", industrySlug: "residential", slug: "kitchen-trolley", image: "/media/industries/residential/kitchen trolly - resendtial projects.jpeg", desc: "Mobile kitchen storage unit with shelves and smooth-rolling castors.", keywords: ["kitchen", "trolley", "storage", "mobile"] },
  { name: "Wardrobe", category: "residential", industrySlug: "residential", slug: "wardrobe", image: "/media/industries/residential/wardrobe-residentail projects.jpeg", desc: "Spacious bedroom wardrobe with hanging, shelving and drawer configurations.", keywords: ["wardrobe", "bedroom", "clothing", "storage"] },
  { name: "Display Rack", category: "retail", industrySlug: "retail", slug: "display-rack", image: "/media/industries/retail/Display Rack-retail spce solution.jpg", desc: "Versatile retail shelving system designed for efficient product placement.", keywords: ["display", "rack", "shelf", "retail", "store"] },
  { name: "Checkout Counter", category: "retail", industrySlug: "retail", slug: "checkout-counter", image: "/media/industries/retail/chekout counter-retail space solution.jpg", desc: "Purpose-built service counter for retail environments.", keywords: ["checkout", "counter", "retail", "service", "payment"] },
  { name: "Cafe Counter", category: "retail", industrySlug: "retail", slug: "cafe-counter", image: "/media/industries/retail/cafe counter-retail space.jpg", desc: "Purpose-built service counter for cafe and retail environments.", keywords: ["cafe", "counter", "coffee", "retail"] },
  { name: "Triple Supermarket Shelf", category: "retail", industrySlug: "retail", slug: "triple-supermarket-shelf", image: "/media/industries/retail/triple supermarket shelf-retail space.jpg", desc: "Heavy-duty triple-tier shelving unit engineered for high-density supermarket layouts.", keywords: ["shelf", "supermarket", "retail", "storage", "heavy-duty"] },
  { name: "Wooden Shelves", category: "retail", industrySlug: "retail", slug: "wooden-shelves", image: "/media/industries/retail/wooden shelves -retail space.jpg", desc: "Warm, natural wooden shelving suited to lifestyle stores and bookshops.", keywords: ["wooden", "shelf", "retail", "store", "display"] },
  { name: "Modular Wardrobes", category: "general", image: "/media/wardrobe.jpg", desc: "Full-height wardrobe systems with engineered shutters and soft-close hardware.", keywords: ["wardrobe", "modular", "bedroom", "storage"], url: "/products/modular-wardrobe" },
  { name: "Modular Kitchens", category: "general", image: "/media/kitchen.jpg", desc: "Post-formed and laminated kitchen systems built on moisture-resistant carcasses.", keywords: ["kitchen", "modular", "cooking", "cabinet"], url: "/products/modular-kitchen" },
  { name: "Office Workstations", category: "general", image: "/media/office-workstation.jpg", desc: "Linear, cluster and cubicle workstations with privacy screens.", keywords: ["workstation", "desk", "office", "cubicle", "cluster"], url: "/products/office-workstations" },
  { name: "Reception & TV Units", category: "general", image: "/media/reception-tv-units.jpg", desc: "Signature reception desks and media walls in veneer and solid surface finishes.", keywords: ["reception", "tv", "unit", "media", "wall"], url: "/products" },
];

const SPACE_TYPE_MAP: Record<string, string[]> = {
  "Living Room": ["residential"],
  "Bedroom": ["residential"],
  "Kitchen": ["general"],
  "Office": ["corporate"],
  "Reception": ["corporate"],
  "Commercial Office": ["corporate"],
  "Retail": ["retail"],
  "Hostel / PG": ["hostel"],
  "Other": ["general"],
};

const SPACE_TYPE_ALLOWED: Record<string, Set<string>> = {
  "Living Room": new Set(["Living Room Sofa", "Common Area Sofa", "TV Unit", "Modular Wardrobes", "Office Workstations", "Reception & TV Units", "Wardrobe", "Bookshelf", "Storage"]),
  "Bedroom": new Set(["Wardrobe", "PG Wardrobe", "Bedside Table", "Bookshelf", "Study Table", "Study Chair", "Hostel Mattress", "Single Hostel Bed", "Bunk Bed", "Metal Bunk Bed", "Modular Wardrobes", "Common Area Sofa", "TV Unit", "Locker Unit"]),
  "Kitchen": new Set(["Modular Kitchens", "Kitchen Trolley", "Dining Table", "Dining Chair", "Wardrobe", "Storage"]),
  "Office": new Set(["Executive Desk", "Ergonomic Chair", "Conference Table", "Office Workstations", "PVC Aluminium Partition", "Storage", "Reception & TV Units", "Reception Table"]),
  "Reception": new Set(["Reception Table", "Living Room Sofa", "Visitor Chair", "Common Area Sofa", "TV Unit", "Reception & TV Units", "Storage", "Office Workstations"]),
  "Commercial Office": new Set(["Executive Desk", "Ergonomic Chair", "Conference Table", "Office Workstations", "PVC Aluminium Partition", "Storage"]),
  "Retail": new Set(["Display Rack", "Checkout Counter", "Cafe Counter", "Triple Supermarket Shelf", "Wooden Shelves"]),
  "Hostel / PG": new Set(["Lobby Sofa Set", "Restaurant Chair", "Hotel Room Desk", "Conference Table", "Single Hostel Bed", "Bunk Bed", "Metal Bunk Bed", "PG Wardrobe", "Study Table", "Study Chair", "Hostel Mattress", "Bedside Table", "Shoe Rack", "Dining Table", "Dining Chair", "Common Area Sofa", "TV Unit", "Locker Unit", "Bookshelf", "Laundry Drying Rack", "Reception Table", "Storage", "Wardrobe", "Modular Wardrobes"]),
  "Other": new Set(),
};

const SPACE_TYPE_GUIDANCE: Record<string, string> = {
  "Living Room": "Focus on sofas, coffee tables, TV units, media walls, lounge seating, side tables and living-room storage. Do NOT suggest kitchen, bedroom-only or office-only furniture unless it is clearly multi-purpose.",
  "Bedroom": "Focus on beds, mattresses, wardrobes, bedside tables, study desks, dressers, bookshelves and bedroom storage. Do NOT suggest kitchen trolleys, dining tables, cafeteria chairs, conference tables or office partitions.",
  "Kitchen": "Focus on modular kitchens, kitchen trolleys, dining tables, dining chairs and kitchen storage. Do NOT suggest bedroom wardrobes, hostel bunk beds or office workstations unless they are clearly multi-purpose.",
  "Office": "Focus on executive desks, workstations, ergonomic chairs, conference tables, office storage, partitions and cabinetry. Do NOT suggest kitchen trolleys, dining tables, bedroom wardrobes or hostel bunk beds.",
  "Reception": "Focus on reception counters, reception desks, waiting-area sofas, visitor chairs, TV units and lobby storage. Do NOT suggest kitchen trolleys, dining tables, bedroom wardrobes or hostel bunk beds.",
  "Commercial Office": "Focus on workstations, executive desks, ergonomic chairs, conference tables, office partitions, storage and meeting-room furniture. Do NOT suggest kitchen trolleys, dining tables, bedroom wardrobes or hostel bunk beds.",
  "Retail": "Focus on display racks, checkout counters, cafe counters, supermarket shelves, retail shelving and store fixtures. Do NOT suggest bedroom wardrobes, kitchen trolleys, hostel bunk beds or office partitions.",
  "Hostel / PG": "Focus on hostel beds, bunk beds, study tables, study chairs, mattresses, wardrobes, lockers, shoe racks, common-area sofas, TV units, dining tables, dining chairs and laundry racks. Do NOT suggest office partitions, retail display racks or kitchen trolleys unless they are clearly multi-purpose.",
  "Other": "Focus on furniture and storage that genuinely fits the visible space. Avoid suggesting furniture for unrelated room types.",
};

function matchProducts(spaceType: string, recommendations: any) {
  const relevantCategories = SPACE_TYPE_MAP[spaceType] || ["general"];
  const allowed = SPACE_TYPE_ALLOWED[spaceType];
  const keywords = new Set<string>();
  const textSources = [recommendations.furniture, recommendations.layout, recommendations.materials, recommendations.optimization].filter(Boolean);
  for (const source of textSources) {
    for (const item of source) {
      (item as string).toLowerCase().split(/[^a-z]+/).forEach(w => { if (w.length > 3) keywords.add(w); });
    }
  }
  const scored = PAYAL_PRODUCTS.map(p => {
    if (allowed && allowed.size > 0 && !allowed.has(p.name)) {
      return { ...p, score: 0 };
    }
    let score = 0;
    if (relevantCategories.includes(p.category)) score += 2;
    for (const kw of p.keywords) {
      if (keywords.has(kw)) score += 1;
    }
    const url = p.industrySlug && p.slug
      ? `/industries/${p.industrySlug}/${p.slug}`
      : (p.url || `/products/${p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`);
    return { ...p, score, url };
  });
  return scored.filter(p => p.score > 0).sort((a, b) => b.score - a.score).slice(0, 6);
}

const GEMINI_MODELS = [
  "gemini-flash-latest",
  "gemini-1.5-flash",
];

async function callGeminiModel(apiKey: string, model: string, prompt: string, base64Data: string): Promise<Response> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  return fetch(url, {
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
  });
}

async function fetchWithRetry(apiKey: string, prompt: string, base64Data: string): Promise<Response> {
  let lastStatus = 0;
  let lastResponse: Response | null = null;

  for (const model of GEMINI_MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      console.log(`[AI] Attempt ${attempt + 1}/3 with model: ${model}`);
      const response = await callGeminiModel(apiKey, model, prompt, base64Data);
      lastResponse = response;
      lastStatus = response.status;

      if (response.ok) {
        console.log(`[AI] Model ${model} responded OK`);
        return response;
      }

      const errorText = await response.text();
      const is503 = response.status === 503;
      const is429 = response.status === 429 || errorText.toLowerCase().includes("quota");

      if (is503 && attempt < 2) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`[AI] Model ${model} returned 503, retrying in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      if (is503 && attempt === 2 && model !== GEMINI_MODELS[GEMINI_MODELS.length - 1]) {
        console.log(`[AI] Model ${model} exhausted retries, falling back to ${GEMINI_MODELS[GEMINI_MODELS.length - 1]}`);
        break;
      }

      return response;
    }
  }

  return lastResponse as Response;
}

export const generateAIVisualization = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const env = { ...process.env, ...loadDevVars() };
    const apiKey = env.GEMINI_API_KEY;

    console.log("[AI] environment key configured:", Boolean(apiKey));

    if (!apiKey) {
      return { success: false, message: "AI furniture suggestion is temporarily unavailable. Please try again later." };
    }

    try {
      const { imageData, spaceType } = ctx.data as any;

      if (!imageData || !spaceType) {
        return { success: false, message: "Missing required information. Please upload an image and select a space type." };
      }

      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      console.log("[AI] image data present:", Boolean(base64Data), "| length:", base64Data?.length || 0);
      if (!base64Data || base64Data.length < 100) {
        return { success: false, message: "Please upload a valid room or space image." };
      }

      const prompt = `You are an interior design AI assistant for Payal Decor, a commercial interiors and furniture company in Pune, India.

Analyze the uploaded ${spaceType} image carefully. Identify visible features such as:
- Available space and approximate room layout
- Existing furniture and fixtures
- Empty areas and underutilized spaces
- Doors, windows and natural lighting where visible
- Room proportions and traffic flow
- Color scheme and existing materials
- Lighting conditions

SPACE-SPECIFIC GUIDANCE FOR ${spaceType.toUpperCase()}:
${SPACE_TYPE_GUIDANCE[spaceType] || SPACE_TYPE_GUIDANCE["Other"]}

Based on your analysis, provide specific furniture and interior recommendations tailored to this ${spaceType}.

Respond ONLY with valid JSON in this exact format:
{
  "furniture": ["Specific furniture recommendation 1", "Specific furniture recommendation 2"],
  "layout": ["Layout suggestion 1", "Layout suggestion 2"],
  "materials": ["Material suggestion 1", "Material suggestion 2"],
  "colors": ["Color suggestion 1", "Color suggestion 2"],
  "optimization": ["Space optimization tip 1", "Space optimization tip 2"],
  "considerations": ["Important design consideration 1", "Important design consideration 2"]
}

Do not include any text outside the JSON. Do not claim exact measurements unless they can actually be determined from the image. Keep recommendations practical and relevant to what is visible.`;

      const response = await fetchWithRetry(apiKey, prompt, base64Data);
      console.log("[AI] Final Gemini response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("[AI] Gemini error status:", response.status, "| error preview:", errorText.substring(0, 200));
        if (response.status === 429 || errorText.toLowerCase().includes("quota")) {
          return { success: false, message: "AI furniture suggestion is temporarily unavailable. Please try again later." };
        }
        if (response.status === 404) {
          return { success: false, message: "AI model is temporarily unavailable. Please try again later." };
        }
        if (response.status === 503) {
          return { success: false, message: "AI service is busy. Please try again in a few moments." };
        }
        return { success: false, message: "We couldn't analyze your space this time. Please try again." };
      }

      const data = await response.json();
      console.log("[AI] Gemini response top-level keys:", Object.keys(data));

      const candidate = data.candidates?.[0];
      const parts = candidate?.content?.parts || [];
      const textPart = parts.find((part: any) => part.text);

      console.log("[AI] Gemini text part present:", Boolean(textPart?.text));

      if (!textPart?.text) {
        console.log("[AI] Gemini returned no text part. Candidate keys:", candidate ? Object.keys(candidate) : "none");
        return { success: false, message: "We couldn't analyze your space this time. Please try again." };
      }

      let recommendations: any = {};
      try {
        let text = textPart.text.replace(/```json/g, "").replace(/```/g, "").trim();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          recommendations = JSON.parse(jsonMatch[0]);
        } else {
          console.log("[AI] No JSON object found in Gemini text. Text preview:", text.substring(0, 200));
          return { success: false, message: "We couldn't analyze your space this time. Please try again." };
        }
      } catch (e) {
        console.log("[AI] JSON parse error:", (e as Error).message);
        return { success: false, message: "We couldn't analyze your space this time. Please try again." };
      }

      const matchedProducts = matchProducts(spaceType, recommendations);

      return {
        success: true,
        recommendations: {
          furniture: Array.isArray(recommendations.furniture) ? recommendations.furniture.slice(0, 6) : [],
          layout: Array.isArray(recommendations.layout) ? recommendations.layout.slice(0, 6) : [],
          materials: Array.isArray(recommendations.materials) ? recommendations.materials.slice(0, 6) : [],
          colors: Array.isArray(recommendations.colors) ? recommendations.colors.slice(0, 6) : [],
          optimization: Array.isArray(recommendations.optimization) ? recommendations.optimization.slice(0, 6) : [],
          considerations: Array.isArray(recommendations.considerations) ? recommendations.considerations.slice(0, 6) : [],
        },
        matchedProducts: matchedProducts.map(p => ({
          name: p.name,
          image: p.image,
          desc: p.desc,
          url: p.url,
        })),
      };
    } catch (error) {
      return { success: false, message: "We couldn't analyze your space this time. Please try again." };
    }
  });
