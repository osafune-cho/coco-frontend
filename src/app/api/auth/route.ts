import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
import "@liveblocks/react-comments/styles.css";
import "@liveblocks/react-comments/styles/dark/media-query.css";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  if (!process.env.LIVEBLOCKS_SECRET_KEY) {
    return new NextResponse("Missing LIVEBLOCKS_SECRET_KEY", { status: 403 });
  }
  const session = liveblocks.prepareSession(`user-${uuidv4()}`);

  const { room } = await request.json();
  session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();

  return new NextResponse(body, { status });
}