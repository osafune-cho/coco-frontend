import { css } from "../../../../styled-system/css"
import { LiveChat } from "./LiveChat"
import { Room } from "./Room"
import { Material } from "@/types/models"

const mainStyle = css({
	display: "grid",
	// gridTemplateColumns: "7fr 3fr",
})

const imagesStyle = css({
	width: "full",
	minHeight: "100svh",
	background: "#5c5c5c",
	display: "grid",
	gap: "20px",
	padding: "20px",
	justifyContent: "center",
})

const imageStyle = css({
	width: "full",
	maxWidth: "800px",
})

type Team = {
	id: string,
	name: string,
	courseId: string,
	createdAt: string,
	updatedAt: string
}

type Material = {
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
				<div className={imagesStyle}>
					{/* <DisplayImage imagePaths={imagePaths} imageHeight={990} /> */}
					{materials.map((material, idx) => {
						return (<img key={idx} src={material.url} className={imageStyle} />)
					})}
				</div>
				<LiveChat />
			</main>
		</Room>
	)
}