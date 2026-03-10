"use client";

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'active' | 'paused';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  style, 
  variant = 'default',
  onClick 
}) => {
  const [isLight, setIsLight] = React.useState(false);

  React.useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.body.classList.contains('light-mode'));
    };
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const getGlowClass = () => {
    switch (variant) {
      case 'active': return 'perimeter-glow-active';
      case 'paused': return 'perimeter-glow-paused';
      default: return 'perimeter-glow';
    }
  };

  return (
    <div 
      className={`relative transition-all duration-500 rounded-brand-card group/card overflow-hidden hover-lift card-glow-shadow border
      ${isLight 
        ? 'bg-slate-50/40 backdrop-blur-2xl border-brand-border' 
        : 'bg-brand-card border-white/5 hover:bg-white/5'
      } ${className}`}
      onClick={onClick}
      style={style}
    >
      {/* 1. Dynamic Perimeter Glow Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`${getGlowClass()} transition-all duration-700 ${
          variant === 'default' 
            ? (isLight ? 'opacity-0' : 'opacity-30 group-hover/card:opacity-100')
            : (isLight ? 'opacity-0' : 'opacity-20 group-hover/card:opacity-60')
        }`} />
      </div>
      
      {/* 2. Inner Mask - Thinner for Light Mode to expose the glow edge more clearly */}
      <div className={`absolute rounded-[calc(1.25rem-2px)] z-10 pointer-events-none ${
        isLight ? 'inset-[2px] bg-slate-50/40' : 'inset-[1.5px] bg-brand-card'
      }`} />

      {/* 3. Interaction Surface Reflection */}
      <div className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20 ${
        isLight 
          ? 'bg-gradient-to-br from-white/60 via-transparent to-transparent' 
          : 'bg-gradient-to-br from-white/[0.04] via-transparent to-transparent'
      }`} />
      
      {/* 4. Content Layer */}
      <div className="relative z-30 h-full">
        {children}
      </div>
    </div>
  );
};