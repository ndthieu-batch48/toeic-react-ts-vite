import { Card, CardContent, CardHeader } from '@/component/ui/card'
import { RadioGroup, RadioGroupItem } from '@/component/ui/radio-group'
import { Label } from '@/component/ui/label'
import { Badge } from '@/component/ui/badge'
import { Separator } from '@/component/ui/separator'
import type { QuesDetailRes, GeminiTransQuesResp } from '@/feature/test/type/testServiceType'
import { useSolutionContext } from '../context/SolutionContext'
import { useSolutionScrollContext } from '../context/SolutionScrollContext'
import { useTranslationCard } from '@/feature/test/hook/useTranslationCard'
import { MainParagraph } from '@/feature/test/component/MainParagraph'
import { isMainParagraphHasContent } from '@/feature/test/helper/testHelper'
import { useExplainationCard } from '@/feature/test/hook/useExplainationCard'
import { GeminiAssistComponent } from '@/feature/test/component/GeminiAssist'

type SolutionQuestionMediaCardProps = {
	mediaId: number,
	mediaName: string,
	paragraphMain: string,
	translateScript?: GeminiTransQuesResp
	questionData: QuesDetailRes[],
}

export const SolutionQuestionMediaCard: React.FC<SolutionQuestionMediaCardProps> = ({
	mediaName,
	paragraphMain,
	questionData,
}) => {

	const { selectedAnswers, setSelectedAnswer } = useSolutionContext()
	const { setScrollTarget } = useSolutionScrollContext()

	const translationHook = useTranslationCard()
	const explainationHook = useExplainationCard()

	const hasContent = isMainParagraphHasContent(paragraphMain);

	const handleSelectAnswer = (data: string) => {
		const [questionId, answerId] = data.split('-');
		setSelectedAnswer({
			...selectedAnswers,
			[questionId]: answerId
		});
	}

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

	return (
		<Card
			className="w-full mx-auto mb-3"
			ref={(el: HTMLDivElement | null) => {
				// Set scroll target for the first question in this media
				if (questionData.length > 0) {
					setScrollTarget(questionData[0].ques_id, el)
				}
			}}
		>
			<CardHeader>
				<Badge className="text-lg font-semibold">
					Questions {mediaName.replace(/<\/?p>/g, '')} refer to the following
				</Badge>
			</CardHeader>

			<CardContent className="flex flex-col md:flex-row gap-2">
				{hasContent && (
					<>
						{/* Left side - Main Paragraph */}
						<div className="flex-1 min-w-0">
							<MainParagraph mainParagraph={paragraphMain} />
						</div>
					</>
				)}

				{/* Right side - Questions */}
				<div className={`space-y-6 ${hasContent ? 'flex-shrink-0 md:w-80 lg:w-120' : 'w-full'}`}>
					{questionData.map((question, index) => (
						<div
							key={question.ques_id || index}
							ref={(el: HTMLDivElement | null) => { setScrollTarget(question.ques_id, el) }}
						>

							{/* Question Block */}
							<div className="flex flex-col space-y-4">

								{/* Question Header */}
								<div className="flex flex-col mb-5">

									<div className="flex items-start gap-1">
										<Badge
											variant='outline'
											className="text-base font-semibold border-primary">
											{question.ques_number}
										</Badge>

										<Label className="text-base font-medium flex-1 min-w-0">
											{question.ques_content}
										</Label>
									</div>
								</div>

								<GeminiAssistComponent
									questionId={question.ques_id}
									translationHook={translationHook}
									explainationHook={explainationHook}
								/>

								<div>
									<Label className="mb-2">
										Select your answer:
									</Label>

									{/* Answer Options */}
									<RadioGroup
										className="gap-1"
										disabled
										value={getCurrentAnswerValue(question.ques_id)}
										onValueChange={handleSelectAnswer}
									>
										{question.ans_list.map((answer, answerIndex) => {
											const isSelected = isAnswerSelected(question.ques_id, answer.ans_id)
											return (
												<Label
													key={answer.ans_id || answerIndex}
													htmlFor={`question-${question.ques_id}-answer-${answer.ans_id}`}
													className={getSolutionAnswerClass(answer.is_correct, isSelected)}
												>
													<RadioGroupItem
														id={`question-${question.ques_id}-answer-${answer.ans_id}`}
														value={getAnswerValue(question.ques_id, answer.ans_id)}
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
							{index < questionData.length - 1 && (
								<Separator className="my-6 border-border" />
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}