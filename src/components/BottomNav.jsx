import React from 'react';
import { LayoutDashboard, ReceiptText, Lightbulb, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-surface-container-high px-4 pb-8 pt-2 flex justify-around items-center z-50">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={cn(
            "flex flex-col items-center justify-center px-4 py-1 rounded-xl transition-all tap-highlight-none",
            activeTab === item.id 
              ? "bg-primary/10 text-primary" 
              : "text-on-surface-variant hover:text-primary"
          )}
        >
          <item.icon className={cn("w-6 h-6 mb-1", activeTab === item.id && "fill-current")} />
          <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
