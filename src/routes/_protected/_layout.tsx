import { MainFooter } from '@/components/footer'
import { MainNavigationMenu } from '@/components/main-navigation-menu'
import { getUserSession } from '@/features/helper/authHelper';
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_layout')({
	component: ProtectedComponent,
})

function ProtectedComponent() {
	console.log(getUserSession())
	return (
		<>
			<MainNavigationMenu />
			<Outlet />
			<MainFooter />
		</>
	)
}