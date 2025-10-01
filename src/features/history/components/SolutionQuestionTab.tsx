import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import React, { useEffect, useRef } from "react"
import type { Part } from "@/features/tests/types/test"
import { useSolutionContext, type ActiveQuestion } from "../context/SolutionContext"

type SolutionQuestionTabProps = {
	partData: Part[]
	className?: string,
	onQuestionActive?: (mediaId: number) => void
}

const SolutionQuestionTabComponent: React.FC<SolutionQuestionTabProps> = ({
	className,
	partData,
	onQuestionActive,
}) => {
	const { activeQuestion, setActiveQuestion, selectedAnswers } = useSolutionContext()

	const scrollAreaRef = useRef<HTMLDivElement>(null);
	const questionRefs = useRef<Record<string, HTMLElement | null>>({});

	const toggleActive = (newSelectedQuestion: ActiveQuestion) => {
		setActiveQuestion(newSelectedQuestion)
	}

	const isQuestionActive = (partId: number, questionId: number) => {
		return activeQuestion?.part_id === partId && activeQuestion?.question_id === questionId
	}

	useEffect(() => {
		if (scrollAreaRef.current && activeQuestion) {
			// Find the scrollable viewport element
			const scrollViewport = scrollAreaRef.current.querySelector(
				'[data-radix-scroll-area-viewport]'
			);

			if (scrollViewport) {
				// Get the active question element
				const questionKey = `${activeQuestion.part_id}-${activeQuestion.question_id}`;
				const activeQuestionElement = questionRefs.current[questionKey];

				if (activeQuestionElement) {
					// Calculate the scroll position to center the active question
					const elementTop = activeQuestionElement.offsetTop;
					const elementHeight = activeQuestionElement.offsetHeight;
					const viewportHeight = scrollViewport.clientHeight;

					// Center the element in the viewport
					const scrollTop = elementTop - (viewportHeight / 2) + (elementHeight / 2);

					// Apply the calculated scroll position
					scrollViewport.scrollTo({ left: 0, top: Math.max(0, scrollTop + 100), behavior: "smooth" });

					console.log('Scrolling to active question:', questionKey, 'scrollTop:', scrollTop);
				}
			}
		}
	}, [activeQuestion]); // Trigger when activeQuestion changes

	const getSelectedAnswerId = (questionId: number) => {
		return selectedAnswers[String(questionId)]
	}

	const getSolutionAnswerClass = (isAnswerCorrect: boolean | undefined, isSelected: boolean) => {
		const baseClass = [
			"flex items-center justify-center",
			"border border-border",
			"hover:border-primary hover:bg-primary/20 hover:text-foreground",
			"min-w-[37px] h-10 rounded-2xl",
			"text-base font-semibold cursor-pointer"
		].join(" ");
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
		<ScrollArea ref={scrollAreaRef}
			className={cn("h-full w-full rounded-md border border-border p-2 bg-background shadow-md", className)} >
			{partData.map((part, index) => (
				<div key={index} className="flex flex-col mb-5">
					<Label className="font-bold text-xl text-foreground mb-2">{part.part_order}</Label>

					<div className="flex flex-wrap gap-1 border border-border rounded-md p-2">
						{part.media_list?.map((media, mediaIndex) => (
							media.question_list.map((question, questionIndex) => {
								const answerId = getSelectedAnswerId(question.question_id)
								const isSelected = answerId !== undefined && answerId !== null && answerId !== ''
								const isActive = isQuestionActive(part.part_id, question.question_id)
								const questionKey = `${part.part_id}-${question.question_id}`;

								const selectedAnswer = isSelected
									? question.answer_list.find(answer => String(answer.answer_id) === String(answerId))
									: undefined

								return (
									<Label
										ref={(el: HTMLLabelElement | null) => {
											questionRefs.current[questionKey] = el;
										}}
										onClick={() => {
											onQuestionActive?.(media.media_id)

											toggleActive({
												part_id: part.part_id,
												question_id: question.question_id
											})
										}}
										className={cn(
											getSolutionAnswerClass(selectedAnswer?.is_correct, isSelected),
											isActive && "bg-primary text-primary-foreground border-primary"
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
