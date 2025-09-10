
import { useState, useEffect, useRef, useCallback } from 'react';
import type { PositionData } from '../types';

// Haversine formula to calculate distance between two lat/lon points
const haversineDistance = (coords1: {latitude: number, longitude: number}, coords2: {latitude: number, longitude: number}): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // in km
};

export const useGeolocation = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [position, setPosition] = useState<PositionData | null>(null);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const lastPositionRef = useRef<PositionData | null>(null);
  const speedSamplesRef = useRef<number[]>([]);

  const handlePositionUpdate = useCallback((pos: GeolocationPosition) => {
    const newPosition: PositionData = {
      coords: {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        speed: pos.coords.speed,
      },
      timestamp: pos.timestamp,
    };
    
    setPosition(newPosition);

    // Speed smoothing (moving average)
    const currentSpeedKmh = (pos.coords.speed || 0) * 3.6;
    speedSamplesRef.current.push(currentSpeedKmh);
    if (speedSamplesRef.current.length > 5) {
      speedSamplesRef.current.shift();
    }
    const avgSpeed = speedSamplesRef.current.reduce((a, b) => a + b, 0) / speedSamplesRef.current.length;
    setSpeed(avgSpeed);

    // Distance calculation
    if (lastPositionRef.current) {
      const newDistance = haversineDistance(lastPositionRef.current.coords, newPosition.coords);
      setDistance(prev => prev + newDistance);
    }
    lastPositionRef.current = newPosition;
  }, []);

  const handleError = (err: GeolocationPositionError) => {
    setError(`Geolocation error: ${err.message}`);
    setIsTracking(false);
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
      if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
        setError(null);
        setIsTracking(true);
        lastPositionRef.current = null; // Reset for new trip
        speedSamplesRef.current = [];
        watchIdRef.current = navigator.geolocation.watchPosition(
          handlePositionUpdate,
          handleError,
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else if (permissionStatus.state === 'denied') {
        setError("Location access denied. Please enable it in your browser settings.");
      }
    });
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
  };

  const resetTracking = () => {
    stopTracking();
    setDistance(0);
    setSpeed(0);
    setPosition(null);
    setError(null);
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return { isTracking, position, speed, distance, error, startTracking, stopTracking, resetTracking };
};

