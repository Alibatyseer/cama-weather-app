import React, { useState, useEffect } from 'react';
import { Clock, ShieldAlert } from 'lucide-react';
import CamaLogo from './CamaLogo';

export default function CamaHeader() {
  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Yemeni Local Time (GMT+3)
  const formatYemeniTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Aden',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('ar-YE', options).format(date);
  };

  // Format UTC (Zulu) Time
  const formatZuluTime = (date: Date) => {
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds} Z`;
  };

  const formatDateAr = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Aden',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('ar-YE', options).format(date);
  };

  return (
    <header className="relative w-full z-30 pt-6 pb-4 px-4 sm:px-6 md:px-8 border-b border-white/10 bg-black/10 backdrop-blur-md">
      {/* Decorative top gold line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cama-gold via-amber-500 to-cama-gold" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo and Authority Name */}
        <div className="flex items-center gap-4 text-center md:text-right">
          {/* Official CAMA Vector Emblem */}
          <CamaLogo size="xl" className="w-20 h-20 md:w-24 md:h-24 -my-2 drop-shadow-[0_4px_10px_rgba(212,175,55,0.15)]" />

          <div>
            <div className="flex flex-col md:flex-row md:items-center gap-1.5">
              <span className="text-xs font-semibold text-cama-gold tracking-widest text-glow-gold">
                الهيئة العامة للطيران المدني والأرصاد
              </span>
              <span className="hidden md:inline text-white/40 text-xs">|</span>
              <span className="text-[10px] md:text-xs text-slate-300">قطاع الأرصاد الجوية اليمنية</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide mt-1">
              مركز التنبؤات الجوية والإنذار المبكر
            </h1>
          </div>
        </div>

        {/* Dynamic Dual Clocks (Aviation standard UTC & Local) */}
        <div className="flex items-center gap-3 glass-panel-light px-4 py-2 rounded-xl border border-white/5 shadow-md">
          {/* Local Yemeni Time */}
          <div className="flex flex-col items-end pr-3 border-r border-white/10">
            <span className="text-[10px] text-slate-400 font-medium">توقيت اليمن المحلي (GMT+3)</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-cama-amber" />
              <span className="text-sm font-bold font-mono text-cama-amber tracking-wider min-w-[80px] text-left">
                {formatYemeniTime(localTime)}
              </span>
            </div>
          </div>

          {/* Zulu Time / UTC */}
          <div className="flex flex-col items-end pl-1">
            <span className="text-[10px] text-slate-400 font-medium">التوقيت العالمي (UTC - ZULU)</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-cama-gold" />
              <span className="text-sm font-bold font-mono text-cama-gold tracking-wider min-w-[70px] text-left">
                {formatZuluTime(localTime)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Date Bar */}
      <div className="max-w-7xl mx-auto mt-3 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-1.5">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>مركز التنبؤات الجوية والإنذار المبكر متاح وقيد العمل المباشر</span>
        </div>
        <div className="font-medium text-slate-300">
          {formatDateAr(localTime)}
        </div>
      </div>
    </header>
  );
}
