"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import ReferralTabs from "@/components/ReferralTabs";
import StatCard from "@/components/StatCard";
import ReferralCodeCard from "@/components/ReferralCodeCard";
import ReferralLinkCard from "@/components/ReferralLinkCard";
import SocialShare from "@/components/SocialShare";
import { 
  Users, 
  DollarSign, 
  Wallet, 
  Hourglass,
  ArrowRight,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import { UserReferralSummary, Referral } from "@/types";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "withdraw", label: "Withdraw & Convert" },
  { id: "referrals", label: "Your Referrals" },
  { id: "history", label: "Withdrawal History" },
];

const mockSummary: UserReferralSummary = {
  referralCode: "NEBULA-X721",
  totalReferrals: 124,
  totalEarned: 12450.50,
  availableBalance: 3240.25,
  pendingRewards: 850.00,
};

const mockReferrals: Referral[] = [
  { id: "1", referrerId: "me", referredUserId: "user_1", status: "approved", commission: 150, createdAt: "2024-03-01", userEmail: "john***@gmail.com" },
  { id: "2", referrerId: "me", referredUserId: "user_2", status: "pending", commission: 75, createdAt: "2024-03-05", userEmail: "sara***@yahoo.com" },
  { id: "3", referrerId: "me", referredUserId: "user_3", status: "approved", commission: 220, createdAt: "2024-03-08", userEmail: "mike***@outlook.com" },
];

export default function ReferralsPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [summary, setSummary] = useState<UserReferralSummary>(mockSummary);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/referrals/stats");
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Failed to fetch referral stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const referralLink = `https://app.nebula.com/register?ref=${summary.referralCode}`;

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-64">
        <TopNav onMenuClick={() => setIsSidebarOpen(true)} />
        <Toaster position="top-right" theme="dark" richColors />
        
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Referral Program Dashboard</h1>
            <p className="text-gray-400 mt-1">Invite your network and earn commissions on their advertising spend.</p>
          </div>

          <div className="nebula-card overflow-hidden">
            <ReferralTabs 
              tabs={tabs} 
              activeTab={activeTab} 
              onChange={setActiveTab} 
            />

            <div className="p-8">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-32 rounded-xl bg-white/5 animate-pulse" />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "dashboard" && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <StatCard 
                            title="Total Referrals" 
                            value={summary.totalReferrals} 
                            icon={Users} 
                            color="bg-blue-500"
                            delay={0.1}
                          />
                          <StatCard 
                            title="Total Earned" 
                            value={`$${summary.totalEarned.toLocaleString()}`} 
                            icon={DollarSign} 
                            color="bg-emerald-500"
                            delay={0.2}
                          />
                          <StatCard 
                            title="Available Balance" 
                            value={`$${summary.availableBalance.toLocaleString()}`} 
                            icon={Wallet} 
                            color="bg-purple-500"
                            delay={0.3}
                          />
                          <StatCard 
                            title="Pending Rewards" 
                            value={`$${summary.pendingRewards.toLocaleString()}`} 
                            icon={Hourglass} 
                            color="bg-amber-500"
                            delay={0.4}
                          />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-xl font-semibold text-white">Your Referral Dashboard</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <ReferralCodeCard code={summary.referralCode} />
                              <ReferralLinkCard link={referralLink} />
                            </div>
                            
                            <div className="nebula-card p-6">
                              <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-white">Recent Referrals</h3>
                                <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                                  View All <ChevronRight className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="space-y-4">
                                {mockReferrals.map((ref) => (
                                  <div key={ref.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-4">
                                      <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">
                                        {ref.userEmail?.[0]?.toUpperCase() || "U"}
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-white">{ref.userEmail}</p>
                                        <p className="text-xs text-gray-500">{ref.createdAt}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-semibold text-white">+${ref.commission}</p>
                                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                                        ref.status === "approved" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                                      }`}>
                                        {ref.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <SocialShare referralLink={referralLink} />
                            
                            <div className="nebula-card p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
                              <h3 className="font-semibold text-white mb-2">How it works</h3>
                              <ul className="space-y-4 mt-4">
                                <li className="flex gap-3">
                                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white">1</div>
                                  <p className="text-xs text-gray-300">Share your unique referral link or code with your network.</p>
                                </li>
                                <li className="flex gap-3">
                                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white">2</div>
                                  <p className="text-xs text-gray-300">Friends sign up and activate their advertising accounts.</p>
                                </li>
                                <li className="flex gap-3">
                                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white">3</div>
                                  <p className="text-xs text-gray-300">Earn 15% commission on their ad spend, paid out monthly.</p>
                                </li>
                              </ul>
                              <button className="w-full mt-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                                Read Full Terms <ExternalLink className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "withdraw" && (
                      <div className="py-20 text-center space-y-4">
                        <div className="h-20 w-20 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto">
                          <Wallet className="h-10 w-10 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Withdraw & Convert</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                          You have <span className="text-white font-bold">${summary.availableBalance}</span> available for withdrawal.
                        </p>
                        <button className="px-8 py-3 rounded-xl nebula-gradient-bg text-white font-bold shadow-lg shadow-purple-500/20 hover:scale-105 transition-all">
                          Request Withdrawal
                        </button>
                      </div>
                    )}

                    {activeTab === "referrals" && (
                      <div className="py-20 text-center space-y-4">
                        <div className="h-20 w-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto">
                          <Users className="h-10 w-10 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Your Referrals</h3>
                        <p className="text-gray-400">You have referred {summary.totalReferrals} users to Nebula Ad.</p>
                        <button className="text-purple-400 hover:underline">Download full report (CSV)</button>
                      </div>
                    )}

                    {activeTab === "history" && (
                      <div className="py-20 text-center space-y-4">
                        <div className="h-20 w-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
                          <Hourglass className="h-10 w-10 text-amber-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Withdrawal History</h3>
                        <p className="text-gray-400">No withdrawal history found for your account yet.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
