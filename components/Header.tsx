
"use client";

import React, { memo } from 'react';
import { 
  Menu, 
  X,
  Zap,
  ZapOff,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = memo(({ 
  isSidebarCollapsed, 
  setSidebarCollapsed, 
  theme, 
  toggleTheme,
}) => {
  const isLight = theme === 'light';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl h-20 px-8 flex items-center justify-between transition-colors duration-200 ${isLight ? 'bg-white/80' : 'bg-brand-dark/80'}`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className="lg:hidden p-2 text-brand-textLow hover:text-brand-textHigh active:scale-90 transition-transform"
        >
          {isSidebarCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button 
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl border border-brand-border text-brand-textLow hover:text-brand-pink transition-all active:scale-90 flex items-center justify-center shadow-sm ${isLight ? 'bg-white' : 'bg-brand-surface'}`}
          title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {isLight ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="h-8 w-[1px] bg-brand-border mx-1" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-brand-textHigh leading-none uppercase">John Doe</p>
          </div>
          <div className="w-10 h-10 rounded-xl p-[2px] bg-gradient-to-br from-brand-neon to-brand-pink shadow-lg">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-bold text-xs bg-brand-surface text-brand-textHigh`}>
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
