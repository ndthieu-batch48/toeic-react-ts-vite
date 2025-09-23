import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import type { Question } from '../types/test'
import { MainParagraph } from './main-paragraph'
import { TranslationCard } from './translation-card'
import { useTestContext } from '../context/TestContext'
import { useTranslationCard } from '../hooks/useTranslationCard'

export interface QuestionCardProps {
	paragraphMain: string
	translateScript?: string
	questionData: Question,
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
	paragraphMain,
	translateScript,
	questionData,
}) => {

	const { question_id, question_number, question_content, answer_list } = questionData
	const { selectedAnswers, setSelectedAnswer } = useTestContext()
	const { 
		translateScript: newTranslateScript, 
		isTranslateCardExpanded, 
		toggleTranslateCardExpanded, 
		getSelectedLanguage, 
		handleSelectLanguage,
		handleManualTranslate,
		isTranslating
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
					onLanguageChange={(lang: string) => handleSelectLanguage(question_id, lang)}
					onTranslate={() => handleManualTranslate(question_id)}
					isTranslating={isTranslating}
					questionId={question_id}
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

					<RadioGroup value={currentSelectedAnswer} onValueChange={handleSelectAnswer}>
						{answer_list.map((answer, index) => (
							<Label
								key={answer.answer_id || index}
								htmlFor={`question-${question_id}-option-${answer.answer_id}`}
								className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${currentSelectedAnswer === String(answer.answer_id)
									? "border-primary bg-primary-foreground"
									: "hover:border-primary/50 hover:bg-primary-foreground"
									}`}
							>
								<RadioGroupItem
									id={`question-${question_id}-option-${answer.answer_id}`}
									value={String(answer.answer_id)}
									className="mt-0.5"
								/>
								{answer.content}
							</Label>
						))}
					</RadioGroup>
				</div>
			</CardContent>
		</Card>
	)

}
