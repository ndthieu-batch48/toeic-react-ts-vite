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
import type { LoginRequest } from "../types/user";
import { FacebookIcon, GoogleIcon } from "@/components/shared/social-media-icon";

const loginSchema = z.object({
	credential: z.string().min(1, "Email or username is required"),
	password: z.string().min(1, "Password is required"),
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full h-full font-sans">
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold text-foreground font-serif">Welcome back</h1>
					<p className="text-muted-foreground font-sans">
						Login to your TMA TOEIC account
					</p>
				</div>

				{/* Email/Username Field */}
				<FormField
					control={form.control}
					name="credential"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email or Username</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="m@example.com"
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
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="******"
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
									to="/password/forgot"
									className="text-sm underline-offset-2 hover:underline font-sans"
								>
									Forgot your password?
								</Link>
							</Button>
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<Button
					variant="default"
					type="submit"
					className="w-full shadow-md hover:shadow-lg transition-shadow font-sans"
					disabled={loginStatus === 'pending'}
				>
					{loginStatus === 'pending' ? "Logging in..." : "Login"}
				</Button>

				{/* OAuth buttons */}
				<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
					<span className="bg-card text-muted-foreground relative z-10 px-2 font-sans">
						Or continue with
					</span>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<Button variant="outline" type="button" className="w-full shadow-sm hover:shadow-md transition-shadow">
						<GoogleIcon />
						<span className="sr-only">Login with Google</span>
					</Button>
					<Button variant="outline" type="button" className="w-full shadow-sm hover:shadow-md transition-shadow">
						<FacebookIcon />
						<span className="sr-only">Login with Facebook</span>
					</Button>
				</div>

				{/* Switch to Register */}
				<div className="text-center text-sm font-sans">
					Don&apos;t have an account?{" "}
					<Button
						variant="link"
						type="button"
						className="underline underline-offset-4 p-0 m-0 text-primary hover:text-primary/80"
						onClick={switchToRegister}>
						Create one
					</Button>
				</div>

			</form>
		</Form>
	)
}
