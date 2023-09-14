"use client"

import React from "react"
import { useMyPresence, useOthers } from "../../../../liveblocks.config"
import { Material } from "./page"
import { css } from "../../../../styled-system/css"

const imagesStyle = css({
  width: "full",
  minHeight: "100svh",
  background: "#5c5c5c",
  display: "grid",
  gap: "20px",
  padding: "20px",
  justifyContent: "center",
})

export const Slides: React.FC<{ materials: Material[] }> = ({ materials }) => {
  const presense = useMyPresence()
  const others = useOthers()

  return (
    <div className={imagesStyle}>
      {materials.map((material, idx) => {
        return (<img key={idx} id={`slide-${idx}`} src={material.url} className={
          css({
            width: "full",
            maxWidth: "800px",
            border: "solid",
            borderColor: "orange.400",
            borderWidth: others.some(other => other.presence.currentPageIndex == idx) ? "4px" : "0px",
          })
        } />)
      })}
    </div>
  )
}