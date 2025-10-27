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
	const { data: historyList } = useSuspenseQuery(getHistoryResultListOptions());

	return (
		<HistoryPage historyList={historyList} />
	)
}
