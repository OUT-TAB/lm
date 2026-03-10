"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Zap,
  MessageCircle,
  Settings2,
  X,
  ShieldCheck,
  ExternalLink,
  ArrowDownCircle,
  ArrowUpCircle,
  LayoutGrid,
  List,
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface Account {
  id: string; 
  name: string; 
  spend: string; 
  balance: string; 
  status: 'Active' | 'Paused';
  autoInject: boolean;
  autoTopUpThreshold: string;
  autoTopUpAmount: string;
  metrics: { cpc: string; cpa: string; ctr: string; roas: string; };
}

interface AdsSectionProps {
  isLight?: boolean;
}

export const AdsSection: React.FC<AdsSectionProps> = ({ isLight = false }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [configAccount, setConfigAccount] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([
    { 
      id: '8271-X', 
      name: 'US PERFORMANCE V4', 
      spend: '1,240.20', 
      balance: '3,340.50', 
      status: 'Active',
      autoInject: true,
      autoTopUpThreshold: '50.00',
      autoTopUpAmount: '200.00',
      metrics: { cpc: '$0.42', cpa: '$12.10', ctr: '2.4%', roas: '4.2x' }
    },
    { 
      id: '9920-E', 
      name: 'EU SCALE • TIER 1', 
      spend: '890.00', 
      balance: '12.45', 
      status: 'Active',
      autoInject: false,
      autoTopUpThreshold: '10.00',
      autoTopUpAmount: '100.00',
      metrics: { cpc: '$0.85', cpa: '$18.40', ctr: '1.8%', roas: '2.8x' }
    },
    { 
      id: '1102-A', 
      name: 'ASIA GROWTH BETA', 
      spend: '0.00', 
      balance: '0.00', 
      status: 'Paused',
      autoInject: false,
      autoTopUpThreshold: '0.00',
      autoTopUpAmount: '0.00',
      metrics: { cpc: '$0.00', cpa: '$0.00', ctr: '0.0%', roas: '0.0x' }
    },
    { 
      id: '4491-G', 
      name: 'GLOBAL RETARGET', 
      spend: '150.15', 
      balance: '45.00', 
      status: 'Active',
      autoInject: true,
      autoTopUpThreshold: '15.00',
      autoTopUpAmount: '50.00',
      metrics: { cpc: '$0.30', cpa: '$8.50', ctr: '3.1%', roas: '5.1x' }
    },
    { 
      id: '5562-F', 
      name: 'LATAM VIDEO PUSH', 
      spend: '2,100.00', 
      balance: '4,500.25', 
      status: 'Active',
      autoInject: true,
      autoTopUpThreshold: '100.00',
      autoTopUpAmount: '500.00',
      metrics: { cpc: '$0.12', cpa: '$4.20', ctr: '5.2%', roas: '6.5x' }
    }
  ]);

  const toggleAutoInject = (id: string) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === id ? { ...acc, autoInject: !acc.autoInject } : acc
    ));
    if (configAccount && configAccount.id === id) {
      setConfigAccount(prev => prev ? { ...prev, autoInject: !prev.autoInject } : null);
    }
  };

  const updateAccountValue = (id: string, field: keyof Account, value: string) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === id ? { ...acc, [field]: value } : acc
    ));
    if (configAccount && configAccount.id === id) {
      setConfigAccount(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleOpenManager = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open('https://ads.tiktok.com/', '_blank');
  };

  const handleAddFunds = (id: string) => {
    const amount = window.prompt('Enter amount to add:', '100.00');
    if (amount && !isNaN(parseFloat(amount))) {
      setAccounts(prev => prev.map(acc => {
        if (acc.id === id) {
          const current = parseFloat(acc.balance.replace(/,/g, ''));
          const added = parseFloat(amount);
          return { ...acc, balance: (current + added).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) };
        }
        return acc;
      }));
    }
  };

  const handleWithdraw = (id: string) => {
    const amount = window.prompt('Enter amount to withdraw:', '100.00');
    if (amount && !isNaN(parseFloat(amount))) {
      setAccounts(prev => prev.map(acc => {
        if (acc.id === id) {
          const current = parseFloat(acc.balance.replace(/,/g, ''));
          const withdrawn = parseFloat(amount);
          if (withdrawn > current) {
            alert('Insufficient balance');
            return acc;
          }
          return { ...acc, balance: (current - withdrawn).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) };
        }
        return acc;
      }));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-24 pt-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-2">
        <div className="text-left">
          <h2 className="text-4xl font-bold text-white tracking-widest uppercase">AD NODES</h2>
          <div className="flex items-center gap-2 mt-1 font-medium text-sm uppercase tracking-widest text-slate-400">
            <Zap size={16} className="text-cyan-400" />
            Real-time Node Control Interface
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-2 w-full md:w-auto px-2">
          <div className={`flex items-center p-1 rounded-xl border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'}`}>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? (isLight ? 'bg-white text-slate-900 shadow-sm' : 'bg-white/10 text-white') : 'text-slate-500 hover:text-slate-300'}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? (isLight ? 'bg-white text-slate-900 shadow-sm' : 'bg-white/10 text-white') : 'text-slate-500 hover:text-slate-300'}`}
            >
              <List size={16} />
            </button>
          </div>
          <button className={`p-3 rounded-xl transition-all hover:scale-105 border ${isLight ? 'bg-white text-emerald-600 border-emerald-100 shadow-sm' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
            <MessageCircle size={18} />
          </button>
          <button className={`flex-1 md:flex-none px-6 py-3 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${isLight ? 'bg-slate-950 text-white shadow-xl' : 'bg-gradient-to-r from-brand-neon to-brand-pink text-brand-dark shadow-[0_0_20px_rgba(34,211,238,0.25)]'}`}>
            <Plus size={16} strokeWidth={3} />
            <span>Deploy Account</span>
          </button>
        </div>
      </div>

      {/* Account Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-2">
          {accounts.map((acc) => (
            <GlassCard 
              key={acc.id} 
              variant={acc.status === 'Active' ? 'active' : 'paused'}
              className={`group/card !p-0 ${acc.status === 'Paused' ? 'opacity-70' : ''}`}
            >
              <div className="p-4 relative min-h-[220px] flex flex-col">
                {/* Card Meta */}
                <div className="flex justify-between items-start mb-2">
                  <div className="truncate pr-2">
                    <h4 className={`text-sm font-semibold tracking-tight leading-none uppercase truncate ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {acc.name}
                    </h4>
                    <p className={`text-[7px] font-mono uppercase tracking-widest mt-1 font-medium opacity-80 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                      ID: {acc.id}
                    </p>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[6px] font-medium uppercase tracking-widest border ${
                    acc.status === 'Active' 
                      ? (isLight ? 'bg-emerald-500 text-white border-transparent' : 'bg-brand-active/10 text-brand-active border-brand-active/20') 
                      : (isLight ? 'bg-red-500 text-white border-transparent' : 'bg-brand-paused/10 text-brand-paused border-brand-paused/20')
                  }`}>
                    {acc.status}
                  </div>
                </div>

                {/* Balance Display */}
                <div className="flex-1 flex flex-col justify-center relative my-2">
                  <div className="group-hover/card:opacity-0 transition-opacity duration-300">
                    <p className="text-[6px] font-medium uppercase tracking-widest opacity-80 mb-1">Available Magnitude</p>
                    <div className="flex items-baseline">
                      <span className={`text-base font-bold tracking-[-0.01em] tabular-nums mr-0.5 ${acc.status === 'Active' ? 'text-brand-active' : 'text-brand-paused'}`}>$</span>
                      <p className={`text-4xl font-bold tracking-[-0.01em] tabular-nums leading-none ${isLight ? 'text-slate-950' : 'text-white'}`}>
                        {acc.balance}
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="text-[6px] font-medium uppercase tracking-widest opacity-80">Current Spend</p>
                      <p className={`text-xs font-bold tracking-[-0.01em] tabular-nums ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>${acc.spend}</p>
                    </div>
                  </div>

                  {/* KPI Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 pointer-events-none group-hover/card:pointer-events-auto backdrop-blur-xl rounded-lg z-10">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full px-2">
                      {[{ label: 'CPC', val: acc.metrics.cpc }, { label: 'CPA', val: acc.metrics.cpa }, { label: 'CTR', val: acc.metrics.ctr }, { label: 'ROAS', val: acc.metrics.roas, highlight: true }].map((kpi) => (
                        <div key={kpi.label} className={`border-b pb-1 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                          <span className="text-[6px] font-medium uppercase opacity-80 block">{kpi.label}</span>
                          <span className={`text-[10px] font-bold tracking-[-0.01em] tabular-nums ${kpi.highlight ? (acc.status === 'Active' ? 'text-brand-active' : 'text-brand-paused') : (isLight ? 'text-slate-900' : 'text-white')}`}>{kpi.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="space-y-2 mt-2 pt-3 border-t border-brand-border/20">
                  <div className="flex gap-1.5">
                    <button onClick={() => setConfigAccount(acc)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[7px] font-medium uppercase tracking-widest transition-all ${isLight ? 'bg-slate-50 text-slate-600 hover:bg-slate-100' : 'bg-white/5 text-zinc-300 hover:bg-white/10'}`}>
                      <Settings2 size={10} /> Auto Top-up
                    </button>
                    <button onClick={handleOpenManager} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[7px] font-medium uppercase tracking-widest transition-all ${isLight ? 'bg-slate-50 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50' : 'bg-white/5 text-zinc-300 hover:text-brand-active hover:bg-brand-active/10'}`}>
                      <ExternalLink size={10} /> Ads Manager
                    </button>
                  </div>
                  <div className="flex gap-1.5">
                    <button 
                      onClick={() => handleAddFunds(acc.id)}
                      className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-[7px] font-medium uppercase tracking-widest border ${
                      isLight 
                        ? 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700' 
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-black'
                    }`}>
                      <ArrowDownCircle size={10} strokeWidth={3} /> Add Funds
                    </button>
                    <button 
                      onClick={() => handleWithdraw(acc.id)}
                      className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-[7px] font-medium uppercase tracking-widest border ${
                      isLight 
                        ? 'bg-red-600 text-white border-red-700 hover:bg-red-700' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white'
                    }`}>
                      <ArrowUpCircle size={10} /> Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="space-y-1 px-2">
          {accounts.map((acc) => (
            <GlassCard 
              key={acc.id} 
              className={`!p-1 px-3 flex flex-col lg:flex-row items-center justify-between gap-2 ${acc.status === 'Paused' ? 'opacity-70' : ''} hover:border-brand-neon/30 transition-all`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0 w-full lg:w-auto">
                {/* Ads Manager Start */}
                <button 
                  onClick={handleOpenManager}
                  className={`p-1.5 rounded-md transition-all shrink-0 group/btn ${isLight ? 'bg-slate-100 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50' : 'bg-white/5 text-zinc-400 hover:text-brand-active hover:bg-brand-active/10'}`}
                  title="Open Ads Manager"
                >
                  <ExternalLink size={12} className="group-hover/btn:scale-110 transition-transform" />
                </button>

                {/* Name & ID */}
                <div className="truncate">
                  <h4 className={`text-[11px] font-semibold uppercase leading-none truncate ${isLight ? 'text-slate-950' : 'text-white'}`}>{acc.name}</h4>
                  <p className="text-[6px] font-mono uppercase tracking-widest mt-0.5 font-medium opacity-80">ID: {acc.id}</p>
                </div>
              </div>

              {/* Status */}
              <div className="hidden lg:flex w-20 justify-center">
                <div className={`px-1.5 py-0.5 rounded-md text-[6px] font-medium uppercase tracking-widest border ${
                  acc.status === 'Active' 
                    ? (isLight ? 'bg-emerald-500 text-white border-transparent' : 'bg-brand-active/10 text-brand-active border-brand-active/20') 
                    : (isLight ? 'bg-red-500 text-white border-transparent' : 'bg-brand-paused/10 text-brand-paused border-brand-paused/20')
                }`}>
                  {acc.status}
                </div>
              </div>

              {/* Balance */}
              <div className="w-full lg:w-32 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-1">
                <p className="text-[5px] font-medium uppercase tracking-widest opacity-80">MAGNITUDE</p>
                <div className="flex items-baseline">
                  <span className={`text-[8px] font-bold tracking-[-0.01em] tabular-nums mr-0.5 ${acc.status === 'Active' ? 'text-brand-active' : 'text-brand-paused'}`}>$</span>
                  <p className={`text-base font-bold tracking-[-0.01em] tabular-nums leading-none ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {acc.balance}
                  </p>
                </div>
              </div>

              {/* Buttons End */}
              <div className="flex items-center gap-1.5 w-full lg:w-auto">
                <button 
                  onClick={() => handleAddFunds(acc.id)}
                  className={`flex-1 lg:flex-none px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 text-[7px] font-medium uppercase tracking-widest border ${
                  isLight 
                    ? 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-black'
                }`}>
                  <ArrowDownCircle size={9} strokeWidth={3} /> Add Funds
                </button>
                <button 
                  onClick={() => handleWithdraw(acc.id)}
                  className={`flex-1 lg:flex-none px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 text-[7px] font-medium uppercase tracking-widest border ${
                  isLight 
                    ? 'bg-red-600 text-white border-red-700 hover:bg-red-700' 
                    : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white'
                }`}>
                  <ArrowUpCircle size={9} strokeWidth={3} /> Withdraw
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Auto Protocol Configuration Modal */}
      {configAccount && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setConfigAccount(null)} />
          <div className={`relative w-full max-w-sm rounded-[2.5rem] border overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl ${isLight ? 'bg-white border-slate-200' : 'bg-[#0A0A0A] border-white/10'}`}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isLight ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-active/10 text-brand-active shadow-inner'}`}>
                    <Settings2 size={18} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold tracking-[-0.01em] uppercase leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>Auto Protocol</h3>
                    <p className={`text-[9px] font-medium uppercase tracking-widest mt-1 opacity-80 ${isLight ? 'text-slate-400' : 'text-brand-textLow'}`}>NODE: {configAccount.name}</p>
                  </div>
                </div>
                <button onClick={() => setConfigAccount(null)} className="p-2 transition-all hover:scale-110 text-slate-400 hover:text-brand-pink">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className={`flex items-center justify-between p-5 rounded-2xl transition-all border ${configAccount.autoInject ? (isLight ? 'bg-emerald-50 border-emerald-100' : 'bg-brand-active/5 border-brand-active/10') : 'bg-white/[0.02] border-brand-border opacity-60'}`}>
                  <div>
                    <p className={`text-[10px] font-medium uppercase tracking-widest ${isLight ? 'text-slate-900' : 'text-white'}`}>Automated Injection</p>
                    <p className="text-[8px] font-medium opacity-80 uppercase tracking-widest mt-0.5 text-brand-textLow">Threshold Scale Logic</p>
                  </div>
                  <button onClick={() => toggleAutoInject(configAccount.id)} className={`relative w-10 h-5 rounded-full transition-all duration-500 ease-out flex items-center shadow-inner ${configAccount.autoInject ? (isLight ? 'bg-emerald-600' : 'bg-brand-active') : 'bg-slate-200'}`}>
                    <div className={`absolute w-3.5 h-3.5 rounded-full bg-white transition-all duration-500 ${configAccount.autoInject ? 'left-[22px]' : 'left-[4px]'}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-medium opacity-80 uppercase tracking-widest ml-1 text-slate-400">Threshold</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-[-0.01em] tabular-nums opacity-80 text-slate-900">$</span>
                      <input type="text" value={configAccount.autoTopUpThreshold} onChange={(e) => updateAccountValue(configAccount.id, 'autoTopUpThreshold', e.target.value)} className={`w-full pl-8 pr-4 py-4 rounded-2xl text-xs font-bold tracking-[-0.01em] tabular-nums outline-none border transition-all ${isLight ? 'bg-slate-50 border-slate-200 focus:border-emerald-500 text-slate-900' : 'bg-brand-dark border-white/5 focus:border-brand-active text-white'}`} placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-medium opacity-80 uppercase tracking-widest ml-1 text-slate-400">Amount</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-[-0.01em] tabular-nums opacity-80 text-slate-900">$</span>
                      <input type="text" value={configAccount.autoTopUpAmount} onChange={(e) => updateAccountValue(configAccount.id, 'autoTopUpAmount', e.target.value)} className={`w-full pl-8 pr-4 py-4 rounded-2xl text-xs font-bold tracking-[-0.01em] tabular-nums outline-none border transition-all ${isLight ? 'bg-slate-50 border-slate-200 focus:border-emerald-500 text-slate-900' : 'bg-brand-dark border-white/5 focus:border-brand-active text-white'}`} placeholder="0.00" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <div className={`flex items-center gap-2 px-5 py-3 rounded-xl border ${isLight ? 'bg-emerald-50 border-emerald-100' : 'bg-emerald-500/5 border-emerald-500/10'}`}>
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[8px] font-medium opacity-80 uppercase tracking-widest text-emerald-500">Protocol Verified</span>
                  </div>
                  <button onClick={() => setConfigAccount(null)} className={`w-full py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95 ${isLight ? 'bg-slate-950 text-white hover:bg-slate-800' : 'bg-brand-active text-brand-dark'}`}>
                    Confirm Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
