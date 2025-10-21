import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import React, { useEffect, useRef } from "react"
import type { PartDetailRes } from "@/features/tests/types/test"
import { useSolutionContext, type ActiveQuestion } from "../context/SolutionContext"
import { getToeicPartTopic } from "@/features/tests/helper/testHelper"

type SolutionQuestionTabProps = {
	partData: PartDetailRes[]
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
	const partRefs = useRef<Record<string, HTMLElement | null>>({});
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

	const getSelectedAnswerId = (questionId: number) => {
		return selectedAnswers[String(questionId)]
	}

	const getSolutionAnswerClass = (isAnswerCorrect: boolean | undefined, isSelected: boolean) => {
		if (!isSelected) {
			return "bg-muted hover:bg-primary/20 text-muted-foreground";
		}

		// Handle case where answer is selected but correctness is unknown
		if (isAnswerCorrect === undefined) {
			return "bg-muted hover:bg-primary/20 text-muted-foreground";
		}

		return isAnswerCorrect
			? "bg-positive/70 text-white"
			: "bg-destructive/70 text-white"
	}

	return (
		<ScrollArea ref={scrollAreaRef}
			className={cn("md:min-h-100 lg:max-h-110 w-full px-2 bg-transparent", className)}
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
						{part.media_ques_list?.map((media, mediaIndex) => (
							media.ques_list.map((question, questionIndex) => {
								const answerId = getSelectedAnswerId(question.ques_id)
								const isSelected = answerId !== undefined && answerId !== null && answerId !== ''
								const isActive = isQuestionActive(part.part_id, question.ques_id)
								const questionKey = `${part.part_id}-${question.ques_id}`;

								const selectedAnswer = isSelected
									? question.ans_list.find(answer => String(answer.ans_id) === String(answerId))
									: undefined

								return (
									<Label
										ref={(el: HTMLLabelElement | null) => {
											questionRefs.current[questionKey] = el;
										}}
										onClick={() => {
											onQuestionActive?.(media.media_ques_id)

											toggleActive({
												part_id: part.part_id,
												question_id: question.ques_id
											})
										}}
										className={cn(
											"flex items-center border border-border justify-center min-w-[26px] min-h-[26px] rounded-2xl text-xs font-semibold cursor-pointer",
											isActive
												? "bg-primary text-primary-foreground"
												: getSolutionAnswerClass(selectedAnswer?.is_correct, isSelected)
										)}
										key={`${mediaIndex}-${questionIndex}`}
									>
										{question.ques_number}
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
