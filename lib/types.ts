import type { ReactNode } from 'react';

export type CategoryKey = 'pakaian' | 'elektronik' | 'plastik' | 'kertas' | 'logam' | 'organik' | 'auto';
export type Platform = 'internal' | 'shopee' | 'tokopedia' | 'lazada';
export type ActivityType = 'pengepul' | 'marketplace';

export interface Profile {
  name: string;
  company: string;
  role: string;
  sector: string;
  wasteType: string;
  location: string;
}

export interface CompositionItem {
  name: string;
  perc: number;
  color: string;
}

export interface AiData {
  title: string;
  desc: string;
  score: number;
  weight: string;
  multiplier: number;
  action: string;
  actionDesc: string;
  compo: CompositionItem[];
}

export interface Analysis {
  key: string;
  data: AiData;
  title: string;
  originalPrice: number;
  finalPrice: number;
}

export interface Sample {
  category: CategoryKey;
  originalPrice: number;
  imageUrl: string;
  title: string;
  label: string;
  estimate: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  seller: string;
  icon: string;
  category: string;
  image: string;
  isUserItem: boolean;
  platform: Platform;
  platformUrl?: string;
}

export interface Transaction {
  title: string;
  date: string;
  price: number;
  isDebit: boolean;
  icon: string;
  color: string;
  bg: string;
}

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  partner: string;
  price: number;
  date: string;
  step: number;
  statusBadge: string;
  badgeClass: string;
  icon: string;
}

export interface Pengepul {
  name: string;
  requestName: string;
  icon: string;
  iconBox: string;
  pin: string;
  distance: string;
  tag: string;
  accepts: string;
  rating: string;
  recommended: boolean;
}

export interface TrackingStep {
  title: string;
  desc: string;
}

export interface CurrentTransaction {
  id: string;
  title: string;
  price: number;
  pengepul: string;
}

export interface FormState {
  price: string;
  category: string;
}

export interface ModalState {
  open: boolean;
  type: 'info' | 'external' | 'buy';
  title: string;
  message: ReactNode;
  icon: string;
  color: string;
  bg: string;
  product: Product | null;
}

export interface ListingInput {
  method: 'internal' | 'external';
  platform: string;
  sellerName: string;
  url: string;
}
