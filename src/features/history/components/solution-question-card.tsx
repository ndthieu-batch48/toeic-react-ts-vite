import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import type { Question, TranslateQuestionResponse } from '@/features/tests/types/test'
import { useTranslationCard } from '@/features/tests/hooks/useTranslationCard'
import { useSolutionContext } from '../context/SolutionContext'
import { TranslationCard } from '@/features/tests/components/translation-card'
import type { LANGUAGE_ID } from '@/features/tests/constants/const'
import { MainParagraph } from '@/features/tests/components/main-paragraph'


export interface SolutionQuestionCardProps {
	paragraphMain: string
	translateScript?: TranslateQuestionResponse
	questionData: Question,
}

export const SolutionQuestionCard: React.FC<SolutionQuestionCardProps> = ({
	paragraphMain,
	questionData,
}) => {

	const { question_id, question_number, question_content, answer_list } = questionData
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
	const handleSelectAnswer = (answerId: string) => {
		const updatedAnswers = {
			...selectedAnswers,
			[String(question_id)]: answerId
		};
		setSelectedAnswer(updatedAnswers);
	}

	const currentSelectedAnswer = selectedAnswers[String(question_id)] || '';

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
		<Card className="w-full mx-auto mb-3 bg-card border-border">
			<CardHeader className="mb-3">

				<div className="flex items-center gap-2 mb-2">
					<Badge className="">
						Question {question_number}
					</Badge>
					<Label className="">
						{question_content}
					</Label>
				</div>

				<TranslationCard
					translateScript={newTranslateScript[question_id]}
					selectedLanguage={getSelectedLanguage(question_id)}
					isExpanded={isTranslateCardExpanded(question_id)}
					onToggle={() => toggleTranslateCardExpanded(question_id)}
					onLanguageChange={(lang: LANGUAGE_ID) => handleSelectLanguage(question_id, lang)}
					onTranslate={() => handleTranslation(question_id)}
					isTranslatePending={isTranslatePending}
					isTranslateError={isTranslateError}
				/>
			</CardHeader>

			<CardContent className="flex px-2 gap-4">
				{hasImage && (
					<div className="w-2/3">
						<MainParagraph paragraphMain={paragraphMain} />
					</div>
				)}

				{/* Radio Group for Answer Options */}
				<div className={`space-y-4 ${hasImage ? 'w-1/3' : 'w-full'}`}>
					<Label>
						Select your answer:
					</Label>

					<RadioGroup disabled value={currentSelectedAnswer} onValueChange={handleSelectAnswer}>
						{answer_list.map((answer, index) => {
							const isSelected = currentSelectedAnswer === String(answer.answer_id);
							return (
								<Label
									key={answer.answer_id || index}
									htmlFor={`question-${question_id}-option-${answer.answer_id}`}
									className={getSolutionAnswerClass(answer.is_correct, isSelected)}
								>
									<RadioGroupItem
										id={`question-${question_id}-option-${answer.answer_id}`}
										value={String(answer.answer_id)}
										className="mt-0.5"
									/>
									{answer.content}
								</Label>
							);
						})}
					</RadioGroup>
				</div>
			</CardContent>
		</Card>
	)

}
