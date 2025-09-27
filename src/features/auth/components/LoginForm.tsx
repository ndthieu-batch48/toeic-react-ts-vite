import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "@tanstack/react-router"

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { LoginRequest } from "../types/authType";
import { FacebookIcon, GoogleIcon } from "@/components/shared/SocialMediaIcon";
import {
	AUTH_FORM_TEXTS,
	FORM_FIELD_LABELS,
	FORM_FIELD_PLACEHOLDERS,
	VALIDATION_MESSAGES,
	AUTH_CONFIG,
	AUTH_ROUTES
} from "../const/authConst";

const loginSchema = z.object({
	credential: z.string().min(AUTH_CONFIG.MINIMUM_FIELD_LENGTH, VALIDATION_MESSAGES.EMAIL_OR_USERNAME_REQUIRED),
	password: z.string().min(AUTH_CONFIG.MINIMUM_FIELD_LENGTH, VALIDATION_MESSAGES.PASSWORD_REQUIRED),
});

type LoginFormData = z.infer<typeof loginSchema>;

type LoginFormProps = React.ComponentProps<"div"> & {
	switchToRegister?: () => void
	onFormSubmit: (data: LoginRequest) => Promise<void>,
	loginStatus: "error" | "idle" | "success" | "pending"
}

export function LoginForm({ switchToRegister, onFormSubmit, loginStatus }: LoginFormProps) {

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			credential: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		await onFormSubmit(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full h-full ">
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold text-foreground">{AUTH_FORM_TEXTS.LOGIN_WELCOME_TITLE}</h1>
					<p className="text-muted-foreground ">
						{AUTH_FORM_TEXTS.LOGIN_SUBTITLE}
					</p>
				</div>

				{/* Email/Username Field */}
				<FormField
					control={form.control}
					name="credential"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{FORM_FIELD_LABELS.EMAIL_OR_USERNAME}</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder={FORM_FIELD_PLACEHOLDERS.EMAIL_EXAMPLE}
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
									autoComplete="current-password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
							<Button
								asChild
								variant="link"
								className="flex justify-end p-0 text-primary hover:text-primary/80">
								<Link
									to={AUTH_ROUTES.FORGOT_PASSWORD}
									className="text-sm underline-offset-2 hover:underline "
								>
									{AUTH_FORM_TEXTS.LOGIN_FORGOT_PASSWORD_TEXT}
								</Link>
							</Button>
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<Button
					variant="default"
					type="submit"
					className="w-full shadow-md hover:shadow-lg transition-shadow "
					disabled={loginStatus === 'pending'}
				>
					{loginStatus === 'pending' ? AUTH_FORM_TEXTS.LOGIN_BUTTON_LOADING_TEXT : AUTH_FORM_TEXTS.LOGIN_BUTTON_TEXT}
				</Button>

				{/* OAuth buttons */}
				<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
					<span className="bg-card text-muted-foreground relative z-10 px-2 ">
						{AUTH_FORM_TEXTS.OAUTH_SEPARATOR_TEXT}
					</span>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<Button variant="outline" type="button" className="w-full shadow-sm hover:shadow-md transition-shadow">
						<GoogleIcon />
						<span className="sr-only">{AUTH_FORM_TEXTS.GOOGLE_LOGIN_SR_TEXT}</span>
					</Button>
					<Button variant="outline" type="button" className="w-full shadow-sm hover:shadow-md transition-shadow">
						<FacebookIcon />
						<span className="sr-only">{AUTH_FORM_TEXTS.FACEBOOK_LOGIN_SR_TEXT}</span>
					</Button>
				</div>

				{/* Switch to Register */}
				<div className="text-center text-sm ">
					{AUTH_FORM_TEXTS.LOGIN_NO_ACCOUNT_TEXT}{" "}
					<Button
						variant="link"
						type="button"
						className="underline underline-offset-4 p-0 m-0 text-primary hover:text-primary/80"
						onClick={switchToRegister}>
						{AUTH_FORM_TEXTS.LOGIN_CREATE_ACCOUNT_TEXT}
					</Button>
				</div>

			</form>
		</Form>
	)
}
