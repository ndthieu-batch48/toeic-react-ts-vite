import { StrictMode, useEffect, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import './index.css'

import { AuthProvider, useAuth } from './context/AuthContext'


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			retry: 3,
			refetchOnWindowFocus: false,
		},
	},
})

// Set up a Router instance
const router = createRouter({
	routeTree,
	context: {
		auth: undefined!,
		queryClient
	},
	defaultPendingMinMs: 2000,
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

// eslint-disable-next-line react-refresh/only-export-components
function MainApp() {
	const auth = useAuth()

	const routerContext = useMemo(() => {
		return { auth, queryClient }
	}, [auth])

	useEffect(() => {
		router.invalidate()
	}, [routerContext])

	return <RouterProvider router={router} context={routerContext} />
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
	const root = createRoot(rootElement)
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<MainApp />
				</AuthProvider>
			</QueryClientProvider>,
		</StrictMode>,
	)
}