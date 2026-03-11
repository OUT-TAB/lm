"use client";

import React, { useState } from "react";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface ReferralLinkCardProps {
  link: string;
}

export default function ReferralLinkCard({ link }: ReferralLinkCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Referral link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="nebula-card p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <LinkIcon className="h-4 w-4 text-pink-400" />
        <span className="text-sm font-medium text-gray-300">Your Referral Link</span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap">
          {link}
        </div>
        <button
          onClick={handleCopy}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-600/20 border border-pink-500/30 text-pink-400 hover:bg-pink-600/30 hover:text-white transition-all active:scale-95"
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>
      
      <p className="text-xs text-gray-500">
        Anyone who signs up using this link will be automatically attributed to you.
      </p>
    </div>
  );
}
