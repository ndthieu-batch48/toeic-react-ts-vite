import DetailResult from '@/features/history/components/detail-result'
import { useGetHistoryResultDetail } from '@/features/history/hooks/useHistoryApi';
import { createFileRoute } from '@tanstack/react-router'

import z from 'zod';

const searchSchema = z.object({
	isFailed: z.boolean(),
})

export const Route = createFileRoute('/_protected/history/$historyId')({
	validateSearch: searchSchema,
	component: RouteComponent,
})

function RouteComponent() {
	const { historyId } = Route.useParams();
	const { isFailed } = Route.useSearch();

	const { data: historyResultDetail, status, isError, error } = useGetHistoryResultDetail(Number(historyId));

	if (status === 'pending') {
		return (
			<div className="container mx-auto p-6 font-sans">
				<div className="text-center text-foreground">Loading history detail...</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="container mx-auto p-6 font-sans">
				<div className="text-center text-destructive">
					Error loading history detail: {error?.message}
				</div>
			</div>
		)
	}

	return (
		<div>
			<DetailResult detailResult={historyResultDetail} isFailed={isFailed} />
		</div>


	)
}
