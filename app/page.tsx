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
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const [isScrolling, setIsScrolling] = useState(false);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScrollEvent = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 250);
    };

    container.addEventListener('scroll', handleScrollEvent, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScrollEvent);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

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
        isScrolling={isScrolling}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden theme-transition">
        <Header 
          isSidebarCollapsed={isSidebarCollapsed} 
          setSidebarCollapsed={setIsSidebarCollapsed} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-6 scroll-smooth theme-transition relative"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="animate-section relative"
            >
              {/* Nano Light Sweep Effect - Only in Dark Mode */}
              {!isLight && (
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.1 }}
                  className="absolute top-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-brand-neon/40 to-transparent z-10 pointer-events-none"
                />
              )}
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <FloatingSupport />
    </div>
  );
}