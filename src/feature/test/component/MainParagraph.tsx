
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { isMainParagraphHasContent } from "../helper/testHelper";

interface MainParagraphProp {
	mainParagraph: string;
}

export const MainParagraph = ({ mainParagraph }: MainParagraphProp) => {
	const [imgError, setImgError] = useState(false);

	const hasContent = isMainParagraphHasContent(mainParagraph);
	if (!hasContent) return null;

	// Handle image content
	const imgMatch = mainParagraph.match(/<img[^>]+src="([^"]+)"[^>]*>/);
	if (imgMatch) {
		const src = imgMatch[1];

		if (imgError) {
			return (
				<div className="flex flex-col items-center justify-center h-50 bg-muted rounded-lg border shadow">
					<ImageIcon className="w-12 h-12 mb-2 text-muted-foreground" />
					<p className="text-2xl font-bold text-muted-foreground">Image placeholder</p>
					<p className="text-lg text-muted-foreground">No image available</p>
				</div>
			);
		}

		return (
			<div className="w-full h-auto">
				<img
					src={src}
					alt="paragraph image"
					onError={() => setImgError(true)}
					className="w-full h-auto object-contain bg-muted border shadow-md rounded-lg"
					loading="lazy"
				/>
			</div>
		);
	}

	// Handle other HTML content
	return (
		<div
			className="text-2xl prose max-w-none [&>*]:text-foreground"
			dangerouslySetInnerHTML={{ __html: mainParagraph }}
		/>
	);
};

