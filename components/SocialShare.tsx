"use client";

import React from "react";
import { MessageCircle, Facebook, Instagram, Share2 } from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  referralLink: string;
}

export default function SocialShare({ referralLink }: SocialShareProps) {
  const shareMessage = `Join me on Nebula Ad and start scaling your campaigns! Use my link to get a bonus: ${referralLink}`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case "instagram":
        // Instagram doesn't have a direct share URL for web, usually just copy link
        navigator.clipboard.writeText(referralLink);
        toast.info("Link copied! You can now paste it in your Instagram bio or story.");
        return;
      case "native":
        if (navigator.share) {
          navigator.share({
            title: "Nebula Ad Referral",
            text: shareMessage,
            url: referralLink,
          }).catch(console.error);
          return;
        }
        break;
    }
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-medium text-gray-400">Share on Social Media</span>
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => handleShare("whatsapp")}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-4 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/30 group"
        >
          <MessageCircle className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium text-gray-400 group-hover:text-white">WhatsApp</span>
        </button>
        
        <button
          onClick={() => handleShare("facebook")}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-4 transition-all hover:bg-blue-600/10 hover:border-blue-600/30 group"
        >
          <Facebook className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium text-gray-400 group-hover:text-white">Facebook</span>
        </button>
        
        <button
          onClick={() => handleShare("instagram")}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-4 transition-all hover:bg-pink-600/10 hover:border-pink-600/30 group"
        >
          <Instagram className="h-6 w-6 text-pink-500 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium text-gray-400 group-hover:text-white">Instagram</span>
        </button>
      </div>
      
      <button
        onClick={() => handleShare("native")}
        className="flex items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 py-3 text-sm font-medium text-purple-400 transition-all hover:bg-purple-500/20 hover:text-white"
      >
        <Share2 className="h-4 w-4" />
        More Share Options
      </button>
    </div>
  );
}
