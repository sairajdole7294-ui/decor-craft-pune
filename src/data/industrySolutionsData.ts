import { Building2, Briefcase, Home, Store } from "lucide-react";

export interface SolutionProduct {
  name: string;
  image: string;
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
      { name: "Lobby Sofa Set", image: "/media/industries/hostel/bed-with-integrated-study-table.jpg" },
      { name: "Restaurant Chair", image: "/media/industries/hostel/bedside-table.jpg" },
      { name: "Hotel Room Desk", image: "/media/industries/hostel/cafeteria-chairs.jpg" },
      { name: "Conference Table", image: "/media/industries/hostel/cafeteria-table.jpg" },

      { name: "Single Hostel Bed", image: "/media/industries/hostel/common-tv-unit.jpg" },
      { name: "Bunk Bed", image: "/media/industries/hostel/computer-table.jpg" },
      { name: "Metal Bunk Bed", image: "/media/industries/hostel/dressing-table.jpg" },
      { name: "PG Wardrobe", image: "/media/industries/hostel/height-adjustable-table-single.jpg" },
      { name: "Study Table", image: "/media/industries/hostel/hostel-bunk-bed.jpg" },
      { name: "Study Chair", image: "/media/industries/hostel/hostel-single-bed.jpg" },
      { name: "Hostel Mattress", image: "/media/industries/hostel/hostel-study-table-with-bookshelf.jpg" },
      { name: "Bedside Table", image: "/media/industries/hostel/hostel-study-table-with-storage.jpg" },
      { name: "Shoe Rack", image: "/media/industries/hostel/hostel-study-table.jpg" },
      { name: "Dining Table", image: "/media/industries/hostel/kitchen-storage-rack.jpg" },
      { name: "Dining Chair", image: "/media/industries/hostel/library-book-rack.jpg" },
      { name: "Common Area Sofa", image: "/media/industries/hostel/library-chair.jpg" },
      { name: "TV Unit", image: "/media/industries/hostel/locker-unit.jpg" },
      { name: "Locker Unit", image: "/media/industries/hostel/microwave-stand.jpg" },
      { name: "Bookshelf", image: "/media/industries/hostel/open-book-display.jpg" },
      { name: "Laundry Drying Rack", image: "/media/industries/hostel/pull-out-bed.jpg" },
    ],
  },

  corporate: {
    title: "Corporate Office Solutions",
    collectionName: "Corporate Office Furniture Collection",
    icon: Briefcase,
    products: [
      { name: "Executive Desk", image: "/media/industries/hostel/dressing-table.jpg" },
      { name: "Ergonomic Chair", image: "/media/industries/hostel/hostel-study-table-with-storage.jpg" },
    ],
  },

  residential: {
    title: "Residential Projects",
    collectionName: "Residential Furniture Collection",
    icon: Home,
    products: [
      { name: "Living Room Sofa", image: "/media/industries/hostel/open-book-display.jpg" },
      { name: "Dining Table Set", image: "/media/industries/hostel/kitchen-storage-rack.jpg" },
    ],
  },

  retail: {
    title: "Retail Space Solutions",
    collectionName: "Retail Display Furniture Collection",
    icon: Store,
    products: [
      { name: "Display Rack", image: "/media/industries/hostel/cafeteria-table.jpg" },
      { name: "Checkout Counter", image: "/media/industries/hostel/dressing-table.jpg" },
    ],
  },
};

export const allSolutions = [
  { key: "hospitality", ...solutionsData.hospitality },
  { key: "corporate", ...solutionsData.corporate },
  { key: "residential", ...solutionsData.residential },
  { key: "retail", ...solutionsData.retail },
];
