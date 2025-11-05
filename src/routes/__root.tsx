import { createRootRouteWithContext, Outlet, useRouter } from '@tanstack/react-router'
import type { AuthContext } from '@/context/AuthContext'
import type { QueryClient } from '@tanstack/react-query'
import { MainFooter } from '@/component/shared/MainFooter'
import { MainNavigationMenu } from '@/component/shared/MainNavigationMenu'
import { ScrollToTop } from '@/component/shared/ScrollToTop'
import { useScrollControl } from '@/hook/useScrollControl'
import { Toaster } from 'sonner'

type RouterContext = {
	auth: AuthContext
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
})

function RootComponent() {
	const { scrollPosition, scrollTo } = useScrollControl('window');
	const router = useRouter();

	const handleScrollToTop = () => {
		scrollTo(0, 0);
	}

	const isVisible = scrollPosition.y > 100;

	// Check if current route contains "practice" to hide navigation and footer
	const isPracticeRoute = router.state.location.pathname.includes('/practice');

	return (
		<div className="h-dvh">
			{!isPracticeRoute && <MainNavigationMenu />}
			<><Outlet /></>
			<MainFooter />
			<Toaster />
			<ScrollToTop
				isVisible={isVisible}
				onScrollToTop={handleScrollToTop}
			/>
		</div>
	)
}








