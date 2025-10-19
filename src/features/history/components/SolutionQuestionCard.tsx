import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import type { QuesDetailRes, TranslateQuestionResponse } from '@/features/tests/types/test'
import { useTranslationCard } from '@/features/tests/hooks/useTranslationCard'
import { useSolutionContext } from '../context/SolutionContext'
import { useSolutionScrollContext } from '../context/SolutionScrollContext'
import { TranslationCard } from '@/features/tests/components/TranslationCard'
import type { LANGUAGE_ID } from '@/features/tests/constants/const'
import { MainParagraph } from '@/features/tests/components/MainParagraph'
import { isMainParagraphHasContent } from '@/features/tests/helper/testHelper'


export interface SolutionQuestionCardProps {
	paragraphMain: string
	translateScript?: TranslateQuestionResponse
	questionData: QuesDetailRes,
}

export const SolutionQuestionCard: React.FC<SolutionQuestionCardProps> = ({
	paragraphMain,
	questionData,
}) => {

	const { ques_id, ques_number, ques_content, ans_list } = questionData
	const { selectedAnswers, setSelectedAnswer } = useSolutionContext()
	const { setScrollTarget } = useSolutionScrollContext()
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

	const currentSelectedAnswer = selectedAnswers[String(ques_id)] || '';

	const handleSelectAnswer = (answerId: string) => {
		const updatedAnswers = {
			...selectedAnswers,
			[String(ques_id)]: answerId
		};
		setSelectedAnswer(updatedAnswers);
	}

	const getSolutionAnswerClass = (isAnswerCorrect: boolean, isSelected: boolean) => {
		const baseClass = `flex items-center gap-2 p-1 rounded-lg border border-border shadow-xs bg-background cursor-pointer transition-colors text-base`;

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
			className="w-full mx-auto mb-3 shadow-md py-3"
			ref={(el: HTMLDivElement | null) => { setScrollTarget(ques_id, el) }}
		>
			<CardHeader>

				<div className="flex items-center gap-1">
					<Badge className="text-base font-semibold">
						Question {ques_number}
					</Badge>
					<Label className="text-base font-semibold self-start">
						{ques_content}
					</Label>
				</div>

				<TranslationCard
					translateScript={newTranslateScript[ques_id]}
					selectedLanguage={getSelectedLanguage(ques_id)}
					isExpanded={isTranslateCardExpanded(ques_id)}
					onToggle={() => toggleTranslateCardExpanded(ques_id)}
					onLanguageChange={(lang: LANGUAGE_ID) => handleSelectLanguage(ques_id, lang)}
					onTranslate={() => handleTranslation(ques_id)}
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
						disabled
						value={currentSelectedAnswer}
						onValueChange={handleSelectAnswer}>
						{ans_list.map((answer, index) => {
							const isSelected = currentSelectedAnswer === String(answer.ans_id);
							return (
								<Label
									key={answer.ans_id || index}
									htmlFor={`question-${ques_id}-option-${answer.ans_id}`}
									className={getSolutionAnswerClass(answer.is_correct, isSelected)}
								>
									<RadioGroupItem
										id={`question-${ques_id}-option-${answer.ans_id}`}
										value={String(answer.ans_id)}
										className="border border-foreground"
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
