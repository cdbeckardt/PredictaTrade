import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";

interface Prediction {
  id: string;
  date: string;
  time: string;
  pair: string;
  direction: "ALTA" | "BAIXA";
  confidence: number;
  result?: "correct" | "incorrect";
}

const mockHistory: Prediction[] = [
  { id: "1", date: "14 Out", time: "14:30", pair: "BTC/USDT", direction: "ALTA", confidence: 78, result: "correct" },
  { id: "2", date: "14 Out", time: "13:45", pair: "ETH/USDT", direction: "BAIXA", confidence: 65, result: "correct" },
  { id: "3", date: "14 Out", time: "12:20", pair: "BTC/USDT", direction: "ALTA", confidence: 82, result: "incorrect" },
  { id: "4", date: "14 Out", time: "11:10", pair: "BTC/USDT", direction: "BAIXA", confidence: 71, result: "correct" },
  { id: "5", date: "13 Out", time: "16:55", pair: "ETH/USDT", direction: "ALTA", confidence: 88, result: "correct" },
  { id: "6", date: "13 Out", time: "15:30", pair: "BTC/USDT", direction: "BAIXA", confidence: 69, result: "correct" },
  { id: "7", date: "13 Out", time: "14:15", pair: "ETH/USDT", direction: "ALTA", confidence: 75, result: "incorrect" },
  { id: "8", date: "13 Out", time: "12:40", pair: "BTC/USDT", direction: "ALTA", confidence: 80, result: "correct" },
];

export function HistoryScreen() {
  const correctPredictions = mockHistory.filter(p => p.result === "correct").length;
  const accuracy = Math.round((correctPredictions / mockHistory.length) * 100);
  
  return (
    <div className="px-6 pb-24 space-y-6">
      <motion.div
        className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl p-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <Calendar className="w-6 h-6 text-cyan-400" />
            <div className="absolute inset-0 blur-lg bg-cyan-400/30 animate-pulse" />
          </div>
          <h2 className="text-cyan-400">Estatísticas</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-slate-400 text-xs mb-1">Total</p>
            <p className="text-white">{mockHistory.length}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-xs mb-1">Corretas</p>
            <p className="text-green-400">{correctPredictions}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-xs mb-1">Precisão</p>
            <p className="text-cyan-400">{accuracy}%</p>
          </div>
        </div>
      </motion.div>
      
      <div>
        <h3 className="text-slate-400 mb-3">Histórico de Previsões</h3>
        
        <div className="space-y-3">
          {mockHistory.map((prediction, index) => {
            const isUp = prediction.direction === "ALTA";
            const Icon = isUp ? TrendingUp : TrendingDown;
            
            return (
              <motion.div
                key={prediction.id}
                className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 hover:border-cyan-500/30 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon 
                      className={`w-5 h-5 ${isUp ? "text-green-400" : "text-red-400"}`} 
                      strokeWidth={2}
                    />
                    <div>
                      <p className="text-white text-sm">{prediction.pair}</p>
                      <p className="text-slate-500 text-xs">{prediction.date} • {prediction.time}</p>
                    </div>
                  </div>
                  
                  {prediction.result && (
                    <div className={`px-2 py-1 rounded-lg text-xs ${
                      prediction.result === "correct" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {prediction.result === "correct" ? "✓ Acertou" : "✗ Errou"}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`${isUp ? "text-green-400" : "text-red-400"} text-sm`}>
                      {prediction.direction}
                    </span>
                  </div>
                  <span className="text-slate-400 text-sm">{prediction.confidence}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
