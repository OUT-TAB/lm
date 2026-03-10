import React from 'react';

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  status: "pending" | "approved";
  commission: number;
  createdAt: string;
  userEmail?: string;
}

export interface UserReferralSummary {
  referralCode: string;
  totalReferrals: number;
  totalEarned: number;
  availableBalance: number;
  pendingRewards: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
