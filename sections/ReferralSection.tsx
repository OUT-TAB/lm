import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { 
  Copy, 
  ArrowUpRight, 
  CheckCircle2, 
  Globe, 
  ShieldCheck
} from 'lucide-react';

// Fix: Define props interface to include isLight
interface ReferralSectionProps {
  isLight?: boolean;
}

export const ReferralSection: React.FC<ReferralSectionProps> = ({ isLight = false }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://adgradnis.com/ref/nebula-jd-2025";
  
  // Fix: Removed internal isLight check in favor of props with a default value

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Network Reach', value: '1,240', trend: 12.5 },
    { label: 'Conversion Rate', value: '8.4%', trend: 2.1 },
    { label: 'Total Magnitude', value: '$84,500', trend: 24.1 },
    { label: 'Unclaimed Yield', value: '$1,242.10', trend: 4.5 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-24 pt-0">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-3">
             <h2 className="text-4xl font-bold text-white tracking-widest uppercase">
               {isLight ? 'Referral Protocol' : 'Affiliate Protocol'}
             </h2>
             <span className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest bg-cyan-900/30 text-cyan-400 border border-cyan-500/20">
               Tier 3 Ops
             </span>
          </div>
          <p className="text-slate-400 font-medium flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-400" /> 
            Extract <span className="text-cyan-400 font-bold">5% Magnitude</span> from deployments.
          </p>
        </div>
        <div className="flex gap-4 w-full xl:w-auto justify-end">
          <button className={`flex-1 xl:flex-none px-8 py-3 rounded-brand-btn border border-brand-border text-[10px] text-brand-textHigh font-bold uppercase tracking-[0.2em] hover:bg-brand-textHigh/5 transition-all ${isLight ? 'font-bold tracking-normal text-sm border-brand-border' : ''}`}>
            Logs
          </button>
          <button className={`flex-1 xl:flex-none px-12 py-4 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest ${isLight ? 'claim-yield-gradient shadow-lg' : 'bg-gradient-to-r from-brand-neon to-brand-pink text-brand-dark font-bold rounded-brand-btn shadow-[0_0_20px_rgba(34,211,238,0.25)]'}`}>
            Claim Yield
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} className={`relative group overflow-hidden border-b-2 ${isLight ? 'bg-white border-brand-border' : 'border-b-brand-border hover:border-b-brand-neon/40'}`}>
            <div className="flex justify-end items-start mb-4">
               <div className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 ${isLight ? 'bg-brand-pink/10 text-brand-pink' : 'text-brand-neon bg-brand-neon/10 ring-1 ring-brand-neon/20'}`}>
                  <ArrowUpRight size={12} /> {stat.trend}%
               </div>
            </div>
            <p className="text-[10px] text-brand-textLow font-medium uppercase tracking-[0.3em] opacity-80 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold text-brand-textHigh tracking-[-0.01em] tabular-nums`}>{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-12 space-y-8">
          <GlassCard className={`relative overflow-hidden ${isLight ? 'bg-white border-brand-border' : 'bg-gradient-to-br from-brand-surface via-brand-surface to-brand-neon/5 border-brand-neon/20'}`}>
            <div className="py-4">
              <div className="flex-1 text-center space-y-8">
                 <div>
                   <h3 className={`text-4xl font-bold text-brand-textHigh tracking-[-0.01em] uppercase leading-none ${isLight ? 'text-5xl' : ''}`}>
                     {isLight ? 'Share Your Bridge' : 'Tether Your Bridge'}
                   </h3>
                   <p className="text-sm text-brand-textLow font-medium mt-4 max-w-xl mx-auto">Broadcast your operational signal across global networks to extract maximum value.</p>
                 </div>
                 <div className={`flex gap-2 p-1.5 rounded-2xl shadow-inner max-w-2xl mx-auto ${isLight ? 'bg-brand-dark/5 border border-brand-border' : 'bg-brand-dark border border-brand-border'}`}>
                    <div className="flex-1 px-6 py-4 text-sm font-mono text-brand-textHigh overflow-hidden text-ellipsis whitespace-nowrap rounded-xl flex items-center">
                      <Globe size={14} className="mr-3 opacity-50" />
                      {referralLink}
                    </div>
                    <button 
                      onClick={handleCopy}
                      className={`px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg ${
                        copied 
                          ? (isLight ? 'bg-brand-pink text-white' : 'bg-brand-neon text-brand-dark') 
                          : (isLight ? 'bg-white border border-brand-border text-brand-textHigh hover:bg-brand-pink/10' : 'bg-brand-surface text-white hover:bg-brand-neon/20')
                      }`}
                    >
                      {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                 </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};