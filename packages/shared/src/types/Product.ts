export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: ProductImage[];
  category: Category;
  subcategory?: Subcategory;
  sellerId: string;
  seller: User;
  shopId?: string;
  status: ProductStatus;
  condition: ProductCondition;
  quantity: number;
  unit: ProductUnit;
  location: Location;
  tags: string[];
  specifications: ProductSpecifications;
  availability: ProductAvailability;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  isOrganic?: boolean;
  harvestDate?: Date;
  expirationDate?: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  isMain: boolean;
}

export enum ProductStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  SOLD = 'SOLD',
  EXPIRED = 'EXPIRED',
  SUSPENDED = 'SUSPENDED'
}

export enum ProductCondition {
  NEW = 'NEW',
  EXCELLENT = 'EXCELLENT', 
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR'
}

export enum ProductUnit {
  PIECE = 'PIECE',          // À l'unité
  KG = 'KG',               // Kilogramme  
  GRAM = 'GRAM',           // Gramme
  LITER = 'LITER',         // Litre
  BUNCH = 'BUNCH',         // Botte
  BASKET = 'BASKET',       // Panier
  BOX = 'BOX'              // Caisse/Boîte
}

export interface ProductSpecifications {
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  origin?: string;
  variety?: string;
  season?: ProductSeason[];
  certifications?: ProductCertification[];
}

export enum ProductSeason {
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  AUTUMN = 'AUTUMN', 
  WINTER = 'WINTER'
}

export enum ProductCertification {
  ORGANIC = 'ORGANIC',
  AOC = 'AOC',
  IGP = 'IGP',
  FAIR_TRADE = 'FAIR_TRADE',
  LOCAL = 'LOCAL'
}

export interface ProductAvailability {
  startDate?: Date;
  endDate?: Date;
  daysOfWeek?: number[]; // 0-6 (Dimanche-Samedi)
  timeSlots?: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string;   // HH:mm format
}

// Search & Filters
export interface ProductFilters {
  category?: string[];
  subcategory?: string[];
  priceMin?: number;
  priceMax?: number;
  location?: LocationFilter;
  condition?: ProductCondition[];
  organic?: boolean;
  certification?: ProductCertification[];
  availability?: DateRange;
  sellerId?: string;
  shopId?: string;
}

export interface LocationFilter {
  latitude: number;
  longitude: number;
  radius: number; // en km
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  filters: ProductFilters;
}

// Import types
import type { Category, Subcategory } from './Category';
import type { User } from './User';
import type { Location } from './Location';