
"use client";

import React from 'react';
import { MessageCircle, MessageSquareText } from 'lucide-react';

export const FloatingSupport: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[99] flex flex-col gap-4 animate-in slide-in-from-bottom-8 duration-700 lg:hidden">
      <a
        href="#"
        className="group relative flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-2xl shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 transition-all"
        aria-label="WhatsApp Dispatch"
      >
        <MessageCircle size={24} />
      </a>

      <button
        className="group relative flex items-center justify-center w-12 h-12 bg-brand-neon text-brand-dark rounded-2xl shadow-[0_10px_20px_rgba(0,242,234,0.3)] hover:scale-110 active:scale-95 transition-all"
        aria-label="Live Support"
      >
        <MessageSquareText size={24} />
      </button>
    </div>
  );
};
