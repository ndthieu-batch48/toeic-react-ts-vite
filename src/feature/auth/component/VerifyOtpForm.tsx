import { useState } from "react"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/component/ui/input-otp"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/component/ui/card"
import { Button } from "@/component/ui/button"
import { AUTH_FORM_TEXTS, AUTH_CONFIG } from "../const/authConst"

export function VerifyOTPForm() {
	const [value, setValue] = useState("")

	return (
		<Card className="w-full max-w-md mx-auto p-4 shadow-lg">
			<CardHeader className="text-center">
				<CardTitle className="text-xl">{AUTH_FORM_TEXTS.VERIFY_OTP_TITLE}</CardTitle>
				<CardDescription className="p-2">
					{AUTH_FORM_TEXTS.VERIFY_OTP_DESCRIPTION}
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col items-center gap-4">
				<InputOTP
					maxLength={AUTH_CONFIG.OTP_MAX_LENGTH}
					value={value}
					onChange={(value) => setValue(value)}
				>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>

				<div className="text-center text-sm">
					{AUTH_FORM_TEXTS.VERIFY_OTP_RESEND_TEXT}{" "}
					<Button variant="link" className="p-0">
						{AUTH_FORM_TEXTS.VERIFY_OTP_RESEND_BUTTON_TEXT}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
