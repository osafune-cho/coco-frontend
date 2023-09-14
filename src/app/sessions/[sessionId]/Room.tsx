"use client"

import React from "react"
import { RoomProvider } from "../../../../liveblocks.config"
import { LiveList, LiveObject } from "@liveblocks/client"

export const Room: React.FC<React.PropsWithChildren<{ roomId: string }>> = ({ roomId, children }) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}} initialStorage={{
      comments: new LiveList<LiveObject<{ author: string, message: string }>>([]),
    }}>
      {children}
    </RoomProvider>
  )
}