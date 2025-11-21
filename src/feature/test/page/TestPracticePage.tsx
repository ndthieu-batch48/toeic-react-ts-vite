import type { PartDetailResponse } from "../type/testServiceType"
import { PartTab } from "../component/PartTabs"
import { QuestionTab } from "../component/QuestionTab"

import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/component/ui/card"
import { useScrollControl } from "@/common/hook/useScrollControl"
import { useTestContext } from "../context/TestContext"
import { useBlocker, useNavigate } from "@tanstack/react-router"
import { useCreateHistory } from "@/feature/history/hook/useCreateHistory"
import type { HistoryCreateRequest } from "@/feature/history/type/historyServiceType"

type TestPracticePageProps = {
	testId: number
	testTitle: string
	partData: PartDetailResponse[],
}

export const TestPracticePage: React.FC<TestPracticePageProps> = ({ testId, testTitle, partData }) => {
	const navigate = useNavigate()
	const { isScrolling, scrollPosition } = useScrollControl('window');
	const { testType, selectedAnswers, selectedParts, remainingDuration, isSubmitOrSave, isCancel, setIsSubmitOrSave } = useTestContext()
	const createHistoryMutation = useCreateHistory(testId)

	const getTotalQuestion = () => {
		return partData.reduce((totalQuestions, part) => {
			const partQuestions = part.media_question_list?.reduce((partTotal, media) => {
				return partTotal + (media.question_list?.length || 0);
			}, 0) || 0;
			return totalQuestions + partQuestions;
		}, 0);
	}

	const handleAutoSubmit = async () => {
		const submitPayload: HistoryCreateRequest = {
			test_id: testId,
			type: testType,
			data_progress: selectedAnswers,
			part_id_list: selectedParts,
			duration: remainingDuration / 60,
			status: 'submit'
		}

		try {
			setIsSubmitOrSave(true)
			const result = await createHistoryMutation.mutateAsync(submitPayload)
			if (result.status === 'submit') {
				navigate({
					to: "/history/$historyId",
					params: { historyId: String(result.history_id) },
					replace: true
				})
			}
		} catch (error) {
			setIsSubmitOrSave(false)
			console.error('Failed to auto-submit test:', error)
		}
	}

	useBlocker({
		shouldBlockFn: () => {
			if (isSubmitOrSave || isCancel) {
				return false; // User is submitting/saving/canceling - allow navigation
			}

			// User is NOT submitting/saving/canceling - Block and show confirmation
			const shouldLeave = confirm(
				"You're about to quit the test. Your current answers will be submitted. Are you sure you want to continue?"
			);

			if (shouldLeave) {
				// User confirmed - submit the test
				handleAutoSubmit()
			}

			return !shouldLeave; // Block if user wants to stay (clicked Cancel)
		},
	});

	return (
		<div className="bg-background">

			<div className="flex flex-col md:flex-row pt-20 pb-10">

				<PartTab
					className="flex-1 min-w-0"
					partData={partData}
				/>

				{/* Question Tab Div */}
				<Card
					className="flex-shrink-0 md:w-60 md:sticky md:top-20 z-10 bg-background rounded-md shadow-md overflow-hidden p-0 gap-0 m-0"
					style={{
						transform: isScrolling ? `translateY(${scrollPosition.y * 0.0005}px)` : 'translateY(0)',
						transition: isScrolling ? 'none' : 'transform 0.2s ease-out',
						maxHeight: 'calc(100vh - 10rem)'
					}}
				>
					<CardHeader className="bg-primary text-primary-foreground py-2 gap-0 flex-shrink-0">
						<CardTitle className="text-base">{testTitle}</CardTitle>
						<div className="text-xs font-semibold opacity-90">
							Answered: {Object.keys(selectedAnswers).length} / {getTotalQuestion()}
						</div>
					</CardHeader>

					<CardContent className="flex-1 min-h-0 p-0 pt-2">
						<QuestionTab partData={partData} />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}