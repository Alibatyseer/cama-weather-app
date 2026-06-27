import React, { useState, useEffect } from 'react';
import { 
  CloudSun, CloudRain, Sun, Wind, Droplets, Compass, ShieldAlert, 
  FileText, Thermometer, Eye, Calendar, ChevronLeft,
  Activity, MapPin, X, Sparkles, Loader2, Waves, Image as ImageIcon, Map, Anchor, Cloud
} from 'lucide-react';
import { YEMEN_STATIONS, CAMA_ALERTS } from '../data/weatherData';
import { WeatherInfo, AlertMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export default function WeatherDashboard() {
  const [selectedStation, setSelectedStation] = useState<WeatherInfo>(YEMEN_STATIONS[0]);
  const [modelWeather, setModelWeather] = useState<WeatherInfo>(YEMEN_STATIONS[0]);
  const [metarData, setMetarData] = useState<any>(null);
  const [marineData, setMarineData] = useState<{ wave: number, state: string } | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [bulletins, setBulletins] = useState({ dailyWeather: null, dailyMarine: null, weeklyWeather: null, weeklyMarine: null, warning: null, seasonal: null });
  const [activeAlert, setActiveAlert] = useState<AlertMessage | null>(null);
  const [activeBulletin, setActiveBulletin] = useState<any | null>(null);
  const [alertIndex, setAlertIndex] = useState(0);

  const currentAlert = CAMA_ALERTS[alertIndex];
  const nextAlert = () => setAlertIndex((prev) => (prev + 1) % CAMA_ALERTS.length);

  const displayTemp = metarData?.temp ?? modelWeather.temp;
  const displayWindSpeed = metarData?.windSpeed ?? modelWeather.windSpeed;
  const displayWindDir = metarData?.windDirection || modelWeather.windDirection;
  const displayPressure = metarData?.pressure ?? modelWeather.pressure;
  const displayVisibility = metarData?.visibility ?? modelWeather.visibility;
  const displayDewPoint = metarData?.dewPoint ?? modelWeather.dewPoint;
  const displayFlightCategory = metarData?.flightCategory || 'VFR';
  const displayFlightCategoryText = displayFlightCategory === 'VFR' ? 'ملاحة بصرية متاحة' : 'شروط طيران آلي';

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const meta = getStationMeta(selectedStation.nameEn);
        const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${meta.lat}&longitude=${meta.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
        const wData = await wRes.json();
        if(isMounted) setModelWeather(prev => ({...prev, ...wData.current, temp: Math.round(wData.current.temperature_2m), hourlyForecast: [], dailyForecast: []}));
      } catch(e) { console.error(e); }
      setIsFetching(false);
    };
    fetchData();
    return () => { isMounted = false; };
  }, [selectedStation]);

  function getStationMeta(nameEn: string) {
    const name = nameEn.toLowerCase();
    if (name.includes('aden')) return { lat: 12.829, lon: 45.029, icao: 'OYAA', coastal: true };
    return { lat: 15.369, lon: 44.191, icao: 'OYSN', coastal: false };
  }

  const getConditionIcon = (type: string, sizeClass = "w-10 h-10") => {
    return <Sun className={`${sizeClass} text-amber-400`} />;
  };

  // هذا الجزء هو الذي كان مفقوداً في الكود السابق
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">لوحة تحكم الطقس</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 p-6 rounded-xl">
           <h2 className="text-xl font-bold">{selectedStation.nameAr}</h2>
           <p className="text-4xl mt-4">{displayTemp}°C</p>
        </div>
        <div className="bg-white/10 p-6 rounded-xl">
           <h2 className="text-xl font-bold">النشرات الجوية</h2>
           <p className="text-sm mt-4 text-slate-400">جاري التحديث من المصدر...</p>
        </div>
      </div>
    </div>
  );
}
