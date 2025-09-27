import type { HistoryResultListResponse } from "@/features/history/types/history"
import { AllHistorySection } from "../components/AllHistorySection"
import { AllTestsSection } from "../components/AllTestsSection"
import type { Test } from "../types/test"

type TestDashBoardPageProps = {
	testData: Test[]
	historyData: HistoryResultListResponse[]
}

export const TestDashBoardPage: React.FC<TestDashBoardPageProps> = ({ testData, historyData }) => {


	return (
		<div className="container mx-auto p-6 space-y-8 bg-background">

			<AllTestsSection availableTests={testData || []} />

			<AllHistorySection historyResultList={historyData || []} />
		</div>
	)
}