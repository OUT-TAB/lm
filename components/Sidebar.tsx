"use client";

import React, { memo, useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  CheckCircle2, 
  Users, 
  LifeBuoy, 
  User, 
  LogOut,
  Target
} from 'lucide-react';
import { NavItem } from '../types';

interface SidebarProps {
  activeId: string;
  setActiveId: (id: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { id: 'balance', label: 'Balance', icon: <Wallet size={20} /> },
  { id: 'ads', label: 'My ad accounts', icon: <Target size={20} /> },
  { id: 'referral', label: 'Ad Referral', icon: <Users size={20} /> },
  { id: 'support', label: 'Support Center', icon: <LifeBuoy size={20} /> },
  { id: 'profile', label: 'Profile', icon: <User size={20} /> },
];

export const Sidebar: React.FC<SidebarProps> = memo(({ activeId, setActiveId, isCollapsed, setIsCollapsed }) => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsLight(document.body.classList.contains('light-mode'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <aside 
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className={`fixed lg:sticky top-0 left-0 h-screen border-r flex flex-col z-50 transition-[width,background-color] duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl
      ${isCollapsed ? 'w-20' : 'w-72 lg:w-64'}
      ${isLight ? 'bg-white border-slate-100' : 'bg-brand-surface border-brand-border'}`}
    >
      <div className={`p-8 flex items-center h-24 ${isCollapsed ? 'p-6 justify-center' : ''}`}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 min-w-[40px] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,242,234,0.3)] transition-all bg-gradient-to-br from-brand-neon to-brand-pink text-brand-dark">
            <CheckCircle2 size={24} strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <span className={`text-xl font-bold tracking-[-0.01em] truncate uppercase text-brand-textHigh`}>
              1AdSet
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`w-full flex items-center rounded-2xl transition-all duration-200 ease-in-out group relative active:scale-95 ${
                isCollapsed ? 'justify-center py-5' : 'gap-4 px-4 py-4'
              } ${
                isActive 
                  ? 'text-brand-neon bg-brand-neon/5 ring-1 ring-brand-neon/10'
                  : (isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-50' : 'text-brand-textLow hover:text-brand-textHigh hover:bg-white/5')
              }`}
            >
              <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="font-medium text-[11px] uppercase tracking-widest truncate">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto mb-8">
        <button 
          className={`w-full flex items-center rounded-2xl transition-all duration-300 group relative active:scale-95 shadow-sm border ${
            isCollapsed 
              ? 'justify-center py-5' 
              : 'gap-4 px-4 py-4 bg-white/5'
          } ${
            isLight 
              ? 'border-slate-100 text-slate-500 hover:text-brand-pink hover:bg-brand-pink/5 hover:border-brand-pink/20' 
              : 'border-transparent text-brand-textLow hover:text-white hover:bg-brand-pink/10 hover:border-brand-pink/20'
          }`}
        >
          <div className="transition-all duration-300 group-hover:scale-110 group-hover:text-brand-pink">
            <LogOut size={20} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col items-start leading-none">
              <span className="font-bold text-[11px] uppercase tracking-[0.15em] group-hover:text-brand-pink transition-colors">
                Exit Portal
              </span>
              <span className="text-[8px] font-medium uppercase tracking-widest opacity-40 mt-1">
                Secure Session End
              </span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
});