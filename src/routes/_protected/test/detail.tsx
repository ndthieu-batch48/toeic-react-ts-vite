import TestDetail from '@/features/tests/components/test-detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/test/detail')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<TestDetail />
	)
}
