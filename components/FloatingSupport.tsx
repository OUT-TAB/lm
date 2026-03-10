"use client";

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-brand-surface border border-brand-border rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-brand-neon to-brand-pink">
              <h3 className="text-brand-dark font-bold uppercase tracking-widest text-sm">Support Sync</h3>
              <p className="text-brand-dark/70 text-[10px] uppercase font-medium mt-1">Real-time assistance active</p>
            </div>
            
            <div className="p-6 h-64 overflow-y-auto bg-brand-dark/50">
              <div className="space-y-4">
                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                  <p className="text-[11px] text-brand-textHigh">Hello! How can we help you with your ad accounts today?</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-brand-border bg-brand-surface">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="TYPE MESSAGE..."
                  className="w-full bg-brand-dark border border-brand-border rounded-full py-3 px-5 text-[10px] uppercase tracking-widest focus:outline-none focus:border-brand-neon transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-neon rounded-full flex items-center justify-center text-brand-dark hover:scale-110 transition-transform">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 active:scale-90 ${
          isOpen 
            ? 'bg-brand-dark text-brand-neon border border-brand-neon/20 rotate-90' 
            : 'bg-gradient-to-br from-brand-neon to-brand-pink text-brand-dark shadow-[0_0_30px_rgba(34,211,238,0.3)]'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default FloatingSupport;
