
// Fix: Import React to resolve React.ReactNode namespace errors
import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface MetricData {
  label: string;
  value: string;
  trend?: number;
  icon: React.ReactNode;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface BarDataPoint {
  date: string;
  topups: number;
  withdrawals: number;
}