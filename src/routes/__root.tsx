import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { AuthContext } from '@/contexts/AuthContext'
import type { QueryClient } from '@tanstack/react-query'
import { MainFooter } from '@/components/shared/MainFooter'
import { MainNavigationMenu } from '@/components/shared/MainNavigationMenu'
import { ScrollToTop } from '@/components/shared/ScrollToTop'
import { useScrollControl } from '@/hook/useScrollControl'

type RouterContext = {
	auth: AuthContext
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
})

function RootComponent() {
	const { scrollPosition, scrollTo } = useScrollControl('window');

	const handleScrollToTop = () => {
		scrollTo(0, 0);
	}

	const isVisible = scrollPosition.y > 100;

	return (
		<div className="h-screen">
			<MainNavigationMenu />
			<main><Outlet /></main>
			<MainFooter />
			<ScrollToTop
				isVisible={isVisible}
				onScrollToTop={handleScrollToTop}
			/>
		</div>
	)
}








