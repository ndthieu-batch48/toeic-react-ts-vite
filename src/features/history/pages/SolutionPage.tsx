import { Button } from "@/components/ui/button"
import { Link, useParams } from "@tanstack/react-router"

import { Label } from "@radix-ui/react-dropdown-menu"
import type { Part } from "@/features/tests/types/test"
import { SolutionPartTab } from "../components/SolutionPartTabs"
import { SolutionQuestionTab } from "../components/SolutionQuestionTab"
import type { HistoryResultDetailResponse } from "../types/history"


type SolutionPageProps = {
	detailHistory: HistoryResultDetailResponse
	partData: Part[]
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ detailHistory, partData }) => {
	const params = useParams({ from: '/_protected/history/$historyId/solution' })

	return (
		<>
			<div className="flex justify-center items-center w-full h-32 gap-2">
				<Label className="text-xl font-bold text-foreground">{detailHistory.test_name}</Label>
				<Button
					className="border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground text-lg"
					variant="outline"
					asChild>
					<Link
						to="/history/$historyId"
						params={{ historyId: params.historyId }}
						replace={true}
					>
						Exit
					</Link>
				</Button>
			</div>

			<div className="flex flex-col md:flex-row gap-4 px-2">
				<SolutionPartTab
					className="flex-1 min-w-0"
					partData={partData}
				/>

				<div className="flex flex-col gap-3 md:sticky md:top-32 self-start flex-shrink-0 md:w-70 md:h-80">
					<SolutionQuestionTab partData={partData}></SolutionQuestionTab>
				</div>

			</div>
		</>
	)
}