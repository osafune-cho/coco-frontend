"use client"

import { css } from "../../../../styled-system/css"
import { LiveList, LiveObject } from "@liveblocks/client"
import { RoomProvider } from "../../../../liveblocks.config"
import { DisplayImage } from "@/components/DisplayImage"
import { LiveChat } from "./LiveChat"

const mainStyle = css({
	background: "#5C5C5C",
})

// const imagePaths = getImageSlugs()

type Team = {
	id: string,
	name: string,
	courseId: string,
	createdAt: string,
	updatedAt: string
}

const getTeam = async (teamId: string): Promise<Team> => {
	const team: Team = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`).then(res => res.json())

	return team
}

const getTeamMaterials = async (teamId: string): Promise<string[]> => {
	const materials: string[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/materials`).then(res => res.json())

	return materials
}

export default function SessionPage({ params }: { params: { sessionId: string } }) {
	// const imagePaths = await getTeamMaterials(params.sessionId)

	return (
		<RoomProvider id={params.sessionId} initialPresence={{}} initialStorage={{
			comments: new LiveList<LiveObject<{ author: string, message: string }>>([]),
		}}>
			{/* <div className={mainStyle}>
				<DisplayImage imagePaths={imagePaths} imageHeight={990} />
			</div> */}
			<LiveChat />
		</RoomProvider >
	)
}