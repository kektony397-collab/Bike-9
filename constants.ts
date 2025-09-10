
import React from 'react';
import type { Bike, NavTab } from './types';

export enum NavTabId {
  Home = 'home',
  Calculate = 'calculate',
  Dashboard = 'dashboard',
  AI = 'ai',
}

// FIX: Replaced JSX with React.createElement to make it valid in a .ts file.
const HomeIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }));
const CalculatorIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" }));
const DashboardIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 17v-2m3 2v-4m3 4v-6m2 10V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2z" }));
const AiIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }));

// FIX: Changed JSX component usage to function calls to be valid in a .ts file.
export const NAV_TABS: NavTab[] = [
  { id: NavTabId.Home, label: 'Home', icon: HomeIcon() },
  { id: NavTabId.Calculate, label: 'Average', icon: CalculatorIcon() },
  { id: NavTabId.Dashboard, label: 'Dashboard', icon: DashboardIcon() },
  { id: NavTabId.AI, label: 'AI Mode', icon: AiIcon() },
];

export const DEFAULT_BIKE: Bike = {
  id: 'honda_dream_yuga_2014',
  brand: 'Honda',
  model: 'Dream Yuga',
  year: 2014,
  averageMileage: 44,
  optimalSpeed: { min: 40, max: 55 },
  imageUrl: 'https://picsum.photos/seed/honda_dream_yuga/600/400',
};

export const BIKE_DATA: Bike[] = [
  DEFAULT_BIKE,
  { id: 'honda_shine_2025', brand: 'Honda', model: 'Shine', year: 2025, averageMileage: 65, optimalSpeed: { min: 40, max: 60 }, imageUrl: 'https://picsum.photos/seed/honda_shine/600/400' },
  { id: 'hero_splendor_plus_2025', brand: 'Hero', model: 'Splendor Plus', year: 2025, averageMileage: 73, optimalSpeed: { min: 40, max: 60 }, imageUrl: 'https://picsum.photos/seed/hero_splendor/600/400' },
  { id: 'bajaj_ct100_2025', brand: 'Bajaj', model: 'CT100', year: 2025, averageMileage: 90, optimalSpeed: { min: 35, max: 55 }, imageUrl: 'https://picsum.photos/seed/bajaj_ct100/600/400' },
  { id: 'yamaha_fz_2025', brand: 'Yamaha', model: 'FZ S V3', year: 2025, averageMileage: 50, optimalSpeed: { min: 50, max: 70 }, imageUrl: 'https://picsum.photos/seed/yamaha_fz/600/400' },
  { id: 'royal_enfield_bullet_350_2025', brand: 'Royal Enfield', model: 'Bullet 350', year: 2025, averageMileage: 37, optimalSpeed: { min: 50, max: 70 }, imageUrl: 'https://picsum.photos/seed/royal_enfield/600/400' },
  { id: 'tvs_apache_rtr_160_2025', brand: 'TVS', model: 'Apache RTR 160', year: 2025, averageMileage: 45, optimalSpeed: { min: 50, max: 75 }, imageUrl: 'https://picsum.photos/seed/tvs_apache/600/400' },
  { id: 'ktm_duke_200_2025', brand: 'KTM', model: 'Duke 200', year: 2025, averageMileage: 35, optimalSpeed: { min: 55, max: 80 }, imageUrl: 'https://picsum.photos/seed/ktm_duke/600/400' },
  { id: 'suzuki_gixxer_2025', brand: 'Suzuki', model: 'Gixxer', year: 2025, averageMileage: 45, optimalSpeed: { min: 50, max: 70 }, imageUrl: 'https://picsum.photos/seed/suzuki_gixxer/600/400' },
];

export const OPTIMAL_SPEED_COLOR = 'text-green-400';
export const SUBOPTIMAL_SPEED_COLOR = 'text-yellow-400';
export const INEFFICIENT_SPEED_COLOR = 'text-red-500';

export const AI_LOADING_MESSAGES = [
  "Analyzing your ride...",
  "Consulting with the digital mechanic...",
  "Calculating optimal performance...",
  "Generating fuel-saving insights...",
  "Almost there, polishing the suggestions...",
];
