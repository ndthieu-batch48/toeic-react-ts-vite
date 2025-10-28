import { Button } from "@/component/ui/button"
import { Input } from "@/component/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/component/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { RegisterRequest } from "../type/authType"

// TODO: Implement OAuth in the future
// import { FacebookIcon, GoogleIcon } from "@/component/shared/SocialMediaIcon"

import {
	AUTH_FORM_TEXTS,
	FORM_FIELD_LABELS,
	FORM_FIELD_PLACEHOLDERS,
	VALIDATION_MESSAGES,
	AUTH_CONFIG
} from "../const/authConst";

const registerSchema = z.object({
	email: z.string().min(AUTH_CONFIG.MINIMUM_FIELD_LENGTH, VALIDATION_MESSAGES.EMAIL_REQUIRED),
	username: z.string().min(AUTH_CONFIG.MINIMUM_FIELD_LENGTH, VALIDATION_MESSAGES.USERNAME_REQUIRED),
	password: z.string().min(AUTH_CONFIG.MINIMUM_FIELD_LENGTH, VALIDATION_MESSAGES.PASSWORD_REQUIRED),
});

type RegisterFormData = z.infer<typeof registerSchema>;

type RegisterFormProps = {
	switchToLogin?: () => void
	onFormSubmit: (data: RegisterRequest) => Promise<void>,
	registerStatus: "error" | "idle" | "success" | "pending"
}

export function RegisterForm({ switchToLogin, onFormSubmit, registerStatus }: RegisterFormProps) {
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		await onFormSubmit(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6 w-full h-full ">
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold text-foreground ">{AUTH_FORM_TEXTS.REGISTER_TITLE}</h1>
					<p className="text-muted-foreground ">
						{AUTH_FORM_TEXTS.REGISTER_SUBTITLE}
					</p>
				</div>

				{/* Email Field */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{FORM_FIELD_LABELS.EMAIL}</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder={FORM_FIELD_PLACEHOLDERS.EMAIL_EXAMPLE}
									autoComplete="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* User name Field */}
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{FORM_FIELD_LABELS.USERNAME}</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder={FORM_FIELD_PLACEHOLDERS.USERNAME_PLACEHOLDER}
									autoComplete="username"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password Field */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{FORM_FIELD_LABELS.PASSWORD}</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder={FORM_FIELD_PLACEHOLDERS.PASSWORD_PLACEHOLDER}
									autoComplete="new-password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<Button
					variant="default"
					type="submit"
					className="w-full shadow-md hover:shadow-lg transition-shadow "
					disabled={registerStatus === "pending"}>
					{registerStatus === "pending" ? AUTH_FORM_TEXTS.REGISTER_BUTTON_LOADING_TEXT : AUTH_FORM_TEXTS.REGISTER_BUTTON_TEXT}
				</Button>

				{/* OAuth buttons */}
				{/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
					<span className="bg-card text-muted-foreground relative z-10 px-2 ">
						{AUTH_FORM_TEXTS.OAUTH_SEPARATOR_TEXT}
					</span>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<Button variant="outline" type="button" className="w-full shadow-sm hover:shadow-md transition-shadow">
						<GoogleIcon />
						<span className="sr-only">{AUTH_FORM_TEXTS.GOOGLE_REGISTER_SR_TEXT}</span>
					</Button>
					<Button variant="outline" type="button" className="w-full shadow-sm hover:shadow-md transition-shadow">
						<FacebookIcon />
						<span className="sr-only">{AUTH_FORM_TEXTS.FACEBOOK_REGISTER_SR_TEXT}</span>
					</Button>
				</div> */}

				{/* Switch to Login */}
				<div className="text-center text-sm ">
					{AUTH_FORM_TEXTS.REGISTER_ALREADY_HAVE_ACCOUNT_TEXT}{" "}
					<Button
						variant="link"
						type="button"
						className="underline underline-offset-4 p-0 m-0 text-primary hover:text-primary/80"
						onClick={switchToLogin}>
						{AUTH_FORM_TEXTS.REGISTER_LOG_IN_TEXT}
					</Button>
				</div>

			</form>
		</Form>
	)
}
