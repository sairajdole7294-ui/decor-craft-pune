// All media is stored locally inside the repository (public/media, public/videos)
// so the project is fully self-contained when cloned and run locally.
export const asset = (p: string) => `/media/${p.split("/").pop()}`;

export const media = {
  logo: "/media/logo.png",
  heroVideo: "/videos/hero.mp4",
  workVideo: "/videos/work.mp4",
  factoryVideo: "/videos/factory.mp4",
  interviewVideo: "/videos/interview.mp4",
  kitchen: "/media/modular-kitchen.jpg",
  wardrobe: "/media/modular-wardrobe.jpg",
  about1: asset("1ee7d578-c29a-4f3c-b069-effbc0fd5bc8/about1.webp"),
  about3: asset("4fb63c99-0e7c-458e-bfda-977f9df889a3/about3.jpg"),
  banner: asset("15bff683-d5ac-4a0c-a339-47e202e5c43c/aboutbanner.jpg"),
  founder: asset("d5236da7-7c2c-4a02-badb-f6cb4916319a/founder.png"),
  workshop: asset("d1e6fcf5-2ee1-415d-bc38-6ed7e23371af/tab11.jpg"),
  vb: asset("4352fc35-b585-49e5-9a12-399f70ddc14a/vb.jpg"),
  // Before / after frames from the SAME project (EKA Mobility HQ)
  beforeImage: asset("x/eka1.jpg"),
  transformation: "/media/before-after-transformation.png",
  afterImage: asset("x/eka.jpg"),
};

export const company = {
  name: "Payal Decor",
  tagline: "Interiors & Manufacturing Since 1992",
  phone: "+91 8007180059",
  phoneHref: "tel:+918007180059",
  whatsapp: "https://wa.me/918007180059",
  email: "Payaldecor96@gmail.com",
  address:
    "Katraj – Kondhwa Rd, behind Ganesh Mandir, near Vishwa Gym, Vidyanagar, Rajas Society, Katraj, Pune, Maharashtra 411046",
  hours: [
    { d: "Monday – Saturday", t: "9:30 AM – 7:00 PM" },
    { d: "Sunday", t: "By appointment" },
  ],
  maps:
    "https://www.google.com/maps?q=Katraj+Kondhwa+Road+Vidyanagar+Katraj+Pune+411046&output=embed",
};

export const stats = [
  { value: 30, suffix: "+", label: "Years Experience", note: "Since 1992" },
  { value: 500, suffix: "+", label: "Projects Delivered", note: "Across Pune & Maharashtra" },
  { value: 100, suffix: "%", label: "In-House Manufacturing", note: "Own CNC & press lines" },
  { value: 9001, prefix: "ISO ", suffix: ":2015", label: "Certified Quality", note: "Documented QC", raw: "ISO 9001:2015" },
];

export const services = [
  {
    id: "turnkey",
    n: "01",
    title: "Turnkey Interior Solutions",
    image: asset("20f3cd0d-b936-45b7-86de-04529908a98a/tabt3.jpg"),
    summary:
      "Complete turnkey interiors in Pune, handling every stage from design to execution with modern planning, premium materials and quality finishes.",
    points: ["Single-point accountability", "Civil, services & joinery coordination", "Published programme dates", "Snag clearance & handover"],
  },
  {
    id: "manufacturing",
    n: "02",
    title: "Custom Manufacturing",
    image: media.wardrobe,
    summary:
      "Custom furniture and modular manufacturing tailored to your brand identity, space requirements and design preferences — produced on our own lines.",
    points: ["CNC routing & nesting", "Automatic edge banding", "Post-forming & hot press", "Powder coating & upholstery"],
  },
  {
    id: "fitout",
    n: "03",
    title: "Office Interior Fit-outs",
    image: asset("8ccb363c-d0ff-4f00-a790-369dfabd201a/tabc1.webp"),
    summary:
      "Functional, stylish and professional workspaces for corporate offices, retail outlets and hospitality spaces — tuned for productivity and aesthetics.",
    points: ["Workstations & cabins", "Reception & collaboration zones", "Acoustic & ergonomic planning", "Phased occupied-site delivery"],
  },
  {
    id: "design",
    n: "04",
    title: "Commercial Interior Design",
    image: asset("9bf9850d-447e-4eca-97b4-1171adec9776/tab3d1.webp"),
    summary:
      "Planning, 3D design and execution integrated in one team — faster timelines, premium materials and innovative layouts for modern business environments.",
    points: ["Space planning & test fits", "Photoreal 3D visualisation", "Material & colour consultancy", "Value engineering"],
  },
];

export const products = [
  {
    title: "Modular Wardrobes",
    image: media.wardrobe,
    desc: "Full-height wardrobe systems with engineered shutters, soft-close hardware and internal organisers.",
  },
  {
    title: "Modular Kitchens",
    image: media.kitchen,
    desc: "Post-formed and laminated kitchen systems built on moisture-resistant carcasses.",
  },
  {
    title: "Office Workstations",
    image: asset("7f087a03-d9c0-434f-80ef-c46388f6f644/mahale.jpg"),
    desc: "Linear, cluster and cubicle workstations with privacy screens and integrated cable management.",
  },
  {
    title: "Reception & TV Units",
    image: asset("3702b250-9057-4210-92f6-c6d2c0b8cf51/eka.jpg"),
    desc: "Signature reception desks and media walls in veneer, solid surface and back-lit finishes.",
  },
];

