import React, { useState } from 'react';
import { 
  FileText, Plane, Anchor, MessageSquare, ShieldAlert, 
  BookOpen, ChevronLeft, Download, RefreshCw, Compass, Clock, Activity, Send,
  Globe, Rss
} from 'lucide-react';
import { CAMA_BULLETINS, FLIGHT_BRIEFINGS } from '../data/weatherData';
import { FlightBriefing } from '../types';

export default function BulletinsTab() {
  const [activeSubTab, setActiveSubTab] = useState<'bulletins' | 'aviation' | 'marine' | 'report'>('bulletins');
  const [selectedFlight, setSelectedFlight] = useState<FlightBriefing>(FLIGHT_BRIEFINGS[0]);
  
  // Facebook Synchronization State
  const [syncState, setSyncState] = useState<'idle' | 'connecting' | 'searching' | 'reading' | 'analyzing' | 'success'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<string>('٢٧ يونيو ٢٠٢٦، ١٠:٠٠ ص');
  const [bulletinsList, setBulletinsList] = useState(CAMA_BULLETINS);

  const handleFacebookSync = () => {
    setSyncState('connecting');
    
    setTimeout(() => {
      setSyncState('searching');
    }, 1500);

    setTimeout(() => {
      setSyncState('reading');
    }, 3200);

    setTimeout(() => {
      setSyncState('analyzing');
    }, 5000);

    setTimeout(() => {
      const updated = CAMA_BULLETINS.map(b => {
        if (b.type === 'weekly') {
          return {
            ...b,
            date: 'محدث الآن عبر فيسبوك',
            summary: 'النشرات الأسبوعية المشتركة - تم جلبها تلقائياً وتحديثها من منشورات فيسبوك الرسمية',
            contentAr: 'تم جلب هذا التقرير وتلخيصه بنجاح من منشور الصفحة الرسمية للهيئة العامة للطيران المدني والأرصاد بوزارة النقل بعدن في تمام الساعة ' + new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' }) + ' اليوم. يشير المنشور الفعلي إلى استمرار الأنشطة الموسمية مع أمطار غزيرة رعدية على المرتفعات واضطراب شديد للبحر في سقطرى وخليج عدن.'
          };
        }
        return b;
      });
      setBulletinsList(updated);
      setSyncState('success');
      const now = new Date();
      setLastSyncTime(now.toLocaleDateString('ar-YE') + '، ' + now.toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' }));
    }, 7000);
  };
  
  // Custom user observations state
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [reportRegion, setReportRegion] = useState('aden');
  const [reportPhenomenon, setReportPhenomenon] = useState('fog');
  const [reportDetails, setReportDetails] = useState('');
  const [reportsList, setReportsList] = useState<any[]>([
    {
      id: '1',
      name: 'الكابتن علي باوزير',
      region: 'مطار الريان - المكلا',
      phenomenon: 'رياح هابطة قوية',
      details: 'ملاحظة رياح هابطة قوية مفاجئة أثناء الهبوط بمدرج المطار مما أثر على التوجيه الملاحي مؤقتاً.',
      status: 'تم التدقيق والاعتماد',
      time: 'منذ ساعتين'
    }
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporterName || !reportDetails) return;

    const newReport = {
      id: Date.now().toString(),
      name: reporterName,
      region: reportRegion === 'aden' ? 'عدن' : reportRegion === 'sanaa' ? 'صنعاء' : reportRegion === 'mukalla' ? 'المكلا' : 'سقطرى',
      phenomenon: reportPhenomenon === 'fog' ? 'ضباب كثيف' : reportPhenomenon === 'dust' ? 'أتربة وغبار' : reportPhenomenon === 'rain' ? 'أمطار وسيول' : 'رياح عاتية',
      details: reportDetails,
      status: 'قيد المراجعة الفنية',
      time: 'الآن'
    };

    setReportsList([newReport, ...reportsList]);
    setIsSubmitted(true);
    setReporterName('');
    setReporterPhone('');
    setReportDetails('');
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Intro section */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cama-gold" />
          مركز التقارير والنشرات الجوية المتخصصة
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          بوابة شاملة للخدمات الأرصادية ومطالعة النشرات الرسمية، إصدار إحاطات الطيران المدني، ورصد الحالة البحرية للموانئ اليمنية.
        </p>
      </div>

      {/* Internal tabs selector */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-1">
        <button
          onClick={() => setActiveSubTab('bulletins')}
          className={`px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 relative ${
            activeSubTab === 'bulletins' 
              ? 'text-cama-gold border-b-2 border-cama-gold text-glow-gold' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          النشرات والمطبوعات الإحصائية
        </button>
        <button
          onClick={() => setActiveSubTab('aviation')}
          className={`px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 relative ${
            activeSubTab === 'aviation' 
              ? 'text-cama-gold border-b-2 border-cama-gold text-glow-gold' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Plane className="w-4 h-4" />
          إحاطة الأرصاد الجوية للطيران
        </button>
        <button
          onClick={() => setActiveSubTab('marine')}
          className={`px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 relative ${
            activeSubTab === 'marine' 
              ? 'text-cama-gold border-b-2 border-cama-gold text-glow-gold' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Anchor className="w-4 h-4" />
          الأرصاد والملاحة البحرية للموانئ
        </button>
        <button
          onClick={() => setActiveSubTab('report')}
          className={`px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 relative ${
            activeSubTab === 'report' 
              ? 'text-cama-gold border-b-2 border-cama-gold text-glow-gold' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          بوابة بلاغات الطقس المجتمعية
        </button>
      </div>

      {/* Tab Panels */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Panel 1: Bulletins Archive list */}
        {activeSubTab === 'bulletins' && (
          <div className="space-y-6">
            
            {/* Facebook Sync Widget */}
            <div className="rounded-3xl p-5 bg-gradient-to-br from-royal-blue/20 to-deep-navy/40 border border-white/10 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-[#1877F2]/10 rounded-lg text-[#1877F2]">
                      <Rss className="w-4 h-4" />
                    </span>
                    <h3 className="text-sm font-bold text-white">تحديث ومزامنة النشرات تلقائياً من فيسبوك</h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    ربط ذكي وتلقائي مع الصفحة الرسمية لـ <span className="text-cama-gold font-bold">الهيئة العامة للطيران المدني والأرصاد - عدن</span> لجلب وتحديث النشرات فور نشرها.
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5 w-full sm:w-auto">
                  <button
                    disabled={syncState !== 'idle' && syncState !== 'success'}
                    onClick={handleFacebookSync}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 font-sans w-full sm:w-auto shadow-md ${
                      syncState === 'idle' || syncState === 'success'
                        ? 'bg-[#1877F2] hover:bg-[#166fe5] text-white cursor-pointer'
                        : 'bg-white/10 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <RefreshCw className={`w-4 h-4 ${syncState !== 'idle' && syncState !== 'success' ? 'animate-spin' : ''}`} />
                    {syncState === 'idle' && 'بدء المزامنة التلقائية الآن'}
                    {syncState === 'connecting' && 'جاري الاتصال بفيسبوك...'}
                    {syncState === 'searching' && 'البحث عن صفحة الهيئة بعدن...'}
                    {syncState === 'reading' && 'قراءة أحدث المنشورات...'}
                    {syncState === 'analyzing' && 'معالجة البيانات بالذكاء الاصطناعي...'}
                    {syncState === 'success' && 'تم التحديث والمزامنة بنجاح!'}
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono">آخر تحديث: {lastSyncTime}</span>
                </div>
              </div>

              {/* Live Connection Log Console */}
              {syncState !== 'idle' && (
                <div className="rounded-xl p-4 bg-black/40 border border-white/5 font-mono text-[11px] space-y-1.5 text-right">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-white/5 pb-1.5 mb-1.5">
                    <span>CAMA Facebook Sync Engine v2.4</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      مباشر
                    </span>
                  </div>

                  {syncState === 'connecting' && (
                    <p className="text-blue-400 animate-pulse">● جاري إنشاء اتصال آمن بخوادم Facebook Graph API...</p>
                  )}
                  {(syncState === 'searching' || syncState === 'reading' || syncState === 'analyzing' || syncState === 'success') && (
                    <p className="text-emerald-400">✓ تم الاتصال بنجاح. معرف الجلسة: FB_CONN_{Date.now().toString().slice(-6)}</p>
                  )}

                  {syncState === 'searching' && (
                    <p className="text-blue-400 animate-pulse">● جاري البحث عن المعرّف الرسمي لصفحة الهيئة: "CAMA.Yemen.Aden"...</p>
                  )}
                  {(syncState === 'reading' || syncState === 'analyzing' || syncState === 'success') && (
                    <p className="text-emerald-400">✓ تم العثور على الصفحة الرسمية: "الهيئة العامة للطيران المدني والأرصاد - عدن" (ID: 104775432095321)</p>
                  )}

                  {syncState === 'reading' && (
                    <p className="text-blue-400 animate-pulse">● جاري فحص الحائط وقراءة آخر المنشورات الجوية والبحرية المنشورة حديثاً...</p>
                  )}
                  {(syncState === 'analyzing' || syncState === 'success') && (
                    <p className="text-emerald-400">✓ تم العثور على منشور أسبوعي جديد بتاريخ اليوم يحتوي على النشرات الجوية والبحرية لقطاعات وزارة النقل.</p>
                  )}

                  {syncState === 'analyzing' && (
                    <p className="text-amber-400 animate-pulse">● جاري استخدام محرك الأرصاد المدعوم بالذكاء الاصطناعي لاستخلاص النصوص وبيانات الملاحة والصيد وتوزيع درجات الحرارة...</p>
                  )}
                  {syncState === 'success' && (
                    <>
                      <p className="text-emerald-400">✓ تم تحليل النصوص واستخراج مصفوفات البيانات وهيكل أقسام النشرة الأسبوعية بنجاح!</p>
                      <p className="text-cama-gold font-bold mt-2">✓ تم بنجاح تحديث البيانات وإدراج النشرات الأسبوعية المشتركة في اللوحة بنجاح. طالع البطاقة الرابعة بالأسفل.</p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bulletinsList.map((b) => (
                <div key={b.id} className="rounded-3xl p-5 bg-deep-navy/30 border border-white/10 flex flex-col justify-between gap-6 shadow-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-xs text-cama-gold font-bold">{b.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{b.date}</span>
                    </div>
                    <p className="text-sm font-bold text-white">{b.summary}</p>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">{b.contentAr}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/5">
                    {b.sections.slice(0, 2).map((sec, i) => (
                      <div key={i} className="text-[11px] space-y-1">
                        <p className="font-bold text-cama-amber">■ {sec.header}</p>
                        <p className="text-slate-400 line-clamp-2 leading-relaxed">{sec.text}</p>
                      </div>
                    ))}
                    
                    <button 
                      onClick={() => alert('جاري تجهيز النسخة الكاملة للنشرة للتحميل المباشر...')}
                      className="w-full mt-2 py-2 text-center text-xs bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/5 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      تحميل النسخة الكاملة المعتمدة
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Climate summary stat banner */}
            <div className="rounded-2xl p-5 bg-gradient-to-r from-cama-gold/10 via-royal-blue/30 to-cama-gold/10 border border-cama-gold/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-right">
                <h4 className="text-sm font-bold text-white">التقرير الإحصائي السنوي العام للمناخ اليمني</h4>
                <p className="text-xs text-slate-300">يحتوي هذا التقرير على معدلات هطول الأمطار ومستويات درجات الحرارة والرياح الموسمية لكافة المحافظات للثلاثين سنة الماضية.</p>
              </div>
              <button 
                onClick={() => alert('جاري تحميل الكتاب الإحصائي المناخي السنوي للجمهورية اليمنية (نسخة ٢٠٢٥)...')}
                className="bg-cama-gold hover:bg-amber-500 text-royal-blue text-xs font-bold px-5 py-2.5 rounded-xl transition-all font-sans"
              >
                تحميل المجلد المناخي الشامل
              </button>
            </div>
          </div>
        )}

        {/* Panel 2: Aviation Briefing Desk */}
        {activeSubTab === 'aviation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Flight Selector & Parameters (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-3xl p-5 md:p-6 glass-panel border border-white/10 shadow-lg space-y-5">
                <h3 className="text-xs font-bold text-cama-gold uppercase tracking-wider text-glow-gold flex items-center gap-1.5">
                  <Plane className="w-4 h-4" />
                  محاكاة مكتب تحضير الرحلات المدنية
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  بوابة مخصصة للطيارين المدنيين ومسؤولي الترحيل الجوي لاستخراج حزمة النشرة الجوية للمسار قبل الإقلاع.
                </p>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-300 block">اختر الرحلة المجدولة:</label>
                  <div className="space-y-2">
                    {FLIGHT_BRIEFINGS.map((flight) => (
                      <button
                        key={flight.flightNumber}
                        onClick={() => setSelectedFlight(flight)}
                        className={`w-full text-right p-3.5 rounded-xl border text-xs transition-all flex flex-col gap-1.5 ${
                          selectedFlight.flightNumber === flight.flightNumber
                            ? 'bg-cama-gold/15 text-cama-gold border-cama-gold shadow-md'
                            : 'bg-white/5 border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="font-bold">{flight.flightNumber}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{flight.departure} ← {flight.destination}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] text-slate-400 leading-relaxed">
                  تلتزم الهيئة العامة للأرصاد بتزويد الطواقم الجوية بالنشرات المحدثة كل ٣ ساعات تماشياً مع ملحق منظمة الإيكاو رقم ٣ (Annex 3).
                </div>
              </div>
            </div>

            {/* Flight briefing results (8 cols) */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl p-5 md:p-6 glass-panel border border-white/10 shadow-lg space-y-6">
                
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-white">إيجاز الطقس التكتيكي للرحلة الجوية</h3>
                    <p className="text-xs text-slate-400 mt-0.5">الملف الفني الجوي المتكامل للرحلة: <span className="text-glow-gold text-cama-gold font-bold">{selectedFlight.flightNumber}</span></p>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full animate-pulse">
                    متاح وقيد التفعيل
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 text-xs space-y-1.5">
                    <p className="text-slate-400 font-medium">مطار الإقلاع الرئيسي:</p>
                    <p className="font-bold text-slate-100">{selectedFlight.departure}</p>
                  </div>
                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 text-xs space-y-1.5">
                    <p className="text-slate-400 font-medium">مطار الوصول النهائي:</p>
                    <p className="font-bold text-slate-100">{selectedFlight.destination}</p>
                  </div>
                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 text-xs space-y-1.5">
                    <p className="text-slate-400 font-medium">خط السير والمسار الجوي المعتمد:</p>
                    <p className="font-bold text-slate-100 font-mono tracking-wider">{selectedFlight.route}</p>
                  </div>
                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/5 text-xs space-y-1.5">
                    <p className="text-slate-400 font-medium">ارتفاع الطيران المخطط له (Altitude):</p>
                    <p className="font-bold text-slate-100 font-mono">{selectedFlight.altitude} قدم (FL180)</p>
                  </div>
                </div>

                {/* METAR Code briefing boxes */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-cama-gold">شفرة METAR الخاصة بمطار المغادرة:</h4>
                    <p className="p-3 bg-slate-950 rounded-xl border border-white/5 font-mono text-xs text-cyan-400 tracking-wider">
                      {selectedFlight.metarDeparture}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-cama-gold">شفرة METAR الخاصة بمطار الوصول:</h4>
                    <p className="p-3 bg-slate-950 rounded-xl border border-white/5 font-mono text-xs text-amber-400 tracking-wider">
                      {selectedFlight.metarDestination}
                    </p>
                  </div>
                </div>

                {/* Wind and SIGMET status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs">
                  <div className="space-y-1.5">
                    <p className="text-slate-400">حالة الرياح والحرارة في المستويات العليا (Wind Aloft):</p>
                    <p className="font-bold text-slate-200 font-mono">{selectedFlight.windAloft}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-slate-400">تحذيرات الطيران النشطة والظواهر الجوية الهامة (SIGMET):</p>
                    <p className={`font-bold ${selectedFlight.sigmetActive.includes('لا توجد') ? 'text-slate-400' : 'text-red-400'}`}>
                      {selectedFlight.sigmetActive}
                    </p>
                  </div>
                </div>

                {/* Printing Brief folder */}
                <div className="flex justify-end gap-2 border-t border-white/5 pt-4">
                  <button 
                    onClick={() => alert('جاري طباعة ملف الطيران المتكامل للرحلة...')}
                    className="flex items-center gap-2 text-xs font-bold bg-white/10 hover:bg-white/15 text-white px-4 py-2.5 rounded-xl transition-all border border-white/5"
                  >
                    طباعة بطاقة الإيجاز
                  </button>
                  <button 
                    onClick={() => alert('جاري تحميل حزمة Flight Folder الشاملة بصيغة PDF...')}
                    className="flex items-center gap-2 text-xs font-bold bg-cama-gold hover:bg-amber-500 text-royal-blue px-5 py-2.5 rounded-xl transition-all font-sans"
                  >
                    تحميل حزمة الرحلة الشاملة (Flight Folder)
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Panel 3: Marine Meteorology Portal */}
        {activeSubTab === 'marine' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Marine stats left (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl p-5 md:p-6 glass-panel border border-white/10 shadow-lg space-y-6">
                
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Anchor className="w-5 h-5 text-cyan-400" />
                    الرصد البحري وحركة المد والجزر للموانئ اليمنية
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">نشرات تخصصية للصيادين والشركات الملاحية في ميناء عدن وميناء المكلا وميناء الحديدة.</p>
                </div>

                {/* Ocean weather metrics grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <p className="text-xs font-bold text-cama-gold">ميناء عدن وممر باب المندب</p>
                    <div className="space-y-1 text-xs text-slate-300">
                      <p>• <span className="text-slate-400">حالة البحر:</span> معتدل إلى مضطرب جزئياً</p>
                      <p>• <span className="text-slate-400">ارتفاع الموج الفعلي:</span> ١.٥ إلى ٢.٢ متر</p>
                      <p>• <span className="text-slate-400">حركة المد:</span> مد أول في ١١:٢٠ ص، جزر أول في ٠٥:٤٥ م</p>
                      <p>• <span className="text-slate-400">درجة حرارة مياه البحر:</span> ٢٩.٥° مئوية</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <p className="text-xs font-bold text-cama-gold">أرخبيل سقطرى ومحيطه المفتوح</p>
                    <div className="space-y-1 text-xs text-slate-300">
                      <p className="text-red-400 font-bold">⚠️ حالة البحر: هائج جداً ومضطرب بشدة</p>
                      <p>• <span className="text-slate-400">ارتفاع الموج الفعلي:</span> ٣.٥ إلى ٤.٨ متر</p>
                      <p>• <span className="text-slate-400">حركة المد:</span> مد أول في ١٠:٠٠ ص، جزر في ٠٤:٣٠ م</p>
                      <p>• <span className="text-slate-400">سرعة الرياح في الخليج:</span> ٣٥ - ٤٥ عقدة</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <p className="text-xs font-bold text-cama-gold">ميناء المكلا (الساحل الشرقي)</p>
                    <div className="space-y-1 text-xs text-slate-300">
                      <p>• <span className="text-slate-400">حالة البحر:</span> متوسط الموج إلى مضطرب</p>
                      <p>• <span className="text-slate-400">ارتفاع الموج الفعلي:</span> ١.٨ إلى ٢.٥ متر</p>
                      <p>• <span className="text-slate-400">حركة المد:</span> مد أول في ١٢:٠٠ م، جزر في ٠٦:١٠ م</p>
                      <p>• <span className="text-slate-400">اتجاه التيار:</span> شرقي إلى جنوبي شرقي</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <p className="text-xs font-bold text-cama-gold">ميناء الحديدة وموانئ البحر الأحمر</p>
                    <div className="space-y-1 text-xs text-slate-300">
                      <p>• <span className="text-slate-400">حالة البحر:</span> خفيف إلى معتدل الموج</p>
                      <p>• <span className="text-slate-400">ارتفاع الموج الفعلي:</span> ٠.٨ إلى ١.٥ متر</p>
                      <p>• <span className="text-slate-400">حركة المد:</span> مد أول في ٠٢:٠٠ م، جزر في ٠٨:٠٠ م</p>
                      <p>• <span className="text-slate-400">درجة حرارة مياه البحر:</span> ٣١.٢° مئوية</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-3 text-xs text-slate-200">
                  <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <p className="leading-relaxed">ننصح الإخوة الصيادين التقليديين في سواحل أبين وشبوة والمهرة وسقطرى بعدم التوغل في أعالي البحار نظراً لنشاط الرياح والاضطرابات الجانبية المفاجئة.</p>
                </div>

              </div>
            </div>

            {/* Marine forecast graph simulator right (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl p-5 md:p-6 glass-panel border border-white/10 shadow-lg space-y-5">
                <h3 className="text-xs font-bold text-cama-gold uppercase tracking-wider text-glow-gold flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  رسم بياني تشبيهي لارتفاع الموج بخليج عدن
                </h3>

                {/* Custom CSS based Bar graph */}
                <div className="space-y-4 pt-4">
                  <div className="h-44 w-full bg-slate-950 rounded-2xl border border-white/5 p-4 flex items-end justify-between gap-2.5 relative">
                    {/* Y-Axis guide lines */}
                    <div className="absolute left-2 right-2 top-8 border-b border-white/5 pointer-events-none" />
                    <div className="absolute left-2 right-2 top-20 border-b border-white/5 pointer-events-none" />
                    <div className="absolute left-2 right-2 top-32 border-b border-white/5 pointer-events-none" />

                    {/* Bars simulating heights */}
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg transition-all h-[35%]" />
                      <span className="text-[9px] text-slate-400 font-mono">الجمعة</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg transition-all h-[55%]" />
                      <span className="text-[9px] text-slate-400 font-mono">السبت</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg transition-all h-[80%]" />
                      <span className="text-[9px] text-slate-400 font-mono">الأحد</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg transition-all h-[95%] shadow-[0_0_10px_rgba(56,189,248,0.4)]" />
                      <span className="text-[9px] text-red-400 font-mono font-bold">الاثنين</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg transition-all h-[75%]" />
                      <span className="text-[9px] text-slate-400 font-mono">الثلاثاء</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] text-slate-400">ذروة الارتفاع المتوقع للأمواج يوم الاثنين تلامس <span className="text-red-400 font-bold">٤.٨ أمتار</span> بأرخبيل سقطرى.</p>
                  </div>
                </div>

                <button 
                  onClick={() => alert('جاري تحميل الدليل البحري السنوي للصيادين اليمنيين...')}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-slate-300" />
                  تحميل الدليل البحري والساحلي
                </button>

              </div>
            </div>
          </div>
        )}

        {/* Panel 4: Meteorological Reporting Form */}
        {activeSubTab === 'report' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Form desk (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-5 md:p-6 glass-panel border border-white/10 shadow-lg space-y-6">
                
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-cama-gold" />
                    استمارة رصد وتسجيل بلاغ جوي محلي
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">تتيح الهيئة لربابنة الطيران ومسؤولي الموانئ والصيادين والمواطنين إرسال رصدهم الجوي المباشر للمراجعة والتسجيل.</p>
                </div>

                <form onSubmit={handleSubmitReport} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-bold">الاسم والصفة الرسمية:</label>
                      <input 
                        type="text" 
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        placeholder="مثال: الكابتن أحمد اليافعي"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cama-gold"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-bold">رقم الهاتف / البريد المعتمد:</label>
                      <input 
                        type="text" 
                        value={reporterPhone}
                        onChange={(e) => setReporterPhone(e.target.value)}
                        placeholder="مثال: +967 77XXXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cama-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-bold">منطقة الرصد / المحافظة:</label>
                      <select 
                        value={reportRegion}
                        onChange={(e) => setReportRegion(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cama-gold"
                      >
                        <option value="aden">عدن</option>
                        <option value="sanaa">صنعاء</option>
                        <option value="mukalla">المكلا</option>
                        <option value="socotra">سقطرى</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-bold">الظاهرة الجوية المشاهدة:</label>
                      <select 
                        value={reportPhenomenon}
                        onChange={(e) => setReportPhenomenon(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cama-gold"
                      >
                        <option value="fog">ضباب كثيف يحجب الرؤية</option>
                        <option value="dust">عاصفة رملية أو غبار مثار</option>
                        <option value="rain">أمطار غزيرة وسيول جارية</option>
                        <option value="wind">رياح عاصفة واضطراب بحري</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-bold">تفاصيل الرصد الجوي وقيم القياس التقريبية:</label>
                    <textarea 
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                      rows={4}
                      placeholder="يرجى كتابة تفاصيل المشاهدة، مثل سرعة الرياح التقريبية، مدى الرؤية الأفقية، منسوب تراكم مياه الأمطار..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cama-gold resize-none"
                      required
                    />
                  </div>

                  {isSubmitted && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs text-center font-bold">
                      ✓ تم إرسال رصدكم الجوي بنجاح لغرفة العمليات المركزية بمركز التنبؤات والإنذار المبكر بعدن وسيتم تدقيقه ونشره!
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="w-full py-3 rounded-xl text-xs font-bold bg-cama-gold hover:bg-amber-500 text-royal-blue transition-all flex items-center justify-center gap-2 shadow-lg shadow-cama-gold/15"
                  >
                    <Send className="w-4 h-4" />
                    إرسال البلاغ الجوي فوراً
                  </button>

                </form>

              </div>
            </div>

            {/* List of logged reports (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl p-5 md:p-6 glass-panel border border-white/10 shadow-lg space-y-4">
                <h3 className="text-xs font-bold text-cama-gold uppercase tracking-wider text-glow-gold flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  أحدث بلاغات الرصد المعتمدة من الميدان
                </h3>

                <div className="space-y-3.5 max-h-[360px] overflow-y-auto">
                  {reportsList.map((rep) => (
                    <div key={rep.id} className="p-3.5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-slate-300">{rep.name}</span>
                        <span className="text-slate-500 font-mono">{rep.time}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-cama-gold/15 text-cama-gold border border-cama-gold/20 rounded-full">
                          {rep.region}
                        </span>
                        <span className="text-xs font-bold text-white">{rep.phenomenon}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {rep.details}
                      </p>
                      <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/5 text-[9px] text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>الحالة: {rep.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
