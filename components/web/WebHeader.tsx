import { Brain, History, Bell, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface WebHeaderProps {
  selectedPair: string;
  onPairChange: (pair: string) => void;
  onNavigate: (page: "dashboard" | "history" | "settings") => void;
  currentPage: string;
}

export function WebHeader({ selectedPair, onPairChange, onNavigate, currentPage }: WebHeaderProps) {
  const pairs = ["BTC/USDT", "ETH/USDT", "BNB/USDT", "SOL/USDT", "ADA/USDT", "XRP/USDT"];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Brain className="w-8 h-8 text-cyan-400 transition-transform group-hover:scale-110" strokeWidth={2} />
              <div className="absolute inset-0 blur-lg bg-cyan-400/30 animate-pulse" />
            </div>
            <div>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                PredictaTrade
              </h1>
              <p className="text-xs text-slate-500">AI Trading Predictions</p>
            </div>
          </button>
          
          {/* Center - Pair Selector */}
          <div className="flex items-center gap-3">
            <Select value={selectedPair} onValueChange={onPairChange}>
              <SelectTrigger className="w-[180px] bg-slate-800/50 border-cyan-500/30 text-cyan-400">
                <SelectValue placeholder="Select pair" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/30">
                {pairs.map((pair) => (
                  <SelectItem key={pair} value={pair} className="text-slate-200 focus:bg-cyan-500/20 focus:text-cyan-400">
                    {pair}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Right - Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant={currentPage === "history" ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigate("history")}
              className={currentPage === "history" 
                ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30" 
                : "text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10"
              }
            >
              <History className="w-4 h-4 mr-2" />
              Histórico
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
            
            <Button
              variant={currentPage === "settings" ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigate("settings")}
              className={currentPage === "settings" 
                ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30" 
                : "text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10"
              }
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                      PT
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-cyan-500/30">
                <DropdownMenuItem className="text-slate-200 focus:bg-cyan-500/20 focus:text-cyan-400">
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem className="text-red-400 focus:bg-red-500/20 focus:text-red-400">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
