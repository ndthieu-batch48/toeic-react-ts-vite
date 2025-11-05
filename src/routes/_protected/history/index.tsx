import HistoryPageSkeleton from '@/feature/history/loading/HistoryPageSkeleton';
import HistoryPage from '@/feature/history/page/HistoryPage'
import { historyQuery } from '@/feature/history/service/historyService';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/history/')({
	component: HistoryRoute,
	pendingComponent: HistoryPageSkeleton,
})

function HistoryRoute() {
	const { data: historyList } = useSuspenseQuery(historyQuery.resultList());

	return (
		<div className="min-h-screen">
			<HistoryPage historyList={historyList} />
		</div>
	)
}
