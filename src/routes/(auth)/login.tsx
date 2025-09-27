import z from 'zod'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'
import { LoginPage } from '@/features/auth/page/LoginPage'

export const Route = createFileRoute('/(auth)/login')({
	validateSearch: z.object({
		redirect: z.string().optional().catch(''),
	}),
	beforeLoad: ({ context, search }) => {
		if (context.auth.isAuthenticated) {
			return redirect({ to: search.redirect || '/test', replace: true })
		}
	},
	component: LoginRoute,
})

function LoginRoute() {
	const navigate = useNavigate()
	const auth = useAuth()
	const search = Route.useSearch()

	const handleAuthSuccess = async () => {
		// Refresh the auth context to get the latest user data
		await auth.refreshAuth()

		// Navigate to the intended destination
		await navigate({
			to: search.redirect || '/test',
			replace: true
		})
	}

	return (
		<LoginPage onAuthSuccess={handleAuthSuccess} />
	)
}
