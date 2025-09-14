import { createFileRoute } from '@tanstack/react-router'
import { MainFooter } from '@/components/main-footer'
import { LandingMainContent } from '@/features/landing/component/main-content'
import { MainNavigationMenu } from '@/components/main-navigation-menu'

export const Route = createFileRoute('/')({
	component: LandingComponent,
})


export default function LandingComponent() {
	return (
		<div className="min-h-screen bg-primary-foreground">
			<MainNavigationMenu />

			<LandingMainContent />

			<MainFooter />
		</div>
	)
}