import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const mockData: Candle[] = [
  { time: "10:00", open: 42000, high: 42500, low: 41800, close: 42300 },
  { time: "10:05", open: 42300, high: 42800, low: 42200, close: 42600 },
  { time: "10:10", open: 42600, high: 42700, low: 42100, close: 42200 },
  { time: "10:15", open: 42200, high: 42900, low: 42150, close: 42800 },
  { time: "10:20", open: 42800, high: 43200, low: 42750, close: 43100 },
  { time: "10:25", open: 43100, high: 43300, low: 42900, close: 43000 },
  { time: "10:30", open: 43000, high: 43100, low: 42600, close: 42700 },
  { time: "10:35", open: 42700, high: 43400, low: 42650, close: 43300 },
  { time: "10:40", open: 43300, high: 43800, low: 43200, close: 43600 },
  { time: "10:45", open: 43600, high: 43700, low: 43300, close: 43400 },
];

export function CandlestickChart() {
  const [data, setData] = useState(mockData);
  
  const minPrice = Math.min(...data.map(d => d.low));
  const maxPrice = Math.max(...data.map(d => d.high));
  const priceRange = maxPrice - minPrice;
  
  const getY = (price: number) => {
    return ((maxPrice - price) / priceRange) * 200;
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const lastCandle = prev[prev.length - 1];
        const newClose = lastCandle.close + (Math.random() - 0.5) * 200;
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
  
  return (
    <div className="bg-slate-900/50 rounded-2xl p-4 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">BTC/USDT</p>
          <p className="text-green-400">${data[data.length - 1].close.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">24h Change</p>
          <p className="text-green-400 text-sm">+2.34%</p>
        </div>
      </div>
      
      <div className="relative h-[240px] bg-slate-950/50 rounded-xl overflow-hidden">
        <svg width="100%" height="240" className="overflow-visible">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 50}
              x2="100%"
              y2={i * 50}
              stroke="rgb(51, 65, 85)"
              strokeWidth="0.5"
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
                <motion.line
                  x1={`${x}%`}
                  y1={highY}
                  x2={`${x}%`}
                  y2={lowY}
                  stroke={color}
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Body */}
                <motion.rect
                  x={`calc(${x}% - 3px)`}
                  y={bodyTop}
                  width="6"
                  height={Math.max(bodyHeight, 1)}
                  fill={color}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: `${x}% ${bodyTop}px` }}
                />
              </g>
            );
          })}
        </svg>
        
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
      </div>
      
      <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
        <span>{data[0].time}</span>
        <span>{data[data.length - 1].time}</span>
      </div>
    </div>
  );
}
