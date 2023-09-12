import fs from "fs";
import path from "path";

/**
 * ./public/images のパスを取得する
 */

const imagesDirectory = path.join(process.cwd(), "public", "images");

/**
 * public/images 以下にある画像のファイル名を取得する
 * 取得したファイル名に "/images/" を付与して配列に格納し、return する
 */

export function getImageSlugs() {
	const allDirents = fs.readdirSync(imagesDirectory, { withFileTypes: true });
	const imageNames = allDirents
		.filter((dirent) => dirent.isFile() && dirent.name !== '.DS_Store')
		.map(({ name }) => name);

	const imagePaths = [];

	imageNames.sort();

	for (let i = 0; i < imageNames.length; i++) {
		imagePaths.push(path.join("/", "images", imageNames[i]));
	}

	return imagePaths;
}