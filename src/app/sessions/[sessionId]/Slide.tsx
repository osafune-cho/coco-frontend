"use client"

import { useInView } from "react-intersection-observer"
import { useOthers, useUpdateMyPresence } from "../../../../liveblocks.config"
import { css } from "../../../../styled-system/css"

export const Slide: React.FC<{ idx: number, url: string }> = ({ idx, url }) => {
  const others = useOthers()
  const updateMyPresense = useUpdateMyPresence()
  const { ref, inView, entry } = useInView({
    onChange: (inView, entry) => {
      if (inView) {
        updateMyPresense({
          currentPageIndex: idx,
        })
      }
    }
  })

  return (
    <img
      id={`slide-${idx}`}
      ref={ref}
      src={url}
      className={
        css({
          width: "full",
          maxWidth: "800px",
        })
      }
      style={{
        borderColor: others.find(other => other.presence.currentPageIndex == idx)?.presence.color,
        border: "solid",
        borderWidth: others.some(other => other.presence.currentPageIndex == idx) ? "4px" : "0px",
      }}
    />)
}