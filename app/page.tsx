"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { OverviewSection } from '../sections/OverviewSection';
import { BalanceSection } from '../sections/BalanceSection';
import { AdsSection } from '../sections/AdsSection';
import { ReferralSection } from '../sections/ReferralSection';
import { SupportSection } from '../sections/SupportSection';
import { ProfileSection } from '../sections/ProfileSection';
import { FloatingSupport } from '../components/FloatingSupport';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleAnimation = () => setIsAnimationEnabled(prev => !prev);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  useEffect(() => {
    if (!isAnimationEnabled) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
  }, [isAnimationEnabled]);

  const isLight = theme === 'light';

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewSection isLight={isLight} />;
      case 'balance': return <BalanceSection isLight={isLight} />;
      case 'ads': return <AdsSection isLight={isLight} />;
      case 'referral': return <ReferralSection isLight={isLight} />;
      case 'support': return <SupportSection isLight={isLight} />;
      case 'profile': return <ProfileSection isLight={isLight} />;
      default: return <OverviewSection isLight={isLight} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-dark theme-transition text-brand-textHigh">
      <Sidebar 
        activeId={activeTab} 
        setActiveId={setActiveTab} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden theme-transition">
        <Header 
          isSidebarCollapsed={isSidebarCollapsed} 
          setSidebarCollapsed={setIsSidebarCollapsed} 
          theme={theme}
          toggleTheme={toggleTheme}
          isAnimationEnabled={isAnimationEnabled}
          toggleAnimation={toggleAnimation}
        />
        
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth theme-transition">
          <div key={activeTab} className="animate-section">
            {renderContent()}
          </div>
        </div>
      </main>

      <FloatingSupport />
    </div>
  );
}