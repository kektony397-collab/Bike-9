
import React from 'react';
import { OPTIMAL_SPEED_COLOR, SUBOPTIMAL_SPEED_COLOR, INEFFICIENT_SPEED_COLOR } from '../constants';

interface SpeedometerProps {
  speed: number;
  optimalSpeed: { min: number; max: number };
}

const Speedometer: React.FC<SpeedometerProps> = ({ speed, optimalSpeed }) => {
  const getSpeedColor = () => {
    if (speed >= optimalSpeed.min && speed <= optimalSpeed.max) {
      return OPTIMAL_SPEED_COLOR;
    } else if (speed > optimalSpeed.max && speed < optimalSpeed.max + 15) {
      return SUBOPTIMAL_SPEED_COLOR;
    } else {
      return INEFFICIENT_SPEED_COLOR;
    }
  };

  const speedColor = getSpeedColor();

  return (
    <div className="relative w-full max-w-sm mx-auto p-4 bg-base-200 rounded-full shadow-2xl border-4 border-base-300 aspect-square flex items-center justify-center">
      <div className="text-center">
        <div className={`font-orbitron text-7xl md:text-8xl font-bold transition-colors duration-300 ${speedColor}`}>
          {speed.toFixed(0)}
        </div>
        <div className="text-gray-400 text-lg uppercase tracking-widest">
          km/h
        </div>
      </div>
       <div className="absolute bottom-10 text-center">
        <p className="text-xs text-gray-500">Optimal Speed</p>
        <p className={`text-sm font-bold ${OPTIMAL_SPEED_COLOR}`}>{optimalSpeed.min} - {optimalSpeed.max} km/h</p>
      </div>
    </div>
  );
};

export default Speedometer;
