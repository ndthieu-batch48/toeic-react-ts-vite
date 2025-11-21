import { Skeleton } from "@/shadcn/component/ui/skeleton"
import { NotebookText } from "lucide-react"

type TranslateMainParagraphCardProps = {
	content?: string
	isPending?: boolean
}

export const TranslateMainParagraphCard: React.FC<TranslateMainParagraphCardProps> = ({
	content,
	isPending = false,
}) => {
	const shouldShowPlaceholder = !isPending && !content

	if (shouldShowPlaceholder) {
		return (
			<div className="w-full border border-foreground bg-background rounded-lg p-4 space-y-3">
				<div className="text-sm text-muted-foreground">
					Select a <span className="font-semibold">language</span>  and click{' '}
					<span className="font-semibold">Translate the paragraph content</span>{' '}
					to view the AI translation here.
				</div>
			</div>
		)
	}

	return (
		<div className="w-full border border-foreground bg-background rounded-lg p-4 space-y-3">
			<h4 className="font-semibold text-sm flex items-center gap-2 text-foreground">
				<NotebookText className="w-4 h-4 text-primary" />
				Main paragraph content
			</h4>

			{isPending
				? (<Skeleton className="h-5 w-full" />)
				: (<p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{content}</p>)
			}

		</div >
	)
}