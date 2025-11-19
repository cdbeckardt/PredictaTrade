import { useState } from "react";
import { motion } from "motion/react";
import { Moon, Sun, Zap, Bell, Shield } from "lucide-react";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

export function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedPairs, setSelectedPairs] = useState<string[]>(["BTC/USDT", "ETH/USDT"]);
  
  const availablePairs = [
    "BTC/USDT",
    "ETH/USDT",
    "BNB/USDT",
    "SOL/USDT",
    "ADA/USDT",
    "XRP/USDT",
  ];
  
  const togglePair = (pair: string) => {
    setSelectedPairs(prev => 
      prev.includes(pair) 
        ? prev.filter(p => p !== pair)
        : [...prev, pair]
    );
  };
  
  return (
    <div className="px-6 pb-24 space-y-6">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Appearance */}
        <div className="bg-slate-900/50 rounded-2xl p-5 border border-cyan-500/20">
          <h3 className="text-cyan-400 mb-4 flex items-center gap-2">
            <div className="relative">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <div className="absolute inset-0 blur-lg bg-cyan-400/30" />
            </div>
            Aparência
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Tema Escuro</p>
              <p className="text-slate-400 text-sm">Usar interface escura</p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="data-[state=checked]:bg-cyan-500"
            />
          </div>
        </div>
        
        {/* Notifications */}
        <div className="bg-slate-900/50 rounded-2xl p-5 border border-cyan-500/20">
          <h3 className="text-cyan-400 mb-4 flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5" />
              <div className="absolute inset-0 blur-lg bg-cyan-400/30" />
            </div>
            Notificações
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Alertas de Previsão</p>
                <p className="text-slate-400 text-sm">Receber notificações push</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                className="data-[state=checked]:bg-cyan-500"
              />
            </div>
            
            <Separator className="bg-slate-700/50" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Atualização Automática</p>
                <p className="text-slate-400 text-sm">Renovar dados a cada 5min</p>
              </div>
              <Switch
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
                className="data-[state=checked]:bg-cyan-500"
              />
            </div>
          </div>
        </div>
        
        {/* Trading Pairs */}
        <div className="bg-slate-900/50 rounded-2xl p-5 border border-cyan-500/20">
          <h3 className="text-cyan-400 mb-4 flex items-center gap-2">
            <div className="relative">
              <Zap className="w-5 h-5" />
              <div className="absolute inset-0 blur-lg bg-cyan-400/30" />
            </div>
            Pares de Trading
          </h3>
          
          <p className="text-slate-400 text-sm mb-4">Selecione os pares para monitorar</p>
          
          <div className="grid grid-cols-2 gap-3">
            {availablePairs.map((pair) => {
              const isSelected = selectedPairs.includes(pair);
              
              return (
                <motion.button
                  key={pair}
                  onClick={() => togglePair(pair)}
                  className={`px-4 py-3 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                      : "bg-slate-800/50 border-slate-700/50 text-slate-400"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {pair}
                </motion.button>
              );
            })}
          </div>
        </div>
        
        {/* Security */}
        <div className="bg-slate-900/50 rounded-2xl p-5 border border-cyan-500/20">
          <h3 className="text-cyan-400 mb-4 flex items-center gap-2">
            <div className="relative">
              <Shield className="w-5 h-5" />
              <div className="absolute inset-0 blur-lg bg-cyan-400/30" />
            </div>
            Segurança
          </h3>
          
          <div className="space-y-3 text-sm">
            <p className="text-slate-400">
              <span className="text-white">Versão:</span> 1.0.0
            </p>
            <p className="text-slate-400">
              <span className="text-white">API Status:</span> <span className="text-green-400">Conectado</span>
            </p>
            <p className="text-slate-400">
              <span className="text-white">Última atualização:</span> Agora
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