export const usps = [
  { icon: "Factory", title: "In-House Manufacturing Facility", stat: "100%", body: "Reliable equipment and a skilled production team guarantee consistent quality, customization and timely delivery." },
  { icon: "Building2", title: "Commercial Excellence", stat: "Only B2B", body: "Unlike general contractors, we focus only on commercial projects — strong knowledge in business functionality, ergonomics and compliance." },
  { icon: "CalendarCheck", title: "On-Time Delivery", stat: "Published dates", body: "A strict project-management timeline ensures smooth handovers and limits disruption to business operations." },
  { icon: "Users", title: "Experienced Team", stat: "30+ yrs", body: "Our leadership and site teams have over 30 years of experience delivering commercial interiors." },
  { icon: "Layers", title: "Premium Materials", stat: "Vetted supply", body: "Material and colour consultancy backed by vetted suppliers — every board, laminate and fitting specified for commercial wear." },
  { icon: "Ruler", title: "Deep Customization", stat: "Zero off-the-shelf", body: "Every unit is engineered to your brand identity, space constraints and workflow — never off-the-shelf." },
  { icon: "LifeBuoy", title: "After-Sales Support", stat: "Long-term", body: "Post-handover service teams stay reachable for adjustments, servicing and expansions long after installation." },
  { icon: "ShieldCheck", title: "Quality Assurance & Warranty", stat: "ISO 9001", body: "Certified quality control at every stage, with documented checks before handover and warranty on manufactured units." },
];

export type Project = {
  slug: string;
  name: string;
  client: string;
  location: string;
  year: number;
  area: string;
  category: string;
  type: string;
  desc: string;
  materials: string[];
  scope: string[];
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "eka-mobility",
    name: "EKA Mobility Headquarters",
    client: "EKA Mobility",
    location: "Pune, Maharashtra",
    year: 2024,
    area: "24,000 sq.ft.",
    category: "Commercial",
    type: "Corporate Office",
    desc: "A modern reception and open-plan headquarters in neutral tones, layered with wooden joinery, glass partitions and a curated sculpture that grounds the arrival experience.",
    materials: ["Veneer joinery", "Toughened glass partitions", "Acoustic panelling", "Engineered stone"],
    scope: ["Turnkey interiors", "Reception unit", "Workstations", "Cabins & meeting rooms"],
    images: [
      asset("3702b250-9057-4210-92f6-c6d2c0b8cf51/eka.jpg"),
      asset("1ac0832e-0403-4798-a7f7-43284e42141f/eka1.jpg"),
      asset("2c2b7dfc-0fbe-48c8-85b7-fae4f8c6595e/eka2.jpg"),
    ],
  },
  {
    slug: "kirloskar-pneumatics",
    name: "Kirloskar Pneumatics",
    client: "Kirloskar Pneumatic Co. Ltd.",
    location: "Pune, Maharashtra",
    year: 2023,
    area: "18,500 sq.ft.",
    category: "Office",
    type: "Corporate Interiors",
    desc: "Clean-lined workstations and executive cabins where wood and glass are calibrated for warmth and openness — an interior tuned to sophisticated day-to-day operations.",
    materials: ["Laminate workstations", "Glazed cabin fronts", "Carpet tiles", "Powder-coated steel"],
    scope: ["Office fit-out", "Modular workstations", "Executive cabins", "Storage systems"],
    images: [
      asset("921216c5-dbd8-4462-aa5f-847c7ccc0a67/kirlok.jpg"),
      asset("46753ec8-9893-4f72-aecf-e3b4772843b2/kirlok1.jpg"),
      asset("45496a30-a6ac-45dd-974c-9d687d5621f3/kirlok2.jpg"),
    ],
  },
  {
    slug: "prakash-masale",
    name: "Prakash Masale Office",
    client: "Prakash Masale",
    location: "Pune, Maharashtra",
    year: 2023,
    area: "9,200 sq.ft.",
    category: "Office",
    type: "Workspace Design",
    desc: "A stylish, modern office with individual cubicles for focused work, a creative ceiling of wooden beams and hanging lights, warm wooden flooring and pastel walls.",
    materials: ["Wooden ceiling beams", "Wooden flooring", "Pastel emulsion", "Pendant lighting"],
    scope: ["Workspace design", "Cubicle systems", "False ceiling", "Lighting design"],
    images: [
      asset("86a80bfb-0a89-4bf2-a37b-e8b99dfa7847/prakash.jpg"),
      asset("02033394-42ef-4b6f-af11-65eae6ee068c/prakash1.jpg"),
      asset("e6048a2b-371f-433b-9cd7-64b0231d21ec/prakash2.jpg"),
    ],
  },
  {
    slug: "mahle-workspace",
    name: "MAHLE Workspace",
    client: "MAHLE",
    location: "Pune, Maharashtra",
    year: 2022,
    area: "15,000 sq.ft.",
    category: "Furniture",
    type: "Workstations & Furniture",
    desc: "Linear and cluster workstation systems with privacy screens and integrated cable management, manufactured in-house and installed floor by floor without halting operations.",
    materials: ["MR-grade board", "Fabric screens", "Aluminium raceways", "Soft-close hardware"],
    scope: ["Furniture manufacturing", "Workstations", "Storage", "Phased installation"],
    images: [
      asset("7f087a03-d9c0-434f-80ef-c46388f6f644/mahale.jpg"),
      asset("552fb5b3-ce45-4ca7-acbe-b87f897e4c4e/mahale1.jpg"),
      asset("5222a12a-f182-4ca5-b2d1-512295e72374/mahale2.jpg"),
    ],
  },
  {
    slug: "vishwakarma-institutes",
    name: "Vishwakarma Institutes Campus",
    client: "Vishwakarma University",
    location: "Pune, Maharashtra",
    year: 2022,
    area: "32,000 sq.ft.",
    category: "Hospitality",
    type: "Institutional Campus",
    desc: "Campus-wide interiors across administration, faculty and student-facing zones — durable finishes, branded colour blocking and heavy-duty modular furniture built for daily footfall.",
    materials: ["High-pressure laminate", "Solid surface counters", "Acoustic ceiling", "Vinyl flooring"],
    scope: ["Campus interiors", "Reception counters", "Faculty cabins", "Auditorium joinery"],
    images: [
      asset("b39d9fbd-c660-4197-8345-1dc3ed783e64/vishwa.jpg"),
      asset("99d45b4a-3875-43b1-acdf-5d6c5ba15466/vishwa1.jpg"),
      asset("d99cbf0b-d870-4a65-92e9-eaf358f5fdc4/vishwa2.jpg"),
    ],
  },
  {
    slug: "modular-kitchen-suite",
    name: "Modular Kitchen Suite",
    client: "Private Residence",
    location: "Katraj, Pune",
    year: 2024,
    area: "320 sq.ft.",
    category: "Modular",
    type: "Modular Kitchen",
    desc: "Post-formed and laminated kitchen systems on moisture-resistant carcasses, with tall units, integrated appliance housings and soft-close everything.",
    materials: ["MR ply carcass", "Post-formed shutters", "Quartz counter", "Soft-close hinges"],
    scope: ["Modular kitchen", "Tall units", "Counter fabrication", "Installation"],
    images: [
      media.kitchen,
    ],
  },
  {
    slug: "wardrobe-systems",
    name: "Engineered Wardrobe Systems",
    client: "Gulmohar Development",
    location: "Pune, Maharashtra",
    year: 2023,
    area: "12 units",
    category: "Wardrobes",
    type: "Modular Wardrobes",
    desc: "Full-height wardrobe systems with engineered shutters, soft-close hardware and internal organisers — repeatable quality across every unit on the floor plate.",
    materials: ["Engineered shutters", "Aluminium profiles", "Internal organisers", "Mirror inserts"],
    scope: ["Wardrobe manufacturing", "Site measurement", "Installation", "After-sales servicing"],
    images: [
      media.wardrobe,
    ],
  },
];

