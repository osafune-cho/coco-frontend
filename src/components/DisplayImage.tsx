"use client";
import { css } from "../../styled-system/css"
import React, { useEffect, useRef, useState } from "react";

const imageStyle = css({
	margin: "20px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: "700px",
})
/**
 * 配列の全てのパスに対し、Image コンポーネントを返す
 */

type DisplayImageProps = {
	imagePaths: string[];
	imageHeight: number;
};

export const DisplayImage = ({ imagePaths, imageHeight }: DisplayImageProps) => {
	//canvasを作成
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const yPositionRef = useRef<number>(0);

	//非同期処理
	useEffect(() => {
		if (!canvasRef.current) {
			throw new Error("objectがnull");
		}

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			throw new Error("context取得失敗");
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
		//CSS上での描画サイズを変更
		canvas.style.width = rect.width + "px";
		canvas.style.height = rect.height + "px";

		//全ての画像を描画
		for (const imagePath of imagePaths) {
			const img = new Image();
			img.src = imagePath;

			img.addEventListener('load', () => {
				//アスペクト比を維持したまま、幅を700pxにする
				const imgHeight = img.height * 700 / img.width;
				//画像を描画
				ctx.drawImage(img, 0, yPositionRef.current, 700, imgHeight);
				//次の画像のy座標を更新
				yPositionRef.current += imgHeight + 20;

			})
		}
	}, [imagePaths])

	const height = (imageHeight + 20) * imagePaths.length;

	return (
		<div>
			<canvas className={imageStyle} ref={canvasRef} width={700} height={height} />
		</div>
	)
}