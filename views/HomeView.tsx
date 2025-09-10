
import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_BIKE } from '../constants';
import { useGeolocation } from '../hooks/useGeolocation';
import Speedometer from '../components/Speedometer';
import StatCard from '../components/StatCard';

const FuelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>;
const RangeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>;
const DistanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

const HomeView: React.FC = () => {
  const { isTracking, speed, distance, error, startTracking, stopTracking } = useGeolocation();
  const [petrol, setPetrol] = useState(0);
  const [mileage, setMileage] = useState(DEFAULT_BIKE.averageMileage);

  const totalRange = useMemo(() => petrol * mileage, [petrol, mileage]);
  const remainingRange = useMemo(() => Math.max(0, totalRange - distance), [totalRange, distance]);
  const petrolLeft = useMemo(() => Math.max(0, remainingRange / mileage), [remainingRange, mileage]);
  
  useEffect(() => {
    // Low fuel notification logic
    if (isTracking && totalRange > 0 && remainingRange / totalRange < 0.1) {
      // In a real app, this would use the browser's Notification API
      console.log("LOW FUEL WARNING!");
    }
  }, [remainingRange, totalRange, isTracking]);

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">{DEFAULT_BIKE.brand} {DEFAULT_BIKE.model}</h2>
        <p className="text-gray-400">{DEFAULT_BIKE.year} Model</p>
      </div>

      <Speedometer speed={speed} optimalSpeed={DEFAULT_BIKE.optimalSpeed} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<RangeIcon />} label="Remaining Range" value={`${remainingRange.toFixed(1)} km`} />
        <StatCard icon={<DistanceIcon />} label="Distance Covered" value={`${distance.toFixed(2)} km`} color="text-info" />
        <StatCard icon={<FuelIcon />} label="Petrol Left (Est.)" value={`${petrolLeft.toFixed(2)} L`} color="text-secondary" />
      </div>

      <div className="bg-base-200 p-6 rounded-2xl shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-1">Petrol Refilled (Liters)</label>
            <input
              type="number"
              value={petrol}
              onChange={(e) => setPetrol(parseFloat(e.target.value) || 0)}
              className="w-full bg-base-300 border border-base-100 rounded-lg p-2 text-white focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="e.g., 5"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-1">Bike Average (km/l)</label>
            <input
              type="number"
              value={mileage}
              onChange={(e) => setMileage(parseFloat(e.target.value) || 0)}
              className="w-full bg-base-300 border border-base-100 rounded-lg p-2 text-white focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="e.g., 44"
            />
          </div>
        </div>
        
        <button
          onClick={isTracking ? stopTracking : startTracking}
          className={`w-full py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300
            ${isTracking ? 'bg-error text-white shadow-lg' : 'bg-success text-white shadow-lg'}`}
        >
          {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </button>
        {error && <p className="text-error text-center text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default HomeView;
