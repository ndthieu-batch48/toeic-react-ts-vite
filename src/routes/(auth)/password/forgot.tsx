import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ForgotPasswordForm } from '@/feature/auth/component/ForgotPasswordForm'
import { useOtpMutation } from '@/feature/auth/hook/useOtpMutation'
import { CredentialType, OtpPurpose } from '@/feature/auth/type/authEnum'
import { Card } from '@/shadcn/component/ui/card'
import { toast } from 'sonner'
import { clearOtpSession } from '@/feature/auth/helper/authHelper'

export const Route = createFileRoute('/(auth)/password/forgot')({
	beforeLoad: () => {
		clearOtpSession() // Ensure cached session is cleared
	},
	component: ForgotPasswordRoute,
})

function ForgotPasswordRoute() {
	const navigate = useNavigate()
	const { sendOtpMutation } = useOtpMutation()

	const handleSendOtp = async (credential: string): Promise<void> => {
		const response = await sendOtpMutation.mutateAsync({
			credential: credential,
			credential_type: CredentialType.EMAIL,
			purpose: OtpPurpose.RESET_PASSWORD,
		})

		if (response.success) {
			toast(response.message)
			navigate({ to: '/password/verify' })
		}
	}

	return (
		<div className="bg-muted flex min-h-screen flex-col items-center p-6 md:p-10 lg:pt-30">
			<Card>
				<ForgotPasswordForm
					onFormSubmit={handleSendOtp}
					isSending={sendOtpMutation.isPending}
					isError={sendOtpMutation.isError}
				/>
			</Card>
		</div>
	)
}
