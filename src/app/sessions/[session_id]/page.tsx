"use client"

import { css } from "../../../../styled-system/css"
import NextLink from "next/link"
import { DisplayImage } from "../../../components/DisplayImage"
import { getImageSlugs } from "../../../components/SlideImage"
import { Quicksand } from 'next/font/google'
import { RoomProvider, useThreads } from "@/../liveblocks.config"
import { Composer, Thread } from "@liveblocks/react-comments"
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

// const imagePaths = getImageSlugs()

function Comments() {
	const threads = useThreads();

	return (
		<main>
			{threads.map((thread) => (
				<Thread key={thread.id} thread={thread} className="thread" />
			))}
			<Composer className="composer" />
		</main>
	);
}

export default function Home({ params }: { params: { session_id: string } }) {
	return (
		<RoomProvider id={params.session_id} initialPresence={{}}>
			<div className={mainStyle}>
				<header className={headerStyle}>
					<NextLink href="/">
						<div className={logoStyle}>
							<h1 className={Quicksand700.className}>CO-CO</h1>
						</div>
					</NextLink>
				</header>
				{/* <div className={imageStyle}>
					<DisplayImage imagePaths={imagePaths} />
				</div> */}
			</div>

			<ClientSideSuspense fallback={<p>Loading...</p>}>
				{() => <Comments />}
			</ClientSideSuspense>
		</RoomProvider>
	)
}
