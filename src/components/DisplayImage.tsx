import { css } from "../../styled-system/css"
import React, { useEffect, useState, useRef } from "react";
import { Material } from "@/types/models";
import { useWindowSize } from "@/hooks/useWindowsSize";

const imageStyle = css({
	margin: "20px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center"
})

/**
 * 配列の全てのパスに対し、Image コンポーネントを返す
 */

type DisplayImageProps = {
	materials: Material[];
};

export const DisplayImage = ({ materials }: DisplayImageProps) => {
	//canvasを作成
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [width, _] = useWindowSize();
	const maxImageWidth = Math.min(width - 40, 700)

	const [canvasHeight, setCanvasHeight] = useState<number>(0);

	//非同期処理
	useEffect(() => {
		if (width !== 0) {
			let newCanvasHeight = 20;
			for (const material of materials) {
				newCanvasHeight += material.height * maxImageWidth / material.width + 20;
			}
			setCanvasHeight(newCanvasHeight);
		}

		console.log({ maxImageWidth, canvasHeight })

		if (!canvasRef.current) {
			return
		}

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			return
		}

		/**
		 * 解像度を上げる処理
		*/
		//デバイスのピクセル比を取得
		const dpr = window.devicePixelRatio;
		///ページ内でのサイズを取得
		const rect = canvas.getBoundingClientRect();
		//canvasの解像度を上げる
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		//キャンバスの描画スケールをdprに合わせて上げる
		ctx.scale(dpr, dpr);
		// //CSS上での描画サイズを変更
		canvas.style.width = rect.width + "px";
		canvas.style.height = rect.height + "px";

		let yPosition = 20;

		//全ての画像を描画
		for (const material of materials) {
			const img = new Image();
			img.src = material.url;

			const imgHeight = material.height * maxImageWidth / material.width;

			const currentYPosition = yPosition;

			img.addEventListener('load', () => {
				//画像を描画
				ctx.drawImage(img, 0, currentYPosition, maxImageWidth, imgHeight);
				console.log({ currentYPosition })
			})

			//次の画像のy座標を更新
			yPosition += imgHeight + 20;
		}
	}, [materials, maxImageWidth, width])

	return (
		<div>
			{(canvasHeight !== 0) && (
				<canvas className={imageStyle} ref={canvasRef} width={width} height={canvasHeight} />
			)}
		</div>
	)
}