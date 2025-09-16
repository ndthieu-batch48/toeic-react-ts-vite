import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Part } from "../types/test"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import type { ActiveQuestion } from "./test-practice"

type QuestionTabProps = {
	partData: Part[]
	activateQuestion: ActiveQuestion
	onSelectQuestion: (value: ActiveQuestion) => void
	className?: string
}

export const QuestionTab: React.FC<QuestionTabProps> = ({
	className,
	partData,
	activateQuestion,
	onSelectQuestion
}) => {
	const [selectedQuestion, setSelectedQuestion] = useState<ActiveQuestion | null>(activateQuestion)

	useEffect(() => {
		setSelectedQuestion(activateQuestion)
	}, [activateQuestion])

	const toggleActive = (newSelectedQuestion: ActiveQuestion) => {
		setSelectedQuestion(newSelectedQuestion)
		onSelectQuestion(newSelectedQuestion)
	}

	const isQuestionActive = (partId: number, questionId: number) => {
		return selectedQuestion?.part_id === partId && selectedQuestion?.question_id === questionId
	}

	return (
		<ScrollArea className={cn("h-full w-full rounded-md border p-6 bg-background", className)} >
			{partData.map((part, index) => (
				<div key={index} className="flex flex-col gap-2 mt-2">
					<Label className="font-medium">{part.part_order}</Label>

					<div className="flex flex-wrap gap-1">
						{part.media_list?.map((media, mediaIndex) => (
							media.question_list.map((question, questionIndex) => {
								const isActive = isQuestionActive(part.part_id, question.question_id)

								return (
									<Label
										onClick={() => toggleActive({
											part_id: part.part_id,
											question_id: question.question_id
										})}
										className={cn(
											"flex items-center justify-center min-w-[37px] h-10 rounded-full text-sm font-medium cursor-pointer transition-colors",
											isActive
												? "bg-primary text-primary-foreground"
												: "bg-muted hover:bg-muted/80"
										)}
										key={`${mediaIndex}-${questionIndex}`}
									>
										{question.question_number}
									</Label>
								)
							})
						))}
					</div>
				</div>
			))}
		</ScrollArea>
	)
}