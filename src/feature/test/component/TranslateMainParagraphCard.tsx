import { NotebookText } from "lucide-react"

export const TranslateMainParagraphCard = () => {


	return (
		<div className="p-4 rounded-lg bg-white border border-purple-200">
			<h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
				<NotebookText className="w-4 h-4 text-purple-600" />
				Main paragraph content
			</h4>
			<p className="text-sm text-gray-700 leading-relaxed">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				This is a sample audio transcript for demonstration purposes.
			</p>
		</div>
	)
}