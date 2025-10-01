import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MainParagraph } from './MainParagraph'
import type { Question, TranslateQuestionResponse } from '../types/test'
import { TranslationCard } from './TranslationCard'
import { useTestContext } from '../context/TestContext'
import { useTranslationCard } from '../hooks/useTranslationCard'
import type { LANGUAGE_ID } from '../constants/const'
import { isMainParagraphHasContent } from '../helper/testHelper'
import { Button } from '@/components/ui/button'
import { Flag } from 'lucide-react'

type QuestionMediaCardProps = {
	mediaName: string,
	paragraphMain: string,
	translateScript?: TranslateQuestionResponse
	questionData: Question[],
}

export const QuestionMediaCard: React.FC<QuestionMediaCardProps> = ({
	mediaName,
	paragraphMain,
	questionData,
}) => {

	const { selectedAnswers, setSelectedAnswer } = useTestContext()
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

	// Helper function for answer option styling
	const getAnswerOptionClass = (questionId: number, answerId: number) => {
		const baseClass = "flex items-start gap-3 p-3 border border-border shadow-xs bg-background rounded-lg cursor-pointer text-base";
		return isAnswerSelected(questionId, answerId)
			? `${baseClass} border-primary bg-primary-foreground`
			: `${baseClass} hover:border-primary/50 hover:bg-primary-foreground`;
	}

	return (
		<Card className="w-full mx-auto mb-3">
			<CardHeader className="pb-2">
				<Badge className="text-lg font-semibold">
					Questions {mediaName.replace(/<\/?p>/g, '')} refer to the following
				</Badge>
			</CardHeader>

			<CardContent className="flex flex-col md:flex-row gap-6">
				{hasContent && (
					<>
						{/* Left side - Main Paragraph */}
						<div className="flex-1 min-w-0">
							<MainParagraph mainParagraph={paragraphMain} />
						</div>
					</>
				)}

				{/* Right side - Questions */}
				<div className={`space-y-6 ${hasContent ? 'flex-shrink-0 md:w-70' : 'w-full'}`}>
					{questionData.map((question, index) => (
						<div key={question.question_id || index}>

							{/* Question Block */}
							<div className="flex flex-col space-y-4">

								{/* Question Header */}
								<div className="flex flex-col gap-2 mb-5">

									<div className="flex gap-2">
										<Badge
											variant='outline'
											className="text-base font-semibold bg-primary/80 border-primary text-primary-foreground">
											Question {question.question_number}
										</Badge>

										<Button
											variant="outline"
											className="hover:bg-background" >
											<Flag className="fill-marker text-marker" />
										</Button>
									</div>


									<Label className="text-lg font-medium flex-1 min-w-0">
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

									{/* Answer Options */}
									<RadioGroup
										value={getCurrentAnswerValue(question.question_id)}
										onValueChange={handleSelectAnswer}
									>
										{question.answer_list.map((answer, answerIndex) => (
											<Label
												key={answer.answer_id || answerIndex}
												htmlFor={`question-${question.question_id}-answer-${answer.answer_id}`}
												className={getAnswerOptionClass(question.question_id, answer.answer_id)}
											>
												<RadioGroupItem
													id={`question-${question.question_id}-answer-${answer.answer_id}`}
													value={getAnswerValue(question.question_id, answer.answer_id)}
													className="mt-0.5"
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