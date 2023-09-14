import { css } from "../../../../styled-system/css"
import { DisplayImage } from "@/components/DisplayImage"
import { LiveChat } from "./LiveChat"
import { Room } from "./Room"
import { Material } from "@/types/models"

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

const getTeamMaterials = async (teamId: string): Promise<Material[]> => {
	const materials: Material[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/materials`).then(res => res.json())

	return materials
}

export default async function SessionPage({ params }: { params: { sessionId: string } }) {
	const materials = await getTeamMaterials(params.sessionId)

	return (
		<Room roomId={params.sessionId}>
			<div className={mainStyle}>
				<DisplayImage materials={materials} />
			</div>
			<LiveChat />
		</Room>
	)
}