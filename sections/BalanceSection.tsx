import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { 
  Download, 
  ShieldCheck, 
  X,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface BalanceSectionProps {
  isLight?: boolean;
}

const LOGOS = {
  CIH: (
    <svg viewBox="0 0 120 40" className="w-full h-full" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 5h15v30H10z" fill="#005C9E" />
      <path d="M30 5l15 15-15 15z" fill="#F37021" />
      <text x="52" y="28" fontFamily="Satoshi, sans-serif" fontWeight="900" fontSize="20" fill="currentColor">CIH</text>
      <text x="52" y="36" fontFamily="Satoshi, sans-serif" fontWeight="500" fontSize="7" fill="currentColor" opacity="0.6" letterSpacing="0.1em">BANK</text>
    </svg>
  ),
  USDT: (
    <svg viewBox="0 0 32 32" className="w-full h-full" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="15" fill="#26A17B" />
      <path d="M17.9222 11.2V9H14.0778V11.2H10V14H11.4222C11.9111 14 12.3111 14.4 12.3111 14.8889V23.1111C12.3111 23.6 11.9111 24 11.4222 24H10V26.8H22V24H20.5778C20.0889 24 19.6889 23.6 19.6889 23.1111V14.8889C19.6889 14.4 20.0889 14 20.5778 14H22V11.2H17.9222Z" fill="white" />
    </svg>
  ),
  PAYONEER: (
    <svg viewBox="0 0 120 40" className="w-full h-full" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" fill="#FF4800" />
      <circle cx="20" cy="20" r="6" fill="white" fillOpacity="0.2" />
      <text x="40" y="26" fontFamily="Satoshi, sans-serif" fontWeight="800" fontSize="16" fill="currentColor">Payoneer</text>
    </svg>
  ),
  WISE: (
    <svg viewBox="0 0 120 40" className="w-full h-full" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 10L18 30L32 10" stroke="#9FE870" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="40" y="26" fontFamily="Satoshi, sans-serif" fontWeight="800" fontSize="22" fill="currentColor">Wise</text>
    </svg>
  )
};

export const BalanceSection: React.FC<BalanceSectionProps> = ({ isLight = false }) => {
  const [modalType, setModalType] = useState<'deposit' | null>(null);
  const [amount, setAmount] = useState<string>('500.00');

  const paymentMethods = [
    { id: 'CIH', label: 'CIH Bank', sub: 'LOCAL NODE • MA', color: '#00A1E4', logo: LOGOS.CIH },
    { id: 'USDT', label: 'USDT TRC20', sub: 'CRYPTO PROTOCOL', color: '#26A17B', logo: LOGOS.USDT },
    { id: 'Payoneer', label: 'Payoneer', sub: 'GLOBAL DIGITAL', color: '#FF4800', logo: LOGOS.PAYONEER },
    { id: 'Wise', label: 'Wise Card', sub: 'FINTECH BRIDGE', color: '#9FE870', logo: LOGOS.WISE },
  ];

  const paymentHistory = [
    { id: 'TXN-77210', method: 'CIH Bank', amount: '+$1,200.00', status: 'Completed', date: 'Feb 06, 2025' },
    { id: 'TXN-77211', method: 'USDT (TRC20)', amount: '+$3,450.00', status: 'Completed', date: 'Feb 05, 2025' },
    { id: 'TXN-77212', method: 'Payoneer', amount: '+$500.00', status: 'Pending', date: 'Feb 04, 2025' },
    { id: 'TXN-77213', method: 'Wise', amount: '+$850.00', status: 'Failed', date: 'Feb 03, 2025' },
  ];

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-1000 pt-0">
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-1 text-left">
          <h2 className="text-4xl font-bold text-brand-textHigh tracking-widest uppercase">Balance Portal</h2>
          <p className="text-sm font-medium text-slate-400 flex items-center justify-start gap-2 mt-3">
            <ShieldCheck size={18} className="text-cyan-400" /> 
            Manage liquid assets across multi-chain and local protocols.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <GlassCard className="lg:col-span-4 min-h-[440px] flex flex-col justify-between">
          <div className="p-6">
            <p className="label-tracking mb-6 font-medium opacity-80">MAIN LIQUIDITY</p>
            <div className="flex items-center gap-3 mb-12">
              <div className={`w-3 h-3 rounded-full animate-pulse ${isLight ? 'bg-brand-pink shadow-[0_0_15px_var(--brand-pink)]' : 'bg-brand-neon shadow-[0_0_15px_var(--brand-neon)]'}`} />
              <span className="text-[10px] font-medium uppercase tracking-widest opacity-80">Sync Status: Active</span>
            </div>
            <div className="relative group/balance">
              <div className="flex items-baseline flex-wrap relative z-10">
                <span className={`text-3xl md:text-4xl font-bold tracking-[-0.01em] tabular-nums mr-2 ${isLight ? 'text-brand-pink' : 'text-brand-neon'}`}>$</span>
                <h3 className={`text-6xl md:text-8xl font-bold tracking-[-0.01em] tabular-nums text-brand-textHigh`}>198.28</h3>
              </div>
              {/* Dynamic Liquidity Indicator */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-medium uppercase tracking-[0.2em] opacity-80">Liquidity Level</span>
                  <span className={`text-[10px] font-bold tracking-[-0.01em] tabular-nums ${isLight ? 'text-brand-pink' : 'text-brand-neon'}`}>84.2%</span>
                </div>
                <div className={`h-1.5 w-full rounded-full overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${isLight ? 'bg-brand-pink shadow-[0_0_20px_var(--brand-pink)]' : 'bg-brand-neon shadow-[0_0_20px_var(--brand-neon)]'}`}
                    style={{ 
                      width: '84.2%',
                      animation: `pulse ${Math.max(1, 3 - (198.28 / 500))}s cubic-bezier(0.4, 0, 0.6, 1) infinite`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setModalType('deposit')}
            className={`w-full py-6 font-bold rounded-2xl flex items-center justify-center gap-4 transition-all active:scale-95 uppercase tracking-widest text-sm ${
              isLight ? 'bg-slate-950 text-white hover:bg-slate-800 shadow-2xl' : 'bg-gradient-to-r from-brand-neon to-brand-pink text-brand-dark shadow-[0_0_20px_rgba(34,211,238,0.25)]'
            }`}
          >
            <Download size={22} strokeWidth={3} /> INITIALIZE INJECTION
          </button>
        </GlassCard>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {paymentMethods.map((m) => (
            <GlassCard 
              key={m.id} 
              className="!p-0 group/card cursor-pointer hover:border-brand-neon/40 transition-all border-brand-border/40 min-h-[210px]"
              onClick={() => setModalType('deposit')}
            >
              <div className="relative h-full w-full p-6 md:p-8 flex flex-col justify-between overflow-hidden">
                <div 
                  className="absolute -top-12 -right-12 w-48 h-48 blur-[80px] opacity-10 group-hover/card:opacity-40 transition-all duration-700" 
                  style={{ backgroundColor: m.color }} 
                />
                
                <div className="flex justify-between items-center relative z-10 gap-4">
                  <div className="flex-1">
                    <h4 className={`text-xl md:text-2xl font-semibold uppercase leading-tight mb-1 text-brand-textHigh`}>{m.label}</h4>
                    <p className="text-[8px] md:text-[9px] font-medium uppercase tracking-[0.2em] opacity-80">{m.sub}</p>
                  </div>
                  <div className={`w-24 h-12 md:w-28 md:h-14 flex items-center justify-end text-white transition-transform duration-500 group-hover/card:scale-105`}>
                    {m.logo}
                  </div>
                </div>

                <div className="relative z-10 mt-12 flex justify-between items-center border-t border-white/5 pt-6">
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-10 h-6 rounded-lg bg-white/5 border border-white/10" />)}
                  </div>
                  <div className={`flex items-center gap-2 text-[10px] font-medium opacity-80 uppercase tracking-widest transition-colors ${isLight ? 'text-slate-400 group-hover/card:text-sky-600' : 'text-brand-textLow group-hover/card:text-brand-neon'}`}>
                    Deploy <ExternalLink size={16} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-12">
        <h3 className={`text-3xl font-bold tracking-[-0.01em] uppercase text-brand-textHigh`}>Ledger Records</h3>
        <GlassCard className="!p-0 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead className={`${isLight ? 'bg-slate-50 border-slate-100' : 'bg-white/[0.03] border-white/5'} border-b uppercase text-[10px] label-tracking`}>
                <tr>
                  <th className="px-4 md:px-10 py-6 md:py-8">REFERENCE</th>
                  <th className="px-4 md:px-10 py-6 md:py-8">PROTOCOL</th>
                  <th className="px-4 md:px-10 py-6 md:py-8">STATUS</th>
                  <th className="px-4 md:px-10 py-6 md:py-8">MAGNITUDE</th>
                  <th className="px-4 md:px-10 py-6 md:py-8 text-right">TIMESTAMP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paymentHistory.map((tx) => (
                  <tr key={tx.id} className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}`}>
                    <td className="px-4 md:px-10 py-6 md:py-8 font-mono text-[11px] font-medium opacity-80">{tx.id}</td>
                    <td className="px-4 md:px-10 py-6 md:py-8 text-sm font-medium uppercase">{tx.method}</td>
                    <td className="px-4 md:px-10 py-6 md:py-8">
                      <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] font-medium uppercase border ${
                        tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-10 py-6 md:py-8 font-bold tracking-[-0.01em] tabular-nums text-sm">{tx.amount}</td>
                    <td className="px-4 md:px-10 py-6 md:py-8 text-[10px] opacity-80 text-right uppercase">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-2xl" onClick={() => setModalType(null)} />
          <div className={`relative w-full max-w-lg rounded-[3rem] p-12 shadow-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0A0A0A] border-white/10'}`}>
            <div className="flex justify-between items-center mb-12">
              <h3 className={`text-4xl font-bold tracking-[-0.01em] uppercase text-brand-textHigh`}>Magnitude</h3>
              <button onClick={() => setModalType(null)} className="p-2 hover:rotate-90 transition-transform"><X size={36} /></button>
            </div>
            <div className="text-center space-y-8 md:space-y-12">
              <div className="relative border-b border-white/10 pb-4 md:pb-8">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl md:text-5xl font-bold tracking-[-0.01em] tabular-nums opacity-10">$</span>
                <input 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`bg-transparent border-none text-6xl md:text-8xl font-bold tracking-[-0.01em] tabular-nums focus:outline-none w-full text-center text-brand-textHigh`}
                />
              </div>
              <button className={`w-full py-8 rounded-3xl font-bold uppercase active:scale-95 transition-all flex items-center justify-center gap-4 ${isLight ? 'bg-slate-950 text-white shadow-xl' : 'bg-gradient-to-r from-brand-neon to-brand-pink text-brand-dark shadow-[0_0_20px_rgba(34,211,238,0.25)]'}`}>
                Confirm Protocol Injection <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};