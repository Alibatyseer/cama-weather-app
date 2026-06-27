import { WeatherInfo, AlertMessage, Bulletin, FlightBriefing } from '../types';

export const YEMEN_STATIONS: WeatherInfo[] = [
  {
    id: 'aden',
    nameAr: 'عدن (Aden)',
    nameEn: 'Aden International Airport (OYAA)',
    temp: 32,
    conditionAr: 'صحو ومستقر بوجه عام',
    conditionEn: 'Clear and stable weather',
    conditionType: 'sunny',
    humidity: 65,
    windSpeed: 15,
    windDirection: 'جنوبية شرقية (SE)',
    pressure: 1009,
    visibility: 10,
    uvIndex: 11, // Extreme
    flightCategory: 'VFR',
    flightCategoryText: 'ملاحة بصرية متاحة (VFR)',
    dewPoint: 24,
    stationCoordinates: { lat: '12.8294', lng: '45.0289' },
    hourlyForecast: [
      { time: '12:00 م', temp: 32, iconType: 'sunny' },
      { time: '03:00 م', temp: 31, iconType: 'sunny' },
      { time: '06:00 م', temp: 29, iconType: 'cloudy' },
      { time: '09:00 م', temp: 28, iconType: 'cloudy' },
      { time: '12:00 ص', temp: 27, iconType: 'sunny' },
      { time: '03:00 ص', temp: 27, iconType: 'sunny' },
      { time: '06:00 ص', temp: 28, iconType: 'sunny' },
      { time: '09:00 ص', temp: 30, iconType: 'sunny' }
    ],
    dailyForecast: [
      { dayAr: 'الجمعة', conditionAr: 'صحو ومشمس', iconType: 'sunny', tempMax: 33, tempMin: 27 },
      { dayAr: 'السبت', conditionAr: 'غائم جزئياً', iconType: 'cloudy', tempMax: 32, tempMin: 26 },
      { dayAr: 'الأحد', conditionAr: 'صحو حار', iconType: 'sunny', tempMax: 34, tempMin: 28 },
      { dayAr: 'الاثنين', conditionAr: 'رياح نشطة مسببة لارتفاع الموج', iconType: 'windy', tempMax: 32, tempMin: 27 },
      { dayAr: 'الثلاثاء', conditionAr: 'أمطار خفيفة محتملة', iconType: 'rainy', tempMax: 31, tempMin: 26 }
    ]
  },
  {
    id: 'sanaa',
    nameAr: 'صنعاء (Sana\'a)',
    nameEn: 'Sana\'a International Airport (OYSN)',
    temp: 24,
    conditionAr: 'غائم جزئياً مع فرصة أمطار رعدية متفرقة على المرتفعات',
    conditionEn: 'Partly cloudy with chances of thunderstorms on the highlands',
    conditionType: 'cloudy',
    humidity: 35,
    windSpeed: 12,
    windDirection: 'غربية إلى شمالية غربية (W-NW)',
    pressure: 1014,
    visibility: 9,
    uvIndex: 9, // Very High
    flightCategory: 'VFR',
    flightCategoryText: 'ملاحة بصرية متاحة (VFR)',
    dewPoint: 8,
    stationCoordinates: { lat: '15.4789', lng: '44.2197' },
    hourlyForecast: [
      { time: '12:00 م', temp: 24, iconType: 'sunny' },
      { time: '03:00 م', temp: 23, iconType: 'cloudy' },
      { time: '06:00 م', temp: 20, iconType: 'rainy' },
      { time: '09:00 م', temp: 18, iconType: 'rainy' },
      { time: '12:00 ص', temp: 16, iconType: 'cloudy' },
      { time: '03:00 ص', temp: 14, iconType: 'sunny' },
      { time: '06:00 ص', temp: 15, iconType: 'sunny' },
      { time: '09:00 ص', temp: 21, iconType: 'sunny' }
    ],
    dailyForecast: [
      { dayAr: 'الجمعة', conditionAr: 'غائم جزئياً ممطر', iconType: 'rainy', tempMax: 24, tempMin: 14 },
      { dayAr: 'السبت', conditionAr: 'أمطار رعدية متفرقة', iconType: 'stormy', tempMax: 23, tempMin: 13 },
      { dayAr: 'الأحد', conditionAr: 'غائم جزئياً', iconType: 'cloudy', tempMax: 25, tempMin: 14 },
      { dayAr: 'الاثنين', conditionAr: 'صحو معتدل', iconType: 'sunny', tempMax: 26, tempMin: 15 },
      { dayAr: 'الثلاثاء', conditionAr: 'صحو جاف بارد نسبياً ليلاً', iconType: 'sunny', tempMax: 25, tempMin: 12 }
    ]
  },
  {
    id: 'socotra',
    nameAr: 'سقطرى (Socotra)',
    nameEn: 'Socotra Airport (OYSQ)',
    temp: 29,
    conditionAr: 'رياح موسمية عاتية واضطراب شديد في البحر',
    conditionEn: 'Severe monsoon winds and very rough seas',
    conditionType: 'windy',
    humidity: 78,
    windSpeed: 45, // Monsoon winds!
    windDirection: 'جنوبية غربية نشطة جداً (SW)',
    pressure: 1005,
    visibility: 6, // Reduced due to sea spray / dust
    flightCategory: 'MVFR',
    flightCategoryText: 'ملاحة بصرية مقيدة نسبياً (MVFR)',
    dewPoint: 25,
    uvIndex: 10,
    stationCoordinates: { lat: '12.6311', lng: '53.9011' },
    hourlyForecast: [
      { time: '12:00 م', temp: 29, iconType: 'windy' },
      { time: '03:00 م', temp: 29, iconType: 'windy' },
      { time: '06:00 م', temp: 28, iconType: 'windy' },
      { time: '09:00 م', temp: 27, iconType: 'cloudy' },
      { time: '12:00 ص', temp: 27, iconType: 'cloudy' },
      { time: '03:00 ص', temp: 26, iconType: 'windy' },
      { time: '06:00 ص', temp: 27, iconType: 'windy' },
      { time: '09:00 ص', temp: 28, iconType: 'windy' }
    ],
    dailyForecast: [
      { dayAr: 'الجمعة', conditionAr: 'رياح عاتية ومضطرب جداً', iconType: 'windy', tempMax: 30, tempMin: 26 },
      { dayAr: 'السبت', conditionAr: 'رياح مستمرة وشديدة', iconType: 'windy', tempMax: 29, tempMin: 25 },
      { dayAr: 'الأحد', conditionAr: 'رياح نشطة مع رذاذ مطري', iconType: 'rainy', tempMax: 28, tempMin: 25 },
      { dayAr: 'الاثنين', conditionAr: 'رياح عاصفة', iconType: 'windy', tempMax: 29, tempMin: 26 },
      { dayAr: 'الثلاثاء', conditionAr: 'رياح موسمية عاتية', iconType: 'windy', tempMax: 30, tempMin: 26 }
    ]
  },
  {
    id: 'mukalla',
    nameAr: 'المكلا / الريان (Mukalla)',
    nameEn: 'Riyan Mukalla International Airport (OYRN)',
    temp: 31,
    conditionAr: 'صحو ومشمس بوجه عام مع رطوبة عالية',
    conditionEn: 'Clear and sunny with high humidity',
    conditionType: 'sunny',
    humidity: 72,
    windSpeed: 18,
    windDirection: 'جنوبية شرقية (SE)',
    pressure: 1008,
    visibility: 10,
    uvIndex: 11,
    flightCategory: 'VFR',
    flightCategoryText: 'ملاحة بصرية متاحة (VFR)',
    dewPoint: 25,
    stationCoordinates: { lat: '14.6644', lng: '49.3736' },
    hourlyForecast: [
      { time: '12:00 م', temp: 31, iconType: 'sunny' },
      { time: '03:00 م', temp: 31, iconType: 'sunny' },
      { time: '06:00 م', temp: 29, iconType: 'sunny' },
      { time: '09:00 م', temp: 28, iconType: 'cloudy' },
      { time: '12:00 ص', temp: 27, iconType: 'cloudy' },
      { time: '03:00 ص', temp: 26, iconType: 'sunny' },
      { time: '06:00 ص', temp: 27, iconType: 'sunny' },
      { time: '09:00 ص', temp: 29, iconType: 'sunny' }
    ],
    dailyForecast: [
      { dayAr: 'الجمعة', conditionAr: 'حار ورطب جداً', iconType: 'sunny', tempMax: 32, tempMin: 26 },
      { dayAr: 'السبت', conditionAr: 'غائم جزئياً صباحاً', iconType: 'cloudy', tempMax: 31, tempMin: 25 },
      { dayAr: 'الأحد', conditionAr: 'رياح بحرية معتدلة', iconType: 'windy', tempMax: 31, tempMin: 26 },
      { dayAr: 'الاثنين', conditionAr: 'صحو بوجه عام', iconType: 'sunny', tempMax: 32, tempMin: 27 },
      { dayAr: 'الثلاثاء', conditionAr: 'أجواء صيفية مستقرة', iconType: 'sunny', tempMax: 33, tempMin: 27 }
    ]
  },
  {
    id: 'taiz',
    nameAr: 'تعز (Taiz)',
    nameEn: 'Taiz Airport (OYTZ)',
    temp: 26,
    conditionAr: 'غائم جزئياً مع ضباب خفيف وتشكل سحب ركامية ممطرة',
    conditionEn: 'Partly cloudy with light fog and rain-bearing clouds',
    conditionType: 'cloudy',
    humidity: 50,
    windSpeed: 10,
    windDirection: 'جنوبية غربية (SW)',
    pressure: 1012,
    visibility: 7, // Reduced due to fog/mist on slopes
    flightCategory: 'VFR',
    flightCategoryText: 'ملاحة بصرية متاحة (VFR)',
    dewPoint: 15,
    uvIndex: 8,
    stationCoordinates: { lat: '13.6858', lng: '44.1381' },
    hourlyForecast: [
      { time: '12:00 م', temp: 26, iconType: 'sunny' },
      { time: '03:00 م', temp: 25, iconType: 'cloudy' },
      { time: '06:00 م', temp: 22, iconType: 'rainy' },
      { time: '09:00 م', temp: 20, iconType: 'cloudy' },
      { time: '12:00 ص', temp: 19, iconType: 'cloudy' },
      { time: '03:00 ص', temp: 18, iconType: 'cloudy' },
      { time: '06:00 ص', temp: 18, iconType: 'cloudy' },
      { time: '09:00 ص', temp: 23, iconType: 'sunny' }
    ],
    dailyForecast: [
      { dayAr: 'الجمعة', conditionAr: 'أمطار متفرقة بعد الظهر', iconType: 'rainy', tempMax: 27, tempMin: 18 },
      { dayAr: 'السبت', conditionAr: 'سحب رعدية ممطرة', iconType: 'stormy', tempMax: 26, tempMin: 17 },
      { dayAr: 'الأحد', conditionAr: 'غائم جزئياً معتدل', iconType: 'cloudy', tempMax: 27, tempMin: 18 },
      { dayAr: 'الاثنين', conditionAr: 'أجواء لطيفة نهاراً', iconType: 'sunny', tempMax: 28, tempMin: 19 },
      { dayAr: 'الثلاثاء', conditionAr: 'غائم جزئياً ضبابي صباحاً', iconType: 'cloudy', tempMax: 27, tempMin: 17 }
    ]
  },
  {
    id: 'hodeidah',
    nameAr: 'الحديدة (Hodeidah)',
    nameEn: 'Hodeidah Airport (OYHD)',
    temp: 35,
    conditionAr: 'شديد الحرارة ورطب جداً مع رياح نشطة مثيرة للأتربة',
    conditionEn: 'Very hot and humid with active dust-raising winds',
    conditionType: 'dusty',
    humidity: 80,
    windSpeed: 25,
    windDirection: 'غربية إلى شمالية غربية (W-NW)',
    pressure: 1006,
    visibility: 5, // Dust reduced visibility
    flightCategory: 'MVFR',
    flightCategoryText: 'ملاحة بصرية مقيدة (MVFR)',
    dewPoint: 28,
    uvIndex: 11,
    stationCoordinates: { lat: '14.7578', lng: '42.9772' },
    hourlyForecast: [
      { time: '12:00 م', temp: 35, iconType: 'dusty' },
      { time: '03:00 م', temp: 34, iconType: 'dusty' },
      { time: '06:00 م', temp: 32, iconType: 'sunny' },
      { time: '09:00 م', temp: 31, iconType: 'cloudy' },
      { time: '12:00 ص', temp: 30, iconType: 'cloudy' },
      { time: '03:00 ص', temp: 29, iconType: 'sunny' },
      { time: '06:00 ص', temp: 30, iconType: 'sunny' },
      { time: '09:00 ص', temp: 33, iconType: 'sunny' }
    ],
    dailyForecast: [
      { dayAr: 'الجمعة', conditionAr: 'أجواء مغبرة وشديدة الحرارة', iconType: 'dusty', tempMax: 36, tempMin: 29 },
      { dayAr: 'السبت', conditionAr: 'حار ورطب للغاية', iconType: 'sunny', tempMax: 35, tempMin: 29 },
      { dayAr: 'الأحد', conditionAr: 'رياح نشطة مسببة لارتفاع الموج', iconType: 'windy', tempMax: 34, tempMin: 28 },
      { dayAr: 'الاثنين', conditionAr: 'شديد الحرارة مع رطوبة خانقة', iconType: 'sunny', tempMax: 36, tempMin: 30 },
      { dayAr: 'الثلاثاء', conditionAr: 'غبار خفيف مثار', iconType: 'dusty', tempMax: 35, tempMin: 29 }
    ]
  },
  {
    id: 'seiyun',
    nameAr: 'سيئون (Seiyun)',
    nameEn: 'Seiyun Airport (OYSN_)',
    temp: 33,
    conditionAr: 'صحو شديد الحرارة وجاف بوجه عام',
    conditionEn: 'Clear, very hot and dry in inland valleys',
    conditionType: 'sunny',
    humidity: 22,
    windSpeed: 14,
    windDirection: 'شمالية شرقية (NE)',
    pressure: 1010,
    visibility: 10,
    uvIndex: 11,
    flightCategory: 'VFR',
    flightCategoryText: 'ملاحة بصرية ممتازة (VFR)',
    dewPoint: 10,
    stationCoordinates: { lat: '15.9653', lng: '48.7881' },
    hourlyForecast: [
      { time: '12:00 م', temp: 33, iconType: 'sunny' },
      { time: '03:00 م', temp: 34, iconType: 'sunny' },
      { time: '06:00 م', temp: 31, iconType: 'sunny' },
      { time: '09:00 م', temp: 28, iconType: 'sunny' },
      { time: '12:00 ص', temp: 25, iconType: 'sunny' },
      { time: '03:00 ص', temp: 23, iconType: 'sunny' },
      { time: '06:00 ص', temp: 24, iconType: 'sunny' },
      { time: '09:00 ص', temp: 29, iconType: 'sunny' }
    ],
    dailyForecast: [
      { dayAr: 'الجمعة', conditionAr: 'صحو شديد الحرارة', iconType: 'sunny', tempMax: 35, tempMin: 22 },
      { dayAr: 'السبت', conditionAr: 'صحو جاف تماماً', iconType: 'sunny', tempMax: 34, tempMin: 21 },
      { dayAr: 'الأحد', conditionAr: 'رياح جافة نشطة نهاراً', iconType: 'windy', tempMax: 34, tempMin: 22 },
      { dayAr: 'الاثنين', conditionAr: 'صحو صيفي', iconType: 'sunny', tempMax: 35, tempMin: 23 },
      { dayAr: 'الثلاثاء', conditionAr: 'طقس شديد الجفاف حار', iconType: 'sunny', tempMax: 36, tempMin: 24 }
    ]
  },
  {
    id: 'alghaydah',
    nameAr: 'الغيضة (Al Ghaydah)',
    nameEn: 'Al Ghaydah Airport (OYGD)',
    temp: 30,
    conditionAr: 'غائم جزئياً مع نسيم بحر رطب',
    conditionEn: 'Partly cloudy with humid sea breeze',
    conditionType: 'cloudy',
    humidity: 70,
    windSpeed: 20,
    windDirection: 'جنوبية شرقية (SE)',
    pressure: 1007,
    visibility: 9,
    uvIndex: 10,
    flightCategory: 'VFR',
    flightCategoryText: 'ملاحة بصرية متاحة (VFR)',
    dewPoint: 24,
    stationCoordinates: { lat: '16.2003', lng: '52.1764' },
    hourlyForecast: [
      { time: '12:00 م', temp: 30, iconType: 'cloudy' },
      { time: '03:00 م', temp: 30, iconType: 'cloudy' },
      { time: '06:00 م', temp: 28, iconType: 'sunny' },
      { time: '09:00 م', temp: 27, iconType: 'sunny' },
      { time: '12:00 ص', temp: 26, iconType: 'sunny' },
      { time: '03:00 ص', temp: 25, iconType: 'cloudy' },
      { time: '06:00 ص', temp: 26, iconType: 'cloudy' },
      { time: '09:00 ص', temp: 28, iconType: 'cloudy' }
    ],
    dailyForecast: [
      { dayAr: 'الجمعة', conditionAr: 'غائم جزئياً رطب', iconType: 'cloudy', tempMax: 31, tempMin: 25 },
      { dayAr: 'السبت', conditionAr: 'أجواء صيفية رطبة', iconType: 'sunny', tempMax: 30, tempMin: 24 },
      { dayAr: 'الأحد', conditionAr: 'رذاذ محتمل صباحاً', iconType: 'rainy', tempMax: 29, tempMin: 24 },
      { dayAr: 'الاثنين', conditionAr: 'رياح معتدلة السرعة', iconType: 'windy', tempMax: 31, tempMin: 25 },
      { dayAr: 'الثلاثاء', conditionAr: 'صحو بوجه عام', iconType: 'sunny', tempMax: 31, tempMin: 26 }
    ]
  }
];

