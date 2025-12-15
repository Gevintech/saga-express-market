export interface Listing {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  region: string;
  image: string;
  category: string;
  condition: string;
  postedAt: string;
  sellerYears?: number;
  isPromoted?: boolean;
  isFeatured?: boolean;
  description?: string;
  specs?: Record<string, string>;
  seller?: {
    name: string;
    avatar?: string;
    adsCount: number;
    responseTime: string;
    verified: boolean;
  };
}

export const listings: Listing[] = [
  {
    id: "1",
    title: "Toyota Premio 2004 Silver",
    price: 21000000,
    currency: "USh",
    location: "Mukono",
    region: "Mukono TC",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    category: "vehicles",
    condition: "Ugandan Used",
    postedAt: "2 hours ago",
    sellerYears: 3,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Toyota Corolla Fielder 2012 Silver",
    price: 22500000,
    currency: "USh",
    location: "Kampala",
    region: "Rubaga",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop",
    category: "vehicles",
    condition: "Local Used",
    postedAt: "3 hours ago",
    sellerYears: 3,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Samsung Galaxy S21 Ultra 5G 128GB Black",
    price: 800000,
    currency: "USh",
    location: "Kampala",
    region: "Central Division",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
    category: "phones",
    condition: "Brand New",
    postedAt: "2 hours ago",
    isPromoted: true,
    description: "5G connectivity and high refresh rate with good cameras and battery",
    specs: {
      "Brand": "Samsung",
      "Model": "Galaxy S21 Ultra 5G",
      "Condition": "Brand New",
      "Second Condition": "No faults",
      "Internal Storage": "128 GB",
      "Card Slot": "No",
    },
    seller: {
      name: "SepTech Ug",
      adsCount: 445,
      responseTime: "within an hour",
      verified: true,
    },
  },
  {
    id: "4",
    title: "iPhone 14 Pro Max 256GB Deep Purple",
    price: 3500000,
    currency: "USh",
    location: "Kampala",
    region: "Nakawa",
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=300&fit=crop",
    category: "phones",
    condition: "Brand New",
    postedAt: "5 hours ago",
  },
  {
    id: "5",
    title: "3 Bedroom House for Rent in Ntinda",
    price: 1500000,
    currency: "USh",
    location: "Kampala",
    region: "Ntinda",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    category: "property",
    condition: "Furnished",
    postedAt: "1 day ago",
  },
  {
    id: "6",
    title: "MacBook Pro M2 14-inch 512GB",
    price: 7500000,
    currency: "USh",
    location: "Kampala",
    region: "Kololo",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    category: "electronics",
    condition: "Brand New",
    postedAt: "4 hours ago",
    isPromoted: true,
  },
  {
    id: "7",
    title: "Honda CBR 600RR 2019",
    price: 18000000,
    currency: "USh",
    location: "Kampala",
    region: "Wandegeya",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    category: "vehicles",
    condition: "Foreign Used",
    postedAt: "6 hours ago",
  },
  {
    id: "8",
    title: "L-Shaped Sofa Set - Brown Leather",
    price: 2800000,
    currency: "USh",
    location: "Kampala",
    region: "Bugolobi",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    category: "furniture",
    condition: "New",
    postedAt: "1 day ago",
  },
];

export const formatPrice = (price: number, currency: string = "USh") => {
  return `${currency} ${price.toLocaleString()}`;
};
