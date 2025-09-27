import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/history/')({
	component: HistoryRoute,
})

function HistoryRoute() {
	return <div>THIS IS A PLACE HOLDER FOR HISTORY INDEX PAGE</div>
}
