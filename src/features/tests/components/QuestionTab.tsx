import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Part } from "../types/test"
import { Label } from "@/components/ui/label"
import { useTestContext, type ActiveQuestion } from "../context/TestContext"
import React, { useEffect, useRef } from "react"
import { useTestScrollContext } from "../context/TestScrollContext"
import { getToeicPartTopic } from "../helper/testHelper"

type QuestionTabProps = {
	partData: Part[]
	className?: string,
}

const QuestionTabComponent: React.FC<QuestionTabProps> = ({
	className,
	partData,
}) => {
	const { getScrollTarget } = useTestScrollContext()

	const { activeQuestion, setActiveQuestion, selectedAnswers } = useTestContext()

	const scrollAreaRef = useRef<HTMLDivElement>(null);
	const partRefs = useRef<Record<string, HTMLElement | null>>({});

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
				// Get the part div element (scroll to top of part)
				const partKey = `part-${activeQuestion.part_id}`;
				const activePartElement = partRefs.current[partKey];

				if (activePartElement) {
					// Scroll to the top of the part div
					const elementTop = activePartElement.offsetTop;

					// Apply the calculated scroll position (scroll to top of part)
					scrollViewport.scrollTo({ left: 0, top: Math.max(0, elementTop), behavior: "smooth" });
				}
			}
		}
	}, [activeQuestion]); // Trigger when activeQuestion changes

	return (
		<ScrollArea ref={scrollAreaRef}
			className={cn("h-120 w-full px-2 bg-transparent", className)}
		>
			{partData.map((part, index) => (
				<div
					key={index}
					className="flex flex-col mb-5"
					ref={(el: HTMLDivElement | null) => {
						partRefs.current[`part-${part.part_id}`] = el;
					}}
				>
					<div className="flex gap-2">

						<div className="w-2 h-8 bg-primary rounded"></div>

						<div className="mb-1">
							<Label className="font-semibold text-sm text-foreground block">
								{part.part_order || `Part ${index + 1}`}
							</Label>
							<Label className="text-xs text-muted-foreground font-normal">
								{getToeicPartTopic(part.part_order || `Part ${index + 1}`)}
							</Label>
						</div>
					</div>

					<div className="flex flex-wrap gap-1 p-1 border border-border rounded-md">
						{part.media_list?.map((media, mediaIndex) => (
							media.question_list.map((question, questionIndex) => {
								const isActive = isQuestionActive(part.part_id, question.question_id)
								const isAnswered = isQuestionAnswered(question.question_id)

								return (
									<Label
										onClick={() => {

											getScrollTarget(question.question_id)

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