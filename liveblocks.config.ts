"use client";

import { LiveList, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

export const client = createClient({
  // authEndpoint: "/api/liveblocks-auth",
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
});

type Presense = {

}

type Storage = {
  comments: LiveList<string>,
}

const {
  // suspense: { RoomProvider, useMutation },
  RoomProvider, useMutation, useStorage
} = createRoomContext<Presense, Storage>(client);

export { RoomProvider, useMutation, useStorage };