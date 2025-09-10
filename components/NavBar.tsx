
import React from 'react';
import { NAV_TABS, NavTabId } from '../constants';

interface NavBarProps {
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-base-300 shadow-lg flex justify-around items-center sm:hidden">
      {NAV_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-300 ease-in-out
            ${activeTab === tab.id ? 'text-secondary' : 'text-gray-400'}`}
        >
          {tab.icon}
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default NavBar;
