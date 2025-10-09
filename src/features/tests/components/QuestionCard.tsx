import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import type { Question, TranslateQuestionResponse } from '../types/test'
import { MainParagraph } from './MainParagraph'
import { TranslationCard } from './TranslationCard'
import { useTestContext } from '../context/TestContext'
import { useTranslationCard } from '../hooks/useTranslationCard'
import type { LANGUAGE_ID } from '../constants/const'
import { isMainParagraphHasContent } from '../helper/testHelper'
import { Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTestScrollContext } from '../context/TestScrollContext'

export interface QuestionCardProps {
	paragraphMain: string
	translateScript?: TranslateQuestionResponse
	questionData: Question,
	partId: number,
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
	paragraphMain,
	questionData,
	partId,
}) => {

	// SCROLL LOGIC
	const { setScrollTarget } = useTestScrollContext()

	const { question_id, question_number, question_content, answer_list } = questionData
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

	const currentSelectedAnswer = selectedAnswers[String(question_id)] || '';

	const handleSelectAnswer = (answerId: string) => {
		const updatedAnswers = {
			...selectedAnswers,
			[String(question_id)]: answerId
		};
		setSelectedAnswer(updatedAnswers);
		setActiveQuestion({ part_id: partId, question_id: question_id })
	}

	return (
		<Card
			className="w-full mx-auto mb-3 shadow-md py-3"
			ref={(el: HTMLDivElement | null) => { setScrollTarget(question_id, el) }}
		>
			<CardHeader>

				<div className="flex items-center gap-1">
					<Button
						size="icon"
						variant="outline"
						className="hover:bg-background" >
						<Flag className="fill-marker text-marker" />
					</Button>
					<Badge className="text-base font-semibold">
						Question {question_number}
					</Badge>
					<Label className="text-base font-semibold self-start">
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

			<CardContent className="flex gap-2">
				{hasContent && (
					<div className="flex-1 min-w-0">
						<MainParagraph mainParagraph={paragraphMain} />
					</div>
				)}

				{/* Radio Group for Answer Options */}
				<div className={`space-y-4 ${hasContent ? 'flex-shrink-0 w-auto' : 'w-full'}`}>
					<Label>
						Select your answer:
					</Label>

					<RadioGroup
						className="gap-1"
						value={currentSelectedAnswer}
						onValueChange={handleSelectAnswer}>
						{answer_list.map((answer, index) => (
							<Label
								key={answer.answer_id || index}
								htmlFor={`question-${question_id}-option-${answer.answer_id}`}
								className={`flex items-center gap-2 p-1 rounded-lg border border-border shadow-xs bg-background cursor-pointer transition-colors text-base ${currentSelectedAnswer === String(answer.answer_id)
									? "border-primary bg-primary-foreground"
									: "hover:border-primary/50 hover:bg-primary-foreground"
									}`}
							>
								<RadioGroupItem
									id={`question-${question_id}-option-${answer.answer_id}`}
									value={String(answer.answer_id)}
									className="border border-foreground"
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
