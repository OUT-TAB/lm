"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Calendar,
  ChevronDown,
  TrendingUp,
  Activity,
  Check
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { StatsGrid } from '../components/StatsGrid';
import { GlassCard } from '../components/GlassCard';

interface OverviewSectionProps {
  onNavigate?: (tab: string) => void;
  isLight?: boolean;
}

const mockWalletData = [
  { date: '01/02', value: 400 },
  { date: '02/02', value: 1200 },
  { date: '03/02', value: 900 },
  { date: '04/02', value: 2400 },
  { date: '05/02', value: 1800 },
  { date: '06/02', value: 2100 },
  { date: '07/02', value: 3000 },
];

const mockActivityData = [
  { date: '01/02', topups: 400, withdrawals: 120 },
  { date: '02/02', topups: 800, withdrawals: 300 },
  { date: '03/02', topups: 600, withdrawals: 450 },
  { date: '04/02', topups: 1200, withdrawals: 200 },
  { date: '05/02', topups: 1000, withdrawals: 800 },
  { date: '06/02', topups: 1500, withdrawals: 300 },
  { date: '07/02', topups: 1300, withdrawals: 400 },
];

const DATE_OPTIONS = [
  'Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month'
];

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigate, isLight = false }) => {
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-6 theme-transition pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className={`text-3xl font-black tracking-tight uppercase italic leading-none ${isLight ? 'text-slate-900' : 'text-brand-textHigh'}`}>Dashboard</h2>
          <p className="text-[11px] font-bold uppercase tracking-widest mt-2 opacity-40">Operational Performance Hub</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all active:scale-95 ${
                isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0F0F0F] border-white/5 text-white'
              }`}
            >
              <Calendar size={14} className="text-brand-neon" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">{timeRange}</span>
              <ChevronDown size={14} className={`opacity-40 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFilterOpen && (
              <div className={`absolute top-full mt-2 right-0 w-56 rounded-2xl overflow-hidden z-50 shadow-2xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#121212] border-white/10'
              }`}>
                {DATE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => { setTimeRange(option); setIsFilterOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest italic transition-all ${
                      timeRange === option ? 'bg-brand-neon/10 text-brand-neon' : 'text-zinc-500 hover:bg-white/5'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => onNavigate?.('balance')}
            className={`px-8 py-3 bg-gradient-to-r from-brand-neon to-brand-pink text-brand-dark text-[10px] uppercase tracking-widest italic rounded-full font-black flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all`}
          >
            <Plus size={16} strokeWidth={3} /> Add Balance
          </button>
        </div>
      </div>

      <StatsGrid isLight={isLight} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="p-8">
            <div className="flex justify-between items-start mb-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-brand-neon" />
                  <h3 className={`text-lg font-black uppercase italic leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>WALLET DEPOSITS</h3>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Daily inflow to your main balance</p>
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-brand-neon">+14.2% Growth</div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockWalletData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWallet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F2EA" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00F2EA" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke={isLight ? '#F1F5F9' : '#1A1A1A'} strokeDasharray="3 3" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: isLight ? '#94A3B8' : '#404040', fontSize: 9, fontWeight: '800' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: isLight ? '#94A3B8' : '#404040', fontSize: 9, fontWeight: '800' }} />
                  <Tooltip 
                    cursor={{ stroke: '#00F2EA', strokeWidth: 1 }}
                    contentStyle={{ backgroundColor: isLight ? '#fff' : '#080808', border: '1px solid #1A1A1A', borderRadius: '12px', fontSize: '10px' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#00F2EA" strokeWidth={4} fill="url(#colorWallet)" animationDuration={1000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-8">
            <div className="flex justify-between items-start mb-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Activity size={16} className="text-brand-pink" />
                  <h3 className={`text-lg font-black uppercase italic leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>AD ACCOUNT ACTIVITY</h3>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Top-ups vs Withdrawals by day</p>
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-brand-pink">Stable Sync</div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockActivityData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke={isLight ? '#F1F5F9' : '#1A1A1A'} strokeDasharray="3 3" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: isLight ? '#94A3B8' : '#404040', fontSize: 9, fontWeight: '800' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: isLight ? '#94A3B8' : '#404040', fontSize: 9, fontWeight: '800' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: isLight ? '#fff' : '#080808', border: '1px solid #1A1A1A', borderRadius: '12px', fontSize: '10px' }}
                  />
                  <Legend 
                    iconType="circle" 
                    wrapperStyle={{ paddingTop: '20px', fontSize: '9px', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '0.1em' }} 
                  />
                  <Bar dataKey="topups" name="TOP-UPS" fill="#00F2EA" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="withdrawals" name="WITHDRAWALS" fill="#FF0050" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};