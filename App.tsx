import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewSection } from './sections/OverviewSection';
import { BalanceSection } from './sections/BalanceSection';
import { AdsSection } from './sections/AdsSection';
import { ReferralSection } from './sections/ReferralSection';
import { SupportSection } from './sections/SupportSection';
import { ProfileSection } from './sections/ProfileSection';
import { FloatingSupport } from './components/FloatingSupport';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sidebar-collapsed') === 'true';
    }
    return false;
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useLayoutEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
    localStorage.setItem('sidebar-collapsed', String(collapsed));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const isLight = theme === 'light';

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewSection onNavigate={handleTabChange} isLight={isLight} />;
      case 'balance': return <BalanceSection isLight={isLight} />;
      case 'ads': return <AdsSection isLight={isLight} />;
      case 'referral': return <ReferralSection isLight={isLight} />;
      case 'support': return <SupportSection isLight={isLight} />;
      case 'profile': return <ProfileSection isLight={isLight} />;
      default: return <OverviewSection onNavigate={handleTabChange} isLight={isLight} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-dark overflow-hidden text-brand-textHigh theme-transition">
      <Sidebar 
        activeId={activeTab} 
        setActiveId={handleTabChange} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={handleSidebarCollapse}
      />
      
      <main className="flex-1 flex flex-col min-w-0 theme-transition accelerate relative">
        <Header 
          isSidebarCollapsed={isSidebarCollapsed} 
          setSidebarCollapsed={handleSidebarCollapse} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth no-scrollbar theme-transition">
          <div className="max-w-[1600px] mx-auto">
            {/* 
              KEY TRICK: By adding 'key={activeTab}', React will treat this div as a 
              new element every time the tab changes, re-triggering the 
              'animate-section' CSS animation automatically.
            */}
            <div key={activeTab} className="animate-section">
              {renderContent()}
            </div>
          </div>
        </div>

        {!isSidebarCollapsed && window.innerWidth < 1024 && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => handleSidebarCollapse(true)}
          />
        )}
      </main>

      <FloatingSupport />
    </div>
  );
};

export default App;