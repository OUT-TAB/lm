
"use client";

import React, { memo } from 'react';
import { 
  Bell, 
  Search, 
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
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
}

export const Header: React.FC<HeaderProps> = memo(({ 
  isSidebarCollapsed, 
  setSidebarCollapsed, 
  theme, 
  toggleTheme,
  isAnimationEnabled,
  toggleAnimation
}) => {
  const isLight = theme === 'light';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b border-brand-border h-20 px-8 flex items-center justify-between transition-colors duration-200 ${isLight ? 'bg-white/80' : 'bg-brand-dark/80'}`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          className="lg:hidden p-2 text-brand-textLow hover:text-brand-textHigh active:scale-90 transition-transform"
        >
          {isSidebarCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border border-brand-border transition-all focus-within:ring-2 focus-within:ring-brand-neon/20 ${isLight ? 'bg-slate-50' : 'bg-brand-surface'}`}>
          <Search size={18} className="text-brand-textLow" />
          <input 
            type="text" 
            placeholder="Quick Intel..." 
            className="bg-transparent border-none text-sm text-brand-textHigh focus:outline-none w-32 lg:w-64 placeholder:text-brand-textLow font-bold italic"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button 
          onClick={toggleAnimation}
          className={`p-2.5 rounded-xl border border-brand-border transition-all active:scale-90 flex items-center justify-center shadow-sm ${
            isAnimationEnabled 
              ? (isLight ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-brand-neon/10 text-brand-neon border-brand-neon/20') 
              : (isLight ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-white/5 text-zinc-500 border-white/10')
          }`}
          title={isAnimationEnabled ? "Disable Nano Light Animations" : "Enable Nano Light Animations"}
        >
          {isAnimationEnabled ? <Zap size={20} /> : <ZapOff size={20} />}
        </button>

        <button 
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl border border-brand-border text-brand-textLow hover:text-brand-pink transition-all active:scale-90 flex items-center justify-center shadow-sm ${isLight ? 'bg-white' : 'bg-brand-surface'}`}
          title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {isLight ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border ${
          !isAnimationEnabled 
            ? 'bg-slate-500/10 text-slate-500 border-slate-500/20' 
            : (isLight ? 'bg-brand-pink/5 text-brand-pink border-brand-pink/10' : 'bg-brand-neon/10 text-brand-neon border-brand-neon/20')
        }`}>
          <Zap size={14} className={isAnimationEnabled && !isLight ? 'animate-pulse' : ''} />
          <span className="text-[10px] font-black uppercase tracking-wider">
            {isAnimationEnabled ? 'Optimal' : 'Static'}
          </span>
        </div>
        
        <button className="relative p-2 text-brand-textLow hover:text-brand-textHigh active:scale-90 transition-transform">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-pink border-2 border-brand-dark" />
        </button>

        <div className="h-8 w-[1px] bg-brand-border mx-1" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-brand-textHigh leading-none italic uppercase">John Doe</p>
            <p className="text-[10px] text-brand-textLow font-bold mt-1 opacity-60">ADMIN</p>
          </div>
          <div className="w-10 h-10 rounded-xl p-[2px] bg-gradient-to-br from-brand-neon to-brand-pink shadow-lg">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-black text-xs ${isLight ? 'bg-white text-slate-900' : 'bg-brand-dark text-white'}`}>
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
