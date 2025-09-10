
import { NavTabId } from './constants';

export interface Bike {
  id: string;
  brand: string;
  model: string;
  year: number;
  averageMileage: number;
  optimalSpeed: { min: number; max: number };
  imageUrl: string;
}

export interface NavTab {
  id: NavTabId;
  label: string;
  icon: JSX.Element;
}

export interface PositionData {
  coords: {
    latitude: number;
    longitude: number;
    speed: number | null;
  };
  timestamp: number;
}

export interface DrivingData {
  speed: number;
  acceleration: number;
  brakes: number;
  distance: number;
}
