import { Link } from "@tanstack/react-router"
import { AUTH_FORM_TEXTS, FORM_FIELD_LABELS, FORM_FIELD_PLACEHOLDERS, VALIDATION_MESSAGES } from "../const/authConst"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/ui/form"
import { TmaLogo } from "@/component/shared/TmaLogo"
import { Input } from "@/component/ui/input"
import { Button } from "@/component/ui/button"

const forgotPasswordSchema = z.object({
	credential: z
		.string()
		.trim()
		.nonempty(VALIDATION_MESSAGES.THIS_FIELD_IS_REQUIRED)
		.refine(
			(val) => /\S+@\S+\.\S+/.test(val) || /^[a-zA-Z0-9_]+$/.test(val),
			"Must be a valid email or username."
		),
})
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

type ForgotPasswordFormProps = {
	onFormSubmit: (credential: string) => Promise<void>
	isSending: boolean
	isError: boolean

}

export function ForgotPasswordForm({ onFormSubmit, isSending, isError }: ForgotPasswordFormProps) {
	const form = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			credential: "",
		},
	})

	const onSubmit = async (data: ForgotPasswordFormData) => {
		await onFormSubmit(data.credential)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col w-full max-w-md mx-auto justify-center gap-6 p-6"
			>
				<div className="text-center space-y-2">
					<TmaLogo className="w-20 h-20 mx-auto" />
					<h2 className="text-xl font-semibold">{AUTH_FORM_TEXTS.FORGOT_PASSWORD_TITLE}</h2>
					<p className="text-base text-muted-foreground">
						{AUTH_FORM_TEXTS.FORGOT_PASSWORD_DESCRIPTION}
					</p>
				</div>

				<FormField
					control={form.control}
					name="credential"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base">{FORM_FIELD_LABELS.EMAIL_OR_USERNAME}</FormLabel>
							<FormControl>
								<Input
									className={isError ? "border-destructive" : ""}
									placeholder={FORM_FIELD_PLACEHOLDERS.EMAIL_PLACEHOLDER}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" size="lg" className="w-full" disabled={isSending}>
					{isSending ? "Sending..." : AUTH_FORM_TEXTS.FORGOT_PASSWORD_BUTTON_TEXT}
				</Button>

				<div className="text-center text-sm">
					<Link to="/login" className="text-primary hover:underline">
						Back to Login
					</Link>
				</div>
			</form>
		</Form>
	)
}
