import { TermsNotice } from '@/components/term-notice'
import { TmaLogo } from '@/components/tma-logo'
import { Card } from '@/components/ui/card'
import { LoginForm } from '@/features/auth/components/login-form'
import { RegisterForm } from '@/features/auth/components/register-form'
import { MainFooter } from '@/components/footer'
import { LandingHeader } from '@/features/landing/component/header'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(auth)/login')({
	component: LoginComponent,
})

function LoginComponent() {
	const [mode, setMode] = useState<"login" | "register">("login")

	return (
		<>
			<LandingHeader />
			<div className="flex min-h-svh flex-col items-center justify-center bg-primary-foreground py-2">
				<Card className="w-full max-w-sm md:max-w-2xl">
					<div className="flex">

						{/* Auth Form */}
						<div className={`flex-1 ${mode === "login" ? "order-1" : "order-2"}`}>
							{mode === "login" ? (
								<LoginForm switchToRegister={() => setMode("register")} />
							) : (
								<RegisterForm switchToLogin={() => setMode("login")} />
							)}
						</div>

						{/* Image */}
						<div className={`bg-primary md:block w-[350px] h-full ${mode === "login" ? "order-2" : "order-1"}`}>
							<TmaLogo />
						</div>
					</div>

					<div className="mt-auto mb-2">
						<TermsNotice />
					</div>
				</Card>
			</div>

			<MainFooter />

		</>
	)
}
