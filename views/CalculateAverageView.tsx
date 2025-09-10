
import React, { useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import Modal from '../components/Modal';
import StatCard from '../components/StatCard';

const DistanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const SpeedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


const CalculateAverageView: React.FC = () => {
  const { isTracking, speed, distance, error, startTracking, stopTracking, resetTracking } = useGeolocation();
  const [petrolRefilled, setPetrolRefilled] = useState('');
  const [calculatedAverage, setCalculatedAverage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCalculate = () => {
    const petrol = parseFloat(petrolRefilled);
    if (distance > 0 && petrol > 0) {
      const average = distance / petrol;
      setCalculatedAverage(average);
      setIsModalOpen(true);
    } else {
      alert("Please enter a valid petrol amount and track some distance first.");
    }
    stopTracking();
  };

  const handleReset = () => {
    resetTracking();
    setPetrolRefilled('');
    setCalculatedAverage(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Find Your Bike's Average</h2>
        <p className="text-gray-400">Track a trip to calculate your real-world mileage.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
          <StatCard icon={<DistanceIcon />} label="Distance Tracked" value={`${distance.toFixed(2)} km`} />
          <StatCard icon={<SpeedIcon />} label="Current Speed" value={`${speed.toFixed(0)} km/h`} />
      </div>

      <div className="bg-base-200 p-6 rounded-2xl shadow-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Petrol Used for This Trip (Liters)</label>
          <input
            type="number"
            value={petrolRefilled}
            onChange={(e) => setPetrolRefilled(e.target.value)}
            className="w-full bg-base-300 border border-base-100 rounded-lg p-2 text-white focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="e.g., 1.5"
            disabled={isTracking}
          />
        </div>

        <button
          onClick={isTracking ? stopTracking : startTracking}
          className={`w-full py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 ${isTracking ? 'bg-error' : 'bg-primary'} text-white shadow-lg`}
        >
          {isTracking ? 'Stop Trip' : 'Start Trip'}
        </button>

        <button
          onClick={handleCalculate}
          disabled={!distance || isTracking}
          className="w-full py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 bg-success text-white shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Calculate Average
        </button>
        {error && <p className="text-error text-center text-sm mt-2">{error}</p>}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleReset} title="Mileage Result">
        <div className="text-center space-y-4">
          <p className="text-gray-300">Based on your trip of <span className="font-bold text-secondary">{distance.toFixed(2)} km</span> using <span className="font-bold text-secondary">{petrolRefilled} L</span> of petrol:</p>
          <p className="text-lg text-gray-300">Your bike's average mileage is:</p>
          <p className="text-5xl font-bold text-accent font-orbitron">
            {calculatedAverage?.toFixed(2)}
            <span className="text-2xl text-gray-400"> km/l</span>
          </p>
          <button onClick={handleReset} className="mt-4 w-full py-2 px-4 rounded-xl font-bold bg-primary text-white">
            Start New Calculation
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CalculateAverageView;