export const projectCategories = ["All", "Commercial", "Office", "Hospitality", "Modular", "Factory", "Furniture", "Wardrobes"];

export const machines = [
  { name: "Biesse Rover Gold CNC", image: asset("c25170cc-6f50-4dbb-94c0-007ab83d1bbb/biesse-rover.jpg"), spec: "5-axis nesting router · 3,700 × 1,600 mm bed", benefit: "Complex profiles and repeatable joinery cut straight from the design file." },
  { name: "Edgebander — Biesse Jade 240", image: asset("1b094869-1d7b-42d3-a6ac-925e113b3dbd/edgebander.jpg"), spec: "Automatic PUR/EVA edgebander · 0.4–3 mm tape", benefit: "Seamless, moisture-sealed edges that survive commercial wear." },
  { name: "Technogem Postforming", image: asset("722f07d0-abcb-4a16-a997-eda05ebbea7c/technogem---postforming-machine.jpg"), spec: "Continuous postforming line", benefit: "Rolled-edge counters and shutters with no visible joint." },
  { name: "Technogem Hot Press", image: asset("3fc62a06-e0fa-4a8b-b5d6-92953a1b33f6/technogem.jpg"), spec: "Hydraulic hot press · heated platen", benefit: "Bubble-free lamination and veneer bonding at scale." },
  { name: "Panel Saw — Felder K700", image: asset("92c33e53-6072-4b71-b771-91cc37b87099/panel-saw.jpg"), spec: "Sliding table saw · 3,200 mm carriage", benefit: "Precision sizing for bespoke one-off commissions." },
  { name: "Panel Saw — Altendorf WA8X", image: asset("0a946759-9570-405b-8991-7b813cfdb1c2/panel-saw1.jpg"), spec: "Heavy-duty sliding panel saw", benefit: "Square, chip-free cuts on high-volume panel runs." },
  { name: "Edgebander — Homag", image: asset("1b094869-1d7b-42d3-a6ac-925e113b3dbd/edgebander.jpg"), spec: "Industrial edgebander with trimming units", benefit: "Second banding line keeps large orders on schedule." },
  { name: "Hammer Spindle Moulder", image: asset("a4cc15cb-9a67-44be-88c4-df86897d205a/hammer-splinder-moulder.jpg"), spec: "Tilting spindle moulder", benefit: "Custom mouldings and profiled solid-wood details." },
];

