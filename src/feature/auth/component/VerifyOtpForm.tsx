import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/shadcn/component/ui/input-otp"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shadcn/component/ui/form"
import { Button } from "@/shadcn/component/ui/button"
import { AUTH_FORM_TEXTS, AUTH_CONFIG } from "../const/authConst"
import { useEffect, useState } from "react"
import { CircleCheck, CircleX } from "lucide-react"

const otpSchema = z.object({
	otp: z
		.string()
		.min(1, { message: "This field is required." })
		.refine((val) => val.length === 6 || /^\d+$/.test(val), {
			message: "Your one-time password must be 6 digits.",
		}),
});


type VerifyOTPFormProp = {
	onOtpVerify: (otpValue: string) => Promise<void>
	onResendOtp: () => Promise<void>
	verifyStatus: "error" | "idle" | "pending" | "success"
	resendStatus: "error" | "idle" | "pending" | "success"
}

export function VerifyOTPForm({
	onOtpVerify,
	onResendOtp,
	verifyStatus,
	resendStatus,
}: VerifyOTPFormProp) {
	const RESEND_OTP_COUNTDOWN = 60
	const [countDown, setCountDown] = useState(0)

	const form = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: {
			otp: "",
		},
		mode: "onChange",
	})

	const { control } = form

	const getInputOtpSlotClassName = () => {
		if (verifyStatus === "error") {
			return "border-destructive"
		}
		if (verifyStatus === "success") {
			return "border-positive"
		}
		return ""
	}

	useEffect(() => {
		if (countDown > 0) {
			const timer = setInterval(() => {
				setCountDown((prev) => prev - 1)
			}, 1000)

			return () => clearInterval(timer)
		}
	}, [countDown])

	const canResend = countDown === 0 && !(resendStatus === "pending")

	const handleResendOtp = async () => {
		if (!canResend) return

		await onResendOtp()
		form.reset()
		setCountDown(RESEND_OTP_COUNTDOWN) // Reset countdown after resend
	}

	return (
		<Form {...form}>
			<form className="flex flex-col w-full max-w-md mx-auto justify-center gap-6 p-6">
				<div className="text-center space-y-2">
					<h2 className="text-xl font-semibold">{AUTH_FORM_TEXTS.VERIFY_OTP_TITLE}</h2>
				</div>

				<FormField
					control={control}
					name="otp"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base">Enter OTP Code</FormLabel>
							<FormControl>
								<InputOTP
									disabled={verifyStatus === "pending"}
									maxLength={AUTH_CONFIG.OTP_MAX_LENGTH}
									value={field.value}
									onChange={(otpValue) => {
										field.onChange(otpValue)

										// Chỉ check length, regex validation đã có trong InputOTP
										if (otpValue.length === AUTH_CONFIG.OTP_MAX_LENGTH && !(verifyStatus === "pending")) {
											onOtpVerify(otpValue)
										}
									}}
								>
									<InputOTPGroup className="gap-1">
										{Array.from({ length: AUTH_CONFIG.OTP_MAX_LENGTH }).map((_, idx) => (
											<InputOTPSlot key={idx} index={idx} className={getInputOtpSlotClassName()} />
										))}
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormDescriptionByStatus verifyStatus={verifyStatus} />
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="text-center text-sm">
					Didn't receive the code?{" "}
					<Button
						type="button"
						variant="link"
						className="p-0"
						disabled={!canResend}
						onClick={handleResendOtp}
					>
						{resendStatus === "pending"
							? "Sending..."
							: canResend
								? "Resend Code"
								: `Resend in ${countDown}s`
						}
					</Button>
				</div>
			</form>
		</Form>
	)
}

const FormDescriptionByStatus = ({ verifyStatus }: { verifyStatus: "idle" | "pending" | "success" | "error" }) => {
	switch (verifyStatus) {
		case "pending":
			return <FormDescription>Verifying...</FormDescription>;

		case "success":
			return (
				<FormDescription className="flex items-center gap-1.5 text-positive">
					Verification successful
					<CircleCheck className="h-4 w-4" />
				</FormDescription>
			);

		case "error":
			return (
				<FormDescription className="flex items-center gap-1.5 text-destructive">
					Verification failed
					<CircleX className="h-4 w-4" />
				</FormDescription>
			);

		default:
			return (
				<FormDescription>
					Please enter the 6-digit code sent to your email.
				</FormDescription>
			);
	}
};
