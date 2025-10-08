import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Part } from "../types/test"
import { Label } from "@/components/ui/label"
import { useTestContext, type ActiveQuestion } from "../context/TestContext"
import React, { useEffect, useRef } from "react"
import { useTestScrollContext } from "../context/TestScrollContext"

type QuestionTabProps = {
	partData: Part[]
	className?: string,
	// onQuestionActive?: (mediaId: number) => void
}

const QuestionTabComponent: React.FC<QuestionTabProps> = ({
	className,
	partData,
}) => {
	const { getTargetQuestionCardRef } = useTestScrollContext()

	const { activeQuestion, setActiveQuestion, selectedAnswers } = useTestContext()

	const scrollAreaRef = useRef<HTMLDivElement>(null);
	const questionRefs = useRef<Record<string, HTMLElement | null>>({});

	const toggleActive = (newSelectedQuestion: ActiveQuestion) => {
		setActiveQuestion(newSelectedQuestion)
	}

	const isQuestionActive = (partId: number, questionId: number) => {
		return activeQuestion?.part_id === partId && activeQuestion?.question_id === questionId
	}

	const isQuestionAnswered = (questionId: number) => {
		return selectedAnswers[String(questionId)] !== undefined
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
					scrollViewport.scrollTo({ left: 0, top: Math.max(0, scrollTop + 190), behavior: "smooth" });

					console.log('Scrolling to active question:', questionKey, 'scrollTop:', scrollTop);
				}
			}
		}
	}, [activeQuestion]); // Trigger when activeQuestion changes

	return (
		<ScrollArea ref={scrollAreaRef}
			className={cn("h-full w-full px-2 bg-transparent", className)}
		>
			{partData.map((part, index) => (
				<div key={index} className="flex flex-col mb-2">
					<Label className="font-semibold text-sm text-foreground mb-1">{part.part_order}</Label>

					<div className="flex flex-wrap gap-1 p-1 border border-border rounded-md">
						{part.media_list?.map((media, mediaIndex) => (
							media.question_list.map((question, questionIndex) => {
								const isActive = isQuestionActive(part.part_id, question.question_id)
								const isAnswered = isQuestionAnswered(question.question_id)
								const questionKey = `${part.part_id}-${question.question_id}`;

								return (
									<Label
										ref={(el: HTMLLabelElement | null) => {
											questionRefs.current[questionKey] = el;
										}}
										onClick={() => {

											getTargetQuestionCardRef(question.question_id)

											toggleActive({
												part_id: part.part_id,
												question_id: question.question_id
											})
										}}
										className={cn(
											"flex items-center border border-border justify-center min-w-[26px] min-h-[26px] rounded-2xl text-xs font-semibold cursor-pointer",
											isActive
												? "bg-primary text-primary-foreground"
												: isAnswered
													? "bg-positive text-white hover:bg-positive/40"
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