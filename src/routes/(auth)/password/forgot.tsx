import { createFileRoute } from '@tanstack/react-router'
import { ForgotPasswordForm } from '@/feature/auth/component/ForgotPasswordForm'

export const Route = createFileRoute('/(auth)/password/forgot')({
	component: ForgotPasswordRoute,
})

function ForgotPasswordRoute() {
	return (
		<ForgotPasswordForm />
	)
}
