import { css } from "../../../../styled-system/css"
import { LiveList } from "@liveblocks/client"
import { ClientSideSuspense } from "@liveblocks/react"
import { RoomProvider } from "../../../../liveblocks.config"
import { DisplayImage } from "@/components/DisplayImage"
import { LiveChat } from "./LiveChat"

const mainStyle = css({
	background: "#5C5C5C",
})

// const imagePaths = getImageSlugs()

const getTeam = async (teamId: string) => {
	const team: {
		id: string,
		name: string,
		courseId: string,
		createdAt: string,
		updatedAt: string
	} = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`).then(res => res.json())
}

export default async function SessionPage({ params }: { params: { sessionId: string } }) {
	const team = await getTeam(params.sessionId)

	return (
		<RoomProvider id={params.sessionId} initialPresence={{}} initialStorage={{
			comments: new LiveList([])
		}}>
			<div className={mainStyle}>
				<DisplayImage imagePaths={[]} imageHeight={990} />
			</div>

			<ClientSideSuspense fallback={<p>Loading...</p>}>
				{() => <LiveChat />}
			</ClientSideSuspense>
		</RoomProvider >
	)
}