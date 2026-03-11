import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { User, Shield, Bell, Key, Save, Download } from 'lucide-react';

// Fix: Define props interface to include isLight
interface ProfileSectionProps {
  isLight?: boolean;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ isLight = false }) => {
  // Fix: Removed internal isLight check in favor of props with a default value

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 pt-0">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 text-left">
          <h2 className="text-4xl font-bold text-brand-textHigh tracking-widest uppercase">Profile Core</h2>
          <p className="text-sm font-medium text-slate-400 mt-2">Manage your operational identity and sync parameters.</p>
        </div>
        <button className={`px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 border ${isLight ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm' : 'bg-brand-surface border-brand-border text-brand-textLow hover:text-white'}`}>
          <Download size={14} />
          Extract Intel Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <nav className={`flex flex-col gap-1.5 p-1.5 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/[0.02] border-white/5'}`}>
            {[
              { label: 'Identity', icon: <User size={18} />, active: true },
              { label: 'Security', icon: <Shield size={18} /> },
              { label: 'Alerts', icon: <Bell size={18} /> },
              { label: 'Integrations', icon: <Key size={18} /> },
            ].map((item) => (
              <button 
                key={item.label}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                  item.active 
                    ? (isLight ? 'bg-brand-pink text-white shadow-lg' : 'bg-brand-neon/10 text-brand-neon shadow-lg ring-1 ring-brand-neon/20') 
                    : (isLight ? 'text-slate-500 hover:bg-slate-50' : 'text-brand-textLow hover:bg-white/5 hover:text-white')
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <GlassCard className="relative overflow-hidden border-none shadow-xl">
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] -z-10 ${isLight ? 'bg-brand-pink/5' : 'bg-brand-neon/5'}`} />
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="relative group">
                <div className={`w-32 h-32 rounded-[2.5rem] p-1 rotate-3 group-hover:rotate-0 transition-transform ${isLight ? 'bg-brand-pink shadow-xl' : 'bg-gradient-to-br from-brand-neon via-white to-brand-pink'}`}>
                   <div className={`w-full h-full rounded-[2.3rem] flex items-center justify-center text-4xl font-bold ${isLight ? 'bg-white text-brand-pink' : 'bg-brand-dark text-white'}`}>
                      JD
                   </div>
                </div>
                <button className={`absolute -bottom-1 -right-1 p-3 rounded-2xl border-4 transition-all hover:scale-110 shadow-lg ${isLight ? 'bg-slate-950 text-white border-white' : 'bg-brand-pink text-white border-brand-surface'}`}>
                  <User size={18} />
                </button>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-bold text-brand-textHigh tracking-[-0.01em] leading-none">John Doe</h3>
                <p className="text-brand-textLow text-[10px] font-medium uppercase tracking-widest mt-3 opacity-80">Sync ID: #928310 • Node Level 3</p>
                <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
                  <span className={`text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest border ${isLight ? 'bg-brand-pink/10 border-brand-pink/20 text-brand-pink' : 'bg-brand-neon/10 border-brand-neon/20 text-brand-neon'}`}>Operational Elite</span>
                  <span className={`text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest border ${isLight ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-white/5 border-white/10 text-brand-textLow'}`}>US Server Alpha</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: 'Public Alias', val: 'John' },
                { label: 'Entity Signature', val: 'Doe' },
                { label: 'Secure Email', val: 'john.doe@nebula.io', disabled: true },
                { label: 'Operational Handle', val: '@nebula_admin' }
              ].map((field, i) => (
                <div key={i} className="space-y-3">
                  <label className="text-[10px] font-medium text-brand-textLow uppercase tracking-widest ml-1 opacity-80">{field.label}</label>
                  <input 
                    type="text" 
                    defaultValue={field.val} 
                    disabled={field.disabled}
                    className={`w-full rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 transition-all border ${
                      isLight 
                        ? (field.disabled ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-brand-pink/20 focus:border-brand-pink') 
                        : (field.disabled ? 'bg-white/5 border-white/10 text-brand-textLow cursor-not-allowed opacity-40' : 'bg-white/5 border-white/10 text-white focus:ring-brand-neon/20 focus:border-brand-neon')
                    }`} 
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <button className={`px-12 py-5 font-bold rounded-2xl flex items-center gap-4 transition-all uppercase text-xs tracking-widest ${isLight ? 'claim-yield-gradient text-white' : 'bg-brand-neon text-brand-dark shadow-xl hover:scale-[1.02]'}`}>
                <Save size={20} /> Save Configuration
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};