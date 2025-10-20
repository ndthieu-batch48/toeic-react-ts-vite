import HistoryPage from '@/features/history/pages/HistoryPage'
import { getHistoryResultListOptions } from '@/features/history/utils/historyQuery';
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
