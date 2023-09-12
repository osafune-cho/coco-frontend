import { getImageSlugs } from "./SlideImage"
import Image from "next/image";
import { css } from "../../styled-system/css"

const imagePaths = getImageSlugs();

const imageStyle = css({
	margin: "20px",
})

/**
 * 配列の全てのパスに対し、Image コンポーネントを返す
 */

export const DisplayImage = () => {
	console.log(imagePaths);
	return (
		<div >
			{imagePaths.map((imagePath, i) => (
				<Image className={imageStyle} src={imagePath} alt="" key={i} width={500} height={500} />
			))}
		</div>
	)
}