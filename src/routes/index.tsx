import { createFileRoute } from '@tanstack/react-router'
import { LandingMainContent } from '@/features/landing/component/main-content'

export const Route = createFileRoute('/')({
	component: LandingComponent,
})


export default function LandingComponent() {
	return (
		<div className="bg-primary-foreground">
			<LandingMainContent />
		</div>
	)
}