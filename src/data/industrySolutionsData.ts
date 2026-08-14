import { Building2, Briefcase, Home, Store } from "lucide-react";

export interface SolutionProduct {
  name: string;
  slug?: string;
  image?: string;
  desc?: string;
}

export interface SolutionData {
  title: string;
  collectionName: string;
  icon: typeof Building2;
  products: SolutionProduct[];
}

export const solutionsData: Record<string, SolutionData> = {
  hospitality: {
    title: "Hostel & PG Furniture",
    collectionName: "Hostel & PG Furniture Collection",
    icon: Building2,
    products: [
      { name: "Lobby Sofa Set", slug: "lobby-sofa-set", image: "/media/industries/hostel/Lobby Sofa Set-hostel and pg.jpg", desc: "Comfortable seating arrangement designed for hostel and PG lobbies, reception areas and common spaces. Provides a welcoming environment for guests and residents with durable upholstery suitable for high-traffic hospitality settings." },
      { name: "Restaurant Chair", slug: "restaurant-chair", image: "/media/industries/hostel/cafeteria-chairs.jpg", desc: "Ergonomic dining chair built for hostel and PG mess halls, cafeterias and dining areas. Sturdy construction handles daily use while maintaining comfort for extended meal times." },
      { name: "Hotel Room Desk", slug: "hotel-room-desk", image: "/media/industries/hostel/bed-with-integrated-study-table.jpg", desc: "Space-saving study desk integrated with bed units, ideal for hostel and PG rooms with limited floor area. Provides a dedicated workspace for students and working professionals." },
      { name: "Conference Table", slug: "conference-table", image: "/media/industries/hostel/reception-counter.jpg", desc: "Large-format meeting table suitable for hostel and PG common rooms, conference halls and group study areas. Supports collaborative discussions with ample surface space." },
      { name: "Single Hostel Bed", slug: "single-hostel-bed", image: "/media/industries/hostel/Single Hostel Bed-hostel and pg.jpg", desc: "Robust single bed frame designed specifically for hostel and PG accommodations. Offers reliable support for individual residents with easy assembly and space-efficient dimensions." },
      { name: "Bunk Bed", slug: "bunk-bed", image: "/media/industries/hostel/hostel-bunk-bed.jpg", desc: "Space-saving double-decker bed configuration perfect for shared hostel and PG rooms. Maximizes floor space while providing comfortable sleeping arrangements for multiple residents." },
      { name: "Metal Bunk Bed", slug: "metal-bunk-bed", image: "/media/industries/hostel/Metal Bunk Bed-hostel and pg.jpg", desc: "Heavy-duty metal bunk bed engineered for hostel and PG dormitories. Strong steel construction ensures safety and longevity in high-occupancy residential environments." },
      { name: "PG Wardrobe", slug: "pg-wardrobe", image: "/media/industries/hostel/three-door-wardrobe.jpg", desc: "Spacious wardrobe unit with hanging and storage compartments tailored for PG and hostel bedrooms. Helps residents organize clothing and personal belongings efficiently." },
      { name: "Study Table", slug: "study-table", image: "/media/industries/hostel/hostel-study-table.jpg", desc: "Dedicated study table designed for hostel and PG rooms, providing a stable surface for books, laptops and study materials. Supports focused learning in residential settings." },
      { name: "Study Chair", slug: "study-chair", image: "/media/industries/hostel/visitor-chair.jpg", desc: "Ergonomic chair suited for long study sessions in hostel and PG rooms. Comfortable seating design supports proper posture for students and professionals." },
      { name: "Hostel Mattress", slug: "hostel-mattress", image: "/media/industries/hostel/Hostel Mattress-hostel and pg.jpg", desc: "High-quality mattress specifically sized for hostel and PG bed frames. Provides essential comfort and support for restful sleep in shared accommodation environments." },
      { name: "Bedside Table", slug: "bedside-table", image: "/media/industries/hostel/bedside-table.jpg", desc: "Compact side table designed to fit beside hostel and PG beds. Offers convenient storage for essentials like phones, books, lamps and water bottles within easy reach." },
      { name: "Shoe Rack", slug: "shoe-rack", image: "/media/industries/hostel/shoe-rack.jpg", desc: "Organized footwear storage unit for hostel and PG entryways and common areas. Keeps shared spaces tidy while providing individual storage slots for residents." },
      { name: "Dining Table", slug: "dining-table", image: "/media/industries/hostel/cafeteria-table.jpg", desc: "Durable dining table built for hostel and PG mess halls and common dining areas. Withstands daily use while accommodating multiple diners comfortably." },
      { name: "Dining Chair", slug: "dining-chair", image: "/media/industries/hostel/library-chair.jpg", desc: "Practical dining chair designed for hostel and PG mess halls and shared dining spaces. Combines comfort with stackable or space-efficient designs for flexible arrangements." },
      { name: "Common Area Sofa", slug: "common-area-sofa", image: "/media/industries/hostel/waiting-lounge-bench.jpg", desc: "Welcoming lounge sofa for hostel and PG common rooms and TV areas. Provides comfortable seating for socializing, relaxation and informal gatherings among residents." },
      { name: "TV Unit", slug: "tv-unit", image: "/media/industries/hostel/common-tv-unit.jpg", desc: "Entertainment console designed for hostel and PG common rooms and lounge areas. Organizes televisions and media equipment while enhancing the shared living space." },
      { name: "Locker Unit", slug: "locker-unit", image: "/media/industries/hostel/locker-unit.jpg", desc: "Secure personal storage locker for hostel and PG residents. Provides safe, individual compartments for valuables, documents and personal belongings in shared accommodations." },
      { name: "Bookshelf", slug: "bookshelf", image: "/media/industries/hostel/wall-mounted-bookshelf.jpg", desc: "Vertical storage unit for hostel and PG common rooms, study areas and bedrooms. Organizes books, reference materials and decorative items while maximizing wall space." },
      { name: "Laundry Drying Rack", slug: "laundry-drying-rack", image: "/media/industries/hostel/Laundry Drying Rack-pg and hostel.jpg", desc: "Foldable clothes drying rack designed for hostel and PG rooms without balcony access. Provides convenient indoor laundry drying with space-efficient folding design." },
    ],
  },

  corporate: {
    title: "Corporate Office Solutions",
    collectionName: "Corporate Office Furniture Collection",
    icon: Briefcase,
    products: [
      { name: "Executive Desk", slug: "executive-desk", image: "/media/industries/corporate/Executive Desk.jpg", desc: "Premium executive desk designed for C-suite offices and corporate headquarters. Combines commanding presence with functional storage and cable management for senior leadership workspaces." },
      { name: "Ergonomic Chair", slug: "ergonomic-chair", image: "/media/industries/corporate/Ergonomic Chair.jpg", desc: "High-performance ergonomic chair with adjustable lumbar support, armrests and breathable mesh back. Engineered for long-hour corporate workstations and IT office environments." },
      { name: "Conference Table", slug: "conference-table", image: "/media/industries/corporate/conference table .jpeg", desc: "Large-format conference table suitable for boardrooms and corporate meeting spaces. Supports collaborative discussions with integrated power and data management options." },
      { name: "PVC Aluminium Partition", slug: "pvc-aluminium-partition", image: "/media/industries/corporate/Pvc aluminium partition.jpeg", desc: "Sleek office partition system combining PVC panels with aluminium framing. Creates flexible workspace layouts while maintaining acoustic privacy and modern aesthetics." },
      { name: "Reception Table", slug: "reception-table", image: "/media/industries/corporate/reception table.jpeg", desc: "Welcoming reception counter designed for corporate lobbies and front-office areas. Balances professional appearance with practical storage for visitor management and administrative tasks." },
      { name: "Storage", slug: "storage", image: "/media/industries/corporate/storage.jpeg", desc: "Versatile office storage unit with shelving and locking options. Ideal for corporate offices, file storage and supply organization in modern workplace environments." },
    ],
  },

  residential: {
    title: "Residential Projects",
    collectionName: "Residential Furniture Collection",
    icon: Home,
    products: [
      { name: "Living Room Sofa", slug: "living-room-sofa", image: "/media/industries/residential/Living Room Sofa-residential projects.jpg", desc: "Comfort-focused living room seating designed for residential homes, combining durable upholstery with modern silhouettes that suit apartments and independent houses alike." },
      { name: "Dining Table Set", slug: "dining-table-set", image: "/media/industries/residential/Dining Table Set -residential projects.jpg", desc: "Complete dining solutions including table and matching chairs, crafted for family meals and gatherings with finishes that withstand daily residential use." },
      { name: "Kitchen Trolley", slug: "kitchen-trolley", image: "/media/industries/residential/kitchen trolly - resendtial projects.jpeg", desc: "Mobile kitchen storage unit with shelves and smooth-rolling castors, ideal for organising groceries, utensils and prep items in compact home kitchens." },
      { name: "Wardrobe", slug: "wardrobe", image: "/media/industries/residential/wardrobe-residentail projects.jpeg", desc: "Spacious bedroom wardrobe with hanging, shelving and drawer configurations, tailored for residential bedrooms to maximise storage while maintaining a clean, contemporary look." },
    ],
  },

  retail: {
    title: "Retail Space Solutions",
    collectionName: "Retail Display Furniture Collection",
    icon: Store,
    products: [
      { name: "Display Rack", slug: "display-rack", image: "/media/industries/retail/Display Rack-retail spce solution.jpg", desc: "Versatile retail shelving system designed for efficient product placement and customer flow, ideal for boutiques, supermarkets and concept stores." },
      { name: "Checkout Counter", slug: "checkout-counter", image: "/media/industries/retail/chekout counter-retail space solution.jpg", desc: "Purpose-built service counter for retail environments, combining payment processing, product display and customer interaction zones in one streamlined unit." },
      { name: "Cafe Counter", slug: "cafe-counter", image: "/media/industries/retail/cafe counter-retail space.jpg", desc: "Purpose-built service counter for cafe and retail environments, combining display, payment and customer interaction zones in one streamlined unit." },
      { name: "Empty Vector Store Shelves", slug: "empty-vector-store-shelves", image: "/media/industries/retail/empty vecotr store shelves-retail space.jpg", desc: "Versatile retail shelving system designed for efficient product placement and customer flow, ideal for boutiques, supermarkets and concept stores." },
      { name: "Stainless Steel Wall Mounted Retail Store Furniture", slug: "stainless-steel-wall-mounted-retail-store-furniture", image: "/media/industries/retail/Stainless Steel Wall Mounted Retail Store Furniture-retail space.jpg", desc: "Durable wall-mounted retail fixtures built from stainless steel, offering hygienic, space-saving display solutions for modern stores and showrooms." },
      { name: "Triple Supermarket Shelf", slug: "triple-supermarket-shelf", image: "/media/industries/retail/triple supermarket shelf-retail space.jpg", desc: "Heavy-duty triple-tier shelving unit engineered for high-density supermarket layouts, providing stable, accessible storage across multiple product categories." },
      { name: "Wooden Shelves", slug: "wooden-shelves", image: "/media/industries/retail/wooden shelves -retail space.jpg", desc: "Warm, natural wooden shelving suited to lifestyle stores, bookshops and boutique retail, blending sturdy display capacity with an inviting aesthetic." },
    ],
  },
};

export const allSolutions = [
  { key: "hospitality", ...solutionsData.hospitality },
  { key: "corporate", ...solutionsData.corporate },
  { key: "residential", ...solutionsData.residential },
  { key: "retail", ...solutionsData.retail },
];
