import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { Question, TranslateQuestionResponse } from '@/features/tests/types/test'
import { useSolutionContext } from '../context/SolutionContext'
import { useTranslationCard } from '@/features/tests/hooks/useTranslationCard'
import { MainParagraph } from '@/features/tests/components/main-paragraph'
import { TranslationCard } from '@/features/tests/components/translation-card'
import type { LANGUAGE_ID } from '@/features/tests/constants/const'

type SolutionQuestionMediaCardProps = {
	mediaName: string,
	paragraphMain: string,
	translateScript?: TranslateQuestionResponse
	questionData: Question[],
}

export const SolutionQuestionMediaCard: React.FC<SolutionQuestionMediaCardProps> = ({
	mediaName,
	paragraphMain,
	questionData,
}) => {

	const { selectedAnswers, setSelectedAnswer } = useSolutionContext()
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

	// Check if paragraphMain contains an image
	const hasImage = paragraphMain && paragraphMain.includes('<img')

	//TODO: Trigger active question 
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

	const getSolutionAnswerClass = (isAnswerCorrect: boolean, isSelected: boolean) => {
		const baseClass = "flex items-start gap-3 p-3 rounded-lg cursor-pointer";
		const correctBorder = `${baseClass} bg-positive/30 border-positive/30 border`
		const inCorrectBorder = `${baseClass} bg-destructive/30 border-destructive/30 border`
		const defaultClass = `${baseClass} bg-card border-border border`

		if (isAnswerCorrect) {
			return correctBorder;
		}
		
		if (isSelected && !isAnswerCorrect) {
			return inCorrectBorder;
		}
		
		return defaultClass;
	} 

	return (
		<Card className="w-full mx-auto mb-3">
			<CardHeader className="pb-2">
				<Badge>
					Questions {mediaName} refer to the following
				</Badge>
			</CardHeader>

			<CardContent className="flex flex-col md:flex-row gap-6">
				{hasImage && (
					<>
						{/* Left side - Main Paragraph */}
						<div className="w-full md:w-2/3 flex-shrink-0">
							<MainParagraph paragraphMain={paragraphMain} />
						</div>
					</>
				)}

				{/* Right side - Questions */}
				<div className={`space-y-6 w-full ${hasImage ? 'md:w-1/3' : ''}`}>
					{questionData.map((question, index) => (
						<div key={question.question_id || index}>

							{/* Question Block */}
							<div className="flex flex-col space-y-4">

								{/* Question Header */}
								<div className="flex items-start gap-3">
									<Badge variant='secondary' className="bg-primary/20">
										Question {question.question_number}
									</Badge>
									<Label>
										{question.question_content}
									</Label>
								</div>

								<TranslationCard
									translateScript={newTranslateScript[question.question_id]}
									selectedLanguage={getSelectedLanguage(question.question_id)}
									isExpanded={isTranslateCardExpanded(question.question_id)}
									onToggle={() => toggleTranslateCardExpanded(question.question_id)}
									onLanguageChange={(lang: LANGUAGE_ID) => handleSelectLanguage(question.question_id, lang)}
									onTranslate={() => handleTranslation(question.question_id)}
									isTranslatePending={isTranslatePending}
									isTranslateError={isTranslateError}
								/>

								<div className="mt-3">
									<Label className="mb-2">
										Select your answer:
									</Label>

									{/* Refactored Answer Options */}
									<RadioGroup
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
													className="mt-0.5"
												/>
												{answer.content}
											</Label>
										)

										} )}
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