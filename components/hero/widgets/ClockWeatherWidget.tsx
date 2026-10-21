"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Cloud, Sun, CloudRain, CloudLightning, CloudSun } from "lucide-react";

interface DayForecast {
  day: string;
  tempMax: number;
  tempMin: number;
  code: number;
}

interface WeatherData {
  currentTemp: number;
  weatherCode: number;
  daily: DayForecast[];
  timestamp: number;
}

const CACHE_KEY = "jpl_weather_cache";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getWeatherIcon(code: number, size = 16) {
  // Single muted accent tint as specified in Step 2 & 5
  const cls = "text-accent";
  if (code === 0 || code === 1) return <Sun size={size} className={cls} />;
  if (code === 2 || code === 3) return <CloudSun size={size} className={cls} />;
  if (code >= 51 && code <= 67) return <CloudRain size={size} className={cls} />;
  if (code >= 80 && code <= 82) return <CloudRain size={size} className={cls} />;
  if (code >= 95) return <CloudLightning size={size} className={cls} />;
  return <Cloud size={size} className={cls} />;
}

function getWeatherLabel(code: number): string {
  if (code === 0) return "Clear sky";
  if (code === 1 || code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95) return "Thunderstorm";
  return "Cloudy";
}

export default function ClockWeatherWidget() {
  const [time, setTime] = useState<string>("05:30");
  const [period, setPeriod] = useState<string>("PM");
  const [seconds, setSeconds] = useState<string>("00");
  const [dateStr, setDateStr] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Live Kolkata Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const str = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const parts = str.split(" ");
      const timeParts = (parts[0] || "12:00:00").split(":");
      setTime(`${timeParts[0]}:${timeParts[1]}`);
      setSeconds(timeParts[2] || "00");
      setPeriod(parts[1] || "PM");
      setDateStr(
        now.toLocaleDateString("en-US", {
          timeZone: "Asia/Kolkata",
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as WeatherData;
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            setWeather(parsed);
            setWeatherLoading(false);
            return;
          }
        }

        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata"
        );
        const json = await res.json();

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dailyList: DayForecast[] = (json.daily.time as string[]).map((dateVal, idx) => {
          const d = new Date(dateVal);
          return {
            day: days[d.getDay()],
            tempMax: Math.round(json.daily.temperature_2m_max[idx]),
            tempMin: Math.round(json.daily.temperature_2m_min[idx]),
            code: json.daily.weather_code[idx],
          };
        });

        const weatherData: WeatherData = {
          currentTemp: Math.round(json.current.temperature_2m),
          weatherCode: json.current.weather_code,
          daily: dailyList,
          timestamp: Date.now(),
        };

        setWeather(weatherData);
        localStorage.setItem(CACHE_KEY, JSON.stringify(weatherData));
      } catch (err) {
        // Fallback default
        setWeather({
          currentTemp: 31,
          weatherCode: 1,
          daily: [
            { day: "Now", tempMax: 32, tempMin: 26, code: 1 },
            { day: "Thu", tempMax: 31, tempMin: 25, code: 2 },
            { day: "Fri", tempMax: 30, tempMin: 25, code: 3 },
            { day: "Sat", tempMax: 29, tempMin: 24, code: 51 },
            { day: "Sun", tempMax: 31, tempMin: 25, code: 1 },
          ],
          timestamp: Date.now(),
        });
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -60, bottom: 60 }}
      dragElastic={0.15}
      whileHover={{ scale: 1.02, cursor: "grab" }}
      whileDrag={{ scale: 1.04, cursor: "grabbing" }}
      className="glass-heavy rounded-2xl p-2.5 w-[185px] shadow-md select-none border border-border-glass group relative"
      tabIndex={0}
      aria-label="Chennai Time and Weather Widget"
    >
      {/* Header: Location & Date */}
      <div className="flex items-center justify-between text-[10px] text-text-tertiary mb-1 font-mono whitespace-nowrap">
        <span className="flex items-center gap-1 font-semibold uppercase text-text-secondary">
          <MapPin size={10} className="text-accent" />
          CHENNAI
        </span>
        <span className="text-[9px] text-text-tertiary font-mono">
          {dateStr}
        </span>
      </div>

      {/* Clock Line: Compact tabular time, AM/PM, seconds */}
      <div className="flex items-baseline justify-between my-0.5 font-mono tabular-nums whitespace-nowrap">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-text-primary tracking-tight">
            {time}
          </span>
          <span className="text-[10px] font-bold text-accent">
            {period}
          </span>
          <span className="text-[10px] text-text-tertiary font-medium">
            :{seconds}
          </span>
        </div>
        <span className="text-[8px] font-mono text-text-tertiary">
          IST
        </span>
      </div>

      {/* Weather Row: Current Temp, Weather Label, Icon */}
      <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t border-border-glass/60">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-lg font-bold text-text-primary">
              {weatherLoading ? "31" : weather?.currentTemp}°C
            </span>
            <span className="text-[10px] font-medium text-text-secondary">
              {weatherLoading ? "Partly cloudy" : getWeatherLabel(weather?.weatherCode ?? 1)}
            </span>
          </div>
        </div>
        <div className="p-1 rounded-lg bg-surface/50 border border-border-glass">
          {getWeatherIcon(weather?.weatherCode ?? 1, 16)}
        </div>
      </div>

      {/* 5-Day Forecast Row */}
      <div className="grid grid-cols-5 gap-0.5 pt-1.5 mt-1.5 border-t border-border-glass/40 text-center">
        {(weather?.daily.slice(0, 5) ?? [
          { day: "Now", tempMax: 32, tempMin: 26, code: 1 },
          { day: "Thu", tempMax: 31, tempMin: 25, code: 2 },
          { day: "Fri", tempMax: 30, tempMin: 25, code: 3 },
          { day: "Sat", tempMax: 29, tempMin: 24, code: 51 },
          { day: "Sun", tempMax: 31, tempMin: 25, code: 1 },
        ]).map((d, i) => (
          <div key={i} className="flex flex-col items-center py-0.5">
            <span className="text-[8px] font-mono text-text-tertiary">
              {i === 0 ? "Now" : d.day}
            </span>
            <span className="my-0.5">{getWeatherIcon(d.code, 10)}</span>
            <span className="text-[8px] font-mono font-semibold text-text-secondary">
              {d.tempMax}°
            </span>
          </div>
        ))}
      </div>

      <div className="absolute top-1 right-1.5 text-[8px] text-text-tertiary opacity-0 group-hover:opacity-60 transition-opacity">
        drag
      </div>
    </motion.div>
  );
}
