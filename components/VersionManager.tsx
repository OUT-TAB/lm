"use client";

import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { History, ShieldAlert, RotateCcw, Save, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BackupVersion {
  id: string;
  name: string;
  timestamp: string;
  type: 'auto' | 'manual';
  status: 'active' | 'archived';
}

export const VersionManager: React.FC = () => {
  const [backups, setBackups] = useState<BackupVersion[]>([
    {
      id: 'v1',
      name: 'Initial UI Structure',
      timestamp: '2026-03-10 10:30:00',
      type: 'manual',
      status: 'archived'
    },
    {
      id: 'v2',
      name: 'Dashboard Icons Update',
      timestamp: '2026-03-10 11:40:00',
      type: 'auto',
      status: 'active'
    }
  ]);

  const [isRestoring, setIsRestoring] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [restoreTarget, setRestoreTarget] = useState<BackupVersion | null>(null);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      const newBackup: BackupVersion = {
        id: `v${backups.length + 1}`,
        name: `Manual Snapshot ${backups.length + 1}`,
        timestamp: new Date().toLocaleString(),
        type: 'manual',
        status: 'active'
      };
      setBackups([newBackup, ...backups]);
      setIsBackingUp(false);
    }, 1500);
  };

  const initiateRestore = (version: BackupVersion) => {
    setRestoreTarget(version);
    setShowWarning(true);
  };

  const executeRestore = () => {
    setShowWarning(false);
    setIsRestoring(true);
    
    // Simulate auto-backup before restore
    const autoBackup: BackupVersion = {
      id: `auto-${Date.now()}`,
      name: 'app_backup_before_restore',
      timestamp: new Date().toLocaleString(),
      type: 'auto',
      status: 'active'
    };
    
    setTimeout(() => {
      setBackups([autoBackup, ...backups]);
      setIsRestoring(false);
      setRestoreTarget(null);
      // In a real app, this would trigger a code revert or state reset
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <History className="text-brand-neon" size={24} />
          <h3 className="text-xl font-bold uppercase tracking-tight">Version History System</h3>
        </div>
        <button
          onClick={handleCreateBackup}
          disabled={isBackingUp}
          className="px-6 py-2 bg-brand-neon/10 border border-brand-neon/20 text-brand-neon rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-neon/20 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isBackingUp ? <RotateCcw className="animate-spin" size={14} /> : <Save size={14} />}
          {isBackingUp ? 'Creating Snapshot...' : 'Create Snapshot'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {backups.map((backup) => (
          <GlassCard key={backup.id} className="!p-4 group/item">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${backup.type === 'auto' ? 'bg-brand-pink/10 text-brand-pink' : 'bg-brand-neon/10 text-brand-neon'}`}>
                  {backup.type === 'auto' ? <ShieldAlert size={20} /> : <CheckCircle2 size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-tight">{backup.name}</h4>
                  <p className="text-[10px] text-brand-textLow uppercase tracking-widest font-medium">{backup.timestamp}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-[8px] px-2 py-1 rounded-full font-bold uppercase tracking-widest ${backup.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-500/10 text-zinc-500'}`}>
                  {backup.status}
                </span>
                <button
                  onClick={() => initiateRestore(backup)}
                  className="opacity-0 group-hover/item:opacity-100 transition-all px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest"
                >
                  Restore
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Restore Warning Modal */}
      <AnimatePresence>
        {showWarning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
              onClick={() => setShowWarning(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md"
            >
              <GlassCard className="!p-8 border-brand-pink/20">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink">
                    <AlertTriangle size={32} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase text-white">Critical Warning</h3>
                    <p className="text-sm text-brand-textLow leading-relaxed">
                      Restoring will overwrite the current application. 
                      <span className="text-brand-neon block mt-2 font-bold">A backup will be created automatically before proceeding.</span>
                    </p>
                  </div>

                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => setShowWarning(false)}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={executeRestore}
                      className="flex-1 py-3 bg-brand-pink text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,80,0.3)] transition-all hover:scale-[1.02]"
                    >
                      Confirm Restore
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Restore Progress Overlay */}
      <AnimatePresence>
        {isRestoring && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-dark/95 backdrop-blur-xl">
            <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-brand-neon/10" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-24 h-24 rounded-full border-4 border-t-brand-neon border-r-transparent border-b-transparent border-l-transparent"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <RotateCcw className="text-brand-neon animate-pulse" size={32} />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold uppercase tracking-tighter text-white">Restoring System State</h3>
                <p className="text-[10px] text-brand-neon uppercase tracking-[0.3em] font-black animate-pulse">
                  Creating app_backup_before_restore...
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
