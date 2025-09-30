import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import React from "react"
import type { Part } from "@/features/tests/types/test"
import { useSolutionContext, type ActiveQuestion } from "../context/SolutionContext"

type SolutionQuestionTabProps = {
	partData: Part[]
	className?: string,
}

const SolutionQuestionTabComponent: React.FC<SolutionQuestionTabProps> = ({
	className,
	partData,
}) => {
	const { setActiveQuestion, selectedAnswers } = useSolutionContext()

	const toggleActive = (newSelectedQuestion: ActiveQuestion) => {
		setActiveQuestion(newSelectedQuestion)
	}

	const getSelectedAnswerId = (questionId: number) => {
		return selectedAnswers[String(questionId)]
	}

	const getSolutionAnswerClass = (isAnswerCorrect: boolean | undefined, isSelected: boolean) => {
		const baseClass = "flex items-center border border-border justify-center min-w-[37px] h-10 rounded-2xl text-base font-semibold cursor-pointer";
		const correctBorder = `${baseClass} bg-positive/30 border-positive/30`
		const inCorrectBorder = `${baseClass} bg-destructive/30 border-destructive/30`

		if (!isSelected) {
			return baseClass;
		}

		// Handle case where answer is selected but correctness is unknown
		if (isAnswerCorrect === undefined) {
			return baseClass;
		}

		return isAnswerCorrect
			? correctBorder
			: inCorrectBorder
	}

	return (
		<ScrollArea className={cn("h-full w-full rounded-md border border-border p-2 bg-background shadow-md", className)} >
			{partData.map((part, index) => (
				<div key={index} className="flex flex-col mb-5">
					<Label className="font-bold text-xl text-foreground mb-2">{part.part_order}</Label>

					<div className="flex flex-wrap gap-1 border border-border rounded-md p-2">
						{part.media_list?.map((media, mediaIndex) => (
							media.question_list.map((question, questionIndex) => {
								const answerId = getSelectedAnswerId(question.question_id)
								const isSelected = answerId !== undefined && answerId !== null && answerId !== ''

								const selectedAnswer = isSelected
									? question.answer_list.find(answer => String(answer.answer_id) === String(answerId))
									: undefined

								return (
									<Label
										onClick={() => toggleActive({
											part_id: part.part_id,
											question_id: question.question_id
										})}
										className={cn(
											getSolutionAnswerClass(selectedAnswer?.is_correct, isSelected)
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

export const SolutionQuestionTab = React.memo(SolutionQuestionTabComponent)
