import { AllTestsSection } from "../components/AllTestsSection"
import type { TestSummaryRes } from "../types/test"

type TestDashBoardPageProps = {
	testData: TestSummaryRes[]
}

export const TestDashBoardPage: React.FC<TestDashBoardPageProps> = ({ testData }) => {

	return (
		<div className="container mx-auto p-6 space-y-8 bg-background">

			<AllTestsSection availableTests={testData || []} />

		</div>
	)
}