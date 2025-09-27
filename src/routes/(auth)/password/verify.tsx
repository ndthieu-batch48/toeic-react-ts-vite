import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/password/verify')({
	component: VerifyResetOtpPage,
})

function VerifyResetOtpPage() {
	return (
		< VerifyResetOtpPage />
	)
}
