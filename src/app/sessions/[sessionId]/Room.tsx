"use client"

import React from "react"
import { RoomProvider } from "../../../../liveblocks.config"
import { LiveList, LiveObject } from "@liveblocks/client"

const getRandomColor = () => {
  const h = Math.random() * 360
  return `hsl(${h}, 100%, 40%)`
}

export const Room: React.FC<React.PropsWithChildren<{ roomId: string }>> = ({ roomId, children }) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        currentPageIndex: 0,
        isTyping: false,
        color: getRandomColor()
      }}
      initialStorage={{
        comments: new LiveList<LiveObject<{ author: string, message: string, color: string }>>([]),
      }}
    >
      {children}
    </RoomProvider>
  )
}