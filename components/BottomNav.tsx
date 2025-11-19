import { TrendingUp, Bell, Settings } from "lucide-react";

interface BottomNavProps {
  activeTab: "chart" | "alerts" | "settings";
  onTabChange: (tab: "chart" | "alerts" | "settings") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "chart" as const, icon: TrendingUp, label: "Gráfico" },
    { id: "alerts" as const, icon: Bell, label: "Alertas" },
    { id: "settings" as const, icon: Settings, label: "Configurações" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-cyan-500/20">
      <div className="flex items-center justify-around px-6 py-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 transition-all duration-300"
            >
              <div className={`relative ${isActive ? "text-cyan-400" : "text-slate-400"}`}>
                <Icon className="w-6 h-6" strokeWidth={2} />
                {isActive && (
                  <div className="absolute inset-0 blur-md bg-cyan-400/50 animate-pulse" />
                )}
              </div>
              <span className={`text-xs ${isActive ? "text-cyan-400" : "text-slate-400"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
