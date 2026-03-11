import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();

  // Simulate validation logic
  if (code === "NEBULA-X721") {
    return NextResponse.json({ valid: true, message: "Valid referral code" });
  }

  return NextResponse.json({ valid: false, message: "Invalid referral code" }, { status: 400 });
}
