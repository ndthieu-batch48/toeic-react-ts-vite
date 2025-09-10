import TestDetail from '@/features/tests/components/test-detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_authenticated/detail')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<TestDetail />
	)
}
