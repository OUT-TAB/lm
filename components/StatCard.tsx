"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export default function StatCard({ title, value, icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="nebula-card p-6 flex flex-col gap-4 relative overflow-hidden group"
    >
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${color}`} />
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400">{title}</span>
        <div className={`p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-purple-500/30 transition-all`}>
          <Icon className="h-5 w-5 text-purple-400" />
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-emerald-400 font-medium">+12%</span>
          <span className="text-xs text-gray-500">from last month</span>
        </div>
      </div>
    </motion.div>
  );
}
