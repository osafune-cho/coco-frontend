"use client"

import React from "react"
import { Material } from "./page"
import { css } from "../../../../styled-system/css"
import { Slide } from "./Slide"

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

  return (
    <div className={imagesStyle}>
      {materials.map((material, idx) => {
        return (
          <Slide key={idx} idx={idx} url={material.url} />
        )
      })}
    </div>
  )
}