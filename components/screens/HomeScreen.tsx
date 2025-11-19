import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { CandlestickChart } from "../CandlestickChart";
import { PredictionIndicator } from "../PredictionIndicator";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

export function HomeScreen() {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  const togglePair = () => {
    setSelectedPair(prev => prev === "BTC/USDT" ? "ETH/USDT" : "BTC/USDT");
  };
  
  return (
    <div className="px-6 pb-24 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CandlestickChart />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <PredictionIndicator />
      </motion.div>
      
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button
          onClick={handleRefresh}
          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-none shadow-lg shadow-cyan-500/30"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Atualizar dados
        </Button>
        
        <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-3 rounded-xl border border-cyan-500/20">
          <span className={`text-sm transition-colors ${selectedPair === "BTC/USDT" ? "text-cyan-400" : "text-slate-500"}`}>
            BTC
          </span>
          <Switch
            checked={selectedPair === "ETH/USDT"}
            onCheckedChange={togglePair}
            className="data-[state=checked]:bg-cyan-500"
          />
          <span className={`text-sm transition-colors ${selectedPair === "ETH/USDT" ? "text-cyan-400" : "text-slate-500"}`}>
            ETH
          </span>
        </div>
      </motion.div>
    </div>
  );
}
