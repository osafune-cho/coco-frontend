"use client";

import { LiveList, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

type Presense = {
  currentPageIndex: number,
  isTyping: boolean,
  color: string,
}

type Storage = {
  comments: LiveList<LiveObject<{ author: string, message: string, color: string }>>,
}

export const {
  suspense: { RoomProvider, useMutation, useStorage, useMyPresence, useUpdateMyPresence, useOthers },
} = createRoomContext<Presense, Storage>(client);
