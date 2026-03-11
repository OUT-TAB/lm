import { NextResponse } from "next/server";

export async function GET() {
  // Simulate database fetch
  const stats = {
    referralCode: "NEBULA-X721",
    totalReferrals: 124,
    totalEarned: 12450.50,
    availableBalance: 3240.25,
    pendingRewards: 850.00,
  };

  return NextResponse.json(stats);
}
