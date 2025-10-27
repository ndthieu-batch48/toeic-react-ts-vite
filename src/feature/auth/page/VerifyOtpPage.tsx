import { VerifyOTPForm } from '@/feature/auth/component/VerifyOtpForm'

export const VerifyResetOtpPage: React.FC = () => {

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<VerifyOTPForm />
			</div>
		</div>
	)

}