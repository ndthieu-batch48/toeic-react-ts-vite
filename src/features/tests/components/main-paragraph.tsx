
import React from "react";
import { ImageIcon } from "lucide-react";

interface MainParagraphProps {
	paragraphMain: string;
}

export const MainParagraph: React.FC<MainParagraphProps> = ({ paragraphMain }) => {
	console.log(paragraphMain)
	// const [imgError, setImgError] = useState(false);

	// const imgMatch = paragraphMain.match(/<img[^>]+src="([^"]+)"[^>]*>/);

	// if (imgMatch) {
	// 	const src = imgMatch[1];

	// 	if (imgError) {
	// 		return (
	// 			<div className="flex flex-col items-center justify-center h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
	// 				<ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
	// 				<p className="text-sm text-gray-500">Image placeholder</p>
	// 				<p className="text-xs text-gray-400">No image available</p>
	// 			</div>
	// 		);
	// 	}

	// 	return (
	// 		<div className="relative rounded-lg overflow-hidden border border-gray-200">
	// 			<img
	// 				src={src}
	// 				alt="paragraph image"
	// 				onError={() => setImgError(true)}
	// 				className="w-full h-auto max-h-96 object-contain bg-gray-50"
	// 				loading="lazy"
	// 			/>
	// 		</div>
	// 	);
	// }

	// // Otherwise render text
	// const text = paragraphMain
	// 	.replace(/^<p>/i, "")
	// 	.replace(/<\/p>$/i, "");

	// return <h3 className="text-lg font-semibold leading-relaxed text-gray-900">{text}</h3>;

	return (
		<div className="flex flex-col items-center justify-center h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
			<ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
			<p className="text-sm text-gray-500">Image placeholder</p>
			<p className="text-xs text-gray-400">No image available</p>
		</div>
	);
};

