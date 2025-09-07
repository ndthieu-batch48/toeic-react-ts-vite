import { createFileRoute } from '@tanstack/react-router'
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form' 

export const Route = createFileRoute('/(auth)/password/reset')({
	component: RouteComponent,
})

function RouteComponent() {
  return (
			<div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
				<div className="w-full max-w-sm md:max-w-3xl">
					<ResetPasswordForm />
				</div>
			</div>
		)
}
