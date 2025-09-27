import { createFileRoute } from '@tanstack/react-router'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'

export const Route = createFileRoute('/(auth)/password/forgot')({
	component: ForgotPasswordRoute,
})

function ForgotPasswordRoute() {
	return (
		<ForgotPasswordForm />
	)
}
