import { css } from "../../../../styled-system/css"
import NextLink from "next/link"
import { DisplayImage } from "../../../components/DisplayImage"
import { Quicksand } from 'next/font/google'
import { get } from "http"
import Image from "next/image";

const Quicksand700 = Quicksand({
  weight: '700',
  preload: false,
})

const mainStyle = css({
	background: "#5C5C5C",
})

const headerStyle = css({
	background: "#dcdcdc",
	position: "fixed",
	width: "100%",
})

const logoStyle = css({
	fontSize: "4xl",
	marginLeft: "20px",
})

const imageStyle = css({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
})

export default function Home() {
  return (
    <div className={mainStyle}>
		<header className={headerStyle}>
			<NextLink href="/">
				<div className={logoStyle}>
					<h1 className={Quicksand700.className}>CO-CO</h1>
				</div>
			</NextLink>
		</header>
		<div className={imageStyle}>
			<DisplayImage />
		</div>
	</div>
  )
}
