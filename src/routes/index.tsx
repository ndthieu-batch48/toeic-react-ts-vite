import { createFileRoute } from '@tanstack/react-router'
import { MainFooter } from '@/components/footer'
import { LandingHeader } from '@/features/landing/component/header'
import { LandingMainContent } from '@/features/landing/component/main-content'

export const Route = createFileRoute('/')({
	component: LandingComponent,
})


export default function LandingComponent() {
	return (
		<div className="min-h-screen bg-primary-foreground">
			<LandingHeader />

			<LandingMainContent />

			<MainFooter />
		</div>
	)
}