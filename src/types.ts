export interface WeatherInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  temp: number;
  conditionAr: string;
  conditionEn: string;
  conditionType: 'sunny' | 'cloudy' | 'rainy' | 'dusty' | 'windy' | 'stormy';
  humidity: number;
  windSpeed: number; // in km/h
  windDirection: string; // e.g. "جنوبية شرقية"
  pressure: number; // in hPa
  visibility: number; // in km
  uvIndex: number;
  flightCategory: 'VFR' | 'IFR' | 'MVFR'; // Aviation category
  flightCategoryText: string;
  dewPoint: number; // in °C
  stationCoordinates: { lat: string; lng: string };
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
}

export interface HourlyForecast {
  time: string;
  temp: number;
  iconType: 'sunny' | 'cloudy' | 'rainy' | 'dusty' | 'windy' | 'stormy';
}

export interface DailyForecast {
  dayAr: string;
  conditionAr: string;
  iconType: 'sunny' | 'cloudy' | 'rainy' | 'dusty' | 'windy' | 'stormy';
  tempMax: number;
  tempMin: number;
}

export interface AlertMessage {
  id: string;
  title: string;
  text: string;
  severity: 'danger' | 'warning' | 'info';
  timestamp: string;
  targetRegions: string[];
}

export interface Bulletin {
  id: string;
  title: string;
  date: string;
  type: 'daily' | 'early' | 'seasonal' | 'weekly';
  contentAr: string;
  summary: string;
  sections: { header: string; text: string }[];
}

export interface FlightBriefing {
  flightNumber: string;
  departure: string;
  destination: string;
  route: string;
  altitude: number;
  metarDeparture: string;
  metarDestination: string;
  sigmetActive: string;
  windAloft: string;
}
