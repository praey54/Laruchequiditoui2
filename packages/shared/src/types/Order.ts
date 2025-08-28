export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyer: User;
  sellerId: string;
  seller: User;
  shopId?: string;
  items: OrderItem[];
  status: OrderStatus;
  payment: OrderPayment;
  delivery: OrderDelivery;
  totals: OrderTotals;
  timeline: OrderTimeline[];
  messages: OrderMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications?: string; // Notes spéciales du client
}

export enum OrderStatus {
  PENDING = 'PENDING',           // En attente de validation vendeur
  CONFIRMED = 'CONFIRMED',       // Confirmée par le vendeur
  PREPARING = 'PREPARING',       // En préparation
  READY = 'READY',              // Prêt pour retrait/livraison
  IN_DELIVERY = 'IN_DELIVERY',   // En cours de livraison
  DELIVERED = 'DELIVERED',       // Livrée
  COMPLETED = 'COMPLETED',       // Terminée (argent libéré)
  CANCELLED = 'CANCELLED',       // Annulée
  REFUNDED = 'REFUNDED'         // Remboursée
}

export interface OrderPayment {
  id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  stripePaymentIntentId?: string;
  paidAt?: Date;
  refundedAt?: Date;
  fees: PaymentFees;
}

export enum PaymentMethod {
  CARD = 'CARD',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH' // Pour les retraits sur place
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export interface PaymentFees {
  platformFee: number;      // Commission plateforme (% type Vinted)
  paymentProcessingFee: number; // Frais Stripe
  totalFees: number;
}

export interface OrderDelivery {
  method: DeliveryMethod;
  address?: DeliveryAddress;
  pickupLocation?: PickupLocation;
  estimatedDate?: Date;
  actualDate?: Date;
  trackingNumber?: string;
  instructions?: string;
  fee: number;
}

export enum DeliveryMethod {
  PICKUP = 'PICKUP',           // Retrait chez le vendeur
  HOME_DELIVERY = 'HOME_DELIVERY', // Livraison à domicile
  PICKUP_POINT = 'PICKUP_POINT'   // Point relais
}

export interface DeliveryAddress {
  recipient: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  instructions?: string;
}

export interface PickupLocation {
  name: string;
  address: string;
  coordinates: Coordinates;
  openingHours: OpeningHours;
  contact: string;
}

export interface OrderTotals {
  subtotal: number;        // Total produits
  deliveryFee: number;     // Frais de livraison
  serviceFee: number;      // Frais de service acheteur
  taxes: number;           // TVA si applicable
  total: number;           // Total final
  currency: string;
}

export interface OrderTimeline {
  id: string;
  status: OrderStatus;
  timestamp: Date;
  message?: string;
  actor: 'BUYER' | 'SELLER' | 'SYSTEM';
}

export interface OrderMessage {
  id: string;
  senderId: string;
  sender: User;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: 'IMAGE' | 'DOCUMENT';
  url: string;
  filename: string;
  size: number;
}

// Search & Filters pour les commandes
export interface OrderFilters {
  status?: OrderStatus[];
  dateRange?: DateRange;
  minAmount?: number;
  maxAmount?: number;
  sellerId?: string;
  buyerId?: string;
  deliveryMethod?: DeliveryMethod[];
}

export interface OrderSearchResult {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}

// Import types
import type { User } from './User';
import type { Product } from './Product';
import type { Coordinates } from './Location';
import type { OpeningHours } from './Shop';
import type { DateRange } from './Product';