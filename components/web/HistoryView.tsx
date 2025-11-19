import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Calendar, Filter, Download } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";

interface HistoricalPrediction {
  id: string;
  date: string;
  time: string;
  pair: string;
  direction: "ALTA" | "BAIXA";
  confidence: number;
  result: "correct" | "incorrect" | "pending";
  actualMove: number;
}

const mockHistoricalData: HistoricalPrediction[] = [
  { id: "1", date: "2025-10-14", time: "14:30", pair: "BTC/USDT", direction: "ALTA", confidence: 78, result: "correct", actualMove: 1.2 },
  { id: "2", date: "2025-10-14", time: "13:45", pair: "ETH/USDT", direction: "BAIXA", confidence: 65, result: "correct", actualMove: -0.8 },
  { id: "3", date: "2025-10-14", time: "12:20", pair: "BTC/USDT", direction: "ALTA", confidence: 82, result: "incorrect", actualMove: -0.5 },
  { id: "4", date: "2025-10-14", time: "11:10", pair: "BTC/USDT", direction: "BAIXA", confidence: 71, result: "correct", actualMove: -1.1 },
  { id: "5", date: "2025-10-13", time: "16:55", pair: "ETH/USDT", direction: "ALTA", confidence: 88, result: "correct", actualMove: 1.5 },
  { id: "6", date: "2025-10-13", time: "15:30", pair: "BTC/USDT", direction: "BAIXA", confidence: 69, result: "correct", actualMove: -0.9 },
  { id: "7", date: "2025-10-13", time: "14:15", pair: "ETH/USDT", direction: "ALTA", confidence: 75, result: "incorrect", actualMove: -0.3 },
  { id: "8", date: "2025-10-13", time: "12:40", pair: "BTC/USDT", direction: "ALTA", confidence: 80, result: "correct", actualMove: 1.3 },
  { id: "9", date: "2025-10-13", time: "11:25", pair: "SOL/USDT", direction: "BAIXA", confidence: 73, result: "correct", actualMove: -1.7 },
  { id: "10", date: "2025-10-13", time: "10:10", pair: "BTC/USDT", direction: "ALTA", confidence: 85, result: "correct", actualMove: 2.1 },
];

export function HistoryView() {
  const [filterPair, setFilterPair] = useState("all");
  const [filterResult, setFilterResult] = useState("all");
  
  const filteredData = mockHistoricalData.filter(item => {
    if (filterPair !== "all" && item.pair !== filterPair) return false;
    if (filterResult !== "all" && item.result !== filterResult) return false;
    return true;
  });
  
  const totalPredictions = filteredData.length;
  const correctPredictions = filteredData.filter(p => p.result === "correct").length;
  const incorrectPredictions = filteredData.filter(p => p.result === "incorrect").length;
  const accuracy = totalPredictions > 0 ? Math.round((correctPredictions / totalPredictions) * 100) : 0;
  
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl p-6 border border-cyan-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <p className="text-slate-400">Total</p>
          </div>
          <p className="text-3xl text-white">{totalPredictions}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-6 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <p className="text-slate-400">Acertos</p>
          </div>
          <p className="text-3xl text-green-400">{correctPredictions}</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl p-6 border border-red-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <p className="text-slate-400">Erros</p>
          </div>
          <p className="text-3xl text-red-400">{incorrectPredictions}</p>
        </div>
        
        <div className="bg-gradient-to-br from-violet-500/10 to-purple-600/5 rounded-xl p-6 border border-violet-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-5 h-5 text-violet-400" />
            <p className="text-slate-400">Precisão</p>
          </div>
          <p className="text-3xl text-violet-400">{accuracy}%</p>
        </div>
      </div>
      
      {/* Filters and Actions */}
      <div className="bg-slate-900/50 rounded-xl p-4 border border-cyan-500/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Select value={filterPair} onValueChange={setFilterPair}>
              <SelectTrigger className="w-[160px] bg-slate-800/50 border-cyan-500/30">
                <SelectValue placeholder="Filtrar par" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/30">
                <SelectItem value="all">Todos os pares</SelectItem>
                <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterResult} onValueChange={setFilterResult}>
              <SelectTrigger className="w-[160px] bg-slate-800/50 border-cyan-500/30">
                <SelectValue placeholder="Filtrar resultado" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/30">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="correct">Acertos</SelectItem>
                <SelectItem value="incorrect">Erros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>
      
      {/* History Table */}
      <div className="bg-slate-900/50 rounded-xl border border-cyan-500/20 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-800/50">
              <TableHead className="text-slate-400">Data</TableHead>
              <TableHead className="text-slate-400">Hora</TableHead>
              <TableHead className="text-slate-400">Par</TableHead>
              <TableHead className="text-slate-400">Previsão</TableHead>
              <TableHead className="text-slate-400">Confiança</TableHead>
              <TableHead className="text-slate-400">Movimento Real</TableHead>
              <TableHead className="text-slate-400">Resultado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => {
              const isUp = item.direction === "ALTA";
              const Icon = isUp ? TrendingUp : TrendingDown;
              
              return (
                <motion.tr
                  key={item.id}
                  className="border-slate-800 hover:bg-slate-800/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell className="text-slate-300">
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-slate-300">{item.time}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                      {item.pair}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon 
                        className={`w-4 h-4 ${isUp ? "text-green-400" : "text-red-400"}`} 
                        strokeWidth={2}
                      />
                      <span className={isUp ? "text-green-400" : "text-red-400"}>
                        {item.direction}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{item.confidence}%</TableCell>
                  <TableCell>
                    <span className={item.actualMove > 0 ? "text-green-400" : "text-red-400"}>
                      {item.actualMove > 0 ? "+" : ""}{item.actualMove}%
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.result === "correct" && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        ✓ Acertou
                      </Badge>
                    )}
                    {item.result === "incorrect" && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        ✗ Errou
                      </Badge>
                    )}
                    {item.result === "pending" && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        ⏱ Pendente
                      </Badge>
                    )}
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
