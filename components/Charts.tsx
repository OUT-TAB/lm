
"use client";

import React from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell
} from 'recharts';
import { ChartDataPoint, BarDataPoint } from '../types';

const mockLineData: ChartDataPoint[] = [
  { date: 'Jan 14', value: 50 }, { date: 'Jan 16', value: 20 }, { date: 'Jan 18', value: 500 },
  { date: 'Jan 20', value: 25 }, { date: 'Jan 22', value: 30 }, { date: 'Jan 24', value: 20 },
  { date: 'Jan 26', value: 10 }, { date: 'Jan 28', value: 15 }, { date: 'Jan 30', value: 10 },
  { date: 'Feb 2', value: 300 }, { date: 'Feb 4', value: 20 }, { date: 'Feb 6', value: 15 },
];

const mockBarData: BarDataPoint[] = [
  { date: 'Jan 14', topups: 10, withdrawals: 5 },
  { date: 'Jan 16', topups: 35, withdrawals: 12 },
  { date: 'Jan 18', topups: 100, withdrawals: 35 },
  { date: 'Jan 20', topups: 140, withdrawals: 10 },
  { date: 'Jan 22', topups: 70, withdrawals: 25 },
  { date: 'Jan 24', topups: 80, withdrawals: 40 },
  { date: 'Jan 26', topups: 20, withdrawals: 10 },
  { date: 'Jan 28', topups: 10, withdrawals: 5 },
  { date: 'Jan 30', topups: 25, withdrawals: 15 },
  { date: 'Feb 2', topups: 65, withdrawals: 10 },
  { date: 'Feb 4', topups: 35, withdrawals: 8 },
  { date: 'Feb 6', topups: 20, withdrawals: 5 },
];

const mockKPIData = [
  { date: '01/02', cpc: 0.45, cpa: 12.5, ctr: 2.1, roas: 4.1, prev_roas: 3.8 },
  { date: '02/02', cpc: 0.42, cpa: 11.8, ctr: 2.4, roas: 4.5, prev_roas: 4.0 },
  { date: '03/02', cpc: 0.48, cpa: 14.2, ctr: 1.9, roas: 3.8, prev_roas: 4.1 },
  { date: '04/02', cpc: 0.41, cpa: 10.5, ctr: 2.8, roas: 5.2, prev_roas: 4.5 },
  { date: '05/02', cpc: 0.39, cpa: 9.8, ctr: 3.1, roas: 5.8, prev_roas: 4.8 },
  { date: '06/02', cpc: 0.42, cpa: 12.1, ctr: 2.4, roas: 4.2, prev_roas: 4.2 },
];

const CustomTooltip = ({ active, payload, label, prefix = "$" }: any) => {
  const isLight = typeof document !== 'undefined' && document.body.classList.contains('light-mode');
  
  if (active && payload && payload.length) {
    return (
      <div className={`${isLight ? 'bg-white border-slate-200' : 'bg-[#121212] border-white/10'} border p-3 rounded-xl shadow-2xl backdrop-blur-md`}>
        <p className="text-brand-textLow text-[10px] font-medium uppercase tracking-wider mb-2 opacity-80">{label}</p>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-3 mt-1">
             <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color || item.stroke || item.fill }} />
             <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold text-xs tabular-nums`}>
                {item.name}: <span style={{ color: item.color || item.stroke || item.fill }}>{prefix}{item.value}</span>
             </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Sparkline: React.FC<{ data: number[], color: string }> = ({ data, color }) => (
  <div className="h-10 w-24">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((v, i) => ({ v, i }))}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} animationDuration={1000} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const KPIPerformanceChart: React.FC<{ metric: 'cpc' | 'cpa' | 'ctr' | 'roas' }> = ({ metric }) => {
  const isLight = typeof document !== 'undefined' && document.body.classList.contains('light-mode');
  const configs = {
    cpc: { color: isLight ? '#00D1C1' : '#00F2EA', name: 'CPC', prefix: '$' },
    cpa: { color: '#FF0050', name: 'CPA', prefix: '$' },
    ctr: { color: isLight ? '#0F172A' : '#FFFFFF', name: 'CTR', prefix: '' },
    roas: { color: isLight ? '#00D1C1' : '#00F2EA', name: 'ROAS', prefix: '' }
  };
  const current = configs[metric];

  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockKPIData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`color${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={current.color} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={current.color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={isLight ? '#F1F5F9' : '#2A2A2A'} strokeDasharray="3 3" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: isLight ? '#64748B' : '#94A3B8', fontSize: 10 }} />
          <YAxis hide />
          <Tooltip content={<CustomTooltip prefix={current.prefix} />} />
          <Area type="monotone" dataKey={metric} name={current.name} stroke={current.color} strokeWidth={3} fill={`url(#color${metric})`} animationDuration={1000} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const EfficiencyCorrelationChart: React.FC = () => {
  const isLight = typeof document !== 'undefined' && document.body.classList.contains('light-mode');
  return (
    <div className="h-[280px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={[
          { name: 'Mon', spend: 4000, roas: 2.4 },
          { name: 'Tue', spend: 3000, roas: 3.2 },
          { name: 'Wed', spend: 2000, roas: 4.5 },
          { name: 'Thu', spend: 2780, roas: 3.9 },
          { name: 'Fri', spend: 1890, roas: 4.8 },
          { name: 'Sat', spend: 2390, roas: 5.1 },
          { name: 'Sun', spend: 3490, roas: 4.0 },
        ]}>
          <CartesianGrid stroke={isLight ? '#F1F5F9' : '#2A2A2A'} vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isLight ? '#64748B' : '#94A3B8', fontSize: 10 }} />
          <YAxis yAxisId="left" hide />
          <YAxis yAxisId="right" orientation="right" hide />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '10px' }} />
          <Bar yAxisId="left" dataKey="spend" name="Spend ($)" fill="#FF0050" radius={[4, 4, 0, 0]} barSize={20} />
          <Line yAxisId="right" type="monotone" dataKey="roas" name="ROAS (x)" stroke={isLight ? '#00D1C1' : '#00F2EA'} strokeWidth={4} dot={{ r: 4, fill: isLight ? '#00D1C1' : '#00F2EA' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PlatformDistributionRadar: React.FC = () => {
  const isLight = typeof document !== 'undefined' && document.body.classList.contains('light-mode');
  return (
    <div className="h-[280px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
          { subject: 'TikTok', A: 120, B: 110 },
          { subject: 'FB/IG', A: 98, B: 130 },
          { subject: 'Google', A: 86, B: 130 },
          { subject: 'Snap', A: 99, B: 100 },
          { subject: 'Native', A: 85, B: 90 },
        ]}>
          <PolarGrid stroke={isLight ? '#E2E8F0' : '#2A2A2A'} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: isLight ? '#64748B' : '#94A3B8', fontSize: 9, fontWeight: 'bold' }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
          <Radar name="Spend" dataKey="A" stroke={isLight ? '#00D1C1' : '#00F2EA'} fill={isLight ? '#00D1C1' : '#00F2EA'} fillOpacity={0.4} />
          <Radar name="Revenue" dataKey="B" stroke="#FF0050" fill="#FF0050" fillOpacity={0.4} />
          <Tooltip content={<CustomTooltip prefix="" />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
