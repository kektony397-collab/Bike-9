
import React, { useState } from 'react';
import { NAV_TABS, NavTabId } from './constants';
import NavBar from './components/NavBar';
import HomeView from './views/HomeView';
import CalculateAverageView from './views/CalculateAverageView';
import DashboardView from './views/DashboardView';
import AiModeView from './views/AiModeView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTabId>(NavTabId.Home);

  const renderView = () => {
    switch (activeTab) {
      case NavTabId.Home:
        return <HomeView />;
      case NavTabId.Calculate:
        return <CalculateAverageView />;
      case NavTabId.Dashboard:
        return <DashboardView />;
      case NavTabId.AI:
        return <AiModeView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 font-sans flex flex-col">
      <header className="p-4 bg-base-200 shadow-lg sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-accent text-center font-orbitron">
          Bike Advance
        </h1>
      </header>
      
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>

      <footer className="w-full bg-base-200 text-center p-2 text-xs text-gray-400 fixed bottom-16 sm:bottom-0">
        Created By Yash K Pathak
      </footer>
      
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
