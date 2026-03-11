import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { 
  Download, 
  ShieldCheck, 
  X,
  ExternalLink,
  ArrowRight,
  Wallet,
  CheckCircle,
  XCircle,
  Clock
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
    <div className="space-y-6 pb-24 animate-in fade-in duration-1000 pt-0">
      <div className="flex items-start justify-between gap-6 mb-2">
        <div className="space-y-1 text-left">
          <h2 className="text-4xl font-bold text-white tracking-widest uppercase">Balance Portal</h2>
          <p className="text-sm font-medium text-slate-400 flex items-center justify-start gap-2 mt-3">
            <ShieldCheck size={18} className="text-cyan-400" /> 
            Manage liquid assets across multi-chain and local protocols.
          </p>
        </div>
      </div>

      {/* Top Section: Available Balance & Stats (Balanced 60/40 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Available Balance (Span 8) */}
        <GlassCard className="lg:col-span-8 flex flex-col relative overflow-hidden h-full rounded-3xl border-white/5 shadow-2xl">
          <div className="p-8 relative z-10 h-full flex flex-col">
            <Wallet 
              size={180} 
              className="absolute -top-10 -right-10 text-white/5 pointer-events-none transform rotate-12" 
              strokeWidth={1}
            />
            
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-1.5">
                <p className="label-tracking font-bold opacity-90 uppercase text-xs md:text-sm">Available Balance</p>
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isLight ? 'bg-brand-pink shadow-[0_0_10px_var(--brand-pink)]' : 'bg-brand-neon shadow-[0_0_10px_var(--brand-neon)]'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Sync Status: Active</span>
                </div>
              </div>
              <div className="relative">
                <div className={`absolute inset-0 blur-xl rounded-xl ${isLight ? 'bg-brand-pink/40' : 'bg-brand-neon/40'}`} />
                <div className={`relative w-12 h-12 backdrop-blur-md border rounded-xl flex items-center justify-center ${
                  isLight ? 'bg-brand-pink/10 border-brand-pink/30' : 'bg-brand-neon/10 border-brand-neon/30'
                }`}>
                  <Wallet size={24} className={isLight ? 'text-brand-pink' : 'text-brand-neon'} />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-4">
              <div className="flex items-baseline flex-wrap">
                <span className={`text-3xl font-bold tracking-tight tabular-nums mr-1 ${isLight ? 'text-brand-pink' : 'text-brand-neon'}`}>$</span>
                <h3 className={`text-6xl md:text-7xl font-black tracking-tighter tabular-nums ${isLight ? 'text-slate-950' : 'text-white'}`}>198.28</h3>
              </div>
              <p className={`mt-4 text-xs font-medium leading-relaxed opacity-50 max-w-[320px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Top up your balance to manage your <span className={isLight ? 'text-brand-pink' : 'text-brand-neon'}>TikTok advertising accounts</span> across all global regions.
              </p>
            </div>

            <div className="mt-auto pt-8 flex flex-col sm:flex-row items-center gap-6 border-t border-white/5">
              <button 
                onClick={() => setModalType('deposit')}
                className={`w-full sm:w-auto px-10 h-14 font-black rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-widest text-xs hover:shadow-xl ${
                  isLight 
                    ? 'bg-slate-950 text-white hover:bg-slate-800' 
                    : 'bg-gradient-to-r from-brand-neon to-brand-pink text-brand-dark shadow-[0_0_20px_rgba(34,211,238,0.25)]'
                }`}
              >
                <Download size={18} strokeWidth={3} /> ADD FUNDS
              </button>
              
              <div className="flex items-center gap-8">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Last Injection</p>
                  <p className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>$1,200.00</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Account Health</p>
                  <p className="text-sm font-bold text-emerald-500">EXCELLENT</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Right: 3 Statistic Cards (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-3 h-full">
          <GlassCard className={`flex items-center gap-4 p-5 group hover:border-emerald-500/40 transition-all flex-1 rounded-3xl relative overflow-hidden ${isLight ? 'bg-white border-slate-200' : 'bg-[#0a0c12] border-white/5 shadow-2xl'}`}>
            <CheckCircle 
              size={60} 
              className="absolute -right-2 -bottom-2 text-emerald-500/5 pointer-events-none transform -rotate-12 transition-transform group-hover:rotate-0" 
              strokeWidth={1}
            />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 z-10 ${isLight ? 'bg-emerald-50 text-emerald-600' : 'bg-[#151b23] text-[#00f2ea]'}`}>
              <CheckCircle size={20} strokeWidth={2} />
            </div>
            <div className="flex-1 flex items-center justify-between gap-3 min-w-0 z-10">
              <p className={`text-xs font-bold uppercase tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>Total Approved.</p>
              <p className={`text-xs font-black tabular-nums whitespace-nowrap ${isLight ? 'text-slate-950' : 'text-white'}`}>12 Transactions</p>
            </div>
          </GlassCard>
          
          <GlassCard className={`flex items-center gap-4 p-5 group hover:border-rose-500/40 transition-all flex-1 rounded-3xl relative overflow-hidden ${isLight ? 'bg-white border-slate-200' : 'bg-[#0a0c12] border-white/5 shadow-2xl'}`}>
            <XCircle 
              size={60} 
              className="absolute -right-2 -bottom-2 text-rose-500/5 pointer-events-none transform -rotate-12 transition-transform group-hover:rotate-0" 
              strokeWidth={1}
            />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 z-10 ${isLight ? 'bg-rose-50 text-rose-600' : 'bg-[#151b23] text-[#ff4d4d]'}`}>
              <XCircle size={20} strokeWidth={2} />
            </div>
            <div className="flex-1 flex items-center justify-between gap-3 min-w-0 z-10">
              <p className={`text-xs font-bold uppercase tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>Total Rejected.</p>
              <p className={`text-xs font-black tabular-nums whitespace-nowrap ${isLight ? 'text-slate-950' : 'text-white'}`}>3 Transactions</p>
            </div>
          </GlassCard>

          <GlassCard className={`flex items-center gap-4 p-5 group hover:border-amber-500/40 transition-all flex-1 rounded-3xl relative overflow-hidden ${isLight ? 'bg-white border-slate-200' : 'bg-[#0a0c12] border-white/5 shadow-2xl'}`}>
            <Clock 
              size={60} 
              className="absolute -right-2 -bottom-2 text-amber-500/5 pointer-events-none transform -rotate-12 transition-transform group-hover:rotate-0" 
              strokeWidth={1}
            />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 z-10 ${isLight ? 'bg-amber-50 text-amber-600' : 'bg-[#151b23] text-[#ffcc00]'}`}>
              <Clock size={20} strokeWidth={2} />
            </div>
            <div className="flex-1 flex items-center justify-between gap-3 min-w-0 z-10">
              <p className={`text-xs font-bold uppercase tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>Total Pending.</p>
              <p className={`text-xs font-black tabular-nums whitespace-nowrap ${isLight ? 'text-slate-950' : 'text-white'}`}>5 Transactions</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Provider Grid Section (Full Width) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {paymentMethods.map((m) => (
          <GlassCard 
            key={m.id} 
            className="!p-0 group/card cursor-pointer hover:border-brand-neon/40 transition-all border-white/5 h-full rounded-3xl shadow-lg overflow-hidden"
            onClick={() => setModalType('deposit')}
          >
            <div className="relative h-full w-full p-6 flex flex-col justify-between">
              <div 
                className="absolute -top-10 -right-10 w-40 h-40 blur-[70px] opacity-10 group-hover/card:opacity-30 transition-all duration-700" 
                style={{ backgroundColor: m.color }} 
              />
              
              <div className="flex justify-between items-start relative z-10 gap-3">
                <div className="flex-1">
                  <h4 className={`text-lg font-bold uppercase leading-tight mb-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{m.label}</h4>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40">{m.sub}</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-end text-white transition-transform duration-500 group-hover/card:scale-110 shrink-0">
                  {m.logo}
                </div>
              </div>

              <div className="relative z-10 mt-6 flex justify-between items-center border-t border-white/5 pt-5">
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-7 h-4 rounded-md bg-white/5 border border-white/10" />)}
                </div>
                <div className={`flex items-center gap-1.5 text-[8px] font-bold opacity-50 uppercase tracking-widest transition-colors ${isLight ? 'text-slate-400 group-hover/card:text-sky-600' : 'text-brand-textLow group-hover/card:text-brand-neon'}`}>
                  Deposit <ExternalLink size={10} strokeWidth={3} />
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="space-y-4 pt-4">
        <h3 className={`text-2xl font-bold tracking-[-0.01em] uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>Ledger Records</h3>
        <GlassCard className="!p-0 overflow-hidden shadow-xl">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead className={`${isLight ? 'bg-slate-50 border-slate-100' : 'bg-white/[0.03] border-white/5'} border-b uppercase text-[9px] label-tracking`}>
                <tr>
                  <th className="px-4 md:px-8 py-5 md:py-6">REFERENCE</th>
                  <th className="px-4 md:px-8 py-5 md:py-6">PROTOCOL</th>
                  <th className="px-4 md:px-8 py-5 md:py-6">STATUS</th>
                  <th className="px-4 md:px-8 py-5 md:py-6">MAGNITUDE</th>
                  <th className="px-4 md:px-8 py-5 md:py-6 text-right">TIMESTAMP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paymentHistory.map((tx) => (
                  <tr key={tx.id} className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}`}>
                    <td className="px-4 md:px-8 py-5 md:py-6 font-mono text-[10px] font-medium opacity-80">{tx.id}</td>
                    <td className="px-4 md:px-8 py-5 md:py-6 text-[13px] font-medium uppercase">{tx.method}</td>
                    <td className="px-4 md:px-8 py-5 md:py-6">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-medium uppercase border ${
                        tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-8 py-5 md:py-6 font-bold tracking-[-0.01em] tabular-nums text-[13px]">{tx.amount}</td>
                    <td className="px-4 md:px-8 py-5 md:py-6 text-[9px] opacity-80 text-right uppercase">{tx.date}</td>
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
              <h3 className={`text-4xl font-bold tracking-[-0.01em] uppercase ${isLight ? 'text-slate-950' : 'text-white'}`}>Magnitude</h3>
              <button onClick={() => setModalType(null)} className="p-2 hover:rotate-90 transition-transform"><X size={36} /></button>
            </div>
            <div className="text-center space-y-8 md:space-y-12">
              <div className="relative border-b border-white/10 pb-4 md:pb-8">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl md:text-5xl font-bold tracking-[-0.01em] tabular-nums opacity-10">$</span>
                <input 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`bg-transparent border-none text-6xl md:text-8xl font-bold tracking-[-0.01em] tabular-nums focus:outline-none w-full text-center ${isLight ? 'text-slate-950' : 'text-white'}`}
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