export const capabilities = [
  { name: "Panel Processing", pct: 96, note: "High-volume panel production" },
  { name: "CNC Routing", pct: 88, note: "Precision cutting for complex shapes" },
  { name: "Edge Banding", pct: 82, note: "Seamless edge finishing" },
  { name: "Joinery", pct: 90, note: "Expert wood joining techniques" },
  { name: "Powder Coating", pct: 77, note: "Durable surface finishing" },
  { name: "Upholstery", pct: 84, note: "Custom fabric and padding work" },
];

export const factorySteps = [
  { t: "Raw Material", d: "Vetted boards, laminates and hardware received and batch-checked." },
  { t: "Design", d: "Shop drawings and cut files generated from approved 3D design." },
  { t: "CNC", d: "Nesting and 5-axis routing on the Biesse Rover Gold." },
  { t: "Edge Banding", d: "PUR/EVA sealing on Biesse Jade and Homag lines." },
  { t: "Assembly", d: "Hardware fitting, pressing and dry-fit of complete modules." },
  { t: "Quality Check", d: "Documented ISO 9001 checks before anything leaves the floor." },
  { t: "Installation", d: "Factory-finished modules installed cleanly by our own teams." },
];

export const processSteps = [
  { n: "01", t: "Consultation", d: "We listen to your brief, walk the site and align on budget, timeline and business outcomes." },
  { n: "02", t: "Design", d: "Space planning, 3D visualisation and material consultancy until every detail is signed off." },
  { n: "03", t: "Manufacturing", d: "Your units are cut, banded, joined and finished on our own CNC and press lines." },
  { n: "04", t: "Execution", d: "Civil works, services coordination and site supervision run to a published programme." },
  { n: "05", t: "Installation", d: "Factory-finished modules are installed cleanly with minimal disruption to your operations." },
  { n: "06", t: "Completion", d: "Documented quality checks, snag clearance, handover and continuing after-sales support." },
];

export const clientLogos = [
  "5fffe769-ff1e-4e7c-a3f1-a3ca496243db/c25.webp",
  "3660958d-6eec-4c78-8698-31a5622e62b7/c22.jpg",
  "e2ffdaa9-f443-4290-843a-ce6bea2e7145/c23.png",
  "5d53c187-73ef-4c03-ad2d-fbaf5f5647d1/c24.jpeg",
  "b89861bd-fc6f-4d46-bac5-db7c9d2a3141/c21.jpg",
  "03ccd832-0347-4960-8b75-741fe86c2389/c20.jpg",
  "4f1ba44c-a6e0-4882-b688-1d3fa86bc3c7/c19.jpg",
  "bb4d2828-ee8f-4fee-8136-a862efd1e135/c18.webp",
  "612a223a-b11d-49ed-9567-fb68342d2e35/c12.jpg",
  "9bdbb75e-3687-4200-9f62-7d5ae5fe92f0/c14.jpg",
  "655ac7f8-18ca-46f7-a5b1-ab56a6662e20/c10.jpg",
  "ec169747-2d55-4889-900f-1d850b7a231f/c13.jpg",
  "612ace2f-38f3-4b74-9e08-314f14b1d5a5/c9.jpg",
  "b460e7b0-d103-427b-98d8-d80383852636/c17.jpg",
  "cc43bb08-66fe-4725-ab81-36a824f253ea/c16.jpg",
  "9a9a86d1-2898-46c9-85ca-e6bbb0c2e97c/c15.jpg",
  "ecc5edbc-9957-457d-a0d1-e4b71dbd8180/c8.jpg",
  "6319d59d-4a04-4e79-8188-5d6343099639/c7.png",
  "45d23a93-008a-42c6-97d6-f2de11830332/c6.jpg",
  "89e1598b-958d-4713-86c5-c0cb7e8f2c10/c5.jpg",
  "0ab1efff-d60f-4a27-9937-c77fe90be302/c4.jpg",
  "dc549e82-7e06-4718-81f4-62ee438f3936/c3.jpg",
  "08214152-57bc-4396-a85f-3999b6fc29ab/c2.jpg",
  "fca034b9-4e34-4cbd-bd18-c775a1abf7f4/c1.jpg",
].map(asset);

export const clientNames = [
  "KPIT", "MAHLE", "Kirloskar Pneumatic", "EKA Mobility", "Vishwakarma University",
  "Wisdom World School", "Universal Wisdom School", "Garware Hi-Tech Films",
  "Pinnacle Industries", "NewEra Hospitals", "Gulmohar Development", "Kider India",
  "SpaceTech Designs", "LABAIR", "Airotek Systems", "Cherry Hill", "Solutia",
  "CNT Architects", "Eduplus Campus", "VIIT Pune",
];

export const industries = [
  "Automotive & Mobility", "Engineering & Manufacturing", "IT & Technology",
  "Education & Campuses", "Healthcare & Hospitals", "Retail & Showrooms",
  "Hospitality", "Real Estate & Developers",
];

