import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import './index.css'

import { AuthProvider, useAuth } from './contexts/AuthContext'


const queryClient = new QueryClient()

// Set up a Router instance
const router = createRouter({
	routeTree,
	context: {
		auth: undefined!,
	},
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
function InnerApp() {
	const auth = useAuth()
	return <RouterProvider router={router} context={{ auth }} />
}


const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
	const root = createRoot(rootElement)
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<InnerApp />
				</AuthProvider>
			</QueryClientProvider>,
		</StrictMode>,
	)
}