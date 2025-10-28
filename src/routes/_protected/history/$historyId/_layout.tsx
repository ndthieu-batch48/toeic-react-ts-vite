import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/history/$historyId/_layout')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="h-dvh">
			<Outlet />
		</div>
	)
}
