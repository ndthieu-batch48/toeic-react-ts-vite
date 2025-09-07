import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const RootComponent = () => {
	return (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	)
}

export const Route = createRootRoute({
	component: RootComponent,
})







