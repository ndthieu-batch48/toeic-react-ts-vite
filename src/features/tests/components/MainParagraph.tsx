
import React, { useState } from "react";
import { ImageIcon } from "lucide-react";

interface MainParagraphProps {
	paragraphMain: string;
}

export const MainParagraph: React.FC<MainParagraphProps> = ({ paragraphMain }) => {
	const [imgError, setImgError] = useState(false);

	const imgMatch = paragraphMain.match(/<img[^>]+src="([^"]+)"[^>]*>/);

	if (imgMatch) {
		const src = imgMatch[1];

		if (imgError) {
			return (
				<div className="flex flex-col items-center justify-center h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
					<ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
					<p className="text-sm text-gray-500">Image placeholder</p>
					<p className="text-xs text-gray-400">No image available</p>
				</div>
			);
		}

		return (
			<div className="w-full h-auto overflow-hidden">
				<img
					src={src}
					alt="paragraph image"
					onError={() => setImgError(true)}
					className="w-full h-auto object-contain bg-muted"
					loading="lazy"
				/>
			</div>
		);
	}

	return <></>;

};

