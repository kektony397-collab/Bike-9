
import React, { useState, useMemo } from 'react';
import { BIKE_DATA } from '../constants';
import type { Bike } from '../types';

const DashboardView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const filteredBikes = useMemo(() => {
    if (!searchTerm) return BIKE_DATA;
    return BIKE_DATA.filter(bike => 
      `${bike.brand} ${bike.model}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    window.scrollTo(0, 0); // Scroll to top to see details
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Bike Dashboard</h2>
        <p className="text-gray-400">Explore mileage data for popular bikes.</p>
      </div>

      <div className="sticky top-[70px] z-10 bg-base-100 py-2">
         <input
          type="text"
          placeholder="Search for a bike (e.g., Honda Shine)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-base-200 border border-base-300 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {selectedBike && (
        <div className="bg-base-200 p-4 rounded-2xl shadow-lg space-y-4 mb-6 animate-fade-in">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-accent">{selectedBike.brand} {selectedBike.model}</h3>
              <p className="text-gray-400">{selectedBike.year}</p>
            </div>
            <button onClick={() => setSelectedBike(null)} className="text-gray-400 hover:text-white">&times;</button>
          </div>
          <img src={selectedBike.imageUrl} alt={`${selectedBike.brand} ${selectedBike.model}`} className="w-full h-48 object-cover rounded-lg"/>
          <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                  <p className="text-sm text-gray-400">Average Mileage</p>
                  <p className="text-2xl font-bold text-secondary">{selectedBike.averageMileage} km/l</p>
              </div>
              <div>
                  <p className="text-sm text-gray-400">Optimal Speed</p>
                  <p className="text-2xl font-bold text-green-400">{selectedBike.optimalSpeed.min}-{selectedBike.optimalSpeed.max} km/h</p>
              </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBikes.map(bike => (
          <div 
            key={bike.id} 
            className="bg-base-200 rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleSelectBike(bike)}
          >
            <img src={bike.imageUrl} alt={`${bike.brand} ${bike.model}`} className="w-full h-40 object-cover"/>
            <div className="p-4">
              <h4 className="font-bold text-lg text-white">{bike.brand} {bike.model}</h4>
              <p className="text-sm text-gray-400">{bike.year}</p>
              <p className="mt-2 text-xl text-secondary">{bike.averageMileage} km/l</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