export const CAMA_ALERTS: AlertMessage[] = [
  {
    id: 'alert-marine',
    title: 'تحذير بحري: اضطراب البحر في خليج عدن وأرخبيل سقطرى',
    text: 'تهيب الهيئة العامة للأرصاد بجميع الصيادين وربابنة السفن في خليج عدن ومحيط أرخبيل سقطرى أخذ الحيطة الحذر الشديدين نظراً لنشاط الرياح الموسمية العاتية التي تتراوح سرعتها ما بين 35 إلى 50 عقدة، مما يؤدي إلى اضطراب شديد في البحر وارتفاع الأمواج إلى ما يقارب 4.5 أمتار. يرجى تجنب الإبحار تماماً خلال الساعات الـ 48 القادمة.',
    severity: 'danger',
    timestamp: 'اليوم، 10:30 ص',
    targetRegions: ['خليج عدن', 'أرخبيل سقطرى', 'السواحل الشرقية']
  },
  {
    id: 'alert-highlands',
    title: 'تنبيه مبكر: هطول أمطار رعدية غزيرة على المرتفعات الجبلية',
    text: 'تتوقع المحطات الرصدية هطول أمطار رعدية شديدة الغزارة يرافقها رياح هابطة قوية على أجزاء من الهضاب الداخلية والمرتفعات الغربية والوسطى (صنعاء، ذمار، إب، تعز، صعدة). وتحذر الهيئة المواطنين من التواجد في ممرات السيول وبطون الأودية وعدم استخدام الهواتف المحمولة أثناء البرق.',
    severity: 'warning',
    timestamp: 'اليوم، 01:15 م',
    targetRegions: ['صنعاء', 'تعز', 'ذمار', 'إب', 'صعدة']
  },
  {
    id: 'alert-dust',
    title: 'إشعار طيران وملاحة: أتربة وغبار يعيق الرؤية الأفقية',
    text: 'تنبيه لكافة قادة المركبات والرحلات الجوية المدنية في المحافظات الصحراوية (مأرب، الجوف، شبوة، صحراء حضرموت)، حيث تشهد هذه المناطق نشاطاً للرياح السطحية المثيرة للأتربة والغبار الكثيف، مما يسبب تدنياً كبيراً في الرؤية الأفقية إلى أقل من 2500 متر. يرجى اتباع تعليمات السلامة الجوية والبرية.',
    severity: 'info',
    timestamp: 'اليوم، 08:00 ص',
    targetRegions: ['مأرب', 'شبوة', 'حضرموت', 'الجوف']
  }
];

