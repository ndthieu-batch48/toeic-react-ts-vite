import { AllTestsSection } from "../component/AllTestsSection"
import type { TestSummaryResponse } from "../type/testServiceType"
import { Card, CardContent } from "@/shadcn/component/ui/card"
import { Button } from "@/shadcn/component/ui/button"
import { Link } from "@tanstack/react-router"
import { ClipboardList, TrendingUp } from "lucide-react"

type TestDashBoardPageProp = {
	testData: TestSummaryResponse[]
	hasHistory: boolean,
	savedProgressMap: Record<number, boolean>
}

export const TestDashBoardPage = ({ testData, hasHistory, savedProgressMap }: TestDashBoardPageProp) => {

	return (
		<>
			{hasHistory && (
				<Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
					<CardContent className="flex items-center justify-between py-4">
						<div className="flex items-center gap-4">
							<div className="rounded-full bg-primary/10 p-3">
								<ClipboardList className="w-6 h-6 text-primary" />
							</div>
							<div>
								<h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
									View Your Test History
									<TrendingUp className="w-4 h-4 text-primary" />
								</h3>
								<p className="text-sm text-muted-foreground">
									Track your progress and review past test results
								</p>
							</div>
						</div>
						<Button asChild>
							<Link to="/history">
								Go to History
							</Link>
						</Button>
					</CardContent>
				</Card>
			)}
			<AllTestsSection
				availableTests={testData || []}
				testProgressMap={savedProgressMap}
			/>
		</>
	)
}