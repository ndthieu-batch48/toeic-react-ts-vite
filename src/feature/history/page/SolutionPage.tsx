import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/component/ui/card"

import type { PartDetailResponse } from "@/feature/test/type/testServiceType"
import { SolutionPartTab } from "../component/SolutionPartTabs"
import { SolutionQuestionTab } from "../component/SolutionQuestionTab"
import type { HistoryResultDetailResponse } from "../type/historyServiceType"
import { useScrollControl } from "@/common/hook/useScrollControl"
import { useSolutionContext } from "../context/SolutionContext"


type SolutionPageProps = {
	detailHistory: HistoryResultDetailResponse
	partData: PartDetailResponse[]
	testTitle: string
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ partData, testTitle }) => {
	const { isScrolling, scrollPosition } = useScrollControl('window');
	const { selectedAnswers } = useSolutionContext()

	const getTotalQuestion = () => {
		return partData.reduce((totalQuestions, part) => {
			const partQuestions = part.media_question_list?.reduce((partTotal, media) => {
				return partTotal + (media.question_list?.length || 0);
			}, 0) || 0;
			return totalQuestions + partQuestions;
		}, 0);
	}

	return (
		<div className="bg-background">

			<div className="flex flex-col md:flex-row ">

				<SolutionPartTab
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
						<SolutionQuestionTab partData={partData} />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}