import { css } from "../../../../styled-system/css"
import { LiveChat } from "./LiveChat"
import { Room } from "./Room"

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

const getTeam = async (teamId: string): Promise<Team> => {
	const team: Team = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`).then(res => res.json())

	return team
}

const getTeamMaterials = async (teamId: string): Promise<string[]> => {
	const materials: string[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/materials`).then(res => res.json())

	return materials
}

export default async function SessionPage({ params }: { params: { sessionId: string } }) {
	const imagePaths = await getTeamMaterials(params.sessionId)

	return (
		<Room roomId={params.sessionId}>
			<main className={mainStyle}>
				<div className={imagesStyle}>
					{/* <DisplayImage imagePaths={imagePaths} imageHeight={990} /> */}
					{imagePaths.map((path, idx) => {
						return (<img key={idx} src={path} className={imageStyle} />)
					})}
				</div>
				<LiveChat />
			</main>
		</Room>
	)
}