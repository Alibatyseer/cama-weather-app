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
  
  // 1. فصلنا بيانات النموذج عن بيانات الميتار لمنع تداخلها أبداً
  const [modelWeather, setModelWeather] = useState<WeatherInfo>(YEMEN_STATIONS[0]);
  const [metarData, setMetarData] = useState<any>(null);
  
  const [marineData, setMarineData] = useState<{ wave: number, state: string } | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  
  const [bulletins, setBulletins] = useState({
    dailyWeather: null as any,
    dailyMarine: null as any,
    weeklyWeather: null as any,
    weeklyMarine: null as any,
    warning: null as any,
    seasonal: null as any
  });
  
  const [activeAlert, setActiveAlert] = useState<AlertMessage | null>(null);
  const [activeBulletin, setActiveBulletin] = useState<any | null>(null);
  const [alertIndex, setAlertIndex] = useState(0);

  const currentAlert = CAMA_ALERTS[alertIndex];
  const nextAlert = () => setAlertIndex((prev) => (prev + 1) % CAMA_ALERTS.length);

  // دمج البيانات الذكي للواجهة (الأولوية دائماً للميتار)
  const displayTemp = metarData?.temp !== undefined ? metarData.temp : modelWeather.temp;
  const displayWindSpeed = metarData?.windSpeed !== undefined ? metarData.windSpeed : modelWeather.windSpeed;
  const displayWindDir = metarData?.windDirection || modelWeather.windDirection;
  const displayPressure = metarData?.pressure !== undefined ? metarData.pressure : modelWeather.pressure;
  const displayVisibility = metarData?.visibility !== undefined ? metarData.visibility : modelWeather.visibility;
  const displayDewPoint = metarData?.dewPoint !== undefined ? metarData.dewPoint : modelWeather.dewPoint;
  const displayFlightCategory = metarData?.flightCategory || 'VFR';
  const displayFlightCategoryText = displayFlightCategory === 'VFR' ? 'ملاحة بصرية متاحة' : 'شروط طيران آلي';

  // Fetch Weather Data
  useEffect(() => {
    let isMounted = true;
    
    const fetchRealData = async () => {
      setIsFetching(true);
      setMetarData(null); 
      
      let baseData = { ...selectedStation };

      const getStationMeta = (nameEn: string) => {
        const name = nameEn.toLowerCase();
        if (name.includes('aden')) return { lat: 12.829, lon: 45.029, icao: 'OYAA', coastal: true };
        if (name.includes('sana')) return { lat: 15.369, lon: 44.191, icao: 'OYSN', coastal: false };
        if (name.includes('seiyun')) return { lat: 15.938, lon: 48.788, icao: 'OYSY', coastal: false };
        if (name.includes('ataq')) return { lat: 14.533, lon: 46.833, icao: 'OYAT', coastal: false };
        if (name.includes('mukalla') || name.includes('riyan')) return { lat: 14.665, lon: 49.375, icao: 'OYRN', coastal: true };
        if (name.includes('socotra')) return { lat: 12.630, lon: 53.990, icao: 'OYSQ', coastal: true };
        if (name.includes('hodeidah')) return { lat: 14.753, lon: 42.976, icao: 'OYHD', coastal: true };
        if (name.includes('taiz')) return { lat: 13.579, lon: 44.013, icao: 'OYTZ', coastal: false };
        if (name.includes('ghaydah')) return { lat: 16.178, lon: 52.176, icao: 'OYGD', coastal: true };
        return { lat: 15.369, lon: 44.191, icao: '', coastal: false };
      };

      const meta = getStationMeta(selectedStation.nameEn);

      // 1. تعديل تصنيفات الطقس لمناخ اليمن (منع الغائم كلياً الخاطئ)
      const mapWmoCode = (code: number) => {
        if (code === 0) return 'sunny';
        if (code === 1 || code === 2) return 'partly-cloudy';
        if (code === 3) return 'partly-cloudy'; 
        if (code >= 45 && code <= 48) return 'dusty';
        if (code >= 51 && code <= 82) return 'rainy';
        if (code >= 95) return 'stormy';
        return 'sunny';
      };

      const getConditionTextAr = (code: number) => {
        if (code === 0) return 'صافي ومشمس';
        if (code === 1 || code === 2) return 'غائم جزئياً';
        if (code === 3) return 'سحب متفرقة'; 
        if (code >= 45 && code <= 48) return 'غبار معلق';
        if (code >= 51 && code <= 69) return 'أمطار خفيفة';
        if (code >= 80 && code <= 82) return 'زخات أمطار';
        if (code >= 95) return 'عواصف رعدية';
        return 'مستقر';
      };

      // جلب بيانات النموذج الأوروبي
      const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${meta.lat}&longitude=${meta.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      fetch(meteoUrl).then(res => res.ok ? res.json() : null).then(meteoResult => {
        if (meteoResult && isMounted) {
          baseData.temp = Math.round(meteoResult.current.temperature_2m);
          baseData.humidity = Math.round(meteoResult.current.relative_humidity_2m);
          baseData.windSpeed = Math.round(meteoResult.current.wind_speed_10m);
          baseData.pressure = Math.round(meteoResult.current.surface_pressure);
          baseData.conditionType = mapWmoCode(meteoResult.current.weather_code);
          baseData.conditionAr = getConditionTextAr(meteoResult.current.weather_code);
          
          const currentHour = new Date().getHours();
          baseData.hourlyForecast = meteoResult.hourly.temperature_2m.slice(currentHour, currentHour + 24).map((t: number, i: number) => ({
            time: `${(currentHour + i) % 24}:00`, temp: Math.round(t), iconType: mapWmoCode(meteoResult.hourly.weather_code[currentHour + i])
          }));

          const arabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
          baseData.dailyForecast = meteoResult.daily.temperature_2m_max.slice(1, 6).map((maxT: number, i: number) => {
            const date = new Date(); date.setDate(date.getDate() + i + 1);
            const wmoCode = meteoResult.daily.weather_code[i + 1];
            return {
              dayAr: arabicDays[date.getDay()], tempMax: Math.round(maxT), tempMin: Math.round(meteoResult.daily.temperature_2m_min[i + 1]),
              iconType: mapWmoCode(wmoCode), conditionAr: getConditionTextAr(wmoCode)
            };
          });
          setModelWeather({...baseData});
        }
      }).catch(e => console.error(e));

      // جلب بيانات الميتار بشكل مستقل
      if (meta.icao) {
        const metarUrl = `https://aviationweather.gov/api/data/metar?ids=${meta.icao}&format=json&hours=4&cb=${Date.now()}`;
        fetch(metarUrl).then(res => res.ok ? res.json() : null).then(metarResult => {
          if (metarResult && metarResult.length > 0 && isMounted) {
            const latest = metarResult[0];
            setMetarData({
              temp: latest.temp !== null ? Math.round(latest.temp) : undefined,
              dewPoint: latest.dewp !== null ? Math.round(latest.dewp) : undefined,
              windDirection: latest.wdir !== null ? `${latest.wdir}°` : undefined,
              windSpeed: latest.wspd !== null ? Math.round(latest.wspd * 1.852) : undefined,
              pressure: latest.altim !== null ? Math.round(latest.altim) : undefined,
              visibility: latest.visib !== null ? Math.round(latest.visib * 1.609) : undefined,
              flightCategory: latest.fltcat
            });
          }
        }).catch(e => console.error(e));
      }

      // جلب البيانات البحرية
      if (meta.coastal) {
        const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${meta.lat}&longitude=${meta.lon}&current=wave_height&timezone=auto`;
        fetch(marineUrl).then(res => res.ok ? res.json() : null).then(marineResult => {
          if (marineResult && marineResult.current && isMounted) {
            const wave = marineResult.current.wave_height;
            let state = 'هادئ';
            if (wave > 0.5) state = 'خفيف الموج';
            if (wave > 1.25) state = 'معتدل';
            if (wave > 2.5) state = 'مضطرب';
            setMarineData({ wave, state });
          }
        }).catch(e => console.error(e));
      } else {
        setMarineData(null);
      }

      setTimeout(() => { if (isMounted) setIsFetching(false); }, 1000);
    };

    fetchRealData();
    return () => { isMounted = false; };
  }, [selectedStation]);

  // Fetch Facebook RSS (استخدام AllOrigins JSON لتجاوز Netlify بثبات)
  useEffect(() => {
    let isMounted = true;

    const fetchFacebookRSS = async () => {
      try {
        const rssUrl = 'https://rss.app/feeds/gIRd7iserkypQ9i3.xml';
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}&cb=${Date.now()}`;
        
        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (!data.contents) throw new Error("No XML contents received");

        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const items = Array.from(xml.querySelectorAll("item"));

        const extractedBulletins = {
          dailyWeather: null as any,
          dailyMarine: null as any,
          weeklyWeather: null as any,
          weeklyMarine: null as any,
          warning: null as any,
          seasonal: null as any
        };

        items.forEach((item, index) => {
          const title = item.querySelector("title")?.textContent || "";
          const descHTML = item.querySelector("description")?.textContent || "";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          
          const dateObj = new Date(pubDate);
          const formattedDate = isNaN(dateObj.getTime()) ? "الآن" : dateObj.toLocaleDateString('ar-YE');
          
          let extractedImage = "";
          const imgMatch = descHTML.match(/<img[^>]+src="([^">]+)"/);
          if (imgMatch) extractedImage = imgMatch[1];
          const cleanText = descHTML.replace(/<[^>]*>?/gm, '').trim();
          const combinedText = title + " " + cleanText;

          const bulletinObj = {
            id: `fb-post-${index}`,
            title: title.length > 55 ? title.substring(0, 55) + "..." : title,
            date: formattedDate,
            summary: cleanText.substring(0, 100) + "...",
            contentAr: cleanText,
            fbImage: extractedImage
          };

          const isMarine = combinedText.includes('بحر') || combinedText.includes('موج') || combinedText.includes('صياد') || combinedText.includes('ملاحة');
          const isWeekly = combinedText.includes('أسبوع') || combinedText.includes('اسبوع');
          const isDaily = combinedText.includes('يومي') || combinedText.includes('24 ساعة') || combinedText.includes('خلال') || title.includes('الطقس');
          const isWarning = combinedText.includes('تحذير') || combinedText.includes('إنذار') || combinedText.includes('عاجل') || combinedText.includes('هام');
          const isSeasonal = combinedText.includes('موسم') || combinedText.includes('مناخ') || combinedText.includes('فصل');

          if (isSeasonal && !extractedBulletins.seasonal) extractedBulletins.seasonal = bulletinObj;
          else if (isWarning && !extractedBulletins.warning) extractedBulletins.warning = bulletinObj;
          else if (isWeekly && isMarine && !extractedBulletins.weeklyMarine) extractedBulletins.weeklyMarine = bulletinObj;
          else if (isWeekly && !isMarine && !extractedBulletins.weeklyWeather) extractedBulletins.weeklyWeather = bulletinObj;
          else if (isDaily && isMarine && !extractedBulletins.dailyMarine) extractedBulletins.dailyMarine = bulletinObj;
          else if (isDaily && !isMarine && !extractedBulletins.dailyWeather) extractedBulletins.dailyWeather = bulletinObj;
        });

        if (isMounted) {
          setBulletins(extractedBulletins);
        }
      } catch (error) {
        console.error("RSS Fetch Error:", error);
      }
    };

    fetchFacebookRSS();
    return () => { isMounted = false; };
  }, []);

  const getConditionIcon = (type: string, sizeClass = "w-10 h-10") => {
    switch (type) {
      case 'sunny': return <Sun className={`${sizeClass} text-amber-400 animate-[spin_40s_linear_infinite] filter drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]`} />;
      case 'partly-cloudy': return <CloudSun className={`${sizeClass} text-slate-200 filter drop-shadow-[0_0_8px_rgba(203,213,225,0.4)]`} />;
      case 'cloudy': return <Cloud className={`${sizeClass} text-slate-400 filter drop-shadow-[0_0_8px_rgba(148,163,184,0.4)]`} />;
      case 'rainy': return <CloudRain className={`${sizeClass} text-sky-400 animate-bounce filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]`} />;
      case 'dusty': return <Wind className={`${sizeClass} text-yellow-600 animate-pulse filter drop-shadow-[0_0_8px_rgba(202,138,4,0.4)]`} />;
      case 'stormy': return <ShieldAlert className={`${sizeClass} text-red-400 animate-pulse filter drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]`} />;
      default: return <Sun className={`${sizeClass} text-amber-400`} />;
    }
  };

  const renderBulletinCard = (type: string, data: any, defaultTitle: string, defaultDesc: string, colorClass: string, Icon: any) => {
    const isAvailable = !!data;
    const item = data || { title: 'بانتظار مزامنة البيانات من المنصات الرسمية...', date: 'جاري التحديث', summary: defaultDesc };
    
    return (
      <div onClick={() => isAvailable && setActiveBulletin({ ...item, typeLabel: defaultTitle })} className={`group relative rounded-2xl p-5 glass-panel border ${colorClass} shadow-md transition-all duration-300 ${isAvailable ? 'cursor-pointer hover:-translate-y-1 bg-white/5' : 'opacity-70'} flex flex-col justify-between gap-4 h-full`}>
        <div className={`absolute top-0 right-0 w-16 h-0.5 bg-gradient-to-l ${colorClass.split(' ')[0].replace('border-', 'from-')} to-transparent group-hover:w-full transition-all duration-500`} />
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className={`text-[10px] font-bold ${colorClass.replace('border-', 'text-').split('/')[0]} bg-white/5 px-2.5 py-1 rounded-full border border-white/5 flex items-center gap-1.5`}>
              <Icon className="w-3.5 h-3.5"/> {defaultTitle}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-slate-200 transition-colors leading-relaxed line-clamp-2">
            {item.title}
          </h4>
          <p className="text-xs text-slate-300/80 line-clamp-3 leading-relaxed">
            {item.summary}
          </p>
        </div>
        {isAvailable && (
          <div className={`flex items-center justify-between text-[11px] font-semibold ${colorClass.replace('border-', 'text-').split('/')[0]} border-t border-white/5 pt-3 group-hover:text-white transition-all`}>
            <span>قراءة النشرة كاملة</span><ChevronLeft className="w-3.5 h-3.5 transform group-hover:translate-x-[-4px] transition-transform" />
          </div>
        )}
      </div>
    );
  };

  const getSeasonalFallback = () => ({
    title: 'النشرة الموسمية المعتمدة',
    date: 'إصدار فصلي',
    summary: 'يعتمد هذا التقرير في بناء التوقعات على إدخال مخرجات النموذج الأوروبي (ECMWF) كمتغير رئيسي (X)، مع إدخال بيانات درجات حرارة سطح البحر (SST) للفترات السابقة كمتغير (Y).',
    contentAr: 'يعتمد مركز التنبؤات في بناء التوقعات الموسمية الدقيقة على استخدام أداة (CPT). المنهجية المعتمدة تتضمن إدخال مخرجات النموذج الأوروبي (ECMWF) كمتغير رئيسي (X) للموسم الحالي، بالتزامن مع إدخال بيانات درجات حرارة سطح البحر (SST) للفترات السابقة كمتغير (Y)، مما يضمن التقاط الأنماط المناخية بدقة عالية للجمهورية اليمنية.',
    fbImage: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?auto=format&fit=crop&w=800'
  });

  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-6">
      
      <div className="relative overflow-hidden rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 shadow-lg shadow-black/20">
        <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-[#D4AF37] animate-pulse" />
        <div className="p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 mr-1.5">
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="flex-shrink-0 w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#D4AF37]/20">تحذير رسمي هام</span>
                <span className="text-[10px] text-[#D4AF37]/80">{currentAlert.timestamp}</span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-[#D4AF37] leading-relaxed">{currentAlert.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button onClick={() => setActiveAlert(currentAlert)} className="text-xs font-semibold bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] px-4 py-2 rounded-xl transition-all border border-[#D4AF37]/30 shadow-inner">عرض التفاصيل الكاملة</button>
            <button onClick={nextAlert} className="p-2 bg-white/5 hover:bg-white/10 text-[#D4AF37] rounded-xl transition-all border border-white/5"><ChevronLeft className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-cama-gold tracking-wider flex items-center gap-1 text-glow-gold">
          <MapPin className="w-3.5 h-3.5" />
          اختر محطة الرصد الجوي الرسمية:
          {isFetching && <Loader2 className="w-3.5 h-3.5 animate-spin ml-2 text-cyan-400" />}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {YEMEN_STATIONS.map((station) => {
            const isSelected = selectedStation.id === station.id;
            return (
              <button
                key={station.id}
                onClick={() => setSelectedStation(station)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 border ${isSelected ? 'bg-cama-gold/15 text-cama-gold border-cama-gold shadow-md shadow-cama-gold/10 text-glow-gold' : 'bg-deep-navy/40 text-slate-300 hover:text-white border-white/5 hover:bg-deep-navy/60'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cama-gold animate-ping' : 'bg-slate-500'}`} />
                {station.nameAr}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-opacity duration-500 ${isFetching ? 'opacity-60' : 'opacity-100'}`}>
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-6 md:p-10 flex flex-col justify-between min-h-[460px]">
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full filter blur-3xl -z-10 pointer-events-none" />

            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-gradient-to-r from-cama-gold to-amber-500 text-royal-blue px-2.5 py-0.5 rounded-md shadow-sm font-sans">محطة رصد رئيسية</span>
                  <span className="text-xs text-slate-400 font-mono tracking-wider">{modelWeather.nameEn.split('(')[1]?.replace(')', '')}</span>
                </div>
                <h2 className="text-5xl font-light text-white mt-2.5 tracking-tight">{modelWeather.nameAr.split('(')[0]}</h2>
                <p className="text-xs text-slate-400 mt-1 font-mono tracking-wide">{modelWeather.nameEn}</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-cama-gold shadow-inner font-serif">🇾🇪</div>
            </div>

            <div className="my-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-baseline gap-2">
                <span className="text-8xl font-thin tracking-tighter text-white relative">
                  {displayTemp}
                  <span className="text-4xl align-top inline-block mt-4 text-cama-gold">°م</span>
                </span>
                <div className="mr-6 space-y-1">
                  <p className="text-xl text-blue-200">{modelWeather.conditionAr}</p>
                  <p className="text-xs text-slate-400 font-mono">{modelWeather.conditionEn}</p>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center p-6 bg-white/5 rounded-full border border-white/10 shadow-lg relative group">
                {getConditionIcon(modelWeather.conditionType, "w-16 h-16")}
                <Sparkles className="w-4 h-4 text-cama-gold absolute top-2 right-2 opacity-50 animate-pulse" />
              </div>
            </div>

            {marineData && (
              <div className="mb-4 p-3 rounded-xl bg-cyan-900/40 border border-cyan-400/20 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2">
                  <Waves className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs text-cyan-100 font-medium">حالة البحر والأمواج:</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm">
                    {marineData.state}
                  </span>
                  <span className="text-sm font-bold text-white font-mono">{marineData.wave} <span className="text-[10px] text-slate-400 font-sans">متر</span></span>
                </div>
              </div>
            )}

            <div className="mb-6 p-3 rounded-xl bg-deep-navy/50 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cama-gold animate-pulse" />
                <span className="text-xs text-slate-300 font-medium">تصنيف الملاحة الجوية بالمطار:</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${displayFlightCategory === 'VFR' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>{displayFlightCategory}</span>
                <span className="text-xs font-bold text-white">{displayFlightCategoryText}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-300"><Droplets className="w-4.5 h-4.5 text-cyan-400" /></div>
                <div><p className="text-[10px] text-slate-400 font-medium">الرطوبة النسبية</p><p className="text-sm font-bold text-slate-100 font-mono">{modelWeather.humidity}%</p></div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-300"><Wind className="w-4.5 h-4.5 text-teal-300" /></div>
                <div><p className="text-[10px] text-slate-400 font-medium">سرعة واتجاه الرياح</p><p className="text-sm font-bold text-slate-100 font-sans"><span className="font-mono">{displayWindSpeed}</span> كم/س<span className="text-[10px] block text-slate-400">{displayWindDir}</span></p></div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-300"><Compass className="w-4.5 h-4.5 text-amber-400" /></div>
                <div><p className="text-[10px] text-slate-400 font-medium">الضغط الجوي</p><p className="text-sm font-bold text-slate-100 font-mono">{displayPressure} hPa</p></div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-300"><Eye className="w-4.5 h-4.5 text-sky-300" /></div>
                <div><p className="text-[10px] text-slate-400 font-medium">الرؤية الأفقية</p><p className="text-sm font-bold text-slate-100 font-mono">{displayVisibility} كم</p></div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-300"><Thermometer className="w-4.5 h-4.5 text-amber-500" /></div>
                <div><p className="text-[10px] text-slate-400 font-medium">نقطة الندى</p><p className="text-sm font-bold text-slate-100 font-mono">{displayDewPoint}°C</p></div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-300"><Sun className="w-4.5 h-4.5 text-amber-300" /></div>
                <div><p className="text-[10px] text-slate-400 font-medium">مؤشر الأشعة (UV)</p><p className="text-sm font-bold text-slate-100 font-mono">{modelWeather.uvIndex}</p></div>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl p-5 glass-panel border border-white/10 shadow-lg space-y-4">
            <h3 className="text-xs font-bold text-cama-gold flex items-center gap-1.5 uppercase tracking-wider text-glow-gold"><Activity className="w-3.5 h-3.5" />التقرير الساعي (٢٤ ساعة)</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {modelWeather.hourlyForecast.map((hour, idx) => (
                <div key={idx} className="flex-shrink-0 w-20 py-3 rounded-2xl bg-white/5 border border-white/5 hover:border-cama-gold/25 transition-all flex flex-col items-center justify-between gap-2.5 text-center shadow-inner">
                  <span className="text-[10px] text-slate-400 font-medium">{hour.time}</span>
                  <div className="bg-royal-blue/60 p-2 rounded-full border border-white/5">{getConditionIcon(hour.iconType, "w-6 h-6")}</div>
                  <span className="text-sm font-extrabold text-white font-mono">{hour.temp}°</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-5 glass-panel border border-white/10 shadow-lg space-y-4">
            <h3 className="text-xs font-bold text-cama-gold flex items-center gap-1.5 uppercase tracking-wider text-glow-gold"><Calendar className="w-3.5 h-3.5" />توقعات الطقس للخمسة الأيام القادمة</h3>
            <div className="space-y-3">
              {modelWeather.dailyForecast.map((day, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-100 min-w-[50px]">{day.dayAr}</span>
                    <div className="p-1.5 bg-royal-blue/40 rounded-lg">{getConditionIcon(day.iconType, "w-5 h-5")}</div>
                    <span className="text-xs text-slate-300 font-medium">{day.conditionAr}</span>
                  </div>
                  <div className="flex items-center gap-2.5 font-mono text-xs">
                    <span className="font-extrabold text-white">{day.tempMax}°</span>
                    <span className="text-slate-400 text-[10px]">/</span>
                    <span className="text-slate-400">{day.tempMin}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-r-2 border-cama-gold pr-2.5">
          <FileText className="w-5 h-5 text-cama-gold" />
          النشرات والتقارير الصادرة من الهيئة
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderBulletinCard('dailyWeather', bulletins.dailyWeather, 'نشرة الطقس الجوية اليومية', 'تحديث يومي لحالة الطقس في المرتفعات والمناطق الصحراوية.', 'border-sky-500/30 hover:border-sky-400/50', CloudSun)}
          {renderBulletinCard('dailyMarine', bulletins.dailyMarine, 'نشرة الطقس البحرية اليومية', 'تحديث يومي لحالة البحر والأمواج في السواحل والجزر اليمنية.', 'border-cyan-500/30 hover:border-cyan-400/50', Anchor)}
          {renderBulletinCard('weeklyWeather', bulletins.weeklyWeather, 'نشرة الطقس الأسبوعية', 'توقعات شاملة للحالة الجوية خلال الأسبوع القادم.', 'border-indigo-500/30 hover:border-indigo-400/50', Calendar)}
          {renderBulletinCard('weeklyMarine', bulletins.weeklyMarine, 'نشرة البحر الأسبوعية', 'توقعات وتوجيهات أسبوعية للصيادين وحركة الملاحة.', 'border-teal-500/30 hover:border-teal-400/50', Waves)}
          {renderBulletinCard('warning', bulletins.warning, 'النشرة التحذيرية', 'إنذارات مبكرة للحالات الجوية القاسية والطارئة.', 'border-red-500/30 hover:border-red-400/50', ShieldAlert)}
          {renderBulletinCard('seasonal', bulletins.seasonal || getSeasonalFallback(), 'النشرة الموسمية', 'دراسات وتقارير مناخية فصيلة لتوقعات الأمطار والحرارة.', 'border-cama-gold/40 hover:border-amber-400/60', Map)}
        </div>
      </div>

      <AnimatePresence>
        {activeAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="relative w-full max-w-2xl rounded-3xl overflow-hidden glass-panel-heavy border border-red-500/30 shadow-2xl p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center"><ShieldAlert className="w-5.5 h-5.5 text-red-500 animate-bounce" /></div>
                  <div><span className="text-[10px] font-bold text-red-400 bg-red-500/15 px-2.5 py-0.5 rounded-full uppercase">بلاغ ملاحي طارئ</span><h3 className="text-lg font-bold text-white mt-1">تنبيه جوي رسمي</h3></div>
                </div>
                <button onClick={() => setActiveAlert(null)} className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-all"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/15 space-y-3"><h4 className="font-extrabold text-white text-base leading-relaxed">{activeAlert.title}</h4><p className="text-xs text-slate-300 leading-relaxed font-sans">{activeAlert.text}</p></div>
              <div className="space-y-3"><h5 className="text-xs font-bold text-cama-gold">المناطق المشمولة بالتحذير:</h5><div className="flex flex-wrap gap-2">{activeAlert.targetRegions.map((region, i) => (<span key={i} className="text-xs bg-white/5 border border-white/10 text-slate-200 px-3 py-1 rounded-xl font-medium">{region}</span>))}</div></div>
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-4"><span>تاريخ النشر: {activeAlert.timestamp}</span><span className="text-cama-gold">صادر عن مركز التنبؤات الجوية والإنذار المبكر</span></div>
            </motion.div>
          </div>
        )}

        {activeBulletin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="relative w-full max-w-3xl rounded-3xl overflow-hidden glass-panel-heavy border border-blue-500/30 shadow-2xl p-6 md:p-8 space-y-6 my-8">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-cama-gold" />
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"><FileText className="w-5.5 h-5.5 text-blue-400" /></div>
                  <div><span className="text-[10px] font-bold text-blue-300 bg-blue-500/15 px-2.5 py-0.5 rounded-full">{activeBulletin.typeLabel || 'نشرة معتمدة'}</span><h3 className="text-xl font-extrabold text-white mt-1">التفاصيل</h3></div>
                </div>
                <button onClick={() => setActiveBulletin(null)} className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-all"><X className="w-5 h-5" /></button>
              </div>
              <div className="bg-deep-navy/40 border border-white/10 rounded-2xl p-6 space-y-6 max-h-[480px] overflow-y-auto font-sans leading-relaxed text-slate-100 shadow-inner">
                
                <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="text-center sm:text-right"><p className="text-xs font-bold text-blue-400 uppercase">الجمهورية اليمنية</p><p className="text-[10px] text-slate-400">قطاع الأرصاد الجوية</p></div>
                  <div className="text-xs text-slate-400 font-mono text-left"><p>التاريخ: {activeBulletin.date}</p><p>المصدر: المنصات الرسمية</p></div>
                </div>
                
                {activeBulletin.fbImage && (
                  <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden relative border border-white/10 shadow-lg flex items-center justify-center bg-black/20">
                    <img src={activeBulletin.fbImage} alt="Weather Map" className="w-full h-full object-contain sm:object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] font-bold text-white">الخريطة المرفقة</span>
                    </div>
                  </div>
                )}

                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm leading-8 text-slate-200 whitespace-pre-line">
                  {activeBulletin.contentAr}
                </div>

              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5">
                <span className="text-xs text-slate-400">جميع حقوق الطبع والنشر محفوظة للهيئة العامة للطيران المدني والأرصاد.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
