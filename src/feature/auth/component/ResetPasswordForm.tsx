import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/shadcn/component/ui/button"
import { Input } from "@/shadcn/component/ui/input"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shadcn/component/ui/form"
import { AUTH_FORM_TEXTS, FORM_FIELD_LABELS, FORM_FIELD_PLACEHOLDERS } from "../const/authConst"

const resetPasswordSchema = z.object({
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long"),
	confirmPassword: z
		.string()
		.min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

type ResetPasswordFormProp = {
	onSubmit: (password: string) => Promise<void>
	isLoading?: boolean
}

export function ResetPasswordForm({ onSubmit, isLoading = false }: ResetPasswordFormProp) {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const form = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	})

	const handleSubmit = async (data: ResetPasswordFormData) => {
		await onSubmit(data.password)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="flex flex-col w-full max-w-md mx-auto justify-center gap-6 p-6"
			>
				<div className="text-center space-y-2">
					<h2 className="text-xl font-semibold">{AUTH_FORM_TEXTS.RESET_PASSWORD_TITLE}</h2>
					<p className="text-sm text-muted-foreground">
						{AUTH_FORM_TEXTS.RESET_PASSWORD_DESCRIPTION}
					</p>
				</div>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{FORM_FIELD_LABELS.NEW_PASSWORD}</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={showPassword ? "text" : "password"}
										placeholder={FORM_FIELD_PLACEHOLDERS.PASSWORD_ASTERISKS}
										disabled={isLoading}
										{...field}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
										onClick={() => setShowPassword(!showPassword)}
										disabled={isLoading}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4 text-muted-foreground" />
										) : (
											<Eye className="h-4 w-4 text-muted-foreground" />
										)}
										<span className="sr-only">
											{showPassword ? "Hide password" : "Show password"}
										</span>
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{FORM_FIELD_LABELS.CONFIRM_PASSWORD}</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={showConfirmPassword ? "text" : "password"}
										placeholder={FORM_FIELD_PLACEHOLDERS.PASSWORD_ASTERISKS}
										disabled={isLoading}
										{...field}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										disabled={isLoading}
									>
										{showConfirmPassword ? (
											<EyeOff className="h-4 w-4 text-muted-foreground" />
										) : (
											<Eye className="h-4 w-4 text-muted-foreground" />
										)}
										<span className="sr-only">
											{showConfirmPassword ? "Hide password" : "Show password"}
										</span>
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" size="lg" className="w-full" disabled={isLoading}>
					{isLoading ? "Resetting..." : AUTH_FORM_TEXTS.RESET_PASSWORD_BUTTON_TEXT}
				</Button>
			</form>
		</Form>
	)
}