export const CAMA_BULLETINS: Bulletin[] = [
  {
    id: 'b-daily',
    title: 'النشرات اليومية',
    date: '٢٧ يونيو ٢٠٢٦',
    type: 'daily',
    summary: 'التقرير المتكامل لحالة الطقس السطحية، وحركة الرياح في الموانئ والمطارات اليمنية للـ 24 ساعة القادمة.',
    contentAr: 'تشهد البلاد حالة من الاستقرار النسبي في المناطق الساحلية مع رطوبة عالية، بينما تنشط السحب الركامية الرعدية الممطرة على المرتفعات الغربية والجنوبية الغربية في فترتي الظهيرة والمساء. الرياح شديدة جداً في أرخبيل سقطرى وخليج عدن.',
    sections: [
      {
        header: 'الملخص الجوي العام',
        text: 'امتداد منخفض الهند الموسمي يؤثر بشكل مباشر على السواحل والصحاري الشرقية برياح نشطة، بينما تتأثر المرتفعات بحالة من عدم الاستقرار الجوي نتيجة تدفق الكتل الهوائية الرطبة من بحر العرب.'
      },
      {
        header: 'أرصاد قطاع الطيران والملاحة الجوية',
        text: 'تعتبر كافة المطارات الرئيسية (عدن، صنعاء، الريان، سيئون) في حالة تشغيلية ممتازة مع ملاحة بصرية متاحة (VFR)، باستثناء مطار الحديدة الذي يشهد رياحاً سطحية نشطة مغبرة تقلل مدى الرؤية مؤقتاً لـ 5 كم. لا توجد ظواهر جوية خطرة تعيق الملاحة فوق الأجواء اليمنية للمستويات العالية.'
      },
      {
        header: 'نشرة الموانئ والصيد البحري',
        text: 'البحر مضطرب جداً إلى هائج في خليج عدن وسقطرى مع ارتفاع موج يصل إلى 4.5 أمتار. الرياح جنوبية غربية نشطة سرعتها 25-45 عقدة. البحر خفيف إلى متوسط الموج في البحر الأحمر مع ارتفاع موج يتراوح بين 1.0 إلى 1.8 متر.'
      }
    ]
  },
  {
    id: 'b-early',
    title: 'التحذيرات المبكرة',
    date: '٢٧ يونيو ٢٠٢٦',
    type: 'early',
    summary: 'إشعارات وتحذيرات مسبقة للمواطنين والجهات الأمنية والملاحية من تشكل العواصف الترابية، أو المنخفضات المدارية، أو مخاطر السيول الجارفة.',
    contentAr: 'تحذيرات جوية عاجلة وخرائط تصنيف المخاطر لمواجهة تداعيات الرياح الهابطة القوية المصاحبة للسحب الرعدية والسيول المفاجئة في المحافظات الوسطى والغربية.',
    sections: [
      {
        header: 'إنذار مبكر: نشاط سحب رعدية غزيرة جداً',
        text: 'تشير صور الأقمار الاصطناعية وخرائط الطقس إلى تشكل خلايا رعدية عميقة ذات تغذية رطبة قوية على سلسة المرتفعات الجبلية المحاذية لسهل تهامة. يتوقع هطول أمطار تتجاوز 40 ملم في الساعة مع تساقط حبات البرد وجريان السيول بطريقة جارفة ومفاجئة.'
      },
      {
        header: 'توجيهات الدفاع المدني والبلديات',
        text: 'تهيب الهيئة بالدفاع المدني اليمني برفع حالة التأهب لإنقاذ المواطنين العالقين في بطون الأودية وتطهير قنوات تصريف المياه في المدن الجبلية (تعز، إب، حجة).'
      },
      {
        header: 'تحذير الملاحة البحرية الدولية',
        text: 'تراقب الهيئة العامة للأرصاد حركة السحب والرياح المدارية في البحر العربي. ننصح السفن التجارية المتجهة عبر باب المندب بتحديث خطط رحلاتها وفق النشرات الصادرة كل 6 ساعات لتلافي اضطراب الموج.'
      }
    ]
  },
  {
    id: 'b-seasonal',
    title: 'النشرات الموسمية',
    date: 'صيف ٢٠٢٦',
    type: 'seasonal',
    summary: 'الدراسات والتقارير المناخية الصيفية الشاملة، وتوقعات سقوط الأمطار لقطاعي الزراعة والري والموارد المائية.',
    contentAr: 'تقرير مناخي إحصائي وتوقعي لموسم الخريف والرياح الموسمية، ومستويات هطول الأمطار التراكمية مقارنة بالسنوات العشر الماضية في السهول والوديان.',
    sections: [
      {
        header: 'توقعات الموسم الصيفي والمطري',
        text: 'تشير مخرجات النماذج المناخية الإقليمية إلى أن معدلات الأمطار الصيفية لهذا العام ستكون حول إلى أعلى من معدلاتها السنوية العامة على المرتفعات الغربية والجنوبية الغربية، مع توقع زيادة نشاط السحب الركامية خلال شهري يوليو وأغسطس.'
      },
      {
        header: 'أثر التغيرات المناخية على المياه الجوفية',
        text: 'تساهم الأمطار الموسمية في رفد الآبار والخوانق المائية الجوفية في أحواض صنعاء وصعدة وتهامة. توصي الهيئة وزارة الزراعة بتنفيذ برامج حصاد مياه الأمطار والسدود التجميعية لدعم المزارعين والحد من الجفاف.'
      },
      {
        header: 'إحصاءات درجات الحرارة القياسية',
        text: 'سجلت محطة رصد الحديدة أعلى درجات حرارة صيفية بـ 42.5°C خلال الأسبوع الماضي، بينما تظل المرتفعات الجبلية معتدلة بمتوسط 25°C، مما يمثل توازناً مناخياً فريداً في شبه الجزيرة العربية.'
      }
    ]
  },
  {
    id: 'b-weekly',
    title: 'النشرات الأسبوعية المشتركة',
    date: '٢٧ يونيو ٢٠٢٦',
    type: 'weekly',
    summary: 'النشرات الأسبوعية الجوية والبحرية المشتركة لكافة السواحل والقطاعات الملاحية اليمنية.',
    contentAr: 'تقرير شامل يصدر أسبوعياً لتحليل الأنماط الجوية وحركة الرياح السطحية والموسمية وتوقعات الأمطار والاضطرابات المدارية في البحر العربي وخليج عدن والبحر الأحمر لتأمين السلامة البحرية والملاحة.',
    sections: [
      {
        header: 'التوقعات الجوية الأسبوعية العامة',
        text: 'يتوقع استمرار تدفق الكتل الهوائية الموسمية الرطبة مع هطول أمطار رعدية متفاوتة الغزارة على المرتفعات الجبلية من صعدة شمالاً وحتى تعز ولحج جنوباً، وامتدادها إلى الهضاب الداخلية في حضرموت وشبوة.'
      },
      {
        header: 'سلامة الصيد والملاحة البحرية',
        text: 'نحذر الصيادين ومرتادي البحر في أرخبيل سقطرى وخليج عدن من اضطراب البحر الشديد حيث يتوقع أن تصل سرعة الرياح الموسمية إلى 50 عقدة مع ارتفاع للموج يتجاوز 5 أمتار خلال الأسبوع الجاري.'
      },
      {
        header: 'توقعات حركة الملاحة الجوية للأسبوع',
        text: 'الأجواء ملائمة للطيران المدني بمختلف المطارات عدا أوقات نشاط الخلايا الرعدية الممطرة محلياً حيث تقل الرؤية لمدد قصيرة. مطار الريان وسقطرى يشهدان رياحاً جانبية نشطة تتطلب انتباه قائدي الطائرات.'
      }
    ]
  }
];

