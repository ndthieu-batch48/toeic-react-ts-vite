import { createRootRouteWithContext, Outlet, useRouter } from '@tanstack/react-router'
import type { AuthContext } from '@/common/context/AuthContext'
import type { QueryClient } from '@tanstack/react-query'
import { MainFooter } from '@/common/component/MainFooter'
import { MainNavigationMenu } from '@/common/component/MainNavigationMenu'
import { ScrollToTop } from '@/common/component/ScrollToTop'
import { useScrollControl } from '@/common/hook/useScrollControl'
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








