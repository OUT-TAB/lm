"use client";

import React, { useState } from "react";
import { Copy, Check, Clipboard } from "lucide-react";
import { toast } from "sonner";

interface ReferralCodeCardProps {
  code: string;
}

export default function ReferralCodeCard({ code }: ReferralCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Referral code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="nebula-card p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Clipboard className="h-4 w-4 text-purple-400" />
        <span className="text-sm font-medium text-gray-300">Your Referral Code</span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-lg tracking-widest text-white">
          {code}
        </div>
        <button
          onClick={handleCopy}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30 hover:text-white transition-all active:scale-95"
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>
      
      <p className="text-xs text-gray-500">
        Share this code with your friends to earn 15% commission on their first ad spend.
      </p>
    </div>
  );
}
