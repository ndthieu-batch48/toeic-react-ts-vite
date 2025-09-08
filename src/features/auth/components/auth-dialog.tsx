import { useState } from "react";

import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/features/auth/components/login-form";
import { RegisterForm } from "@/features/auth/components/register-form";
import { TermsNotice } from "@/components/term-notice";
import { TmaLogo } from "@/components/tma-logo";

type AuthDialogProps = {
	children: React.ReactNode
}

export function AuthDialog({ children }: AuthDialogProps) {
	const [mode, setMode] = useState<"login" | "register">("login")

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[800px] sm:h-[600px] p-0">
				<div className="flex w-full h-full">

					{/* Auth Form */}
					<div className={`flex-1 ${mode === "login" ? "order-1" : "order-2"}`}>
						{mode === "login" ? (
							<LoginForm switchToRegister={() => setMode("register")} />
						) : (
							<RegisterForm switchToLogin={() => setMode("login")} />
						)}
					</div>

					{/* Image */}
					<div className={`bg-muted hidden md:block w-[350px] h-full ${mode === "login" ? "order-2" : "order-1"}`}>
						<TmaLogo />
					</div>
				</div>

				<DialogFooter className="mt-auto mb-2">
					<TermsNotice />
				</DialogFooter>
			</DialogContent>
		</Dialog >
	)
}
