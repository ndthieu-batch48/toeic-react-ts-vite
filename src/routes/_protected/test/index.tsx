import { createFileRoute } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import { useGetAllTests } from '@/features/tests/hooks/userTestApi'
import { AllTestsSection } from '@/features/tests/components/all-tests-section'
import { AllHistorySection } from '@/features/history/components/all-history-section'
import { useGetHistoryResultList } from '@/features/history/hooks/useHistoryApi'

export const Route = createFileRoute('/_protected/test/')({
	component: TestDashBoardComponent,
})


function TestDashBoardComponent() {
	const {
		status: testsStatus,
		data: testData,
		isError: isTestsError,
		error: testsError,
	} = useGetAllTests()

	const {
		status: historyStatus,
		data: historyData,
		isError: isHistoryError,
		error: historyError,
	} = useGetHistoryResultList()

	if (testsStatus === 'pending' || historyStatus === 'pending') {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center">Loading...</div>
			</div>
		)
	}

	if (isTestsError) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-red-500">
					Error loading tests: {testsError?.message}
				</div>
			</div>
		)
	}

	if (isHistoryError) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-red-500">
					Error loading history: {historyError?.message}
				</div>
			</div>
		)
	}


	return (
		<div className="container mx-auto p-6 space-y-8">
			<Separator className="my-8" />

			<AllTestsSection availableTests={testData || []} />

			<Separator className="my-8" />

			<AllHistorySection historyResultList={historyData || []} />
		</div>
	)
}