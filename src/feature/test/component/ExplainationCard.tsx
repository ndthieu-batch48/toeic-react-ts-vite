import type { GeminiExplainQuestionResponse } from '@/feature/test/type/testServiceType';
import { Skeleton } from '@/shadcn/component/ui/skeleton'
import { Lightbulb } from 'lucide-react'

type ExplainationCardProps = {
	explainScript?: GeminiExplainQuestionResponse;
	isExplainPending: boolean;
}

export const ExplainationCard: React.FC<ExplainationCardProps> = ({
	explainScript,
	isExplainPending,
}) => {
	const hasRequirement = Boolean(explainScript?.question_need)
	const hasIntent = Boolean(explainScript?.question_ask)
	const hasCorrectReason = Boolean(explainScript?.correct_answer_reason)
	const incorrectEntries = explainScript?.incorrect_answer_reason
	const hasIncorrectReasons = Boolean(incorrectEntries && Object.keys(incorrectEntries).length > 0)
	const hasAnyContent = hasRequirement || hasIntent || hasCorrectReason || hasIncorrectReasons
	const shouldShowPlaceholder = !isExplainPending && !hasAnyContent

	if (isExplainPending) {
		return (
			<div className="w-full border border-foreground bg-background rounded-lg p-3">
				<Skeleton className="h-5 w-full" />
			</div>
		)
	}

	if (shouldShowPlaceholder) {
		return (
			<div className="w-full border border-foreground bg-background rounded-lg p-3">
				<div className="text-sm text-muted-foreground">
					Select a <span className="font-semibold">language</span> and click <span className="font-semibold">Explain this question</span> to review the AI explanation.
				</div>
			</div>
		)
	}

	return (
		<div className="w-full border border-foreground bg-background rounded-lg p-3 space-y-3">
			<h4 className="font-semibold text-sm flex items-center gap-2 text-foreground">
				<Lightbulb className="w-4 h-4 text-primary" />
				Explained question content
			</h4>

			{hasRequirement && (
				<div className="p-2 rounded-lg border">
					<h5 className="text-sm font-semibold text-muted-foreground mb-1">
						Question Requirement
					</h5>
					<p className="text-base font-medium">{explainScript?.question_need}</p>
				</div>
			)}

			{hasIntent && (
				<div className="p-2 rounded-lg border">
					<h5 className="text-sm font-semibold text-muted-foreground mb-1">
						Question Intent
					</h5>
					<p className="text-base font-medium">{explainScript?.question_ask}</p>
				</div>
			)}

			{hasCorrectReason && (
				<div className="p-2 rounded-lg border border-positive bg-positive/5">
					<h5 className="text-sm font-semibold text-positive mb-1">
						Correct Answer Explanation
					</h5>
					<p className="text-base text-muted-foreground">
						{explainScript?.correct_answer_reason}
					</p>
				</div>
			)}

			{hasIncorrectReasons && (
				<div className="space-y-1 p-2 rounded-lg border border-destructive bg-destructive/5">
					<h5 className="text-sm font-semibold text-destructive">
						Incorrect Answers Explanation
					</h5>
					<div className="space-y-1">
						{Object.entries(incorrectEntries ?? {}).map(([option, reason], idx) => (
							<div key={idx} className="p-2">
								<p className="text-sm font-semibold text-muted-foreground mb-1">
									{option}
								</p>
								<p className="text-base text-muted-foreground">{reason}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
};