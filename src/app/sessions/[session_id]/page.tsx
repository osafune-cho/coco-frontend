import { css } from "../../../../styled-system/css"
import NextLink from "next/link"
import { DisplayImage } from "../../../components/DisplayImage"
import { getImageSlugs } from "../../../components/SlideImage"
import { Quicksand } from 'next/font/google'

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

const imagePaths = getImageSlugs()

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
			<DisplayImage imagePaths={imagePaths} imageHeight={990} />
		</div>
	</div>
  )
}
