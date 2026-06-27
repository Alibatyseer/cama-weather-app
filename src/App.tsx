import React, { useState } from 'react';
import CamaHeader from './components/CamaHeader';
import WeatherDashboard from './components/WeatherDashboard';
import WeatherMaps from './components/WeatherMaps';
import BulletinsTab from './components/BulletinsTab';
import BottomNavigation from './components/BottomNavigation';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'maps' | 'bulletins'>('home');

  return (
    <div className="min-h-screen bg-[#0B2447] text-white flex flex-col relative pb-32 overflow-hidden selection:bg-cama-gold/30 selection:text-white" dir="rtl">
      {/* Elegant Dark Design Theme Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#19376D_0%,_transparent_60%)] opacity-40 -z-20 pointer-events-none" />
      
      {/* Sky subtle stars representation */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-ping pointer-events-none" />
      <div className="absolute top-44 right-1/4 w-1.5 h-1.5 bg-cama-gold/25 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute top-96 left-1/3 w-1 h-1 bg-white/10 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-60 right-10 w-2.5 h-2.5 bg-white/15 rounded-full animate-ping pointer-events-none" />

      {/* Official Luxury Header */}
      <CamaHeader />

      {/* Main Container with Tab Switch Animations */}
      <main className="flex-grow w-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {activeTab === 'home' && <WeatherDashboard />}
            {activeTab === 'maps' && <WeatherMaps />}
            {activeTab === 'bulletins' && <BulletinsTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="w-full text-center py-6 text-[10px] text-slate-500 max-w-7xl mx-auto border-t border-white/5 mt-10 space-y-2">
        <p className="font-sans">جميع الحقوق محفوظة © ٢٠٢٦ الهيئة العامة للطيران المدني والأرصاد (CAMA) - مركز التنبؤات الجوية والإنذار المبكر - الجمهورية اليمنية</p>
        <p className="font-mono text-[9px] text-slate-600">Civil Aviation & Meteorology Authority (CAMA) • Meteorological Forecasting & Early Warning Center</p>
      </footer>

      {/* Fixed Luxury Bottom Navigation Bar */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