export const FLIGHT_BRIEFINGS: FlightBriefing[] = [
  {
    flightNumber: 'IY 607 (الخطوط الجوية اليمنية)',
    departure: 'مطار عدن الدولي (ADE / OYAA)',
    destination: 'مطار صنعاء الدولي (SNA / OYSN)',
    route: 'OYAA SID G450 OYSN',
    altitude: 18000, // Feet
    metarDeparture: 'OYAA 271800Z 15008KT 9999 FEW022 32/24 Q1009 NOSIG',
    metarDestination: 'OYSN 271800Z 28010KT 9000 SCT025 24/08 Q1014 TEMPO SHRA',
    sigmetActive: 'لا توجد تحذيرات سيجميت نشطة على هذا الخط الملاحي',
    windAloft: 'FL180: 240/15KT TEMP +12C'
  },
  {
    flightNumber: 'IY 822 (الخطوط الجوية اليمنية)',
    departure: 'مطار الريان الدولي (RIY / OYRN)',
    destination: 'مطار عدن الدولي (ADE / OYAA)',
    route: 'OYRN SID V22 OYAA',
    altitude: 16000,
    metarDeparture: 'OYRN 271800Z 13012KT 9999 SKC 31/25 Q1008 NOSIG',
    metarDestination: 'OYAA 271800Z 15008KT 9999 FEW022 32/24 Q1009 NOSIG',
    sigmetActive: 'تحذير اضطرابات جوية خفيفة على السواحل الجنوبية للمستويات المنخفضة',
    windAloft: 'FL160: 180/12KT TEMP +16C'
  }
];
