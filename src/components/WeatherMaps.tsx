import React, { useState, useEffect } from 'react';
import { 
  Map, Layers, ShieldAlert, Wind, CloudRain, Thermometer, Radio, 
  Navigation, Plane, MapPin, Eye, Compass, Activity, Calendar, Download,
  Globe, Info, ChevronRight
} from 'lucide-react';
import { YEMEN_STATIONS } from '../data/weatherData';
import { WeatherInfo } from '../types';

export default function WeatherMaps() {
  // Map display modes: 'windy' (Global ECMWF/GFS) or 'local' (CAMA station pins & METARs)
  const [mapMode, setMapMode] = useState<'windy' | 'local'>('windy');

  // Local Mode States
  const [activeLayer, setActiveLayer] = useState<'radar' | 'wind' | 'temp'>('radar');
  const [selectedPin, setSelectedPin] = useState<WeatherInfo | null>(YEMEN_STATIONS[0]);
  const [isLiveScanning, setIsLiveScanning] = useState(true);
  const [scanRotation, setScanRotation] = useState(0);

  // Windy Mode States
  const [selectedModel, setSelectedModel] = useState<'ecmwf' | 'gfs' | 'icon'>('ecmwf');
  const [selectedOverlay, setSelectedOverlay] = useState<'wind' | 'rain' | 'clouds' | 'temp' | 'pressure'>('wind');
  
  const [location, setLocation] = useState({
    id: 'yemen',
    nameAr: 'الجمهورية اليمنية (عام)',
    lat: 15.552,
    lon: 48.516,
    zoom: 6
  });

  const JUMP_LOCATIONS = [
    { id: 'yemen', nameAr: 'نظرة عامة على اليمن', lat: 15.552, lon: 48.516, zoom: 6 },
    { id: 'aden', nameAr: 'مطار عدن الدولي', lat: 12.8294, lon: 45.0289, zoom: 9 },
    { id: 'sanaa', nameAr: 'مطار صنعاء الدولي', lat: 15.4792, lon: 44.2192, zoom: 9 },
    { id: 'mukalla', nameAr: 'مطار الريان الدولي', lat: 14.6625, lon: 49.3750, zoom: 9 },
    { id: 'seiyun', nameAr: 'مطار سيئون الدولي', lat: 15.9658, lon: 48.7847, zoom: 9 },
    { id: 'socotra', nameAr: 'أرخبيل سقطرى الدولي', lat: 12.6311, lon: 53.9011, zoom: 9 },
    { id: 'hodeidah', nameAr: 'مطار الحديدة الدولي', lat: 14.7578, lon: 42.9772, zoom: 9 },
    { id: 'taiz', nameAr: 'مطار تعز الدولي', lat: 13.6858, lon: 44.1381, zoom: 9 },
  ];

  // Rotate simulated radar sweep (Local Mode)
  useEffect(() => {
    let animationFrame: number;
    const updateRotation = () => {
      setScanRotation((prev) => (prev + 0.6) % 360);
      animationFrame = requestAnimationFrame(updateRotation);
    };
    if (isLiveScanning && mapMode === 'local') {
      animationFrame = requestAnimationFrame(updateRotation);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isLiveScanning, mapMode]);

  // Geographic mapping for pins (approximated pixels on relative box for styling)
  const getPinPosition = (id: string) => {
    switch (id) {
      case 'sanaa': return { top: '35%', right: '35%' };
      case 'aden': return { top: '75%', right: '38%' };
      case 'taiz': return { top: '55%', right: '33%' };
      case 'hodeidah': return { top: '42%', right: '23%' };
      case 'mukalla': return { top: '60%', right: '62%' };
      case 'seiyun': return { top: '40%', right: '65%' };
      case 'socotra': return { top: '90%', right: '92%' };
      case 'alghaydah': return { top: '40%', right: '85%' };
      default: return { top: '50%', right: '50%' };
    }
  };

  // Build the Windy Embed URL based on selected model, overlay, lat, lon, zoom
  const windyEmbedUrl = `https://embed.windy.com/embed2.html?lat=${location.lat}&lon=${location.lon}&zoom=${location.zoom}&level=surface&overlay=${selectedOverlay}&product=${selectedModel}&menu=&message=&marker=true&calendar=now&pressure=true&type=map&location=coordinates&metricWind=kt&metricTemp=%C2%B0C&radarRange=-1`;

  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* 1. Page Header & Modes Switcher */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-md">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Map className="w-5 h-5 text-cama-gold animate-pulse" />
            منظومة الرصد التفاعلي وصور الأقمار الاصطناعية النفاذة
          </h2>
          <p className="text-xs text-slate-300">
            البث المباشر المدمج لبيانات الأرصاد الجوية والنماذج الرياضية التنبؤية (ECMWF, GFS, ICON) فوق المياه الإقليمية والجمهورية اليمنية.
          </p>
        </div>

        {/* Tab Switcher: Windy Live vs CAMA Station Pins */}
        <div className="flex bg-slate-950/80 p-1 rounded-2xl border border-white/10 w-full lg:w-auto">
          <button
            onClick={() => setMapMode('windy')}
            className={`flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              mapMode === 'windy'
                ? 'bg-gradient-to-r from-cama-gold to-amber-500 text-slate-950 shadow-lg shadow-cama-gold/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            خرائط نماذج الأرصاد العالمية (Windy)
          </button>
          <button
            onClick={() => setMapMode('local')}
            className={`flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              mapMode === 'local'
                ? 'bg-gradient-to-r from-cama-gold to-amber-500 text-slate-950 shadow-lg shadow-cama-gold/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-4 h-4" />
            محطات الرصد والرادارات المحلية
          </button>
        </div>
      </div>

      {/* Real-time vs Simulation explanatory banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3 flex items-start gap-2.5">
          <Globe className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-0.5 text-right">
            <p className="font-bold text-emerald-300">خرائط الطقس العالمية (Windy): حقيقية ومباشرة ١٠٠٪</p>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              هذه الخرائط يتم تغذيتها ببث حي مباشر من الموديل الأوروبي (ECMWF) والأمريكي (GFS). تظهر حركة تيارات الرياح الحقيقية، رادار الأمطار النشط، وتوزيع درجات الحرارة والضغط الجوي الفعلي فوق اليمن والمنطقة في هذه اللحظة.
            </p>
          </div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3 flex items-start gap-2.5">
          <Radio className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-0.5 text-right">
            <p className="font-bold text-amber-300">الرادارات المحلية: محاكاة تفاعلية ذكية للبيانات</p>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              هذه المنظومة تقدم لوحة تفاعلية تحاكي رادارات الرصد المحلية وتفك رموز شيفرات الطيران العالمية (METAR) للمطارات اليمنية وتستعرض النطاقات المناخية التاريخية لغرض التدريب وعرض البيانات بأسلوب فني فاخر.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Map Layout Grid: Left Content (Map + controls) & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Dynamic Map Frame Wrapper (8 columns) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* WINDY MODE CONTROLS */}
          {mapMode === 'windy' && (
            <div className="space-y-3 bg-white/5 border border-white/10 p-4 rounded-3xl">
              
              {/* Top Row: Model Selection & Layer Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 2a. Model Selection (ECMWF, GFS, ICON) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-glow-gold text-cama-gold flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    النموذج العددي للتنبؤ (Numerical Model)
                  </span>
                  <div className="flex bg-slate-950/60 p-1 rounded-xl border border-white/5">
                    <button
                      onClick={() => setSelectedModel('ecmwf')}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                        selectedModel === 'ecmwf'
                          ? 'bg-[#1E3A8A] text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ECMWF (الأوروبي)
                    </button>
                    <button
                      onClick={() => setSelectedModel('gfs')}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                        selectedModel === 'gfs'
                          ? 'bg-[#1E3A8A] text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      GFS (الأمريكي)
                    </button>
                    <button
                      onClick={() => setSelectedModel('icon')}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                        selectedModel === 'icon'
                          ? 'bg-[#1E3A8A] text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ICON (الألماني)
                    </button>
                  </div>
                </div>

                {/* 2b. Layer Selection (Wind, Rain, Clouds, Temp, Pressure) */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    طبقة الرصد التفاعلي (Weather Layer)
                  </span>
                  <div className="flex bg-slate-950/60 p-1 rounded-xl border border-white/5 overflow-x-auto gap-0.5">
                    {[
                      { id: 'wind', name: 'الرياح', icon: Wind },
                      { id: 'rain', name: 'الأمطار', icon: CloudRain },
                      { id: 'clouds', name: 'الغيوم', icon: Layers },
                      { id: 'temp', name: 'الحرارة', icon: Thermometer },
                      { id: 'pressure', name: 'الضغط', icon: Compass },
                    ].map((lyr) => {
                      const Icon = lyr.icon;
                      return (
                        <button
                          key={lyr.id}
                          onClick={() => setSelectedOverlay(lyr.id as any)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
                            selectedOverlay === lyr.id
                              ? 'bg-amber-500/20 border border-amber-500/40 text-[#D4AF37]'
                              : 'text-slate-400 hover:text-white border border-transparent'
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                          {lyr.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick Station Jumps */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 block">تركيز عدسة الأقمار الاصطناعية على مطار / منطقة يمنية:</span>
                <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-1">
                  {JUMP_LOCATIONS.map((loc) => {
                    const isSelected = location.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        onClick={() => setLocation(loc)}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-all ${
                          isSelected 
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-sm' 
                            : 'bg-slate-950/40 border-white/5 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {loc.nameAr}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* LOCAL MODE LAYER CONTROLS */}
          {mapMode === 'local' && (
            <div className="flex gap-2 bg-slate-950/50 border border-white/10 p-1 rounded-2xl">
              <button
                onClick={() => setActiveLayer('radar')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeLayer === 'radar' 
                    ? 'bg-cama-gold text-royal-blue shadow-lg font-extrabold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CloudRain className="w-4 h-4" />
                رادار الأمطار والغيوم المحلي
              </button>
              <button
                onClick={() => setActiveLayer('wind')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeLayer === 'wind' 
                    ? 'bg-cama-gold text-royal-blue shadow-lg font-extrabold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wind className="w-4 h-4" />
                تيارات الرياح والمنخفضات الجوية
              </button>
              <button
                onClick={() => setActiveLayer('temp')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeLayer === 'temp' 
                    ? 'bg-cama-gold text-royal-blue shadow-lg font-extrabold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Thermometer className="w-4 h-4" />
                توزيع درجات الحرارة والحرارة المحسوسة
              </button>
            </div>
          )}

          {/* MAP CANVAS PANEL */}
          <div className="relative w-full h-[480px] md:h-[550px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
            
            {/* WINDY LIVE MAP IFRAME RENDERING */}
            {mapMode === 'windy' ? (
              <div className="w-full h-full relative">
                <iframe 
                  src={windyEmbedUrl}
                  frameBorder="0"
                  className="w-full h-full rounded-3xl z-10 relative"
                  allowFullScreen
                  title="خريطة وندي العالمية التفاعلية وموديلات الطقس"
                />
                
                {/* Top/Right Status Overlay on Windy Map */}
                <div className="absolute top-4 left-4 z-20 bg-slate-950/90 border border-white/10 p-3 rounded-2xl pointer-events-none text-right max-w-[240px] shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="text-[9px] font-bold text-[#D4AF37] px-1.5 py-0.5 rounded bg-[#D4AF37]/10 uppercase font-mono tracking-wider">
                      {selectedModel.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-white">البيانات النشطة حالياً</span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1">
                    عدسة مدمجة وموصولة بمركز وندي العالمي للموديلات العددية الأوروبية والأمريكية والألمانية.
                  </p>
                </div>
              </div>
            ) : (
              /* LOCAL MODE SIMULATED CANVAS (Original Map) */
              <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                
                {/* Radar Sweep Effect */}
                {isLiveScanning && (
                  <div 
                    className="absolute w-[650px] h-[650px] bg-gradient-to-l from-emerald-500/10 via-transparent to-transparent origin-center pointer-events-none rounded-full"
                    style={{
                      transform: `rotate(${scanRotation}deg)`,
                      clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)'
                    }}
                  />
                )}

                {/* Geographical outline representation of Yemen using stylized background vectors */}
                <div className="absolute inset-8 border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-royal-blue/10 via-deep-navy/30 to-royal-blue/10" />
                  
                  {/* Animated Meteorological Layers */}
                  {activeLayer === 'radar' && (
                    <>
                      <div className="absolute top-[25%] right-[25%] w-32 h-32 bg-cyan-500/15 rounded-full filter blur-2xl animate-[pulse_6s_ease-in-out_infinite]" />
                      <div className="absolute top-[45%] right-[32%] w-48 h-48 bg-emerald-500/15 rounded-full filter blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
                      <div className="absolute bottom-[20%] right-[55%] w-40 h-40 bg-sky-500/20 rounded-full filter blur-2xl animate-[pulse_5s_ease-in-out_infinite]" />
                    </>
                  )}

                  {activeLayer === 'wind' && (
                    <>
                      <div className="absolute top-[15%] right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400/25 to-transparent w-full animate-[translate-x_4s_linear_infinite]" style={{ transform: 'translateX(20px)' }} />
                      <div className="absolute bottom-[35%] right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent w-full animate-[translate-x_5s_linear_infinite]" />
                      <div className="absolute bottom-[10%] right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent w-full animate-[translate-x_3s_linear_infinite]" />
                    </>
                  )}

                  {activeLayer === 'temp' && (
                    <>
                      <div className="absolute top-[20%] right-[10%] w-[400px] h-[300px] bg-amber-500/10 rounded-full filter blur-3xl" />
                      <div className="absolute top-[40%] right-[30%] w-[250px] h-[250px] bg-red-500/5 rounded-full filter blur-3xl" />
                      <div className="absolute bottom-[10%] right-[60%] w-[300px] h-[200px] bg-blue-500/10 rounded-full filter blur-3xl" />
                    </>
                  )}

                  {/* Waterway and Sea Labels */}
                  <div className="absolute bottom-6 right-12 text-[10px] font-bold text-slate-500 font-serif tracking-widest pointer-events-none uppercase">GULF OF ADEN / خليج عدن</div>
                  <div className="absolute bottom-24 right-[72%] text-[10px] font-bold text-slate-500 font-serif tracking-widest pointer-events-none uppercase">RED SEA / البحر الأحمر</div>
                  <div className="absolute bottom-4 right-[80%] text-[10px] font-bold text-slate-500 font-serif tracking-widest pointer-events-none uppercase">BAB-EL-MANDEB / مضيق باب المندب</div>
                  <div className="absolute top-12 right-[15%] text-[10px] font-bold text-slate-500 font-serif tracking-widest pointer-events-none uppercase font-mono">SAUDI ARABIA</div>
                  <div className="absolute top-24 right-[85%] text-[10px] font-bold text-slate-500 font-serif tracking-widest pointer-events-none uppercase font-mono">OMAN / سلطنة عمان</div>
                </div>

                {/* Weather Station Pins on the Map */}
                {YEMEN_STATIONS.map((station) => {
                  const pos = getPinPosition(station.id);
                  const isSelected = selectedPin?.id === station.id;
                  
                  return (
                    <button
                      key={station.id}
                      onClick={() => setSelectedPin(station)}
                      className="absolute group transition-transform hover:scale-110 z-20"
                      style={{ top: pos.top, right: pos.right }}
                    >
                      <div className="relative flex items-center justify-center">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'bg-cama-gold border-2 border-white scale-125 shadow-[0_0_15px_#D4AF37]' 
                            : 'bg-slate-900 border border-cama-gold/50 group-hover:bg-cama-gold/50 shadow-md'
                        }`}>
                          <Plane className={`w-1.5 h-1.5 ${isSelected ? 'text-slate-900' : 'text-cama-gold'} rotate-45`} />
                        </div>
                        <span className="absolute -inset-2 rounded-full border border-cama-gold/30 animate-ping opacity-70 pointer-events-none" />
                        <span className="absolute right-5 bg-slate-950/90 backdrop-blur-sm border border-white/10 text-[9px] font-bold text-slate-100 px-1.5 py-0.5 rounded-md pointer-events-none whitespace-nowrap shadow-md opacity-80 group-hover:opacity-100 transition-opacity">
                          {station.nameAr.split(' ')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-slate-950/90 px-3 py-2 rounded-xl border border-white/10 text-[10px] space-y-1 z-10">
                  <p className="font-bold text-slate-300 border-b border-white/10 pb-1 mb-1.5">مفتاح الخريطة الرادارية</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500/50" />
                    <span className="text-slate-400">هطول أمطار / غيوم ركامية</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-cyan-500/50" />
                    <span className="text-slate-400">تيارات منخفض رطب</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-amber-500/50" />
                    <span className="text-slate-400">منطقة جافة ومغبرة</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Selected Station Details / Local Station ICAO Decoder (4 columns) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Station Selector Sidebar Card */}
          {selectedPin ? (
            <div className="rounded-3xl p-5 md:p-6 bg-white/5 border border-white/10 shadow-xl space-y-6">
              
              {/* Header inside side block */}
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-cama-gold/15 text-cama-gold border border-cama-gold/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    ICAO: {selectedPin.nameEn.split('(')[1]?.replace(')', '') || 'OYAA'}
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-slate-300 font-semibold">بث راداري محلي ومباشر</span>
                </div>
                <h3 className="text-lg font-extrabold text-white mt-2">
                  {selectedPin.nameAr.split('(')[0]}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedPin.nameEn}</p>
              </div>

              {/* Station metrics */}
              <div className="space-y-4">
                
                {/* Temperature in Side Block */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-slate-400">درجة الحرارة الآن:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white font-mono">{selectedPin.temp}</span>
                    <span className="text-xs text-cama-gold">°م</span>
                  </div>
                </div>

                {/* Wind in Side Block */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-slate-400">حركة الرياح السطحية:</span>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-200">{selectedPin.windDirection}</span>
                    <span className="text-[10px] text-cama-amber font-mono mt-0.5">{selectedPin.windSpeed} كم/ساعة</span>
                  </div>
                </div>

                {/* Visibility in Side Block */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-slate-400">الرؤية الأفقية للمهبط:</span>
                  <span className="text-xs font-bold font-mono text-slate-200">{selectedPin.visibility} كم</span>
                </div>

                {/* Pressure in Side Block */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs text-slate-400">الضغط الجوي الفعلي (QNH):</span>
                  <span className="text-xs font-bold font-mono text-slate-200">{selectedPin.pressure} hPa</span>
                </div>

                {/* Coordinates */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">الإحداثيات الجغرافية:</span>
                  <span className="text-xs font-bold font-mono text-slate-300">
                    {selectedPin.stationCoordinates.lat}° N / {selectedPin.stationCoordinates.lng}° E
                  </span>
                </div>
              </div>

              {/* Aviation simulated METAR decoder */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 space-y-3 shadow-inner font-mono text-xs">
                <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                  <span className="text-[10px] font-bold text-cama-gold flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    شفرة أرصاد الطيران (METAR)
                  </span>
                  <span className="text-[10px] text-slate-500">منظومة اتصالات الطيران</span>
                </div>
                
                {/* Raw Metar String */}
                <p className="text-[11px] text-emerald-400 font-semibold tracking-wider leading-relaxed bg-white/5 p-2 rounded-lg border border-white/5 select-all">
                  {selectedPin.id === 'sanaa' ? 'OYSN 271800Z 28010KT 9000 SCT025 24/08 Q1014' : 
                   selectedPin.id === 'aden' ? 'OYAA 271800Z 15008KT 9999 FEW022 32/24 Q1009' : 
                   `${selectedPin.nameEn.split('(')[1]?.replace(')', '') || 'OYAA'} 271800Z AUTO ${selectedPin.windSpeed}KT 9999 SKC ${selectedPin.temp}/${selectedPin.dewPoint} Q${selectedPin.pressure}`}
                </p>

                {/* Brief decode explanation */}
                <div className="space-y-1.5 text-[10px] text-slate-400 pt-1.5 font-sans leading-relaxed">
                  <p>• <span className="text-slate-300 font-bold">271800Z:</span> قراءة يوم ٢٧ الساعة ١٨:٠٠ بتوقيت جرينتش.</p>
                  <p>• <span className="text-slate-300 font-bold">KT:</span> اتجاه وسرعة الرياح بالعقدة البحرية.</p>
                  <p>• <span className="text-slate-300 font-bold">QNH:</span> قيمة الضغط الجوي المرجعي لتعديل الارتفاع.</p>
                </div>
              </div>

              {/* Action Buttons to print metadata */}
              <div className="space-y-2">
                <button 
                  onClick={() => alert(`جاري تنزيل صحيفة الرصد الفني ومقاييس الأجهزة لمحطة ${selectedPin.nameAr.split('(')[0]}...`)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-slate-300" />
                  تحميل صحيفة رصد {selectedPin.nameAr.split(' ')[0]}
                </button>
              </div>

            </div>
          ) : (
            <div className="rounded-3xl p-6 bg-white/5 border border-white/10 text-center text-slate-400 flex flex-col items-center justify-center min-h-[300px]">
              <MapPin className="w-8 h-8 text-slate-500 animate-bounce mb-3" />
              <p className="text-xs font-bold">يرجى النقر فوق أي محطة رصد على الخريطة لعرض تفاصيل الطيران المباشرة.</p>
            </div>
          )}

          {/* Quick Info Box */}
          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-3xl p-4 space-y-2 text-right">
            <h4 className="text-xs font-bold text-[#D4AF37] flex items-center justify-end gap-1">
              إرشاد الملاحة الجوية والبحرية
              <Info className="w-3.5 h-3.5" />
            </h4>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              تلتزم الهيئة العامة للطيران المدني والأرصاد (CAMA) ببث النشرات والتحذيرات الرادارية على مدار الساعة للمحافظة على سلامة الأرواح وحركة الملاحة الجوية والبحرية في إقليم اليمن الجوي والبحري.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Deep Educational/Information block regarding ECMWF, GFS and ICON */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cama-gold" />
            الدليل الفني للنماذج العددية العالمية (ECMWF, GFS, ICON)
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            شرح مبسط لأهم مصادر الخرائط الجوية والبيانات الديناميكية المستخدمة في التنبؤات والتحذيرات الصادرة عن الهيئة العامة للأرصاد.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ECMWF Card */}
          <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">دقة متفوقة (9 كم)</span>
              <h4 className="text-sm font-extrabold text-white">النموذج الأوروبي (ECMWF)</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed text-right">
              يُدار من قِبل المركز الأوروبي للتنبؤات الجوية متوسطة المدى. يُعد النموذج الأدق والأقوى عالمياً في رسم المنخفضات الجوية والأعاصير المدارية في خليج عدن وبحر العرب، ويعتمد على معالجة البيانات الفائقة لحساب مسارات الرياح والأمطار بدقة متناهية.
            </p>
          </div>

          {/* GFS Card */}
          <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded">تحديث عالمي مستمر</span>
              <h4 className="text-sm font-extrabold text-white">النموذج الأمريكي (GFS)</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed text-right">
              نظام التنبؤ العالمي المطور بواسطة وكالة (NOAA) الإدارة الوطنية للمحيطات والغلاف الجوي في الولايات المتحدة. يوفر تغطية شاملة وحسابات مستمرة على مدار الساعة، وهو أساسي لمطابقة حركة الرياح النفاثة والضغط المرتفع والمنخفض.
            </p>
          </div>

          {/* ICON Card */}
          <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">تفصيلي إقليمي</span>
              <h4 className="text-sm font-extrabold text-white">النموذج الألماني (ICON)</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed text-right">
              النموذج العددي المطور من قِبل الخدمة الجوية الألمانية (DWD). يتميز بتفاصيل عالية الدقة للتضاريس الوعرة والجبلية (وهو ممتاز لمناطق اليمن الجبلية والسلاسل الغربية) ويقدم توقعات دقيقة للأمطار الرعدية والحمل الحراري المحلي.
            </p>
          </div>
        </div>

        {/* Dynamic Warning of Model Variance */}
        <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-right">
            <h5 className="text-xs font-bold text-amber-400">تنويه فني لغرف العمليات وإدارة الأزمات:</h5>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              تختلف قراءات النماذج العددية أحياناً في المدى المتوسط (أكثر من 5 أيام) نظراً لتغير العوامل الديناميكية في طبقات الجو العليا. تقوم إدارة التنبؤات في الهيئة العامة للأرصاد بمطابقة قراءات الموديلات الثلاثة وتدقيقها بالرادارات الساحلية لإنتاج النشرة الرسمية الصادرة للجمهور ومطارات البلاد.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
