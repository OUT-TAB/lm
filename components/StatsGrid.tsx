import React from 'react';
import { GlassCard } from './GlassCard';

interface StatsGridProps {
  isLight?: boolean;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ isLight = false }) => {
  const stats = [
    { 
      label: 'AVAILABLE BALANCE', 
      pool: 'ACTIVE POOL',
      value: '198.28', 
      footer: 'SYNCHRONIZED',
      accent: 'brand-neon'
    },
    { 
      label: 'TOTAL DEPOSIT', 
      pool: 'PROTOCOL V2',
      value: '8,450.00', 
      footer: 'LIFETIME MAGNITUDE',
      accent: 'brand-pink'
    },
    { 
      label: 'TOTAL TOP-UPS', 
      pool: 'AD NODES',
      value: '12,242.00', 
      footer: 'GLOBAL ALLOCATION',
      accent: 'brand-neon'
    },
    { 
      label: 'TOTAL WITHDRAWALS', 
      pool: 'SAFETY LAYER',
      value: '128.28', 
      footer: 'CONFIRMED MAGNITUDE',
      accent: 'brand-pink'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <GlassCard 
          key={i} 
          className="min-h-[200px] flex flex-col justify-between"
        >
          <div className="p-8 space-y-2">
            <p className={`text-[11px] font-black uppercase tracking-[0.1em] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
              {stat.label}
            </p>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${stat.accent === 'brand-neon' ? 'bg-brand-neon shadow-[0_0_10px_var(--brand-neon)]' : 'bg-brand-pink shadow-[0_0_10px_var(--brand-pink)]'}`} />
              <span className={`text-[9px] font-black uppercase tracking-widest ${isLight ? 'text-slate-700' : 'text-zinc-400'}`}>
                {stat.pool}
              </span>
            </div>

            <div className="pt-8 flex items-baseline">
              <span className={`text-2xl font-black mr-2 ${stat.accent === 'brand-neon' ? 'text-brand-neon' : 'text-brand-pink'}`}>$</span>
              <h3 className={`text-5xl font-black italic tracking-tighter ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {stat.value}
              </h3>
            </div>
          </div>
          
          <div className="px-8 pb-8 mt-auto">
             <p className={`text-[9px] font-black uppercase tracking-widest italic opacity-40 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
               {stat.footer}
             </p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};