export const testimonials = [
  {
    quote:
      "Payal Decor has revolutionized the appearance and feel of our spaces. Their dedication to detail, artistic inclination and focus on quality exactly complemented the look of Vishwakarma Institutes. We are extremely grateful for their professionalism and timely delivery.",
    name: "Vishwakarma Institutes",
    role: "Campus Administration · Pune",
  },
  {
    quote:
      "The reception and open-plan floors were delivered exactly to the published programme. Having design, factory and installation under one roof removed the usual finger-pointing entirely.",
    name: "EKA Mobility",
    role: "Facilities Team · Pune",
  },
  {
    quote:
      "Workstations and executive cabins were installed floor by floor without stopping our operations. The finish quality has held up beautifully through daily use.",
    name: "Kirloskar Pneumatic Co. Ltd.",
    role: "Corporate Services · Pune",
  },
  {
    quote:
      "Every unit was engineered to our layout rather than forced into a catalogue size. That difference shows in how the office works day to day.",
    name: "Prakash Masale",
    role: "Management · Pune",
  },
  {
    quote:
      "We had a great experience working with Payal Decor. The team understood our requirements well, maintained good quality throughout the work, and delivered the project professionally. We are happy with the overall execution and service.",
    name: "Mahale",
    role: "Client · Pune",
  },
  {
    quote:
      "We had a great experience working with Payal Decor. The team understood our requirements well, maintained good quality throughout the work, and delivered the project professionally. We are happy with the overall execution and service.",
    name: "Kirloskar Pneumatic",
    role: "Client · Pune",
  },
];

export const certifications = [
  { title: "ISO 9001:2015", image: asset("1ffe3143-62a6-4187-843b-d6c6e33ff188/11.png") },
  { title: "Quality Management", image: asset("97adaad9-2de2-4425-a6a0-bb73876dde1d/22.png") },
  { title: "Registered Enterprise", image: asset("a0528849-088b-4b17-87b6-0c70520c17e9/33.png") },
  { title: "Compliance Certificate", image: asset("a754fbb7-f977-44fe-b372-4275d28cd939/44.png") },
  { title: "Industry Recognition", image: asset("3a8142ed-5710-415c-be27-2a57ae10475b/55.png") },
];

export const galleryItems = [
  { src: asset("3702b250-9057-4210-92f6-c6d2c0b8cf51/eka.jpg"), cat: "Commercial", title: "EKA Mobility reception" },
  { src: asset("1ac0832e-0403-4798-a7f7-43284e42141f/eka1.jpg"), cat: "Commercial", title: "Open-plan floor" },
  { src: asset("2c2b7dfc-0fbe-48c8-85b7-fae4f8c6595e/eka2.jpg"), cat: "Commercial", title: "Collaboration zone" },
  { src: asset("921216c5-dbd8-4462-aa5f-847c7ccc0a67/kirlok.jpg"), cat: "Office", title: "Kirloskar workstations" },
  { src: asset("46753ec8-9893-4f72-aecf-e3b4772843b2/kirlok1.jpg"), cat: "Office", title: "Executive cabin" },
  { src: asset("45496a30-a6ac-45dd-974c-9d687d5621f3/kirlok2.jpg"), cat: "Office", title: "Glazed partitions" },
  { src: asset("86a80bfb-0a89-4bf2-a37b-e8b99dfa7847/prakash.jpg"), cat: "Office", title: "Prakash Masale cubicles" },
  { src: asset("02033394-42ef-4b6f-af11-65eae6ee068c/prakash1.jpg"), cat: "Office", title: "Ceiling detail" },
  { src: asset("e6048a2b-371f-433b-9cd7-64b0231d21ec/prakash2.jpg"), cat: "Office", title: "Breakout area" },
  { src: asset("7f087a03-d9c0-434f-80ef-c46388f6f644/mahale.jpg"), cat: "Furniture", title: "MAHLE workstations" },
  { src: asset("552fb5b3-ce45-4ca7-acbe-b87f897e4c4e/mahale1.jpg"), cat: "Furniture", title: "Cluster layout" },
  { src: asset("5222a12a-f182-4ca5-b2d1-512295e72374/mahale2.jpg"), cat: "Furniture", title: "Storage systems" },
  { src: asset("b39d9fbd-c660-4197-8345-1dc3ed783e64/vishwa.jpg"), cat: "Hospitality", title: "Vishwakarma campus" },
  { src: asset("99d45b4a-3875-43b1-acdf-5d6c5ba15466/vishwa1.jpg"), cat: "Hospitality", title: "Reception counter" },
  { src: asset("d99cbf0b-d870-4a65-92e9-eaf358f5fdc4/vishwa2.jpg"), cat: "Hospitality", title: "Faculty zone" },
  { src: media.kitchen, cat: "Modular", title: "Modular kitchen" },
  { src: asset("313966bc-5ce1-4c91-9e06-7d649f6cac0a/tabm4.jpg"), cat: "Modular", title: "Tall unit run" },
  { src: asset("f93a9afc-8e61-43a6-9908-85694edf0335/tabm5.jpg"), cat: "Modular", title: "Counter detail" },
  { src: media.wardrobe, cat: "Modular", title: "Wardrobe system" },
  { src: asset("8ccb363c-d0ff-4f00-a790-369dfabd201a/tabc1.webp"), cat: "Commercial", title: "Commercial fit-out" },
  { src: asset("0a33e764-4556-4e54-a7e4-32473d239e30/tabc2.jpg"), cat: "Commercial", title: "Retail joinery" },
  { src: asset("8c4d7045-c3f0-4376-940f-3736eb2c018b/tabc3.jpg"), cat: "Commercial", title: "Display wall" },
  { src: asset("9bf9850d-447e-4eca-97b4-1171adec9776/tab3d1.webp"), cat: "Design", title: "3D visualisation" },
  { src: asset("7589a2da-d8a1-4efd-b943-ce177de36c9f/tab3d2.jpg"), cat: "Design", title: "Concept render" },
  { src: asset("c2b77fe2-4ccd-42af-b712-3e9cfbbb4022/tab3d3.webp"), cat: "Design", title: "Material study" },
  { src: asset("c25170cc-6f50-4dbb-94c0-007ab83d1bbb/biesse-rover.jpg"), cat: "Factory", title: "Biesse Rover Gold CNC" },
  { src: asset("1b094869-1d7b-42d3-a6ac-925e113b3dbd/edgebander.jpg"), cat: "Factory", title: "Edgebanding line" },
  { src: asset("92c33e53-6072-4b71-b771-91cc37b87099/panel-saw.jpg"), cat: "Factory", title: "Felder K700" },
  { src: asset("0a946759-9570-405b-8991-7b813cfdb1c2/panel-saw1.jpg"), cat: "Factory", title: "Altendorf WA8X" },
  { src: asset("3fc62a06-e0fa-4a8b-b5d6-92953a1b33f6/technogem.jpg"), cat: "Factory", title: "Hot press" },
  { src: asset("722f07d0-abcb-4a16-a997-eda05ebbea7c/technogem---postforming-machine.jpg"), cat: "Factory", title: "Postforming line" },
  { src: asset("a4cc15cb-9a67-44be-88c4-df86897d205a/hammer-splinder-moulder.jpg"), cat: "Factory", title: "Spindle moulder" },
  { src: asset("d1e6fcf5-2ee1-415d-bc38-6ed7e23371af/tab11.jpg"), cat: "Factory", title: "Production floor" },
  { src: asset("4352fc35-b585-49e5-9a12-399f70ddc14a/vb.jpg"), cat: "Commercial", title: "Site handover" },
  { src: asset("1ee7d578-c29a-4f3c-b069-effbc0fd5bc8/about1.webp"), cat: "Commercial", title: "Studio project" },
  { src: asset("4fb63c99-0e7c-458e-bfda-977f9df889a3/about3.jpg"), cat: "Commercial", title: "Finished interior" },
];

