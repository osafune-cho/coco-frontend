import NextLink from "next/link"
import { css } from "../../styled-system/css"
import { Quicksand } from "next/font/google"
import { Noto_Sans_JP } from "next/font/google"
import cocologo_type from "../../public/logo/cocologo_type.webp"
import Image from "next/image"

const Noto_Sans_JP700 = Noto_Sans_JP({
  weight: '700',
  preload: false,
})

const headerStyle = css({
  background: "#eae6d2",
  // position: "fixed",
  width: "100%",
  height: "75px",
  display: "flex",
  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
})

const logoStyle = css({
  marginLeft: "20px",
  height: "75px",
  width: "auto",
})

export const Header = () => {
  return (
    <header className={headerStyle}>
      <NextLink href="/">
        <Image className={logoStyle} src={cocologo_type} alt="CO-CO" />
      </NextLink>

    </header>
  )
}