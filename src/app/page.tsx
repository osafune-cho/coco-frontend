import { css } from "../../styled-system/css"
import NextLink from "next/link"

const mainStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  p: "20px",
})

const headingGroupStyle = css({
  textAlign: "center",
})

const headingStyle = css({
  fontSize: "4xl",
})

const subHeadingStyle = css({
  fontSize: "xl",
})

const buttonStyle = css({
  background: "green.400",
  px: "8px",
  py: "4px",
  rounded: "md",
  cursor: "pointer",
  _hover: {
    background: "green.500"
  }
})

export default function Home() {
  return (
    <div className={mainStyle}>
      <hgroup className={headingGroupStyle}>
        <h2 className={subHeadingStyle}>みんなで授業を受けるためのサービス</h2>
        <h1 className={headingStyle}>CO-CO</h1>
      </hgroup>
      <NextLink href="/sessions/new" className={buttonStyle}>新しい資料を登録</NextLink>
    </div>
  )
}
