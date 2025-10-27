import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '@/feature/landing/page/LandingPage'

export const Route = createFileRoute('/')({
	component: LandingRoute,
})

export default function LandingRoute() {
	return (
		<div className="bg-background">
			<LandingPage />
		</div>
	)
}