import React from 'react';
import { GlassCard } from './GlassCard';
import { Wallet, ArrowDownToLine, Zap, ArrowUpFromLine } from 'lucide-react';

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
      accent: 'brand-neon',
      icon: Wallet
    },
    { 
      label: 'TOTAL DEPOSIT', 
      pool: 'PROTOCOL V2',
      value: '8,450.00', 
      footer: 'LIFETIME MAGNITUDE',
      accent: 'brand-pink',
      icon: ArrowDownToLine
    },
    { 
      label: 'TOTAL TOP-UPS', 
      pool: 'AD NODES',
      value: '12,242.00', 
      footer: 'GLOBAL ALLOCATION',
      accent: 'brand-neon',
      icon: Zap
    },
    { 
      label: 'TOTAL WITHDRAWALS', 
      pool: 'SAFETY LAYER',
      value: '128.28', 
      footer: 'CONFIRMED MAGNITUDE',
      accent: 'brand-pink',
      icon: ArrowUpFromLine
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <GlassCard 
          key={i} 
          className="min-h-[200px] flex flex-col justify-between overflow-hidden"
        >
          {/* Decorative Background Icon */}
          <div className="absolute -top-4 -right-4 pointer-events-none select-none z-0">
            {/* Glow effect behind icon */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 blur-[40px] rounded-full ${
              isLight ? 'bg-[rgba(255,0,80,0.15)]' : 'bg-[rgba(0,255,200,0.2)]'
            }`} />
            <stat.icon 
              size={120} 
              strokeWidth={1} 
              className={`opacity-20 ${isLight ? 'text-brand-pink' : 'text-cyan-400'}`} 
            />
          </div>

          <div className="p-8 space-y-2 relative z-10">
            <p className={`text-[11px] font-medium opacity-80 uppercase tracking-[0.1em] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
              {stat.label}
            </p>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${stat.accent === 'brand-neon' ? 'bg-brand-neon shadow-[0_0_10px_var(--brand-neon)]' : 'bg-brand-pink shadow-[0_0_10px_var(--brand-pink)]'}`} />
              <span className={`text-[9px] font-medium opacity-80 uppercase tracking-widest ${isLight ? 'text-slate-700' : 'text-zinc-400'}`}>
                {stat.pool}
              </span>
            </div>

            <div className="pt-8 flex items-baseline">
              <span className={`text-2xl font-bold tracking-[-0.01em] tabular-nums mr-2 ${stat.accent === 'brand-neon' ? 'text-brand-neon' : 'text-brand-pink'}`}>$</span>
              <h3 className={`text-5xl font-bold tracking-[-0.01em] tabular-nums text-brand-textHigh`}>
                {stat.value}
              </h3>
            </div>
          </div>
          
          <div className="px-8 pb-8 mt-auto relative z-10">
             <p className={`text-[9px] font-medium opacity-80 uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
               {stat.footer}
             </p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};