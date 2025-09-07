import { createFileRoute } from '@tanstack/react-router'
import { RequestOtpForm } from '@/features/auth/components/forgot-password-form'

export const Route = createFileRoute('/(auth)/password/forgot')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<RequestOtpForm />
			</div>
		</div>
	)
}
