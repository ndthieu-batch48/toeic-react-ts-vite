import { Card, CardContent } from "@/components/ui/card"
import { useAuthApi } from "../hook/useAuthApi";
import { useState } from "react";
import type { LoginRequest, RegisterRequest } from "../types/authType";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { TmaLogo } from "@/components/shared/TmaLogo";

type LoginPageProps = {
	onAuthSuccess: () => Promise<void>
}

export const LoginPage: React.FC<LoginPageProps> = ({ onAuthSuccess }) => {

	const { loginMutation, registerMutation } = useAuthApi();

	const [mode, setMode] = useState<"login" | "register">("login")

	const handleLogin = async (data: LoginRequest) => {
		try {
			await loginMutation.mutateAsync(data)
			await onAuthSuccess()
		} catch (err) {
			console.error(err)
		}
	}

	const handleRegister = async (data: RegisterRequest) => {
		try {
			await registerMutation.mutateAsync(data)
			await onAuthSuccess()
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="bg-primary-foreground min-h-screen pt-1">
			<Card className="md:h-[95vh] md:max-w-6xl md:mx-auto p-0 shadow-xl">
				<CardContent className="flex h-full lg:flex-row flex-col p-2">

					<div className={`flex-1 ${mode === "login" ? "order-1" : "order-2"} flex flex-col gap-4 p-6 bg-card`}>
						<div className="flex flex-1 items-center justify-center min-h-0">
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

					<div className={`flex-1 ${mode === "login" ? "order-2" : "order-1"} relative hidden lg:block`}>
						<TmaLogo
							className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[500px] dark:brightness-[0.2] dark:grayscale"
						/>
					</div>


				</CardContent>
			</Card>
		</div>
	)

}