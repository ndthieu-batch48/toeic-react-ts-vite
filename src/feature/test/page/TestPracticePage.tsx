import type { PartDetailRes } from "../type/testType"
import { PartTab } from "../component/PartTabs"
import { QuestionTab } from "../component/QuestionTab"

import { Card, CardHeader, CardTitle } from "@/component/ui/card"
import { useScrollControl } from "@/hook/useScrollControl"
import { useTestContext } from "../context/TestContext"
import { useBlocker } from "@tanstack/react-router"

type TestPracticePageProps = {
	testId: number
	testTitle: string
	partData: PartDetailRes[],
}

export const TestPracticePage: React.FC<TestPracticePageProps> = ({ testTitle, partData }) => {
	const { isScrolling, scrollPosition } = useScrollControl('window');
	const { selectedAnswers } = useTestContext()

	const getTotalQuestion = () => {
		return partData.reduce((totalQuestions, part) => {
			const partQuestions = part.media_ques_list?.reduce((partTotal, media) => {
				return partTotal + (media.ques_list?.length || 0);
			}, 0) || 0;
			return totalQuestions + partQuestions;
		}, 0);
	}

	useBlocker({
		shouldBlockFn: () => {

			const shouldLeave = confirm("You're about to quit the test. Your current answers will be submitted. Are you sure you want to continue?");
			return !shouldLeave;
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
					className="flex flex-col flex-shrink-0 md:max-w-60 md:max-h-120 md:sticky md:top-20 z-10 bg-background rounded-md shadow-md py-0 gap-2 overflow-hidden"
					style={{
						transform: isScrolling ? `translateY(${scrollPosition.y * 0.0005}px)` : 'translateY(0)',
						transition: isScrolling ? 'none' : 'transform 0.2s ease-out'
					}}
				>
					<CardHeader className="bg-primary text-primary-foreground py-2 gap-0">
						<CardTitle className="text-base">{testTitle}</CardTitle>
						<div className="text-xs font-semibold opacity-90">
							Answered: {Object.keys(selectedAnswers).length} / {getTotalQuestion()}
						</div>
					</CardHeader>

					<QuestionTab
						partData={partData}
					/>
				</Card>
			</div>
		</div>
	)
}