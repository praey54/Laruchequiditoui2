export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean;
  location?: Location;
  shop?: Shop;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = 'USER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

export interface UserProfile {
  id: string;
  bio?: string;
  socialLinks?: SocialLinks;
  preferences: UserPreferences;
}

export interface SocialLinks {
  website?: string;
  instagram?: string;
  facebook?: string;
}

export interface UserPreferences {
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
  language: string;
  currency: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

export interface PrivacySettings {
  showLocation: boolean;
  showPhone: boolean;
  profileVisibility: 'PUBLIC' | 'PRIVATE' | 'SELLERS_ONLY';
}

// Import types (to avoid circular imports)
import type { Location } from './Location';
import type { Shop } from './Shop';