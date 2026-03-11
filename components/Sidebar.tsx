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
  Target,
  X
} from 'lucide-react';
import { NavItem } from '../types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  activeId?: string;
  setActiveId?: (id: string) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} />, href: '/' },
  { id: 'balance', label: 'Balance', icon: <Wallet size={20} />, href: '/#balance' },
  { id: 'ads', label: 'My ad accounts', icon: <Target size={20} />, href: '/#ads' },
  { id: 'referral', label: 'Ad Referral', icon: <Users size={20} />, href: '/referrals' },
  { id: 'support', label: 'Support Center', icon: <LifeBuoy size={20} />, href: '/#support' },
  { id: 'profile', label: 'Profile', icon: <User size={20} />, href: '/#profile' },
];

export const Sidebar: React.FC<SidebarProps> = memo(({ 
  activeId, 
  setActiveId, 
  isCollapsed: isCollapsedProp, 
  setIsCollapsed: setIsCollapsedProp,
  isOpen,
  onClose
}) => {
  const [isLight, setIsLight] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const pathname = usePathname();

  const isCollapsed = isCollapsedProp !== undefined ? isCollapsedProp : internalCollapsed;
  const setIsCollapsed = setIsCollapsedProp || setInternalCollapsed;

  useEffect(() => {
    const checkTheme = () => setIsLight(document.body.classList.contains('light-mode'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const sidebarContent = (
    <aside 
      onMouseEnter={() => !isOpen && setIsCollapsed(false)}
      onMouseLeave={() => !isOpen && setIsCollapsed(true)}
      className={`h-screen border-r flex flex-col z-50 transition-[width,background-color] duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl
      ${isCollapsed && !isOpen ? 'w-20' : 'w-72 lg:w-64'}
      ${isLight ? 'bg-white border-slate-100' : 'bg-brand-surface border-brand-border'}`}
    >
      <div className={`p-8 flex items-center h-24 ${isCollapsed && !isOpen ? 'p-6 justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 min-w-[40px] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,242,234,0.3)] transition-all bg-gradient-to-br from-brand-neon to-brand-pink text-brand-dark">
            <CheckCircle2 size={24} strokeWidth={2.5} />
          </div>
          {(!isCollapsed || isOpen) && (
            <span className={`text-xl font-bold tracking-[-0.01em] truncate uppercase text-brand-textHigh`}>
              1AdSet
            </span>
          )}
        </div>
        {isOpen && (
          <button onClick={onClose} className="lg:hidden p-2 text-brand-textLow hover:text-brand-textHigh">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId ? activeId === item.id : pathname === item.href;
          
          const content = (
            <div
              className={`w-full flex items-center rounded-2xl transition-all duration-200 ease-in-out group relative active:scale-95 ${
                isCollapsed && !isOpen ? 'justify-center py-5' : 'gap-4 px-4 py-4'
              } ${
                isActive 
                  ? 'text-brand-neon bg-brand-neon/5 ring-1 ring-brand-neon/10'
                  : (isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-50' : 'text-brand-textLow hover:text-brand-textHigh hover:bg-white/5')
              }`}
            >
              <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              {(!isCollapsed || isOpen) && (
                <span className="font-medium text-[11px] uppercase tracking-widest truncate">
                  {item.label}
                </span>
              )}
            </div>
          );

          if (setActiveId) {
            return (
              <button key={item.id} onClick={() => setActiveId(item.id)} className="w-full text-left">
                {content}
              </button>
            );
          }

          return (
            <Link key={item.id} href={item.href || '#'} className="block">
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto mb-8">
        <button 
          className={`w-full flex items-center rounded-2xl transition-all duration-300 group relative active:scale-95 shadow-sm border ${
            isCollapsed && !isOpen 
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
          {(!isCollapsed || isOpen) && (
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

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {sidebarContent}
      </div>
    </>
  );
});

export default Sidebar;
