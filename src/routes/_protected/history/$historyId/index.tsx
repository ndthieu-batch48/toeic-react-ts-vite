import ResultPageSkeleton from '@/feature/history/loading/ResultPageSkeleton';
import ResultPage from '@/feature/history/page/ResultPage'
import { useGetHistoryResultDetail } from '@/feature/history/query/historyQuery';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/history/$historyId/')({
	component: ResultRoute,
})

function ResultRoute() {
	const { historyId } = Route.useParams();

	const { data: historyResultDetail, status, isError, error } = useGetHistoryResultDetail(Number(historyId));

	if (status === 'pending') {
		return (
			<ResultPageSkeleton />
		)
	}

	if (isError) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-destructive">
					Error loading history detail: {error?.message}
				</div>
			</div>
		)
	}

	return (
		<div>
			<ResultPage detailResult={historyResultDetail} />
		</div>
	)
}
