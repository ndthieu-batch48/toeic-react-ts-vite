import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from "@/components/ui/sonner"
import type { AuthContext } from '@/contexts/AuthContext'
import type { QueryClient } from '@tanstack/react-query'


export const RootComponent = () => {
	return (
		<>
			<Outlet />
			<Toaster />
			<TanStackRouterDevtools />
		</>
	)
}

type RouterContext = {
	auth: AuthContext
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
})






