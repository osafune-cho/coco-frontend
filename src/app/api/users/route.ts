import { NextRequest, NextResponse } from "next/server";

/**
 * Get a user's info from their ID
 * For `resolveUser` in liveblocks.config.ts
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId || !userId.startsWith("user-")) {
    return new NextResponse("Missing or invalid userId", { status: 400 });
  }

  return NextResponse.json({
    name: "Ringo Shina",
    avatar: `https://liveblocks.io/avatars/avatar-1.png`,
  });
}