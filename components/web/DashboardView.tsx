import { motion } from "motion/react";
import { TradingChart } from "./TradingChart";
import { PredictionPanel } from "./PredictionPanel";

export function DashboardView() {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Chart - Takes 2 columns on large screens */}
      <div className="lg:col-span-2 min-h-[600px]">
        <TradingChart />
      </div>
      
      {/* Prediction Panel - Takes 1 column on large screens */}
      <div className="lg:col-span-1">
        <PredictionPanel />
      </div>
    </motion.div>
  );
}