export const galleryCategories = ["All", "Commercial", "Office", "Modular", "Furniture", "Hospitality", "Factory", "Design"];

export const faqs = [
  { q: "Do you handle design and execution, or only manufacturing?", a: "Both. Payal Decor runs design, in-house manufacturing, site execution and installation with one accountable team — so nothing falls between the drawing, the factory and the floor." },
  { q: "What kind of projects do you take on?", a: "We focus on commercial work: corporate offices, campuses, healthcare, retail, hospitality and industrial facilities — plus modular kitchens and wardrobes for residential clients." },
  { q: "How long does a typical office fit-out take?", a: "It depends on area and scope, but we publish a programme at award and manage to those dates. A 10,000 sq.ft. office fit-out typically runs 8–14 weeks from sign-off." },
  { q: "Can you work in an occupied office?", a: "Yes. Because modules arrive factory-finished, installation is fast and clean. We routinely phase work floor by floor or over weekends to keep operations running." },
  { q: "What warranty do you offer?", a: "Manufactured units carry a warranty, backed by documented ISO 9001:2015 quality checks at every stage. Our after-sales team stays reachable for adjustments and expansions." },
  { q: "Do you supply outside Pune?", a: "Our studio and factory are in Katraj, Pune, and we deliver across Pune and Maharashtra. For larger commissions elsewhere, talk to us about logistics." },
];

export const posts = [
  { slug: "in-house-manufacturing", title: "Why in-house manufacturing changes the deadline maths", date: "12 June 2026", tag: "Manufacturing", excerpt: "When the factory and the site team report to the same programme, a fit-out stops depending on a vendor's queue. Here is what that does to a schedule.", image: asset("c25170cc-6f50-4dbb-94c0-007ab83d1bbb/biesse-rover.jpg") },
  { slug: "specifying-boards", title: "Specifying boards and laminates for commercial wear", date: "28 May 2026", tag: "Materials", excerpt: "Residential-grade material fails fast in a 300-person office. A practical guide to carcass, edge and surface specification for commercial life.", image: media.wardrobe },
  { slug: "occupied-fitouts", title: "Delivering a fit-out without stopping the business", date: "09 May 2026", tag: "Execution", excerpt: "Phasing, factory-finished modules and weekend installs — how we hand over floors while the client keeps working.", image: asset("8ccb363c-d0ff-4f00-a790-369dfabd201a/tabc1.webp") },
  { slug: "workstation-ergonomics", title: "Workstation ergonomics that survive an audit", date: "21 April 2026", tag: "Design", excerpt: "Clearances, cable management and privacy screens: the details that decide whether a workstation is comfortable three years in.", image: asset("7f087a03-d9c0-434f-80ef-c46388f6f644/mahale.jpg") },
  { slug: "reception-first-impression", title: "The reception desk is the brand statement", date: "03 April 2026", tag: "Projects", excerpt: "Veneer, solid surface and back-lit detailing — how the arrival experience gets engineered before it gets styled.", image: asset("3702b250-9057-4210-92f6-c6d2c0b8cf51/eka.jpg") },
  { slug: "modular-kitchen-carcass", title: "Moisture-resistant carcasses are non-negotiable", date: "18 March 2026", tag: "Modular", excerpt: "The part of a modular kitchen nobody sees is the part that decides how long it lasts. A look inside our carcass specification.", image: media.kitchen },
];

