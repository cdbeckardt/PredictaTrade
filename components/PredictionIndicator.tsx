import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "./ui/progress";

export function PredictionIndicator() {
  const [prediction, setPrediction] = useState<{
    direction: "ALTA" | "BAIXA";
    confidence: number;
  }>({ direction: "ALTA", confidence: 72 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newConfidence = Math.floor(Math.random() * 30) + 60; // 60-90%
      const newDirection = Math.random() > 0.5 ? "ALTA" : "BAIXA";
      setPrediction({ direction: newDirection, confidence: newConfidence });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const isUp = prediction.direction === "ALTA";
  const color = isUp ? "green" : "red";
  const Icon = isUp ? TrendingUp : TrendingDown;
  
  return (
    <motion.div
      className={`bg-gradient-to-br ${
        isUp ? "from-green-500/10 to-green-600/5" : "from-red-500/10 to-red-600/5"
      } rounded-2xl p-6 border ${
        isUp ? "border-green-500/30" : "border-red-500/30"
      } shadow-lg ${
        isUp ? "shadow-green-500/20" : "shadow-red-500/20"
      }`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-slate-400 text-sm mb-3">Previsão IA</p>
      
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className={`relative ${isUp ? "text-green-400" : "text-red-400"}`}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className="w-10 h-10" strokeWidth={2.5} />
          <div className={`absolute inset-0 blur-xl ${
            isUp ? "bg-green-400/40" : "bg-red-400/40"
          } animate-pulse`} />
        </motion.div>
        
        <div>
          <motion.p
            className={`${isUp ? "text-green-400" : "text-red-400"}`}
            key={prediction.direction}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            Próxima vela: {prediction.direction}
          </motion.p>
          <motion.p
            className={`text-sm ${isUp ? "text-green-300/70" : "text-red-300/70"}`}
            key={prediction.confidence}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Confiança: {prediction.confidence}%
          </motion.p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Grau de confiança</span>
          <span>{prediction.confidence}%</span>
        </div>
        <div className="relative">
          <Progress 
            value={prediction.confidence} 
            className="h-2 bg-slate-800"
          />
          <motion.div
            className={`absolute top-0 left-0 h-2 rounded-full ${
              isUp ? "bg-green-400" : "bg-red-400"
            } shadow-lg ${
              isUp ? "shadow-green-400/50" : "shadow-red-400/50"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${prediction.confidence}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
