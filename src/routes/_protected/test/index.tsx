import { createFileRoute } from '@tanstack/react-router'
import { TestDashBoardPage } from '@/feature/test/page/TestDashBoardPage'
import TestDashBoardSkeleton from '@/feature/test/loading/TestDashBoardSkeleton'
import { useSuspenseQuery } from '@tanstack/react-query'
import { testQuery } from '@/feature/test/service/testService'

export const Route = createFileRoute('/_protected/test/')({
	component: TestDashBoardRoute,
	pendingComponent: TestDashBoardSkeleton,
})

function TestDashBoardRoute() {
	const { data: testData } = useSuspenseQuery(testQuery.all())

	return (
		<div className="min-h-screen container mx-auto p-6">
			<TestDashBoardPage testData={testData} />
		</div>
	)
}