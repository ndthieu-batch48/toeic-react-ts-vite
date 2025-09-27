import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { AuthContext } from '@/contexts/AuthContext'
import type { QueryClient } from '@tanstack/react-query'
import { MainFooter } from '@/components/shared/MainFooter'
import { MainNavigationMenu } from '@/components/shared/MainNavigationMenu'

type RouterContext = {
	auth: AuthContext
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
})

function RootComponent() {
	return (
		<div className="h-screen">
			<MainNavigationMenu />
			<main><Outlet /></main>
			<MainFooter />
		</div>
	)
}








