import { Brain } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface HeaderProps {
  selectedPair: string;
  onPairChange: (pair: string) => void;
}

export function Header({ selectedPair, onPairChange }: HeaderProps) {
  const pairs = ["BTC/USDT", "ETH/USDT", "BNB/USDT", "SOL/USDT", "ADA/USDT", "XRP/USDT"];
  
  return (
    <header className="px-6 py-6 space-y-4">
      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <Brain className="w-8 h-8 text-cyan-400" strokeWidth={2} />
          <div className="absolute inset-0 blur-lg bg-cyan-400/30 animate-pulse" />
        </div>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          PredictaTrade
        </h1>
      </div>
      
      <div className="flex justify-center">
        <Select value={selectedPair} onValueChange={onPairChange}>
          <SelectTrigger className="w-[200px] bg-slate-900/50 border-cyan-500/30 text-cyan-400">
            <SelectValue placeholder="Selecione o par" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-cyan-500/30">
            {pairs.map((pair) => (
              <SelectItem 
                key={pair} 
                value={pair} 
                className="text-slate-200 focus:bg-cyan-500/20 focus:text-cyan-400"
              >
                {pair}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
