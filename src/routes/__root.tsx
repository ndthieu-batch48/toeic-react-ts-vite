import type { QueryClient } from '@tanstack/react-query'
import { createRootRoute, createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from "@/components/ui/sonner"
import type { AuthContext } from '@/contexts/AuthContext'


export const RootComponent = () => {
	return (
		<>
			<Outlet />
			<Toaster />
			<TanStackRouterDevtools />
		</>
	)
}

type RouterContext = { auth: AuthContext }

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
})






