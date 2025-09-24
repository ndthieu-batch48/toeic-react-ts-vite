import { Button } from "@/components/ui/button"
import { Link, useSearch, useParams } from "@tanstack/react-router"

import { Label } from "@radix-ui/react-dropdown-menu"
import type { Part } from "@/features/tests/types/test"
import { SolutionPartTab } from "../components/solution-part-tabs"
import { SolutionQuestionTab } from "../components/solution-question-tab"


type SolutionPageProps = {
	testTitle: string
	partData: Part[]
	isFailed: boolean
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ testTitle, partData, isFailed }) => {
	// Get current search params and route params to preserve them when navigating back
	const search = useSearch({ from: '/_protected/history/$historyId/solution' })
	const params = useParams({ from: '/_protected/history/$historyId/solution' })

	return (
		<>
			<div className="flex justify-center items-center w-full h-32 gap-2">
				<Label className="text-xl font-bold text-foreground font-serif">{testTitle}</Label>
				<Button
					className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
					variant="outline"
					asChild>
					<Link
						to="/history/$historyId"
						params={{ historyId: params.historyId }}
						search={{ 
							belongToTestId: search.belongToTestId,
							isFailed: isFailed
						}}
						replace={true}
					>
						Exit
					</Link>
				</Button>
			</div>

			<div className="flex flex-col md:flex-row gap-4 px-2">
				<SolutionPartTab
					className="flex-1"
					partData={partData}
				/>

				<div className="flex flex-col gap-3 md:sticky md:top-32 self-start md:w-80 h-150">
					<SolutionQuestionTab partData={partData}></SolutionQuestionTab>
				</div>

			</div>
		</>
	)
}