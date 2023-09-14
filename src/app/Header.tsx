import NextLink from "next/link"
import { css } from "../../styled-system/css"
import { Quicksand } from "next/font/google"

const Quicksand700 = Quicksand({
  weight: '700',
  preload: false,
})

const headerStyle = css({
  bottom: "20px",
  left: "20px",
  position: "fixed",
  zIndex: 200,
  width: "100%",
})

const logoStyle = css({
  fontSize: "2xl",
  alignItems: "center",
})

export const Header = () => {
  return (
    <header className={headerStyle}>
      <NextLink href="/">
        <div className={logoStyle}>
          <h1 className={Quicksand700.className}>CO-CO</h1>
        </div>
      </NextLink>
    </header>
  )
}