import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { AuthContext } from '@/contexts/AuthContext'
import type { QueryClient } from '@tanstack/react-query'
import { MainFooter } from '@/components/shared/main-footer'
import { MainNavigationMenu } from '@/components/shared/main-navigation-menu'


export const RootComponent = () => {
	return (
		<div className="h-screen">
			<MainNavigationMenu />
			<Outlet />
			<MainFooter />
		</div>
	)
}

type RouterContext = {
	auth: AuthContext
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
})






