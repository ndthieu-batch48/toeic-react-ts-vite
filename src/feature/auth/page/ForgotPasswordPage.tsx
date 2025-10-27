import { ForgotPasswordForm } from "../component/ForgotPasswordForm"

export const ForgotPasswordPage: React.FC = () => {
	return (
		<div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<ForgotPasswordForm />
			</div>
		</div>
	)
}