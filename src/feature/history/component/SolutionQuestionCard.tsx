import { Card, CardContent, CardHeader } from '@/shadcn/component/ui/card'
import { RadioGroup, RadioGroupItem } from '@/shadcn/component/ui/radio-group'
import { Label } from '@/shadcn/component/ui/label'
import { Badge } from '@/shadcn/component/ui/badge'
import { Separator } from '@/shadcn/component/ui/separator'
import type { MediaQuestionDetailResponse } from '@/feature/test/type/testServiceType'
import { useSolutionContext } from '../context/SolutionContext'
import { useSolutionScrollContext } from '../context/SolutionScrollContext'
import { MainParagraph } from '@/feature/test/component/MainParagraph'
import { isMainParagraphHasContent } from '@/feature/test/helper/testHelper'
import { GeminiAssistCard } from '@/feature/test/component/GeminiAssistCard'
import { GeminiIconFill, GeminiIconOutline } from '@/common/component/GeminiIcon'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shadcn/component/ui/tooltip'
import { Button } from '@/shadcn/component/ui/button'

type SolutionQuestionMediaCardProps = {
	mediaQuestion: MediaQuestionDetailResponse,
}

export const SolutionQuestionMediaCard: React.FC<SolutionQuestionMediaCardProps> = ({
	mediaQuestion
}) => {

	const {
		media_question_id: mediaId,
		media_question_name: mediaName,
		media_question_main_paragraph: mainParagraph,
		media_question_audio_script: audioScript,
		question_list: questionList,
	} = mediaQuestion

	// Context data
	const { selectedAnswers, setSelectedAnswer } = useSolutionContext()
	const { setScrollTarget } = useSolutionScrollContext()

	const handleSelectAnswer = (data: string) => {
		const [questionId, answerId] = data.split('-');
		setSelectedAnswer({
			...selectedAnswers,
			[questionId]: answerId
		});
	}

	// Helper function to check whether the main paragraph has content.
	// The main paragraph can be an image for Listening Parts 1, 3, and 4,
	// or an image/passage for Reading Parts 6 and 7.
	const hasContent = isMainParagraphHasContent(mainParagraph);

	// Helper function to get current answer value for a question
	const getCurrentAnswerValue = (questionId: number) => {
		const selectedAnswer = selectedAnswers[String(questionId)] || '';
		return `${String(questionId)}-${selectedAnswer}`;
	}

	// Helper function to get answer option value
	const getAnswerValue = (questionId: number, answerId: number) => {
		return `${String(questionId)}-${String(answerId)}`;
	}

	// Helper function to check if answer is selected
	const isAnswerSelected = (questionId: number, answerId: number) => {
		return getCurrentAnswerValue(questionId) === getAnswerValue(questionId, answerId);
	}

	// Helper function for answer option styling
	const getSolutionAnswerClass = (isAnswerCorrect: boolean, isSelected: boolean) => {
		const baseClass = "flex items-center gap-2 p-1 border border-border shadow-xs bg-background rounded-lg cursor-pointer text-base";

		if (isAnswerCorrect) {
			return `${baseClass} bg-positive/30 border-positive/30`;
		}

		if (isSelected && !isAnswerCorrect) {
			return `${baseClass} bg-destructive/30 border-destructive/30`;
		}

		return `${baseClass}`;
	}

	// This state use a map to track expand state of GeminiAssistCard of each question
	const [expandedGeminiCard, setExpandedGeminiCard] = useState<Record<number, boolean>>({})

	const handleExpandGeminiCard = (questionId: number) => {
		setExpandedGeminiCard(prev => ({
			...prev,
			[questionId]: !prev[questionId]
		}))
	}

	const isGeminiCardExpanded = (questionId: number) => {
		return expandedGeminiCard[questionId] || false
	}

	return (
		<Card
			className="w-full mx-auto mb-3"
			ref={(el: HTMLDivElement | null) => {
				// Set scroll target for the first question in this media
				if (questionList.length > 0) {
					setScrollTarget(questionList[0].question_id, el)
				}
			}}
		>
			{questionList.length > 1 && (
				<CardHeader>
					<Badge className="text-lg font-semibold">
						Questions {mediaName.replace(/<\/?p>/g, '')} refer to the following
					</Badge>
				</CardHeader>
			)}

			<CardContent className="flex flex-col md:flex-row gap-2">
				{hasContent && (
					<>
						{/* Left side - Main Paragraph */}
						<div className="flex-1 min-w-0">
							<MainParagraph mainParagraph={mainParagraph} />
						</div>
					</>
				)}

				{/* Right side - Questions */}
				<div className={`space-y-6 ${hasContent ? 'flex-shrink-0 md:w-80 lg:w-120' : 'w-full'}`}>
					{questionList.map((question, index) => (
						<div
							key={question.question_id || index}
							ref={(el: HTMLDivElement | null) => { setScrollTarget(question.question_id, el) }}
						>
							{/* Question Block */}
							<div className="flex flex-col gap-2">

								{/* Question Header */}
								<div className="flex flex-col">
									<div className="flex gap-1">
										{questionList.length > 1 ? (
											<Badge
												variant='outline'
												className="text-base font-semibold border-primary h-8 w-auto p-1">
												Question {question.question_number}
											</Badge>
										) :
											<Badge
												className="text-base font-semibold h-8 w-auto p-1">
												Question {question.question_number}
											</Badge>
										}
									</div>

									{/* Question content */}
									<Label className="text-base font-semibold flex-1">
										{question.question_content}
									</Label>

									{/* Button to expand GeminiAssistCard */}
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													variant='outline'
													onClick={() => handleExpandGeminiCard(question.question_id)}
													className={`mr-auto mt-2 p-1 h-auto w-auto gap-2 ${isGeminiCardExpanded(question.question_id) ? 'border-primary' : ''}`}
												>

													{isGeminiCardExpanded(question.question_id) ? (
														<GeminiIconFill size={30} withGlow={true} />
													) : (
														<GeminiIconOutline size={30} strokeWidth={2} />
													)}
													<span className="font-semibold">AI Assistant</span>
												</Button>
											</TooltipTrigger>
											<TooltipContent align="end" side="bottom">
												Get AI Help ?
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>

								<GeminiAssistCard
									isExpanded={isGeminiCardExpanded(question.question_id)}
									mediaId={mediaId}
									questionId={question.question_id}
									audioScript={audioScript}
									questionContent={question.question_content}
									answerList={question.answer_list}
								/>

								{/* Question content */}
								<div>
									<Label className="mb-2">
										Select your answer:
									</Label>

									{/* Answer Options */}
									<RadioGroup
										className="gap-1"
										disabled
										value={getCurrentAnswerValue(question.question_id)}
										onValueChange={handleSelectAnswer}
									>
										{question.answer_list.map((answer, answerIndex) => {
											const isSelected = isAnswerSelected(question.question_id, answer.answer_id)
											return (
												<Label
													key={answer.answer_id || answerIndex}
													htmlFor={`question-${question.question_id}-answer-${answer.answer_id}`}
													className={getSolutionAnswerClass(answer.is_correct, isSelected)}
												>
													<RadioGroupItem
														id={`question-${question.question_id}-answer-${answer.answer_id}`}
														value={getAnswerValue(question.question_id, answer.answer_id)}
														className="border border-foreground"
													/>
													{answer.content}
												</Label>
											)
										})}
									</RadioGroup>
								</div>
							</div>

							{/* Separator between questions (except for the last one) */}
							{index < questionList.length - 1 && (
								<Separator className="my-6 border-border" />
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}