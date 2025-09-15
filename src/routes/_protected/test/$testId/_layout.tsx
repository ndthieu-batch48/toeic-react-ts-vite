import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/test/$testId/_layout')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<Outlet />
		</>
	)
}