export const openRoles = [
  { title: "CNC Operator", type: "Full-time", place: "Katraj Factory, Pune", exp: "2–5 years", desc: "Run and maintain our Biesse Rover Gold nesting router; read cut files and hold tolerance across high-volume panel runs." },
  { title: "Interior Designer (Commercial)", type: "Full-time", place: "Katraj Studio, Pune", exp: "3–6 years", desc: "Own space planning, 3D visualisation and material consultancy for corporate and campus projects from brief to sign-off." },
  { title: "Site Supervisor", type: "Full-time", place: "Pune (site-based)", exp: "4–8 years", desc: "Run daily site programmes, coordinate services and civil works, and drive snag-free handovers on published dates." },
  { title: "Production Planner", type: "Full-time", place: "Katraj Factory, Pune", exp: "3–5 years", desc: "Sequence factory load across CNC, banding and press lines so every project ships to its committed installation window." },
  { title: "Sales & Client Relations", type: "Full-time", place: "Katraj Studio, Pune", exp: "2–5 years", desc: "Handle commercial enquiries end to end — site visits, estimation support and long-term client relationships." },
  { title: "Furniture Assembler", type: "Full-time", place: "Katraj Factory, Pune", exp: "1–4 years", desc: "Fit hardware, press and dry-fit complete modules to shop drawings before documented quality checks." },
];

export const coverage = [
  "Katraj", "Kondhwa", "Hinjewadi", "Kharadi", "Baner", "Balewadi", "Viman Nagar",
  "Hadapsar", "Magarpatta", "Pimpri-Chinchwad", "Wakad", "Chakan MIDC", "Talegaon", "Shivajinagar",
];

export const materialLibrary = [
  { name: "High-Pressure Laminate", use: "Workstations, storage, shutters", note: "Abrasion-rated surfaces for daily commercial contact." },
  { name: "Natural & Engineered Veneer", use: "Reception, cabins, media walls", note: "Book-matched leaves finished with PU or melamine sealer." },
  { name: "MR & BWP Plywood", use: "Carcasses and wet zones", note: "Moisture-resistant cores specified where water is a risk." },
  { name: "Solid Surface", use: "Counters and reception tops", note: "Seamless, repairable, thermoformable to curved fronts." },
  { name: "Powder-Coated Steel", use: "Frames, legs, partitions", note: "Durable finish on fabricated structural elements." },
  { name: "Acoustic Panelling", use: "Meeting rooms, campuses", note: "Slat and fabric systems that lower reverberation." },
  { name: "Toughened & Frosted Glass", use: "Partitions and cabin fronts", note: "Daylight retention with acoustic and visual privacy." },
  { name: "Commercial Upholstery", use: "Seating and screens", note: "Rub-tested fabrics padded and finished in-house." },
];

export const awards = [
  { year: "1992", t: "Founded in Pune", d: "Payal Decor begins as a bespoke furniture workshop serving Pune homes and small businesses." },
  { year: "2004", t: "First factory line", d: "Panel saw and press capacity brought in-house, moving production off subcontractors." },
  { year: "2012", t: "Commercial specialisation", d: "The studio shifts focus to corporate and institutional interiors across Pune." },
  { year: "2017", t: "CNC & edgebanding", d: "Biesse Rover Gold and Jade 240 lines installed, unlocking precision at volume." },
  { year: "2020", t: "ISO 9001:2015 certified", d: "Documented quality management adopted across design, factory and site." },
  { year: "2024", t: "1000+ projects delivered", d: "Corporate headquarters, campuses and workspaces handed over across Maharashtra." },
];

export const team = [
  { name: "Swaroop Suthar", role: "Founder & CEO", image: media.founder, note: "Three decades of shaping material with intent." },
];
// ---------------------------------------------------------------------------
// Product range, categories, industry solutions & catalogue (Services page)
// ---------------------------------------------------------------------------

export type ProductCategory = {
  slug: string;
  name: string;
  image: string;
  desc: string;
  features: string[];
  applications: string[];
  catalogue?: boolean;
  category?: string;
  series?: string;
};

