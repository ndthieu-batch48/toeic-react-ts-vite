import { MainFooter } from '@/components/footer'
import { MainNavigationMenu } from '@/components/main-navigation-menu'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_layout')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<MainNavigationMenu />
			<MainFooter />
		</>
	)
}
