import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(num);
}

export function truncateAddress(address: string, start = 6, end = 4): string {
  if (!address) return '';
  if (address.length <= start + end) return address;
  
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Recipe rarity levels
export const RARITY_LEVELS = {
  COMMON: 'Common',
  UNCOMMON: 'Uncommon',
  RARE: 'Rare',
  EPIC: 'Epic',
  LEGENDARY: 'Legendary'
};

// Rarity colors for UI
export const RARITY_COLORS = {
  [RARITY_LEVELS.COMMON]: 'bg-gray-500 text-white',
  [RARITY_LEVELS.UNCOMMON]: 'bg-green-500 text-white',
  [RARITY_LEVELS.RARE]: 'bg-secondary text-white',
  [RARITY_LEVELS.EPIC]: 'bg-purple-500 text-white',
  [RARITY_LEVELS.LEGENDARY]: 'bg-accent text-darkBg'
};