export const productRange: ProductCategory[] = [
  {
    slug: "premium-office-tables",
    name: "Premium Office Tables",
    image: "/media/products/p28.jpg",
    desc: "Executive and managerial desks built on engineered carcasses with cable-managed tops, storage pedestals and a finish schedule tuned to your brand.",
    features: ["25 mm MR-grade engineered top", "PUR-sealed 2 mm edge banding", "Integrated cable trays & grommets", "Soft-close pedestal drawers"],
    applications: ["Corporate cabins", "Managing director suites", "Consulting rooms", "Branch offices"],
    catalogue: true,
    category: "TABLES AND CUPBOARDS",
    series: "PREMIA SERIES",
  },
  {
    slug: "reception-tables",
    name: "Reception Tables",
    image: "/media/products/p29.jpg",
    desc: "Signature reception counters in veneer, solid surface and back-lit finishes — the first brand statement a visitor reads in your space.",
    features: ["Curved solid-surface fascia", "Concealed LED cove lighting", "Dual-height transaction counter", "Lockable back storage"],
    applications: ["Corporate lobbies", "Hotels & hospitality", "Hospitals & clinics", "Campus admin blocks"],
    catalogue: true,
    category: "TABLES AND CUPBOARDS",
    series: "PREMIA SERIES",
  },
  {
    slug: "conference-tables",
    name: "Conference & Meeting Tables",
    image: "/media/products/p30.jpg",
    desc: "Boardroom tables in wood, veneer and laminate with pop-up power modules, AV routing and seating layouts planned around the room.",
    features: ["6 to 24-seat configurations", "Flip-top power & data modules", "Post-formed rolled edges", "Concealed cable spine"],
    applications: ["Boardrooms", "Training rooms", "Faculty meeting halls", "Client presentation rooms"],
    catalogue: true,
    category: "CONFERENCE TABLES",
    series: "PREMIA SERIES",
  },
  {
    slug: "workstation-desks",
    name: "Workstation Desks",
    image: "/media/products/p32.jpg",
    desc: "Linear, cluster and cubicle workstation systems with fabric privacy screens, shared spines and repeatable quality across every seat.",
    features: ["Linear, L and cluster layouts", "Acoustic fabric tack screens", "Aluminium raceway spine", "Mobile pedestals with castors"],
    applications: ["Open-plan offices", "IT & BPO floors", "Engineering design centres", "Co-working spaces"],
    catalogue: true,
    category: "TABLES AND CUPBOARDS",
    series: "SPARK SERIES",
  },
  {
    slug: "executive-office-tables",
    name: "Executive Office Tables",
    image: "/media/products/p33.jpg",
    desc: "Statement executive desks with veneer detailing, credenza units and finishes selected for a decade of daily commercial use.",
    features: ["Matched natural veneer", "Side credenza & return unit", "Leather / PU inlay options", "Concealed CPU housing"],
    applications: ["CXO cabins", "Directors' offices", "Partner rooms", "Legal & finance chambers"],
    catalogue: true,
    category: "TABLES AND CUPBOARDS",
    series: "PREMIA SERIES",
  },
  {
    slug: "modular-office-desks",
    name: "Modular Office Desks",
    image: "/media/products/p35.jpg",
    desc: "Reconfigurable modular desking that grows with your headcount — every module engineered to your floor plate, never to a catalogue size.",
    features: ["Add-on modular seats", "Tool-free reconfiguration", "Shared power spine", "Standard & height-adjustable frames"],
    applications: ["Growing startups", "Project war rooms", "Shared service centres", "Satellite offices"],
    catalogue: true,
    category: "TABLES AND CUPBOARDS",
    series: "ELEMENT SERIES",
  },
  {
    slug: "modular-kitchens",
    name: "Modular Kitchens",
    image: media.kitchen,
    desc: "Post-formed and laminated kitchen systems on moisture-resistant carcasses, with tall units, appliance housings and soft-close everything.",
    features: ["MR / BWP ply carcass", "Post-formed shutters", "Quartz & granite counters", "Soft-close hinges and channels"],
    applications: ["Residences", "Corporate pantries", "Cafeterias", "Hostel & campus kitchens"],
    catalogue: true,
    category: "STORAGE SOLUTIONS",
    series: "MODULAR KITCHENS",
  },
  {
    slug: "modular-wardrobes",
    name: "Modular Wardrobes",
    image: media.wardrobe,
    desc: "Full-height wardrobe systems with engineered shutters, profile-lit interiors, mirror inserts and internal organisers built around what you store.",
    features: ["Hinged, sliding & glass profiles", "Profile-lit internal shelving", "Pull-out shoe and accessory racks", "Aluminium framed shutters"],
    applications: ["Residences", "Hotel rooms", "Hostels & guest houses", "Serviced apartments"],
    catalogue: true,
    category: "STORAGE SOLUTIONS",
    series: "MODULAR WARDROBES",
  },
];

export const industrySolutions = [
  { name: "Hospitality", desc: "Guest rooms, lobbies and F&B interiors combining premium finishes with commercial durability.", points: ["Room wardrobes & headboards", "Lobby & concierge counters", "Restaurant joinery"] },
  { name: "Corporate Office", desc: "Reception units, workstations, cabins and collaboration zones delivered floor by floor without stopping operations.", points: ["Test fits & space planning", "Phased occupied-site installs", "Acoustic & ergonomic compliance"] },
  { name: "Residential Projects", desc: "Complete home interiors — modular kitchens, wardrobes, living and bedroom furniture tailored to your layout and lifestyle.", points: ["Bespoke space planning", "Modular kitchen & wardrobe systems", "Living and bedroom furniture"] },
  { name: "Retail Space", desc: "Display systems, cash counters and back-lit brand walls that survive merchandising changes every season.", points: ["Modular display joinery", "Integrated lighting", "Fast turnaround installs"] },
];

export const catalogueSheets = [
  { title: "Office Furniture Catalogue", desc: "Desks, workstations, conference and reception systems with sizes and finish options.", items: "38 products" },
  { title: "Modular Kitchen & Wardrobe Catalogue", desc: "Carcass specification, shutter finishes, hardware and internal organiser options.", items: "24 systems" },
  { title: "Manufacturing Capability Profile", desc: "Machine list, capacity, quality process and the seven-stage production flow.", items: "Company profile" },
];
