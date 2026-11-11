export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: 'girls' | 'boys' | 'baby' | 'unisex';
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  fabric: string;
  careInstructions: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isOrganic?: boolean;
  sku: string;
  season?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  location?: string;
  helpfulCount: number;
}

export interface DeliveryAddress {
  fullName: string;
  mobile: string;
  pincode: string;
  houseNo: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  addressType: 'home' | 'work' | 'other';
  isDefault?: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
}

export interface FilterState {
  categories: string[];
  genders: string[];
  sizes: string[];
  colors: string[];
  fabrics: string[];
  minPrice: number;
  maxPrice: number;
  discount: number;
  inStockOnly: boolean;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating' | 'discount' | 'newest';
}
