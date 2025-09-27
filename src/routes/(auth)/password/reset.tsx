import { ResetPasswordPage } from '@/features/auth/page/ResetPasswordPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/password/reset')({
	component: ResetPasswordRoute,
})

function ResetPasswordRoute() {
	return (
		<ResetPasswordPage />
	)
}
