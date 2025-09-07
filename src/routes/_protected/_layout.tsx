import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_layout')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>Hello I am test screen</div>
	)
}
