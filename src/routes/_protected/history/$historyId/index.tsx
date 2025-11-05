import ResultPageSkeleton from '@/feature/history/loading/ResultPageSkeleton';
import ResultPage from '@/feature/history/page/ResultPage'
import { historyQuery } from '@/feature/history/service/historyService';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/history/$historyId/')({
	component: ResultRoute,
	pendingComponent: ResultPageSkeleton,
})

function ResultRoute() {
	const { historyId } = Route.useParams();

	const { data: historyResultDetail } = (
		useSuspenseQuery(
			historyQuery.resultDetail(Number(historyId))
		)
	);

	return (
		<div className=" min-h-screen">
			<ResultPage detailResult={historyResultDetail} />
		</div>
	)
}
