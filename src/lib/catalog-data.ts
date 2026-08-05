// Product content sourced from the official Payal Decor Product Catalog 2026
// and payal-decor-pune.netlify.app. All imagery is extracted from the catalog
// and stored locally in /public/media/products so the repo is self-contained.
import catalogAsset from "@/assets/product-catalog.pdf.asset.json";
import { media } from "@/lib/site-data";

export const catalogPdf = catalogAsset.url;
export const catalogTitle = "Payal Decor — Product Catalog 2026";

const imgs = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/media/products/${slug}-${i + 1}.jpg`);

export type CatalogProduct = {
  slug: string;
  name: string;
  category: string; // category slug
  tagline: string;
  desc: string;
  images: string[];
  variants: { name: string; note: string }[];
  features: string[];
  specifications: { label: string; value: string }[];
  materials: string[];
  dimensions: { label: string; value: string }[];
  applications: string[];
  /** Individual catalog PDFs can be assigned here later without any redesign. */
  catalogUrl?: string;
};

const workstationMaterials = [
  "25 mm pre-laminated MR-grade engineered board",
  "2 mm PUR-sealed ABS edge banding",
  "Powder-coated MS / aluminium frame",
  "Acoustic upholstered fabric screens",
  "Soft-close hardware and lockable pedestals",
];

const workstationSpecs = (frame: string, top: string) => [
  { label: "Worktop", value: top },
  { label: "Frame", value: frame },
  { label: "Edge banding", value: "2 mm ABS, PUR sealed" },
  { label: "Cable management", value: "Aluminium raceway spine with grommets" },
  { label: "Screen", value: "Upholstered acoustic tack board, 400–600 mm high" },
  { label: "Finish options", value: "Laminate, veneer and matt PU shades" },
  { label: "Warranty", value: "Manufacturer warranty on all fabricated units" },
];

const workstationDims = [
  { label: "Single seat", value: "1200 / 1350 / 1500 mm W × 600 mm D" },
  { label: "Worktop height", value: "750 mm (standard)" },
  { label: "Screen height", value: "400 / 500 / 600 mm above worktop" },
  { label: "Cluster options", value: "2, 4, 6 and 8-seat clusters" },
  { label: "Pedestal", value: "400 W × 500 D × 600 H mm (3-drawer)" },
];

const seriesVariants = [
  { name: "Linear", note: "Back-to-back straight run seating" },
  { name: "L-Type", note: "Corner return for supervisory seats" },
  { name: "Cluster", note: "120° / 4-way and 6-way clusters" },
  { name: "Cubicle", note: "Full-height partitioned privacy bays" },
];

export const catalogProducts: CatalogProduct[] = [
  {
    slug: "eco-series",
    name: "ECO Series Workstations",
    category: "office-workstations",
    tagline: "Value-engineered desking for high-density floors",
    desc:
      "The ECO Series is our entry-level commercial desking system — a clean metal frame with a durable engineered top, planned to seat the maximum headcount per floor plate without giving up finish quality. Crafted from high-quality, durable materials chosen for their strength, beauty and longevity.",
    images: imgs("eco", 9),
    variants: seriesVariants,
    features: [
      "Slim powder-coated leg frame with levellers",
      "Shared beam spine for back-to-back runs",
      "Snap-on wire management trays",
      "Optional perforated metal modesty panel",
      "Reconfigurable without re-cutting tops",
    ],
    specifications: workstationSpecs("Powder-coated MS legs, 60 × 30 mm section", "25 mm pre-laminated engineered board"),
    materials: workstationMaterials,
    dimensions: workstationDims,
    applications: ["Open-plan offices", "IT & BPO floors", "Back-office operations", "Startup workspaces"],
  },
  {
    slug: "spark-series",
    name: "SPARK Series Workstations",
    category: "office-workstations",
    tagline: "Colour-blocked desking with acoustic privacy screens",
    desc:
      "SPARK pairs a wood-grain worktop with bright fabric privacy screens, giving open floors visual rhythm and acoustic separation. Each piece reflects our commitment to excellence, ensuring lasting value and timeless appeal.",
    images: imgs("spark", 10),
    variants: seriesVariants,
    features: [
      "Upholstered acoustic screens in brand colours",
      "Wood-grain or solid laminate worktops",
      "Integrated power and data pop-up boxes",
      "Mobile 3-drawer pedestal with castors",
      "Screen-mounted accessory rails",
    ],
    specifications: workstationSpecs("White powder-coated steel frame", "25 mm wood-grain laminated board"),
    materials: workstationMaterials,
    dimensions: workstationDims,
    applications: ["Corporate offices", "Design studios", "Shared service centres", "Co-working spaces"],
  },
  {
    slug: "curve-series",
    name: "CURVE Series Workstations",
    category: "office-workstations",
    tagline: "Soft-radius desking and partitioned cubicle bays",
    desc:
      "CURVE softens the open floor with radiused worktops and full-height partition bays, balancing focus work with quick collaboration. Manufactured on our own CNC and edgebanding lines for repeatable quality across every seat.",
    images: imgs("curve", 10),
    variants: [
      { name: "Curved Linear", note: "Radiused front edge, straight run" },
      { name: "Cubicle Bay", note: "Full-height partitioned privacy bay" },
      { name: "Corner Return", note: "Curved corner with side return" },
      { name: "Meeting Add-on", note: "Docked discussion top" },
    ],
    features: [
      "Post-formed radius edges — no visible joint",
      "Full-height tiled partition option",
      "Concealed vertical cable risers",
      "Colour-matched trims and end caps",
      "Overhead storage compatible",
    ],
    specifications: workstationSpecs("Powder-coated steel with radius end panel", "25 mm post-formed laminated board"),
    materials: workstationMaterials,
    dimensions: workstationDims,
    applications: ["Corporate offices", "Engineering design centres", "Consulting floors", "Government offices"],
  },
  {
    slug: "impress-series",
    name: "IMPRESS Series Workstations",
    category: "office-workstations",
    tagline: "Bright, high-contrast desking for young teams",
    desc:
      "IMPRESS uses colour, light frames and slim screens to make a busy floor feel open. A commercially rated system built to survive daily churn while still looking new after years of use.",
    images: imgs("impress", 10),
    variants: seriesVariants,
    features: [
      "Slim 25 mm profile frame",
      "Yellow / green / grey screen palette",
      "Tool-free screen height change",
      "Under-desk CPU sling option",
      "Add-on seats without re-planning",
    ],
    specifications: workstationSpecs("Slim powder-coated steel frame", "25 mm pre-laminated engineered board"),
    materials: workstationMaterials,
    dimensions: workstationDims,
    applications: ["IT floors", "Training rooms", "Campus admin offices", "Customer support centres"],
  },
  {
    slug: "impact-series",
    name: "IMPACT Series Workstations",
    category: "office-workstations",
    tagline: "Light-wood tops on white frames for premium open plans",
    desc:
      "IMPACT is our most specified open-plan system — light wood worktops, crisp white frames and soft green screens that read premium in photographs and hold up under daily commercial wear.",
    images: imgs("impact", 10),
    variants: seriesVariants,
    features: [
      "Light-oak worktop with white leg frame",
      "Perforated metal privacy panels",
      "Flip-top power and data modules",
      "Matching tall storage and credenza units",
      "Conference table in the same finish family",
    ],
    specifications: workstationSpecs("White powder-coated steel frame with levellers", "25 mm light-oak laminated board"),
    materials: workstationMaterials,
    dimensions: workstationDims,
    applications: ["Corporate headquarters", "Client-facing floors", "Automotive & mobility offices", "Technology campuses"],
  },
  {
    slug: "element-series",
    name: "ELEMENT Series Workstations",
    category: "office-workstations",
    tagline: "Modular desking with interchangeable modesty panels",
    desc:
      "ELEMENT is built around swappable components — modesty panels, screens and storage change without replacing the desk. Ideal where teams reconfigure often but the budget has to last.",
    images: imgs("element", 10),
    variants: [
      { name: "Straight Desk", note: "Single-seat standalone desk" },
      { name: "Twin Share", note: "Back-to-back two-seat module" },
      { name: "Cluster", note: "4 and 6-seat cluster grids" },
      { name: "Manager Desk", note: "Wider top with side return" },
    ],
    features: [
      "Interchangeable metal / fabric modesty panels",
      "Blue, yellow and green accent options",
      "Shared cable spine across the run",
      "Keyboard tray and CPU trolley options",
      "Flat-pack shipping for phased fit-outs",
    ],
    specifications: workstationSpecs("Two-tone powder-coated steel frame", "25 mm pre-laminated engineered board"),
    materials: workstationMaterials,
    dimensions: workstationDims,
    applications: ["Growing startups", "Project war rooms", "Satellite offices", "Institutional admin blocks"],
  },
  {
    slug: "magna-series",
    name: "MAGNA Series Workstations",
    category: "office-workstations",
    tagline: "Large-format desking for engineering and design floors",
    desc:
      "MAGNA gives each user a wider footprint for dual monitors, drawings and reference material, while keeping the run tidy with a full-length cable spine.",
    images: imgs("magna", 10),
    variants: seriesVariants,
    features: [
      "1500 / 1800 mm wide worktops",
      "Dual-monitor arm compatible grommets",
      "Full-length cable spine and vertical risers",
      "Heavy-duty levelling feet",
      "Matching filing and plan storage",
    ],
    specifications: workstationSpecs("Heavy-gauge powder-coated steel frame", "25 mm engineered board, optional 36 mm top"),
    materials: workstationMaterials,
    dimensions: [
      { label: "Single seat", value: "1500 / 1800 mm W × 750 mm D" },
      { label: "Worktop height", value: "750 mm (standard)" },
      { label: "Screen height", value: "400 / 500 mm above worktop" },
      { label: "Cluster options", value: "2, 4 and 6-seat clusters" },
      { label: "Pedestal", value: "400 W × 500 D × 600 H mm (3-drawer)" },
    ],
    applications: ["Engineering design centres", "CAD & CAE floors", "Architecture studios", "R&D departments"],
  },
  {
    slug: "premia-series",
    name: "PREMIA Series Executive Furniture",
    category: "office-workstations",
    tagline: "Executive desks, credenzas and cabin furniture",
    desc:
      "PREMIA is the cabin-grade range — dark wood storage, glass-top options and upholstered detailing for CXO offices, partner rooms and directors' suites.",
    images: imgs("premia", 10),
    variants: [
      { name: "Executive Desk", note: "Desk with side return and credenza" },
      { name: "Glass-Top Desk", note: "Toughened glass over engineered base" },
      { name: "Director Suite", note: "Desk, storage wall and discussion top" },
      { name: "Credenza Unit", note: "Standalone back storage credenza" },
    ],
    features: [
      "Matched natural veneer or dark wood laminate",
      "Toughened glass worktop option",
      "Concealed CPU housing and cable spine",
      "Lockable credenza and file storage",
      "Leather / PU inlay detailing",
    ],
    specifications: [
      { label: "Worktop", value: "25–36 mm engineered board, veneer or glass" },
      { label: "Storage", value: "Lockable credenza with soft-close drawers" },
      { label: "Edge banding", value: "2 mm ABS, PUR sealed" },
      { label: "Hardware", value: "Soft-close hinges and telescopic channels" },
      { label: "Finish options", value: "Natural veneer, matt PU, dark wood laminate" },
      { label: "Warranty", value: "Manufacturer warranty on all fabricated units" },
    ],
    materials: [
      "Natural veneer / high-pressure laminate",
      "36 mm engineered board core",
      "Toughened glass (optional worktop)",
      "PU-finished solid wood trims",
      "Soft-close European hardware",
    ],
    dimensions: [
      { label: "Executive desk", value: "1800 / 2100 mm W × 900 mm D" },
      { label: "Side return", value: "1200 mm W × 600 mm D" },
      { label: "Credenza", value: "1500–1800 mm W × 450 mm D × 750 mm H" },
      { label: "Worktop height", value: "750 mm" },
    ],
    applications: ["CXO cabins", "Directors' offices", "Partner rooms", "Legal & finance chambers"],
  },
  {
    slug: "esd-workstation",
    name: "ESD Workstations",
    category: "technical-furniture",
    tagline: "Anti-static assembly and testing benches",
    desc:
      "ESD-safe workstations for electronics assembly, testing and repair lines — grounded worktops, pegboard back panels, integrated power distribution and task lighting on every bay.",
    images: imgs("esd-workstation", 10),
    variants: [
      { name: "Single Bay", note: "One-operator bench with overhead light" },
      { name: "Double Bay", note: "Two-operator shared bench" },
      { name: "Multi-Tier", note: "Bench with upper shelving tiers" },
      { name: "Mobile Unit", note: "Castor-mounted bench with cabinet" },
    ],
    features: [
      "ESD laminate worktop with earthing point",
      "Perforated pegboard back panel with hooks",
      "Integrated power strips and switch panel",
      "Overhead LED task lighting",
      "Lockable drawer cabinet and shelf tiers",
    ],
    specifications: [
      { label: "Worktop", value: "ESD-rated laminate over 25 mm board" },
      { label: "Frame", value: "Powder-coated MS structural frame" },
      { label: "Earthing", value: "Dedicated ESD earthing stud per bay" },
      { label: "Power", value: "Integrated 6 / 8-socket strips with MCB" },
      { label: "Lighting", value: "Overhead LED batten, switchable per bay" },
      { label: "Back panel", value: "Perforated pegboard, colour-coded" },
    ],
    materials: [
      "ESD laminate worktop surface",
      "Powder-coated MS frame and panels",
      "Perforated steel pegboard",
      "Industrial-grade wiring and sockets",
      "Heavy-duty castors (mobile variant)",
    ],
    dimensions: [
      { label: "Single bay", value: "1500 mm W × 750 mm D × 750 mm H" },
      { label: "Double bay", value: "3000 mm W × 750 mm D × 750 mm H" },
      { label: "Overall height", value: "1800–2000 mm with back panel" },
      { label: "Shelf tiers", value: "300 / 400 mm deep, height adjustable" },
    ],
    applications: ["Electronics assembly", "Testing & QC labs", "Repair centres", "Industrial production lines"],
  },
  {
    slug: "lab-workstation",
    name: "Lab Workstations",
    category: "technical-furniture",
    tagline: "Chemical-resistant laboratory furniture systems",
    desc:
      "Island and wall-mounted laboratory benches with chemical-resistant tops, integrated sinks, service spines, overhead cabinets and under-bench storage — planned around the equipment your lab actually runs.",
    images: imgs("lab-workstation", 9),
    variants: [
      { name: "Island Bench", note: "Double-sided central island bench" },
      { name: "Wall Bench", note: "Single-sided bench with reagent shelf" },
      { name: "Sink Unit", note: "Bench with integrated sink and drainboard" },
      { name: "Overhead Storage", note: "Wall cabinets and shelving units" },
    ],
    features: [
      "Chemical-resistant black worktop surface",
      "Integrated sinks with drainage and taps",
      "Reagent shelving with service spine",
      "Under-bench cabinets, drawers and cupboards",
      "Powder-coated frame resistant to spillage",
    ],
    specifications: [
      { label: "Worktop", value: "Chemical-resistant compact / epoxy-grade surface" },
      { label: "Frame", value: "Powder-coated MS C-frame or cabinet base" },
      { label: "Sink", value: "PP / SS sink with gooseneck tap and trap" },
      { label: "Services", value: "Provision for gas, water and power spines" },
      { label: "Storage", value: "Lockable base cabinets and overhead units" },
      { label: "Finish", value: "Wipe-clean laminate cabinet fronts" },
    ],
    materials: [
      "Chemical-resistant worktop laminate",
      "Powder-coated MS structural frame",
      "MR-grade board cabinet carcass",
      "PP / stainless-steel sinks and fittings",
      "Soft-close hardware and cabinet locks",
    ],
    dimensions: [
      { label: "Wall bench", value: "1500–3000 mm W × 750 mm D × 850 mm H" },
      { label: "Island bench", value: "1500–3000 mm W × 1500 mm D × 850 mm H" },
      { label: "Reagent shelf", value: "2 tiers, 250 / 300 mm deep" },
      { label: "Overhead cabinet", value: "900 mm W × 350 mm D × 600 mm H" },
    ],
    applications: ["Research laboratories", "College & university labs", "Hospital pathology labs", "QC and testing labs"],
  },
  {
    slug: "school-bench",
    name: "School Bench",
    category: "education-furniture",
    tagline: "Classroom desk-bench systems built for daily footfall",
    desc:
      "Two and three-seater classroom desk-bench units with a powder-coated tubular frame and a hard-wearing wooden top. Available in single desks, twin benches and colour-coded frames for age-graded classrooms.",
    images: imgs("school-bench", 10),
    variants: [
      { name: "Two-Seater Bench", note: "Desk and bench with book shelf" },
      { name: "Three-Seater Bench", note: "Wider classroom unit" },
      { name: "Single Desk", note: "Individual desk with attached seat" },
      { name: "Colour Frame", note: "Blue / green / red / grey frame options" },
    ],
    features: [
      "Powder-coated MS tubular frame",
      "Pre-laminated or solid wooden top and seat",
      "Under-desk book and bag shelf",
      "Rounded edges and pinch-free joints",
      "Stackable and easy to re-arrange",
    ],
    specifications: [
      { label: "Frame", value: "Powder-coated MS tubular section" },
      { label: "Top & seat", value: "Pre-laminated board / seasoned wood" },
      { label: "Edge treatment", value: "Rounded, sealed and burr-free" },
      { label: "Storage", value: "Integrated under-desk book shelf" },
      { label: "Colours", value: "Blue, green, red, grey and wood tones" },
      { label: "Load rating", value: "Institutional-grade daily use" },
    ],
    materials: [
      "Powder-coated mild-steel tubular frame",
      "Pre-laminated board or seasoned wooden top",
      "Nylon floor buffers",
      "Zinc-plated fasteners",
    ],
    dimensions: [
      { label: "Two-seater", value: "1200 mm W × 900 mm D (desk + bench)" },
      { label: "Three-seater", value: "1800 mm W × 900 mm D" },
      { label: "Desk height", value: "750 mm (adult) / 700 mm (junior)" },
      { label: "Seat height", value: "450 mm" },
    ],
    applications: ["Schools", "Colleges", "Coaching institutes", "Training centres", "Hostels & campuses"],
  },
  {
    slug: "modular-kitchen",
    name: "Modular Kitchens",
    category: "modular-interiors",
    tagline: "Post-formed kitchen systems on moisture-resistant carcasses",
    desc:
      "Post-formed and laminated kitchen systems built on moisture-resistant carcasses, with tall units, appliance housings and soft-close hardware throughout — manufactured and installed by our own team.",
    images: [media.kitchen],
    variants: [
      { name: "L-Shaped", note: "Two-run corner kitchen" },
      { name: "U-Shaped", note: "Three-run high-capacity kitchen" },
      { name: "Parallel", note: "Two facing runs for narrow rooms" },
      { name: "Island", note: "Central island with counter seating" },
    ],
    features: [
      "MR / BWP ply carcass",
      "Post-formed and acrylic shutter options",
      "Quartz and granite counter fabrication",
      "Soft-close hinges and telescopic channels",
      "Integrated appliance and chimney housings",
    ],
    specifications: [
      { label: "Carcass", value: "18 mm MR / BWP grade plywood" },
      { label: "Shutters", value: "Post-formed, laminate, acrylic or PU" },
      { label: "Counter", value: "Quartz, granite or solid surface" },
      { label: "Hardware", value: "Soft-close hinges, tandem channels" },
      { label: "Accessories", value: "Pull-out baskets, tall unit organisers" },
    ],
    materials: ["MR / BWP plywood carcass", "High-pressure laminates", "Quartz & granite counters", "Soft-close European hardware"],
    dimensions: [
      { label: "Base unit", value: "600 mm D × 850 mm H" },
      { label: "Wall unit", value: "350 mm D × 600 / 750 mm H" },
      { label: "Tall unit", value: "600 mm D × 2100 mm H" },
    ],
    applications: ["Residences", "Corporate pantries", "Cafeterias", "Hostel & campus kitchens"],
  },
  {
    slug: "modular-wardrobe",
    name: "Modular Wardrobes",
    category: "modular-interiors",
    tagline: "Full-height wardrobe systems with engineered shutters",
    desc:
      "Full-height wardrobe systems with engineered shutters, profile-lit interiors, mirror inserts and internal organisers built around what you actually store.",
    images: [media.wardrobe],
    variants: [
      { name: "Hinged", note: "Classic hinged shutter wardrobe" },
      { name: "Sliding", note: "Space-saving sliding shutters" },
      { name: "Glass Profile", note: "Aluminium framed glass shutters" },
      { name: "Walk-in", note: "Open modular walk-in system" },
    ],
    features: [
      "Hinged, sliding and glass profile shutters",
      "Profile-lit internal shelving",
      "Pull-out shoe and accessory racks",
      "Mirror inserts and lockable lofts",
      "Aluminium framed shutter option",
    ],
    specifications: [
      { label: "Carcass", value: "18 mm MR-grade board" },
      { label: "Shutters", value: "Laminate, acrylic, glass profile" },
      { label: "Hardware", value: "Soft-close hinges / sliding channels" },
      { label: "Interiors", value: "Adjustable shelving and hanging rods" },
    ],
    materials: ["MR-grade board carcass", "Engineered shutters", "Aluminium profiles", "Soft-close hardware"],
    dimensions: [
      { label: "Standard depth", value: "600 mm" },
      { label: "Height", value: "2100 mm + loft" },
      { label: "Shutter width", value: "450 / 600 mm modules" },
    ],
    applications: ["Residences", "Hotel rooms", "Hostels & guest houses", "Serviced apartments"],
  },
];

export type CatalogCategory = {
  slug: string;
  name: string;
  desc: string;
  banner: string;
  features: string[];
  products: string[];
};

export const catalogCategories: CatalogCategory[] = [
  {
    slug: "office-workstations",
    name: "Office Workstations & Desking",
    desc:
      "Eight modular desking series — ECO, SPARK, CURVE, IMPRESS, IMPACT, ELEMENT, MAGNA and PREMIA — covering everything from high-density open floors to executive cabins, all manufactured on our own CNC and edgebanding lines.",
    banner: "/media/products/impact-7.jpg",
    features: [
      "Linear, L-type, cluster and cubicle layouts",
      "Acoustic upholstered privacy screens",
      "Integrated power, data and cable spines",
      "Matching storage, pedestals and credenzas",
      "Finish schedule matched to your brand",
    ],
    products: ["eco-series", "spark-series", "curve-series", "impress-series", "impact-series", "element-series", "magna-series", "premia-series"],
  },
  {
    slug: "technical-furniture",
    name: "Technical & Laboratory Furniture",
    desc:
      "ESD-safe assembly benches and chemical-resistant laboratory workstations engineered for production lines, QC rooms and research labs — with services, lighting and storage designed into the bench.",
    banner: "/media/products/lab-workstation-2.jpg",
    features: [
      "ESD-rated and chemical-resistant worktops",
      "Integrated power, gas and water service spines",
      "Overhead task lighting and pegboard panels",
      "Sinks, drainboards and fume-safe layouts",
      "Lockable base cabinets and shelving tiers",
    ],
    products: ["esd-workstation", "lab-workstation"],
  },
  {
    slug: "education-furniture",
    name: "Education Furniture",
    desc:
      "Classroom desk-bench systems, library and faculty furniture built to institutional standards — impact-resistant finishes, rounded edges and colour-coded frames for age-graded classrooms.",
    banner: "/media/products/school-bench-3.jpg",
    features: [
      "Two, three-seater and single desk formats",
      "Powder-coated tubular MS frames",
      "Under-desk book and bag storage",
      "Rounded, pinch-free edges",
      "Colour options per classroom or grade",
    ],
    products: ["school-bench"],
  },
  {
    slug: "modular-interiors",
    name: "Modular Kitchens & Wardrobes",
    desc:
      "Post-formed modular kitchens and full-height wardrobe systems on moisture-resistant carcasses, with soft-close hardware and internal organisers throughout.",
    banner: media.kitchen,
    features: [
      "MR / BWP grade carcass construction",
      "Post-formed, laminate and acrylic shutters",
      "Quartz and granite counter fabrication",
      "Profile-lit interiors and organisers",
      "Site measurement, install and after-sales",
    ],
    products: ["modular-kitchen", "modular-wardrobe"],
  },
];

export type IndustryPage = {
  slug: string;
  name: string;
  overview: string;
  points: string[];
  products: string[];
  gallery: string[];
  projects: string[]; // project slugs from site-data
};

export const industryPages: IndustryPage[] = [
  {
    slug: "schools",
    name: "Schools",
    overview:
      "Classroom, staff room and admin furniture built for institutional footfall. Our school range uses powder-coated tubular frames, rounded edges and hard-wearing tops so a classroom still looks disciplined years after handover.",
    points: ["Two and three-seater classroom benches", "Colour-coded frames per grade", "Staff room and admin joinery", "Vacation-window installation schedules"],
    products: ["school-bench", "impress-series", "premia-series"],
    gallery: ["/media/products/school-bench-1.jpg", "/media/products/school-bench-2.jpg", "/media/products/school-bench-3.jpg", "/media/products/school-bench-6.jpg"],
    projects: ["vishwakarma-institutes"],
  },
  {
    slug: "colleges",
    name: "Colleges & Campuses",
    overview:
      "Campus-wide interiors across lecture halls, libraries, laboratories and administration blocks — durable finishes, branded colour blocking and heavy-duty modular furniture built for daily student footfall.",
    points: ["Lecture hall and seminar seating", "Library and reading room joinery", "Laboratory workstations", "Faculty cabins and admin counters"],
    products: ["school-bench", "lab-workstation", "magna-series", "premia-series"],
    gallery: ["/media/industries/college-lecture-hall.jpg", "/media/industries/college-library.jpg", "/media/industries/college-seminar-room.jpg", "/media/products/lab-workstation-3.jpg"],
    projects: ["vishwakarma-institutes"],
  },
  {
    slug: "offices",
    name: "Offices",
    overview:
      "Complete office furniture programmes — reception, open-plan desking, cabins, meeting rooms and storage — delivered floor by floor without stopping your operations.",
    points: ["Open-plan desking at any density", "Cabins, credenzas and storage walls", "Meeting and training room tables", "Phased occupied-site installation"],
    products: ["eco-series", "spark-series", "element-series", "impact-series"],
    gallery: ["/media/products/eco-3.jpg", "/media/products/spark-4.jpg", "/media/products/element-6.jpg", "/media/products/impact-2.jpg"],
    projects: ["kirloskar-pneumatics", "prakash-masale", "mahle-workspace"],
  },
  {
    slug: "hospitals",
    name: "Hospitals",
    overview:
      "Hygienic, wipe-clean furniture for reception, nursing stations, records and pathology areas — specified for infection control and continuous 24×7 use.",
    points: ["Seamless solid-surface counters", "Anti-bacterial laminate finishes", "Records and pharmacy storage", "Pathology and sample lab benches"],
    products: ["lab-workstation", "premia-series", "curve-series"],
    gallery: ["/media/industries/hospital-reception.jpg", "/media/industries/hospital-nursing-station.jpg", "/media/industries/hospital-records.jpg", "/media/products/lab-workstation-6.jpg"],
    projects: [],
  },
  {
    slug: "laboratories",
    name: "Laboratories",
    overview:
      "Chemical-resistant island and wall benches, service spines, sinks, fume-safe layouts and ESD-rated assembly stations — engineered around the equipment and workflow of your lab.",
    points: ["Chemical-resistant worktops", "Gas, water and power service spines", "Integrated sinks and drainboards", "ESD-safe electronics benches"],
    products: ["lab-workstation", "esd-workstation"],
    gallery: ["/media/products/lab-workstation-1.jpg", "/media/products/lab-workstation-2.jpg", "/media/products/esd-workstation-1.jpg", "/media/products/esd-workstation-4.jpg"],
    projects: [],
  },
  {
    slug: "corporate-offices",
    name: "Corporate Offices",
    overview:
      "Headquarters-grade interiors: signature reception, executive cabins, boardrooms and client-facing floors, finished to a brand schedule and delivered against published programme dates.",
    points: ["Signature reception and lobby joinery", "Executive cabins and boardrooms", "Brand-matched finish schedules", "Single-point turnkey accountability"],
    products: ["impact-series", "premia-series", "magna-series", "curve-series"],
    gallery: ["/media/industries/corporate-reception.jpg", "/media/industries/corporate-boardroom.jpg", "/media/products/impact-1.jpg", "/media/products/curve-8.jpg"],
    projects: ["eka-mobility", "kirloskar-pneumatics"],
  },
];

export const productBySlug = (slug: string) => catalogProducts.find((p) => p.slug === slug);
export const categoryBySlug = (slug: string) => catalogCategories.find((c) => c.slug === slug);
export const industryBySlug = (slug: string) => industryPages.find((i) => i.slug === slug);
export const productsInCategory = (slug: string) => catalogProducts.filter((p) => p.category === slug);
/* ---------------------------------------------------------------------------
 * Collections (series grouping used by the Product Range filter sidebar)
 * ------------------------------------------------------------------------ */
export const catalogCollections = [
  { id: "premium", name: "Premium Series" },
  { id: "commercial", name: "Commercial Series" },
  { id: "custom", name: "Custom Manufacturing" },
] as const;

export type CollectionId = (typeof catalogCollections)[number]["id"];

const collectionMap: Record<string, CollectionId> = {
  "eco-series": "commercial",
  "spark-series": "commercial",
  "curve-series": "commercial",
  "element-series": "commercial",
  "school-bench": "commercial",
  "impress-series": "premium",
  "impact-series": "premium",
  "magna-series": "premium",
  "premia-series": "premium",
  "esd-workstation": "custom",
  "lab-workstation": "custom",
  "modular-kitchen": "custom",
  "modular-wardrobe": "custom",
};

export const productCollection = (slug: string): CollectionId => collectionMap[slug] ?? "commercial";
export const collectionName = (id: string) =>
  catalogCollections.find((c) => c.id === id)?.name ?? "Commercial Series";

/* ---------------------------------------------------------------------------
 * Per-industry page sections — each industry gets its own structure
 * ------------------------------------------------------------------------ */
export type IndustrySection = {
  title: string;
  body: string;
  images: string[];
};

export const industrySections: Record<string, IndustrySection[]> = {
  schools: [
    {
      title: "Classroom gallery",
      body:
        "Two and three-seater desk-bench systems on powder-coated tubular frames, with rounded pinch-free edges and under-desk book storage sized for daily institutional footfall.",
      images: ["/media/products/school-bench-1.jpg", "/media/products/school-bench-2.jpg", "/media/products/school-bench-4.jpg"],
    },
    {
      title: "School furniture programme",
      body:
        "Beyond the classroom: staff rooms, principal cabins, admin counters and library joinery, colour-coded by grade and installed inside vacation windows.",
      images: ["/media/products/school-bench-3.jpg", "/media/products/school-bench-6.jpg", "/media/products/school-bench-8.jpg"],
    },
  ],
  colleges: [
    {
      title: "Library & reading rooms",
      body: "Reading tables, carrels, issue counters and stack shelving finished to withstand continuous student use.",
      images: ["/media/industries/college-library.jpg"],
    },
    {
      title: "Laboratories",
      body: "Chemical-resistant island and wall benches with service spines, sinks and lockable base storage for campus labs.",
      images: ["/media/products/lab-workstation-3.jpg", "/media/products/lab-workstation-5.jpg"],
    },
    {
      title: "Lecture halls & seminar rooms",
      body: "Tiered lecture seating, seminar tables and faculty podiums with cable-managed tops for AV-equipped rooms.",
      images: ["/media/industries/college-lecture-hall.jpg", "/media/industries/college-seminar-room.jpg"],
    },
    {
      title: "Classroom furniture",
      body: "Modular desk-bench runs and single-seat writing desks scaled to lecture room capacities.",
      images: ["/media/products/school-bench-5.jpg", "/media/products/school-bench-7.jpg"],
    },
  ],
  offices: [
    {
      title: "Reception",
      body: "Signature reception counters and waiting joinery that carry your brand finish schedule from the lift lobby in.",
      images: ["/media/industries/corporate-reception.jpg"],
    },
    {
      title: "Open-plan workstations",
      body: "ECO, SPARK and ELEMENT desking at any density, with acoustic screens, cable spines and matching pedestals.",
      images: ["/media/products/eco-3.jpg", "/media/products/spark-4.jpg", "/media/products/element-6.jpg"],
    },
    {
      title: "Executive cabins",
      body: "Executive desks, side returns, credenzas and storage walls in veneer, laminate and matt PU finishes.",
      images: ["/media/products/impact-2.jpg", "/media/products/magna-4.jpg"],
    },
    {
      title: "Conference & meeting rooms",
      body: "Boardroom and discussion tables with integrated power-data boxes, sized to your room and AV layout.",
      images: ["/media/industries/corporate-boardroom.jpg", "/media/products/premia-6.jpg"],
    },
  ],
  hospitals: [
    {
      title: "Reception & front desk",
      body: "Seamless solid-surface counters with anti-bacterial laminate fronts, planned for wheelchair access and 24×7 use.",
      images: ["/media/industries/hospital-reception.jpg"],
    },
    {
      title: "Waiting areas & nursing stations",
      body: "Nursing stations, wipe-clean waiting joinery and ward storage laid out for infection-control protocols.",
      images: ["/media/industries/hospital-nursing-station.jpg", "/media/industries/hospital-records.jpg"],
    },
    {
      title: "Healthcare & pathology furniture",
      body: "Pathology and sample lab benches with chemical-resistant tops, sinks and lockable base cabinets.",
      images: ["/media/products/lab-workstation-6.jpg", "/media/products/lab-workstation-8.jpg"],
    },
  ],
  laboratories: [
    {
      title: "Lab workstations",
      body: "Island and wall benches with gas, water and power service spines, chemical-resistant tops and fume-safe layouts.",
      images: ["/media/products/lab-workstation-1.jpg", "/media/products/lab-workstation-2.jpg", "/media/products/lab-workstation-4.jpg"],
    },
    {
      title: "ESD-safe assembly benches",
      body: "ESD-rated worktops, earthing points, overhead task lighting and pegboard panels for electronics production lines.",
      images: ["/media/products/esd-workstation-1.jpg", "/media/products/esd-workstation-4.jpg"],
    },
    {
      title: "Laboratory storage",
      body: "Reagent shelving, lockable under-bench cabinets and tall storage tiers built into the bench line.",
      images: ["/media/products/lab-workstation-7.jpg", "/media/products/lab-workstation-9.jpg"],
    },
  ],
  "corporate-offices": [
    {
      title: "Signature reception",
      body: "Headquarters-grade lobby joinery, feature walls and reception counters finished to a brand schedule.",
      images: ["/media/industries/corporate-reception.jpg"],
    },
    {
      title: "Boardrooms",
      body: "Large-format boardroom tables with veneer tops, integrated AV boxes and matching credenzas.",
      images: ["/media/industries/corporate-boardroom.jpg", "/media/products/premia-2.jpg"],
    },
    {
      title: "Executive floors",
      body: "IMPACT, MAGNA and PREMIA cabins with storage walls, side tables and client-facing meeting settings.",
      images: ["/media/products/impact-1.jpg", "/media/products/magna-6.jpg", "/media/products/curve-8.jpg"],
    },
  ],
};

/* ---------------------------------------------------------------------------
 * Image de-duplication — no image repeats twice inside the same gallery
 * ------------------------------------------------------------------------ */
const dedupe = (list: string[]) => Array.from(new Set(list));

for (const p of catalogProducts) p.images = dedupe(p.images);
for (const i of industryPages) i.gallery = dedupe(i.gallery);
for (const list of Object.values(industrySections)) for (const s of list) s.images = dedupe(s.images);

/* ---------------------------------------------------------------------------
 * Shared browser datasets (Product Series + Product Type sidebar)
 * ------------------------------------------------------------------------ */
export const seriesFilterOptions = catalogCollections.map((c) => ({ id: c.id, name: c.name }));
export const typeFilterOptions = catalogCategories.map((c) => ({ id: c.slug, name: c.name }));

export const productBrowserItems = catalogProducts.map((p) => ({
  slug: p.slug,
  name: p.name,
  desc: p.tagline,
  image: p.images[0] ?? "",
  badge: categoryBySlug(p.category)?.name ?? "Product",
  series: [productCollection(p.slug)],
  types: [p.category],
}));

export const categoryBrowserItems = catalogCategories.map((c) => ({
  slug: c.slug,
  name: c.name,
  desc: c.desc.slice(0, 140).trim() + "…",
  image: c.banner,
  badge: `${c.products.length} products`,
  series: Array.from(new Set(c.products.map((s) => productCollection(s) as string))),
  types: [c.slug],
}));

export const industryBrowserItems = industryPages.map((i) => ({
  slug: i.slug,
  name: i.name,
  desc: i.overview.slice(0, 140).trim() + "…",
  image: i.gallery[0] ?? "",
  badge: "Industry Solution",
  series: Array.from(new Set(i.products.map((s) => productCollection(s) as string))),
  types: Array.from(
    new Set(i.products.map((s) => productBySlug(s)?.category).filter((c): c is string => Boolean(c))),
  ),
}));
