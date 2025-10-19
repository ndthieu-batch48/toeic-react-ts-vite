import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MainParagraph } from './MainParagraph'
import type { QuesDetailRes, TranslateQuestionResponse } from '../types/test'
import { TranslationCard } from './TranslationCard'
import { useTestContext } from '../context/TestContext'
import { useTranslationCard } from '../hooks/useTranslationCard'
import type { LANGUAGE_ID } from '../constants/const'
import { isMainParagraphHasContent } from '../helper/testHelper'
import { Button } from '@/components/ui/button'
import { Flag } from 'lucide-react'
import { useTestScrollContext } from '../context/TestScrollContext'

type QuestionMediaCardProps = {
	mediaName: string,
	paragraphMain: string,
	translateScript?: TranslateQuestionResponse
	questionData: QuesDetailRes[],
	partId: number,
}

export const QuestionMediaCard: React.FC<QuestionMediaCardProps> = ({
	mediaName,
	paragraphMain,
	questionData,
	partId,
}) => {

	// SCROLL LOGIC
	const { setScrollTarget } = useTestScrollContext()

	const { selectedAnswers, setSelectedAnswer, setActiveQuestion } = useTestContext()
	const {
		translateScript: newTranslateScript,
		isTranslateCardExpanded,
		toggleTranslateCardExpanded,
		getSelectedLanguage,
		handleSelectLanguage,
		handleTranslation,
		isTranslatePending,
		isTranslateError
	} = useTranslationCard()

	const hasContent = isMainParagraphHasContent(paragraphMain);

	const handleSelectAnswer = (data: string) => {
		const [questionId, answerId] = data.split('-');
		setSelectedAnswer({
			...selectedAnswers,
			[questionId]: answerId
		});
		setActiveQuestion({ part_id: partId, question_id: Number(questionId) })
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
	const getAnswerOptionClass = (questionId: number, answerId: number) => {
		const baseClass = "flex items-center gap-2 p-1 border border-border shadow-xs bg-background rounded-lg cursor-pointer text-base";
		return isAnswerSelected(questionId, answerId)
			? `${baseClass} border-primary bg-primary-foreground`
			: `${baseClass} hover:border-primary/50 hover:bg-primary-foreground`;
	}

	return (
		<Card className="w-full mx-auto mb-3">
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
				<div className={`space-y-6 ${hasContent ? 'flex-shrink-0 md:w-80' : 'w-full'}`}>
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
										<Button
											size="icon"
											variant="outline"
											className="hover:bg-background" >
											<Flag className="fill-marker text-marker" />
										</Button>
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

								<TranslationCard
									translateScript={newTranslateScript[question.ques_id]}
									selectedLanguage={getSelectedLanguage(question.ques_id)}
									isExpanded={isTranslateCardExpanded(question.ques_id)}
									onToggle={() => toggleTranslateCardExpanded(question.ques_id)}
									onLanguageChange={(lang: LANGUAGE_ID) => handleSelectLanguage(question.ques_id, lang)}
									onTranslate={() => handleTranslation(question.ques_id)}
									isTranslatePending={isTranslatePending}
									isTranslateError={isTranslateError}
								/>

								<div>
									<Label className="mb-2">
										Select your answer:
									</Label>

									{/* Answer Options */}
									<RadioGroup
										className="gap-1"
										value={getCurrentAnswerValue(question.ques_id)}
										onValueChange={handleSelectAnswer}
									>
										{question.ans_list.map((answer, answerIndex) => (
											<Label
												key={answer.ans_id || answerIndex}
												htmlFor={`question-${question.ques_id}-answer-${answer.ans_id}`}
												className={getAnswerOptionClass(question.ques_id, answer.ans_id)}
											>
												<RadioGroupItem
													id={`question-${question.ques_id}-answer-${answer.ans_id}`}
													value={getAnswerValue(question.ques_id, answer.ans_id)}
													className="border border-foreground"
												/>
												{answer.content}
											</Label>
										))}
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