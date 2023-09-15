import { css } from "../../styled-system/css"
import NextLink from "next/link"
import { Header } from "@/components/Header"
import { Noto_Sans_JP } from "next/font/google"
import { Footer } from "@/components/Footer"

const mainStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  background: "#e0e2dc",
  minHeight: "100vh",
})

const Noto_Sans_JP700 = Noto_Sans_JP({
  weight: '700',
  preload: false,
})

const Noto_Sans_JP500 = Noto_Sans_JP({
  weight: '500',
  preload: false,
})

const headingGroupStyle = css({
  textAlign: "center",
  margin: "100px 0px 100px 0px",
})

const HeadingStyle = css({
  fontSize: "6xl",
  color: "#3c5400",
  marginBottom: "30px",
})

const subHeadingStyle = css({
  fontSize: "xl",
  color: "#3c5400",
})

const buttonStyle = css({
  color: "#fff",
  background: "#74a300",
  px: "12px",
  py: "8px",
  rounded: "md",
  cursor: "pointer",
  fontSize: "xl",
  _hover: {
    background: "#5b8000"
  },

})

export default function Home() {
  return (
    <div>
      <div className={mainStyle}>
        <Header />
        <hgroup className={headingGroupStyle}>
          <div className={HeadingStyle}>
            <h1 className={Noto_Sans_JP700.className}>PDFを共有。みんなでコメント。</h1>
          </div>
          <div className={subHeadingStyle}>
            <h2 className={Noto_Sans_JP500.className}>CO-COは、みんなで資料を共有して、コメントしあえるサービスです。</h2>
          </div>
        </hgroup>
        <NextLink href="/sessions/new" className={buttonStyle}>新しい資料を登録</NextLink>
        <Footer />
      </div>
    </div>
  )
}
