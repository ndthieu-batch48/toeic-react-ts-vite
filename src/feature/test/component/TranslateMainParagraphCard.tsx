import { NotebookText } from "lucide-react"

export const TranslateMainParagraphCard = () => {


	return (
		<div className="w-full p-4 rounded-lg border bg-muted/50">
			<h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-foreground">
				<NotebookText className="w-4 h-4 text-primary" />
				Main paragraph content
			</h4>
			<p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				This is a sample audio transcript for demonstration purposes.
			</p>
		</div>
	)
}