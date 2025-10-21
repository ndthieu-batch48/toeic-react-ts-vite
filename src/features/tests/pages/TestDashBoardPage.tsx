import { AllTestsSection } from "../components/AllTestsSection"
// import { HeroCarousel } from "../components/HeroCarousel"
import { UserInsightsPanel } from "../components/UserInsightPanel"
import type { TestSummaryRes } from "../types/test"

type TestDashBoardPageProps = {
	testData: TestSummaryRes[]
}

export const TestDashBoardPage: React.FC<TestDashBoardPageProps> = ({ testData }) => {
	const mockInsightsData = {
		accessDates: ['2025-10-01', '2025-10-02', '2025-10-03', '2025-10-05', '2025-10-06', '2025-10-19', '2025-10-20', '2025-10-21'],
		currentStreak: 3,
		longestStreak: 5,
		totalTestsTaken: 12,
		averageAccuracy: 78.5,
		averageListeningScore: 82.3,
		averageReadingScore: 74.7,
		totalStudyTime: 1440,
		recentScores: [72.5, 75.0, 78.5, 80.0, 82.5],
		improvementRate: 12.3
	};
	return (
		<div className="flex mx-auto p-6 bg-background">
			<div className="flex flex-col gap-10 pr-5 md:max-w-5xl">
				{/* <HeroCarousel /> */}

				<AllTestsSection availableTests={testData || []} />

			</div>

			<UserInsightsPanel insightsData={mockInsightsData} />

		</div>
	)
}