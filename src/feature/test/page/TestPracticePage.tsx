import type { PartDetailResponse } from "../type/testServiceType"
import { PartTab } from "../component/PartTabs"
import { QuestionTab } from "../component/QuestionTab"

import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/component/ui/card"
import { useScrollControl } from "@/common/hook/useScrollControl"
import { useTestContext } from "../context/TestContext"
import { useBlocker } from "@tanstack/react-router"

type TestPracticePageProps = {
	testTitle: string
	partData: PartDetailResponse[],
}

export const TestPracticePage: React.FC<TestPracticePageProps> = ({ testTitle, partData }) => {
	const { isScrolling, scrollPosition } = useScrollControl('window');
	const { testType, selectedAnswers, isSubmitting, isClose } = useTestContext()

	const getTotalQuestion = () => {
		return partData.reduce((totalQuestions, part) => {
			const partQuestions = part.media_question_list?.reduce((partTotal, media) => {
				return partTotal + (media.question_list?.length || 0);
			}, 0) || 0;
			return totalQuestions + partQuestions;
		}, 0);
	}

	// This hook is used for blocking the navigation when user click the back button on browser.
	// It return either true or false
	// Logic: true -> allow navigation; false -> block navigation
	useBlocker({
		shouldBlockFn: () => {
			// Allow navigation during submit/close operations
			if (isSubmitting || isClose) {
				return false;
			}

			// In exam mode, show alert and always block
			if (testType === 'exam') {
				alert("You cannot leave the exam. Please complete or submit the test.");
				return true; // Always block navigation
			}

			// In practice mode, show confirmation
			if (testType === 'practice') {
				const shouldLeave = confirm(
					"You're about to quit the test. Are you sure you want to continue?"
				);

				// If user clicks OK, allow navigation (return false)
				// If user clicks Cancel, block navigation (return true)
				return !shouldLeave;
			}

			// Default: don't block
			return false;
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