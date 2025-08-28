export interface Shop {
  id: string;
  name: string;
  description: string;
  slug: string; // URL-friendly identifier
  ownerId: string;
  owner: User;
  logo?: string;
  banner?: string;
  theme: ShopTheme;
  customization: ShopCustomization;
  location: Location;
  contact: ShopContact;
  settings: ShopSettings;
  stats: ShopStats;
  verification: ShopVerification;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface ShopTheme {
  id: string;
  name: string;
  category: ThemeCategory;
  colors: ThemeColors;
  fonts: ThemeFonts;
  layout: ThemeLayout;
  isCustom: boolean;
}

export enum ThemeCategory {
  MODERN = 'MODERN',
  RUSTIC = 'RUSTIC', 
  ELEGANT = 'ELEGANT',
  MINIMALIST = 'MINIMALIST',
  COLORFUL = 'COLORFUL',
  NATURE = 'NATURE'
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
}

export interface ThemeLayout {
  headerStyle: 'CLASSIC' | 'MODERN' | 'MINIMAL';
  productGridStyle: 'GRID' | 'MASONRY' | 'LIST';
  bannerStyle: 'FULL' | 'SPLIT' | 'OVERLAY';
}

export interface ShopCustomization {
  welcomeMessage?: string;
  story?: string;
  specialties: string[];
  openingHours: OpeningHours;
  deliveryInfo: DeliveryInfo;
  socialMedia: SocialMedia;
  customSections: CustomSection[];
}

export interface OpeningHours {
  [key: string]: DaySchedule | null; // 'monday', 'tuesday', etc.
}

export interface DaySchedule {
  isOpen: boolean;
  slots: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:mm
  end: string;   // HH:mm
}

export interface DeliveryInfo {
  methods: DeliveryMethod[];
  zones: DeliveryZone[];
  minimumOrder?: number;
  freeDeliveryThreshold?: number;
}

export enum DeliveryMethod {
  PICKUP = 'PICKUP',           // Retrait sur place
  HOME_DELIVERY = 'HOME_DELIVERY', // Livraison à domicile
  PICKUP_POINT = 'PICKUP_POINT'    // Point de retrait
}

export interface DeliveryZone {
  name: string;
  radius: number; // km
  price: number;
  estimatedTime: string; // "2-4h", "1 jour", etc.
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  website?: string;
  youtube?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'GALLERY';
  order: number;
  isVisible: boolean;
}

export interface ShopContact {
  email?: string;
  phone?: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface ShopSettings {
  isPublic: boolean;
  allowMessages: boolean;
  autoAcceptOrders: boolean;
  requireEmailConfirmation: boolean;
  vacationMode: VacationMode;
  notifications: ShopNotificationSettings;
}

export interface VacationMode {
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  message?: string;
}

export interface ShopNotificationSettings {
  newOrder: boolean;
  newMessage: boolean;
  lowStock: boolean;
  weeklyReport: boolean;
}

export interface ShopStats {
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  viewsThisMonth: number;
  followersCount: number;
}

export interface ShopVerification {
  isVerified: boolean;
  verifiedAt?: Date;
  documents: VerificationDocument[];
  status: VerificationStatus;
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED', 
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}

export interface VerificationDocument {
  id: string;
  type: DocumentType;
  url: string;
  uploadedAt: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export enum DocumentType {
  ID_CARD = 'ID_CARD',
  BUSINESS_LICENSE = 'BUSINESS_LICENSE',
  TAX_DOCUMENT = 'TAX_DOCUMENT',
  INSURANCE = 'INSURANCE',
  ORGANIC_CERTIFICATE = 'ORGANIC_CERTIFICATE'
}

// Import types
import type { User } from './User';
import type { Location } from './Location';