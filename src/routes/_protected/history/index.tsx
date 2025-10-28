import HistoryPageSkeleton from '@/feature/history/loading/HistoryPageSkeleton';
import HistoryPage from '@/feature/history/page/HistoryPage'
import { getHistoryResultListOptions } from '@/feature/history/util/historyQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/history/')({
	loader: ({ context: { queryClient } }) => {
		return queryClient.ensureQueryData(getHistoryResultListOptions());
	},
	component: HistoryRoute,
})

function HistoryRoute() {
	const { data: historyList, isPending } = useSuspenseQuery(getHistoryResultListOptions());

	if (isPending) {
		return (
			<HistoryPageSkeleton />
		)
	}

	return (
		<>
			<HistoryPage historyList={historyList} />
		</>
	)
}
