import { useState } from "react";
import { motion } from "motion/react";
import { Moon, Sun, Bell, Globe, Shield, Key, Zap } from "lucide-react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function SettingsView() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [language, setLanguage] = useState("pt-BR");
  const [selectedPairs, setSelectedPairs] = useState<string[]>(["BTC/USDT", "ETH/USDT"]);
  
  const availablePairs = [
    "BTC/USDT", "ETH/USDT", "BNB/USDT", "SOL/USDT",
    "ADA/USDT", "XRP/USDT", "DOT/USDT", "MATIC/USDT"
  ];
  
  const togglePair = (pair: string) => {
    setSelectedPairs(prev =>
      prev.includes(pair)
        ? prev.filter(p => p !== pair)
        : [...prev, pair]
    );
  };
  
  return (
    <motion.div
      className="max-w-5xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-slate-900/50 border border-cyan-500/20">
          <TabsTrigger value="general" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
            Geral
          </TabsTrigger>
          <TabsTrigger value="trading" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
            Trading
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
            API
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
            Segurança
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                {theme === "dark" ? <Moon className="w-6 h-6 text-cyan-400" /> : <Sun className="w-6 h-6 text-cyan-400" />}
                <div className="absolute inset-0 blur-lg bg-cyan-400/30" />
              </div>
              <div>
                <h3 className="text-slate-200">Aparência</h3>
                <p className="text-sm text-slate-500">Personalize a interface do aplicativo</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Tema Escuro</Label>
                  <p className="text-sm text-slate-500">Usar interface escura</p>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  className="data-[state=checked]:bg-cyan-500"
                />
              </div>
              
              <Separator className="bg-slate-800" />
              
              <div className="space-y-2">
                <Label className="text-slate-300">Idioma</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-slate-800/50 border-cyan-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-cyan-500/30">
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Bell className="w-6 h-6 text-cyan-400" />
                <div className="absolute inset-0 blur-lg bg-cyan-400/30" />
              </div>
              <div>
                <h3 className="text-slate-200">Notificações</h3>
                <p className="text-sm text-slate-500">Configure seus alertas</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Alertas de Previsão</Label>
                  <p className="text-sm text-slate-500">Receber notificações push</p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  className="data-[state=checked]:bg-cyan-500"
                />
              </div>
              
              <Separator className="bg-slate-800" />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Atualização Automática</Label>
                  <p className="text-sm text-slate-500">Renovar dados a cada 5min</p>
                </div>
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                  className="data-[state=checked]:bg-cyan-500"
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Trading Settings */}
        <TabsContent value="trading" className="space-y-6">
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Zap className="w-6 h-6 text-cyan-400" />
                <div className="absolute inset-0 blur-lg bg-cyan-400/30" />
              </div>
              <div>
                <h3 className="text-slate-200">Pares de Trading</h3>
                <p className="text-sm text-slate-500">Selecione os pares para monitorar</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availablePairs.map((pair) => {
                const isSelected = selectedPairs.includes(pair);
                
                return (
                  <motion.button
                    key={pair}
                    onClick={() => togglePair(pair)}
                    className={`px-4 py-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                        : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {pair}
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-slate-200 mb-6">Preferências de Análise</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Timeframe Padrão</Label>
                <Select defaultValue="5m">
                  <SelectTrigger className="bg-slate-800/50 border-cyan-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-cyan-500/30">
                    <SelectItem value="1m">1 minuto</SelectItem>
                    <SelectItem value="5m">5 minutos</SelectItem>
                    <SelectItem value="15m">15 minutos</SelectItem>
                    <SelectItem value="1h">1 hora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-slate-300">Confiança Mínima (%)</Label>
                <Input
                  type="number"
                  defaultValue="60"
                  className="bg-slate-800/50 border-cyan-500/30"
                />
                <p className="text-xs text-slate-500">Exibir apenas previsões com confiança acima deste valor</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Key className="w-6 h-6 text-cyan-400" />
                <div className="absolute inset-0 blur-lg bg-cyan-400/30" />
              </div>
              <div>
                <h3 className="text-slate-200">Conexão Binance</h3>
                <p className="text-sm text-slate-500">Configure sua API da Binance</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">API Key</Label>
                <Input
                  type="password"
                  placeholder="Sua API Key da Binance"
                  className="bg-slate-800/50 border-cyan-500/30"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-slate-300">Secret Key</Label>
                <Input
                  type="password"
                  placeholder="Sua Secret Key da Binance"
                  className="bg-slate-800/50 border-cyan-500/30"
                />
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <Shield className="w-4 h-4 text-yellow-400" />
                <p className="text-sm text-yellow-400">
                  Suas credenciais são criptografadas e armazenadas com segurança
                </p>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                Conectar Binance
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-slate-200 mb-4">Status da API</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Conexão</span>
                <span className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Conectado
                </span>
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Última sincronização</span>
                <span className="text-slate-300">Agora mesmo</span>
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Rate Limit</span>
                <span className="text-slate-300">125 / 1200</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Shield className="w-6 h-6 text-cyan-400" />
                <div className="absolute inset-0 blur-lg bg-cyan-400/30" />
              </div>
              <div>
                <h3 className="text-slate-200">Segurança</h3>
                <p className="text-sm text-slate-500">Configurações de segurança da conta</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-slate-500">Adicione uma camada extra de segurança</p>
                </div>
                <Button variant="outline" className="border-cyan-500/30 text-cyan-400">
                  Ativar
                </Button>
              </div>
              
              <Separator className="bg-slate-800" />
              
              <div>
                <Label className="text-slate-300 mb-2 block">Alterar Senha</Label>
                <div className="space-y-3">
                  <Input
                    type="password"
                    placeholder="Senha atual"
                    className="bg-slate-800/50 border-cyan-500/30"
                  />
                  <Input
                    type="password"
                    placeholder="Nova senha"
                    className="bg-slate-800/50 border-cyan-500/30"
                  />
                  <Input
                    type="password"
                    placeholder="Confirmar nova senha"
                    className="bg-slate-800/50 border-cyan-500/30"
                  />
                  <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                    Atualizar Senha
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-cyan-500/20">
            <h3 className="text-slate-200 mb-4">Informações do Sistema</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Versão</span>
                <span className="text-slate-300">1.0.0</span>
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex justify-between">
                <span className="text-slate-400">Última atualização</span>
                <span className="text-slate-300">14/10/2025</span>
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex justify-between">
                <span className="text-slate-400">Ambiente</span>
                <span className="text-green-400">Produção</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
