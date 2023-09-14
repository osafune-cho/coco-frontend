"use client"

import { css } from "../../../../styled-system/css"
import NextLink from "next/link"
import { Quicksand } from 'next/font/google'
import { LiveList } from "@liveblocks/client"
import { ClientSideSuspense } from "@liveblocks/react"
import { RoomProvider } from "../../../../liveblocks.config"
import { LiveObject } from "@liveblocks/client";
import { useMutation, useStorage } from "../../../../liveblocks.config"

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

export default function Home({ params }: { params: { sessionId: string } }) {

	return (
		<RoomProvider id={params.sessionId} initialPresence={{}} initialStorage={{
			comments: new LiveList([])
		}}>
			<ClientSideSuspense fallback={<p>loading</p>}>
				{() => <Contents />}
			</ClientSideSuspense>
		</RoomProvider >
	)
}


const Contents = () => {
	const comments = useStorage((root) => root.comments);

	const createNewComment = useMutation(
		({ storage }, author, message) => {
			storage.get("comments").push(new LiveObject({
				author,
				message
			}))
		},
		[]
	)

	return (
		<div className={mainStyle}>
			<header className={headerStyle}>
				<NextLink href="/">
					<div className={logoStyle}>
						<h1 className={Quicksand700.className}>CO-CO</h1>
					</div>
				</NextLink>
			</header>

			{
				comments.map((comment, idx) => {
					return (
						<p key={idx}>
							{comment.message}
						</p>
					)
				})
			}

			<button onClick={() => { createNewComment("shina", "hello") }}>Post</button>
		</div >
	)
}
