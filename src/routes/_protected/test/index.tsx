import { createFileRoute } from '@tanstack/react-router'
import { useGetAllTests } from '@/feature/test/hook/useTestApi'
import { TestDashBoardPage } from '@/feature/test/page/TestDashBoardPage'

export const Route = createFileRoute('/_protected/test/')({
	component: TestDashBoardRoute,
})

function TestDashBoardRoute() {
	const {
		status: testsStatus,
		data: testData,
		isError: isTestsError,
		error: testsError,
	} = useGetAllTests()


	if (testsStatus === 'pending') {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-foreground">Loading...</div>
			</div>
		)
	}

	if (isTestsError) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-destructive">
					Error loading tests: {testsError?.message}
				</div>
			</div>
		)
	}


	return (
		<TestDashBoardPage testData={testData} />
	)
}