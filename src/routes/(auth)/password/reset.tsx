import { Card } from '@/shadcn/component/ui/card';
import { ResetPasswordForm } from '@/feature/auth/component/ResetPasswordForm'
import { clearOtpSession, getOtpSession, updateOtpSession } from '@/feature/auth/helper/authHelper';
import { useOtpMutation } from '@/feature/auth/hook/useOtpMutation';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner';
import z from 'zod'

export const Route = createFileRoute('/(auth)/password/reset')({
	validateSearch: z.object({
		token: z.string(),
	}),
	beforeLoad: ({ search }) => {
		const session = getOtpSession();
		const tokenFromStorage = session?.token;
		const tokenFromUrl = search.token;

		// Có token trong localStorage -> OK
		if (tokenFromStorage) return;

		// Không có trong storage nhưng có trong URL -> lưu vào storage
		if (tokenFromUrl) {
			updateOtpSession({ token: tokenFromUrl });
			return;
		}

		// Không có ở đâu cả -> redirect
		throw redirect({
			to: '/password/forgot',
		});
	},
	component: ResetPasswordRoute,
})

function ResetPasswordRoute() {
	const { token } = Route.useSearch();
	const navigate = useNavigate();
	const { resetPasswordMutation } = useOtpMutation();

	const handleResetPassword = async (newPassword: string): Promise<void> => {
		// Ưu tiên localStorage, fallback URL
		const session = getOtpSession();
		const finalToken = session?.token || token;

		if (!finalToken) {
			toast.error('Session expired');
			navigate({ to: '/password/forgot' });
			return;
		}

		try {
			await resetPasswordMutation.mutateAsync({
				token: finalToken,
				new_password: newPassword,
			});

			toast.success('Password reset successfully');
			clearOtpSession();
			navigate({ to: '/login' });
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.message || 'Failed to reset password');
		}
	};

	return (
		<div className="bg-muted flex min-h-screen flex-col items-center p-6 md:p-10 lg:pt-30">
			<Card>
				<ResetPasswordForm
					onSubmit={handleResetPassword}
					isLoading={resetPasswordMutation.isPending}
				/>
			</Card>
		</div>
	)
}
