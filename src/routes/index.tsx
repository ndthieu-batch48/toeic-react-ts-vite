import { createFileRoute } from '@tanstack/react-router'
import { LandingFooter } from '@/features/landing/component/footer'
import { LandingHeader } from '@/features/landing/component/header'
import { LandingMainContent } from '@/features/landing/component/main-content'

export const Route = createFileRoute('/')({
	component: LandingComponent,
})


export default function LandingComponent() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Header */}
			<LandingHeader />

			{/* Main Content */}
			<LandingMainContent />

			{/* Footer */}
			<LandingFooter />
		</div>
	)
}