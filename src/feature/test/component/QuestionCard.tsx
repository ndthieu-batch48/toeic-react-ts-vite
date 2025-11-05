import { Card, CardContent, CardHeader } from '@/component/ui/card'
import { RadioGroup, RadioGroupItem } from '@/component/ui/radio-group'
import { Label } from '@/component/ui/label'
import { Badge } from '@/component/ui/badge'
import type { QuesDetailRes, GeminiTransQuesResp } from '../type/testType'
import { MainParagraph } from './MainParagraph'
import { TranslationCard } from './TranslationCard'
import { useTestContext } from '../context/TestContext'
import { useTranslationCard } from '../hook/useTranslationCard'
import type { LANG_ID } from '../const/testConst'
import { isMainParagraphHasContent } from '../helper/testHelper'
import { Flag } from 'lucide-react'
import { Button } from '@/component/ui/button'
import { useTestScrollContext } from '../context/TestScrollContext'

export interface QuestionCardProps {
	paragraphMain: string
	translateScript?: GeminiTransQuesResp
	questionData: QuesDetailRes,
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
	paragraphMain,
	questionData,
}) => {

	// SCROLL LOGIC
	const { setScrollTarget } = useTestScrollContext()

	const { ques_id, ques_number, ques_content, ans_list } = questionData
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

	const currentSelectedAnswer = selectedAnswers[String(ques_id)] || '';

	const handleSelectAnswer = (answerId: string) => {
		const updatedAnswers = {
			...selectedAnswers,
			[String(ques_id)]: answerId
		};
		setSelectedAnswer(updatedAnswers);
	}

	return (
		<Card
			className="w-full mx-auto mb-3 shadow-md py-3"
			ref={(el: HTMLDivElement | null) => { setScrollTarget(ques_id, el) }}
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
					onLanguageChange={(lang: LANG_ID) => handleSelectLanguage(ques_id, lang)}
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
						value={currentSelectedAnswer}
						onValueChange={handleSelectAnswer}>
						{ans_list.map((answer, index) => (
							<Label
								key={answer.ans_id || index}
								htmlFor={`question-${ques_id}-option-${answer.ans_id}`}
								className={`flex items-center gap-2 p-1 rounded-lg border border-border shadow-xs bg-background cursor-pointer transition-colors text-base ${currentSelectedAnswer === String(answer.ans_id)
									? "border-primary bg-primary-foreground"
									: "hover:border-primary/50 hover:bg-primary-foreground"
									}`}
							>
								<RadioGroupItem
									id={`question-${ques_id}-option-${answer.ans_id}`}
									value={String(answer.ans_id)}
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
