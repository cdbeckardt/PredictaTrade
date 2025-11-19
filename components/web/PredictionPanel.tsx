import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, TrendingDown, RefreshCw, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

interface Prediction {
  direction: "ALTA" | "BAIXA";
  confidence: number;
  timestamp: string;
}

const mockRecentPredictions: Prediction[] = [
  { direction: "ALTA", confidence: 78, timestamp: "14:30" },
  { direction: "BAIXA", confidence: 65, timestamp: "14:25" },
  { direction: "ALTA", confidence: 82, timestamp: "14:20" },
  { direction: "BAIXA", confidence: 71, timestamp: "14:15" },
];

export function PredictionPanel() {
  const [currentPrediction, setCurrentPrediction] = useState<Prediction>({
    direction: "ALTA",
    confidence: 72,
    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  });
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [recentPredictions, setRecentPredictions] = useState(mockRecentPredictions);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newConfidence = Math.floor(Math.random() * 30) + 60;
      const newDirection = Math.random() > 0.5 ? "ALTA" : "BAIXA";
      const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      
      setCurrentPrediction({ direction: newDirection, confidence: newConfidence, timestamp });
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newConfidence = Math.floor(Math.random() * 30) + 60;
      const newDirection = Math.random() > 0.5 ? "ALTA" : "BAIXA";
      const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      
      setCurrentPrediction({ direction: newDirection, confidence: newConfidence, timestamp });
      setRecentPredictions(prev => [
        { direction: newDirection, confidence: newConfidence, timestamp },
        ...prev.slice(0, 3),
      ]);
      setIsRefreshing(false);
    }, 1000);
  };
  
  const isUp = currentPrediction.direction === "ALTA";
  const Icon = isUp ? TrendingUp : TrendingDown;
  
  return (
    <div className="space-y-6">
      {/* Main Prediction Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPrediction.timestamp}
          className={`bg-gradient-to-br ${
            isUp ? "from-green-500/10 to-green-600/5" : "from-red-500/10 to-red-600/5"
          } rounded-2xl p-6 border ${
            isUp ? "border-green-500/30" : "border-red-500/30"
          } shadow-xl ${
            isUp ? "shadow-green-500/20" : "shadow-red-500/20"
          }`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400">Previsão da Próxima Vela</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className={`relative ${isUp ? "text-green-400" : "text-red-400"}`}
              animate={{ 
                y: [0, -8, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-16 h-16" strokeWidth={2.5} />
              <div className={`absolute inset-0 blur-2xl ${
                isUp ? "bg-green-400/40" : "bg-red-400/40"
              } animate-pulse`} />
            </motion.div>
            
            <div className="flex-1">
              <motion.p
                className={`text-3xl mb-1 ${isUp ? "text-green-400" : "text-red-400"}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                {currentPrediction.direction}
              </motion.p>
              <p className="text-slate-400 text-sm">Atualizado às {currentPrediction.timestamp}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Probabilidade</span>
              <motion.span
                key={currentPrediction.confidence}
                className={`text-2xl ${isUp ? "text-green-400" : "text-red-400"}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {currentPrediction.confidence}%
              </motion.span>
            </div>
            
            <div className="relative h-3 bg-slate-800/50 rounded-full overflow-hidden">
              <motion.div
                className={`absolute top-0 left-0 h-full rounded-full ${
                  isUp ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-gradient-to-r from-red-500 to-red-400"
                } shadow-lg ${
                  isUp ? "shadow-green-400/50" : "shadow-red-400/50"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${currentPrediction.confidence}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>IA analisou 1.247 padrões de mercado</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Recent Predictions */}
      <div className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-500/20">
        <h3 className="text-slate-400 mb-4">Previsões Recentes</h3>
        
        <div className="space-y-3">
          {recentPredictions.map((pred, index) => {
            const isUpPred = pred.direction === "ALTA";
            const IconPred = isUpPred ? TrendingUp : TrendingDown;
            
            return (
              <motion.div
                key={`${pred.timestamp}-${index}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <IconPred 
                    className={`w-5 h-5 ${isUpPred ? "text-green-400" : "text-red-400"}`} 
                    strokeWidth={2}
                  />
                  <div>
                    <p className={`${isUpPred ? "text-green-400" : "text-red-400"}`}>
                      {pred.direction}
                    </p>
                    <p className="text-xs text-slate-500">{pred.timestamp}</p>
                  </div>
                </div>
                <span className="text-slate-400">{pred.confidence}%</span>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Stats Card */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl p-6 border border-cyan-500/30">
        <h3 className="text-cyan-400 mb-4">Estatísticas de Hoje</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm mb-1">Previsões</p>
            <p className="text-2xl text-white">24</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">Precisão</p>
            <p className="text-2xl text-green-400">78%</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">Acertos</p>
            <p className="text-xl text-green-400">19</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">Erros</p>
            <p className="text-xl text-red-400">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
