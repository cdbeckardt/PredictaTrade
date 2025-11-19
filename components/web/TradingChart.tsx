import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const generateMockData = (count: number): Candle[] => {
  const data: Candle[] = [];
  let basePrice = 42000;
  const startTime = Date.now() - count * 5 * 60 * 1000;
  
  for (let i = 0; i < count; i++) {
    const time = new Date(startTime + i * 5 * 60 * 1000);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    
    const change = (Math.random() - 0.5) * 400;
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.random() * 200;
    const low = Math.min(open, close) - Math.random() * 200;
    
    data.push({
      time: `${hours}:${minutes}`,
      open,
      high,
      low,
      close,
      volume: Math.random() * 100 + 50,
    });
    
    basePrice = close;
  }
  
  return data;
};

export function TradingChart() {
  const [data, setData] = useState<Candle[]>(() => generateMockData(50));
  const [timeframe, setTimeframe] = useState("5m");
  
  const minPrice = Math.min(...data.map(d => d.low));
  const maxPrice = Math.max(...data.map(d => d.high));
  const priceRange = maxPrice - minPrice;
  
  const currentPrice = data[data.length - 1]?.close || 0;
  const previousPrice = data[data.length - 2]?.close || 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);
  
  const getY = (price: number) => {
    return ((maxPrice - price) / priceRange) * 100;
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const lastCandle = prev[prev.length - 1];
        const newClose = lastCandle.close + (Math.random() - 0.5) * 300;
        const newHigh = Math.max(lastCandle.high, newClose);
        const newLow = Math.min(lastCandle.low, newClose);
        
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...lastCandle,
          high: newHigh,
          low: newLow,
          close: newClose,
        };
        return updated;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const timeframes = ["1m", "5m", "15m", "1h", "4h", "1d"];
  
  return (
    <div className="bg-slate-900/50 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden h-full flex flex-col">
      {/* Chart Header */}
      <div className="px-6 py-4 border-b border-slate-800/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-slate-300">BTC/USDT</h3>
              <div className={`flex items-center gap-1 ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                {priceChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm">{priceChangePercent}%</span>
              </div>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className={`text-2xl ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                ${currentPrice.toFixed(2)}
              </span>
              <span className="text-sm text-slate-500">≈ ${currentPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex gap-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  timeframe === tf
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-slate-500">24h High</span>
            <p className="text-slate-300">${maxPrice.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-slate-500">24h Low</span>
            <p className="text-slate-300">${minPrice.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-slate-500">24h Volume</span>
            <p className="text-slate-300">15,234 BTC</p>
          </div>
          <div>
            <span className="text-slate-500">Market Cap</span>
            <p className="text-slate-300">$825.4B</p>
          </div>
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="flex-1 p-6 relative">
        <div className="absolute inset-0 bg-slate-950/30" />
        <svg width="100%" height="100%" className="relative z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="rgb(51, 65, 85)"
              strokeWidth="0.1"
              opacity="0.3"
            />
          ))}
          
          {[0, 20, 40, 60, 80, 100].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="100"
              stroke="rgb(51, 65, 85)"
              strokeWidth="0.1"
              opacity="0.3"
            />
          ))}
          
          {/* Candlesticks */}
          {data.map((candle, i) => {
            const x = (i / (data.length - 1)) * 100;
            const isGreen = candle.close >= candle.open;
            const color = isGreen ? "#10b981" : "#ef4444";
            
            const highY = getY(candle.high);
            const lowY = getY(candle.low);
            const openY = getY(candle.open);
            const closeY = getY(candle.close);
            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.abs(closeY - openY);
            
            return (
              <g key={i}>
                {/* Wick */}
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={lowY}
                  stroke={color}
                  strokeWidth="0.15"
                  opacity="0.8"
                />
                {/* Body */}
                <rect
                  x={x - 0.3}
                  y={bodyTop}
                  width="0.6"
                  height={Math.max(bodyHeight, 0.2)}
                  fill={color}
                  opacity="0.9"
                />
              </g>
            );
          })}
        </svg>
        
        {/* Animated glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
