import { Card, CardHeader, CardTitle } from "@/components/ui/card"

import type { Part } from "@/features/tests/types/test"
import { SolutionPartTab } from "../components/SolutionPartTabs"
import { SolutionQuestionTab } from "../components/SolutionQuestionTab"
import type { HistoryResultDetailResponse } from "../types/history"
import { useScrollControl } from "@/hook/useScrollControl"
import { useSolutionContext } from "../context/SolutionContext"


type SolutionPageProps = {
	detailHistory: HistoryResultDetailResponse
	partData: Part[]
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ partData }) => {
	const { isScrolling, scrollPosition } = useScrollControl('window');
	const { selectedAnswers } = useSolutionContext()

	const getTotalQuestion = () => {
		return partData.reduce((totalQuestions, part) => {
			const partQuestions = part.media_list?.reduce((partTotal, media) => {
				return partTotal + (media.question_list?.length || 0);
			}, 0) || 0;
			return totalQuestions + partQuestions;
		}, 0);
	}

	return (
		<div className="bg-primary/10 min-h-screen">

			<div className="flex flex-col md:flex-row pb-30 pt-2">

				<SolutionPartTab
					className="flex-1 min-w-0"
					partData={partData}
				/>

				{/* Question Tab Div */}
				<Card
					className="flex flex-col flex-shrink-0 md:max-w-60 md:max-h-[calc(100vh-9rem)] md:sticky md:top-20 z-10 bg-background rounded-md shadow-md py-0 gap-2 overflow-hidden"
					style={{
						transform: isScrolling ? `translateY(${scrollPosition.y * 0.0005}px)` : 'translateY(0)',
						transition: isScrolling ? 'none' : 'transform 0.2s ease-out'
					}}
				>
					<CardHeader className="bg-primary text-primary-foreground py-2 gap-0">
						<CardTitle className="text-base">Question board</CardTitle>
						<div className="text-xs font-semibold opacity-90">
							Answered: {Object.keys(selectedAnswers).length} / {getTotalQuestion()}
						</div>
					</CardHeader>

					<SolutionQuestionTab
						partData={partData}
					/>
				</Card>
			</div>
		</div>
	)
}