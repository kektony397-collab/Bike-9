
import React from 'react';

interface StatCardProps {
  icon: JSX.Element;
  label: string;
  value: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color = 'text-accent' }) => {
  return (
    <div className="bg-base-200 p-4 rounded-2xl shadow-lg flex items-center space-x-4">
      <div className={`p-3 rounded-full bg-base-300 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className={`text-xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
