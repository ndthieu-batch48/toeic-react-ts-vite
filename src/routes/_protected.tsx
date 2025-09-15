import { MainFooter } from '@/components/main-footer'
import { MainNavigationMenu } from '@/components/main-navigation-menu'
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
			<MainNavigationMenu />
			<Outlet />
			<MainFooter />
		</>
	)
}