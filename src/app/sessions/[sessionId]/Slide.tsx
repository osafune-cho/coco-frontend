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

  const othersOnThisSlide = others.filter(other => other.presence.currentPageIndex === idx)

  return (
    <div className={css({
      display: "grid",
      gridTemplateColumns: "12px 1fr",
      gap: "8px",
    })}>
      <div className={css({
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      })}>
        {othersOnThisSlide.map((other) =>
          <div
            className={css({
              width: "12px",
              height: "12px",
              rounded: "full",
            })}
            style={{ background: other.presence.color }}
          >

          </div>
        )}</div>
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
          borderColor: othersOnThisSlide?.at(0)?.presence?.color ?? "none",
          border: "solid",
          borderWidth: othersOnThisSlide.length > 0 ? "4px" : "0px",
        }}
      />
    </div>
  )
}