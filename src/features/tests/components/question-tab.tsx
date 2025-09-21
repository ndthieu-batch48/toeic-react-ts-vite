import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Part } from "../types/test"
import { Label } from "@/components/ui/label"
import { useTestContext, type ActiveQuestion } from "../context/TestContext"
import React from "react"

type QuestionTabProps = {
	partData: Part[]
	className?: string,
}

const QuestionTabComponent: React.FC<QuestionTabProps> = ({
	className,
	partData,
}) => {
	const { activeQuestion, setActiveQuestion, selectedAnswers } = useTestContext()

	const toggleActive = (newSelectedQuestion: ActiveQuestion) => {
		setActiveQuestion(newSelectedQuestion)
	}

	const isQuestionActive = (partId: number, questionId: number) => {
		return activeQuestion?.part_id === partId && activeQuestion?.question_id === questionId
	}

	const isQuestionAnswered = (questionId: number) => {
		return selectedAnswers[String(questionId)] !== undefined
	}

	return (
		<ScrollArea className={cn("h-full w-full rounded-md border border-border p-6 bg-background", className)} >
			{partData.map((part, index) => (
				<div key={index} className="flex flex-col mt-5">
					<Label className="font-bold text-foreground font-serif mb-2">{part.part_order}</Label>

					<div className="flex flex-wrap gap-1 border border-border rounded-md p-2">
						{part.media_list?.map((media, mediaIndex) => (
							media.question_list.map((question, questionIndex) => {
								const isActive = isQuestionActive(part.part_id, question.question_id)
								const isAnswered = isQuestionAnswered(question.question_id)

								return (
									<Label
										onClick={() => toggleActive({
											part_id: part.part_id,
											question_id: question.question_id
										})}
										className={cn(
											"flex items-center border border-border justify-center min-w-[37px] h-10 rounded-full text-sm font-medium cursor-pointer transition-colors font-sans",
											isActive
												? "bg-primary text-primary-foreground"
												: isAnswered
													? "bg-green-500 text-white hover:bg-green-600"
													: "bg-muted hover:bg-primary/20 text-muted-foreground"
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

export const QuestionTab = React.memo(QuestionTabComponent)
