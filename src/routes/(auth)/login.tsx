import { TermsNotice } from '@/components/term-notice'
import { TmaLogo } from '@/components/tma-logo'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { LoginForm } from '@/features/auth/components/login-form'
import { RegisterForm } from '@/features/auth/components/register-form'
import { MainFooter } from '@/components/main-footer'
import { createFileRoute, redirect, useNavigate, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { MainNavigationMenu } from '@/components/main-navigation-menu'
import z from 'zod'
import { useAuthApi } from '@/features/auth/hooks/useAuthApi'
import type { LoginRequest, RegisterRequest } from '@/features/auth/types/user'

export const Route = createFileRoute('/(auth)/login')({
	validateSearch: z.object({
		redirect: z.string().optional().catch(''),
	}),
	beforeLoad: ({ context, search }) => {
		if (context.auth.isAuthenticated) {
			return redirect({ to: search.redirect || '/test', replace: true })
		}
	},
	component: LoginComponent,
})

function LoginComponent() {
	const navigate = useNavigate()
	const router = useRouter()
	const search = Route.useSearch()

	const { loginMutation, registerMutation } = useAuthApi();

	const [mode, setMode] = useState<"login" | "register">("login")

	const handleAuthSuccess = async () => {
		await router.invalidate()
		await navigate({
			to: search.redirect || '/test',
			replace: true
		})
	}

	const handleLogin = async (data: LoginRequest) => {
		try {
			await loginMutation.mutateAsync(data)
			await handleAuthSuccess()
		} catch (err) {
			console.error(err)
		}
	}

	const handleRegister = async (data: RegisterRequest) => {
		try {
			await registerMutation.mutateAsync(data)
			await handleAuthSuccess()
		} catch (err) {
			console.error(err)
		}
	}


	return (
		<>
			<MainNavigationMenu />

			<div className="bg-muted min-h-screen p-4">
				<Card className="md:h-[80vh] md:max-w-6xl md:mx-auto p-0">
					<CardContent className="flex min-h-full lg:flex-row flex-col p-0">

						<div className={`flex-1 ${mode === "login" ? "order-1" : "order-2"} flex flex-col gap-4 p-6`}>
							<div className="flex flex-1 items-center justify-center">
								<div className="w-full max-w-xs">
									{mode === 'login' ? (
										<LoginForm
											switchToRegister={() => setMode("register")}
											onFormSubmit={handleLogin}
											loginStatus={loginMutation.status}
										/>
									) : (
										<RegisterForm
											switchToLogin={() => setMode("login")}
											onFormSubmit={handleRegister}
											registerStatus={registerMutation.status}
										/>
									)}
								</div>
							</div>
						</div>

						<div className={`flex-1 ${mode === "login" ? "order-2" : "order-1"} bg-primary-foreground relative hidden lg:block`}>
							<TmaLogo
								className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[300px] dark:brightness-[0.2] dark:grayscale"
							/>
						</div>

					</CardContent>
					<CardFooter className="grid">
						<TermsNotice />
					</CardFooter>
				</Card>
			</div>

			<MainFooter />
		</>
	)
}
