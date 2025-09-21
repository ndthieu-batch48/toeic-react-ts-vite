import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: '/login',
				search: {
					redirect: location.href,
				},
				replace: true
			})
		}
	},
	component: ProtectedComponent,
})

function ProtectedComponent() {
	return (
		<>
			<Outlet />
		</>
	)
}