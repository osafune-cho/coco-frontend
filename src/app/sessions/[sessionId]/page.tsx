import { useMyPresence } from "../../../../liveblocks.config"
import { css } from "../../../../styled-system/css"
import { LiveChat } from "./LiveChat"
import { Room } from "./Room"
import { Slides } from "./Slides"

const mainStyle = css({
	display: "grid",
	// gridTemplateColumns: "7fr 3fr",
})

type Team = {
	id: string,
	name: string,
	courseId: string,
	createdAt: string,
	updatedAt: string
}

export type Material = {
	id: string;
	teamId: string;
	url: string;
	height: number;
	width: number;
}

const getTeam = async (teamId: string): Promise<Team> => {
	const team: Team = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`).then(res => res.json())

	return team
}

const getTeamMaterials = async (teamId: string): Promise<Material[]> => {
	const materials: Material[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/materials`).then(res => res.json())

	return materials
}

export default async function SessionPage({ params }: { params: { sessionId: string } }) {
	const materials = await getTeamMaterials(params.sessionId)

	return (
		<Room roomId={params.sessionId}>
			<main className={mainStyle}>
				{/* <DisplayImage imagePaths={imagePaths} imageHeight={990} /> */}
				<Slides materials={materials} />
				<LiveChat />
			</main>
		</Room >
	)
}