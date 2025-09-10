
import React, { useState, useEffect, useRef } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { getMileageTips } from '../services/geminiService';
import { DrivingData } from '../types';
import { AI_LOADING_MESSAGES } from '../constants';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AiModeView: React.FC = () => {
  const { isTracking, speed, distance, startTracking, stopTracking, resetTracking } = useGeolocation();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hello! I'm your AI driving coach. Start tracking your ride, and I'll give you tips to improve your mileage." }
  ]);
  
  const drivingDataRef = useRef<DrivingData>({ speed: 0, acceleration: 0, brakes: 0, distance: 0 });
  const lastSpeedRef = useRef(0);
  const loadingMessageIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTracking) {
      const currentSpeed = speed;
      const lastSpeed = lastSpeedRef.current;
      
      if (currentSpeed > lastSpeed + 5) { // Hard acceleration
        drivingDataRef.current.acceleration += 1;
      }
      if (currentSpeed < lastSpeed - 10) { // Hard brake
        drivingDataRef.current.brakes += 1;
      }
      
      drivingDataRef.current.speed = (drivingDataRef.current.speed + currentSpeed) / 2; // running average
      drivingDataRef.current.distance = distance;

      lastSpeedRef.current = currentSpeed;
    }
  }, [speed, distance, isTracking]);

  const handleGetTips = async () => {
    stopTracking();
    if (drivingDataRef.current.distance < 0.1) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Please track a longer distance (at least 100m) for a good analysis." }]);
      return;
    }
    
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: 'user', text: "Analyze my ride!" }]);

    let messageIndex = 0;
    loadingMessageIntervalRef.current = window.setInterval(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: AI_LOADING_MESSAGES[messageIndex % AI_LOADING_MESSAGES.length] }]);
      messageIndex++;
    }, 2500);

    const tips = await getMileageTips(drivingDataRef.current);

    if (loadingMessageIntervalRef.current) {
        clearInterval(loadingMessageIntervalRef.current);
    }
    setIsLoading(false);
    // Remove loading messages
    setMessages(prev => prev.filter(m => !AI_LOADING_MESSAGES.includes(m.text)));
    setMessages(prev => [...prev, { sender: 'ai', text: tips }]);

    // Reset for next analysis
    resetTracking();
    drivingDataRef.current = { speed: 0, acceleration: 0, brakes: 0, distance: 0 };
  };

  const handleToggleTracking = () => {
    if (isTracking) {
      stopTracking();
    } else {
      resetTracking();
      drivingDataRef.current = { speed: 0, acceleration: 0, brakes: 0, distance: 0 };
      startTracking();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] pb-20">
       <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-white">Honda AI Coach</h2>
        <p className="text-gray-400">Get real-time feedback on your driving.</p>
      </div>

      <div className="flex-grow bg-base-200 rounded-2xl p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-base-300 text-gray-200'}`}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            </div>
          </div>
        ))}
         {isLoading && <div className="flex justify-start"><div className="p-3 rounded-2xl bg-base-300 text-gray-200"><span className="animate-pulse">Analyzing...</span></div></div>}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleToggleTracking}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 ${isTracking ? 'bg-error' : 'bg-primary'} text-white shadow-lg disabled:bg-gray-600`}
        >
          {isTracking ? `Tracking... (${distance.toFixed(2)} km)` : 'Start Ride'}
        </button>
        <button
          onClick={handleGetTips}
          disabled={isTracking || isLoading}
          className="w-full py-3 px-4 rounded-xl font-bold text-lg transition-all duration-300 bg-success text-white shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Thinking...' : 'Get AI Tips'}
        </button>
      </div>
    </div>
  );
};

export default AiModeView;
