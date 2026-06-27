import React from 'react';
import { Home, Map, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavigationProps {
  activeTab: 'home' | 'maps' | 'bulletins';
  setActiveTab: (tab: 'home' | 'maps' | 'bulletins') => void;
}

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  
  const navItems = [
    { id: 'bulletins' as const, label: 'النشرات', icon: FileText },
    { id: 'maps' as const, label: 'الخرائط', icon: Map },
    { id: 'home' as const, label: 'الرئيسية', icon: Home },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#0B2447] via-[#0B2447]/95 to-transparent pt-8 pb-6 px-4">
      <nav className="max-w-md mx-auto rounded-2xl glass-panel border border-white/10 shadow-2xl p-2 flex justify-between items-center">
        
        {/* Render bottom tabs in elegant style */}
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex-1 py-2.5 flex flex-col items-center justify-center gap-1.5 focus:outline-none group"
            >
              {/* Animated Glowing Ring indicator */}
              {isActive && (
                <motion.div 
                  layoutId="activeBottomTab"
                  className="absolute inset-0 bg-cama-gold/10 rounded-xl border border-cama-gold/25"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <IconComponent className={`w-5 h-5 transition-colors relative z-10 ${
                isActive ? 'text-cama-gold filter drop-shadow-[0_0_5px_rgba(212,175,55,0.4)]' : 'text-slate-400 group-hover:text-white'
              }`} />
              
              <span className={`text-[10px] font-bold transition-all relative z-10 ${
                isActive ? 'text-cama-gold font-extrabold text-glow-gold' : 'text-slate-400 group-hover:text-slate-200'
              }`}>
                {item.label}
              </span>

              {/* Little gold indicator dot */}
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 bg-cama-gold rounded-full" />
              )}
            </button>
          );
        })}

      </nav>
    </div>
  );
}
