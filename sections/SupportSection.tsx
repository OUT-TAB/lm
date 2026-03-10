import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { Search, ArrowRight } from 'lucide-react';

// Fix: Define props interface to include isLight
interface SupportSectionProps {
  isLight?: boolean;
}

export const SupportSection: React.FC<SupportSectionProps> = ({ isLight = false }) => {
  // Fix: Removed internal isLight check in favor of props with a default value

  return (
    <div className="space-y-8 pb-20 pt-0">
      <div className="text-left max-w-3xl mr-auto space-y-6 py-12">
        <h2 className="text-4xl font-bold text-brand-textHigh tracking-widest uppercase">Liaison Hub</h2>
        <p className="text-sm font-medium text-slate-400">Broadcast your operational signal to our tactical agents.</p>
        
        <div className="relative mt-12 group max-w-2xl mr-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-textLow" size={20} />
          <input 
            type="text" 
            placeholder="Search Intel Database..." 
            className={`w-full rounded-[2rem] py-5 pl-14 pr-8 font-medium focus:outline-none transition-all shadow-xl text-sm border ${
              isLight ? 'bg-white border-slate-200 text-slate-900 focus:border-brand-pink' : 'bg-brand-surface border-white/10 text-white focus:border-brand-neon'
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Signal Chat', desc: 'Real-time sync with agents.', color: isLight ? 'text-brand-pink' : 'text-brand-neon' },
          { title: 'Deep Channel', desc: 'Secure dispatch (24h sync).', color: isLight ? 'text-brand-pink' : 'text-brand-pink' },
          { title: 'Intel Base', desc: 'Technical documentations.', color: 'text-brand-textHigh' }
        ].map((item, i) => (
          <GlassCard key={i} className="flex flex-col items-center text-center py-12 hover:translate-y-[-8px] transition-all duration-500 border-none shadow-xl">
            <h4 className="text-2xl font-bold text-brand-textHigh tracking-[-0.01em] mb-4 uppercase">{item.title}</h4>
            <p className="text-[11px] text-brand-textLow font-medium uppercase tracking-widest leading-relaxed px-6 opacity-80">{item.desc}</p>
            <button className={`mt-10 ${item.color} font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 group hover:underline`}>
              Open Bridge <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};