"use client";

import React from "react";
import { Bell, Search, User, Menu } from "lucide-react";

interface TopNavProps {
  onMenuClick?: () => void;
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-black/20 px-4 md:px-8 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="hidden md:flex w-96 items-center gap-3 rounded-full bg-white/5 px-4 py-2 border border-white/5 focus-within:border-purple-500/50 transition-all">
          <Search className="h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search campaigns, referrals..." 
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white transition-all">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-purple-500 border-2 border-black" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Alex Johnson</p>
            <p className="text-xs text-gray-500">Pro Advertiser</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 p-[2px]">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <User className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
