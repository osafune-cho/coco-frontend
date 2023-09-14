import { css } from "../../../../styled-system/css"
import NextLink from "next/link"
import { Quicksand } from 'next/font/google'
import { RoomProvider } from "@/../liveblocks.config"
import { LiveList } from "@liveblocks/client"
import { Comments } from "./Comments"
import { ClientSideSuspense } from "@liveblocks/react"

const Quicksand700 = Quicksand({
	weight: '700',
	preload: false,
})

const mainStyle = css({
	background: "#5C5C5C",
})

const headerStyle = css({
	background: "#dcdcdc",
	// position: "fixed",
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

// const imagePaths = getImageSlugs()

export default async function Home({ params }: { params: { session_id: string } }) {


	return (
		<RoomProvider id={params.session_id} initialPresence={{}} initialStorage={{
			comments: new LiveList([])
		}}>
			<div className={mainStyle}>
				<header className={headerStyle}>
					<NextLink href="/">
						<div className={logoStyle}>
							<h1 className={Quicksand700.className}>CO-CO</h1>
						</div>
					</NextLink>
				</header>

				<Comments />
			</div >
		</RoomProvider >
	)
}

