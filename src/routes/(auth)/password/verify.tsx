import { Card } from '@/component/ui/card'
import { VerifyOTPForm } from '@/feature/auth/component/VerifyOtpForm'
import { getOtpSession } from '@/feature/auth/helper/authHelper'
import { useOtpMutation } from '@/feature/auth/hook/useOtpMutation'
import { OtpPurpose } from '@/feature/auth/type/authEnum'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/(auth)/password/verify')({
	component: VerifyResetOtpRoute,
})

function VerifyResetOtpRoute() {
	const navigate = useNavigate()
	const { sendOtpMutation, verifyOtpMutation } = useOtpMutation()

	const handleVerifyOtp = async (otp: string): Promise<void> => {
		try {
			const response = await verifyOtpMutation.mutateAsync({
				otp,
				purpose: OtpPurpose.RESET_PASSWORD
			})

			if (response.success) {
				toast.success(response.message)
				navigate({
					to: '/password/reset',
					search: { token: response.token }
				})
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.message || 'Verification failed')
		}
	}

	const handleResendOtp = async (): Promise<void> => {
		try {
			const otpSession = getOtpSession()

			if (!otpSession || !otpSession.credential) {
				toast.error('Session expired. Please start over.')
				navigate({ to: '/password/forgot' })
				return
			}

			const response = await sendOtpMutation.mutateAsync({
				credential: otpSession.credential,
				credential_type: otpSession.credential_type,
				purpose: otpSession.purpose,
			})

			if (response.success) {
				toast.success(response.message)
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.message || 'Failed to resend OTP')
		}
	}

	return (
		<div className="bg-muted flex min-h-screen flex-col items-center p-6 md:p-10 lg:pt-30">
			<Card>
				<VerifyOTPForm
					onOtpVerify={handleVerifyOtp}
					onResendOtp={handleResendOtp}
					verifyStatus={verifyOtpMutation.status}
					resendStatus={sendOtpMutation.status}
				/>
			</Card>
		</div>
	)
}