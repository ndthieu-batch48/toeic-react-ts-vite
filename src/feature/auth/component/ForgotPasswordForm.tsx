import { cn } from "@/lib/utils"
import { Button } from "@/component/ui/button"
import { Input } from "@/component/ui/input"
import { Label } from "@/component/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/component/ui/card"
import { Link } from "@tanstack/react-router"
import { AUTH_FORM_TEXTS, FORM_FIELD_LABELS, FORM_FIELD_PLACEHOLDERS } from "../const/authConst"

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex justify-center p-6", className)} {...props}>
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle>{AUTH_FORM_TEXTS.FORGOT_PASSWORD_TITLE}</CardTitle>
					<CardDescription className="p-2">
						{AUTH_FORM_TEXTS.FORGOT_PASSWORD_DESCRIPTION}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="flex flex-col gap-4">
						<div className="grid gap-2">
							<Label htmlFor="credential">{FORM_FIELD_LABELS.EMAIL_OR_USERNAME}</Label>
							<Input
								id="credential"
								type="text"
								placeholder={FORM_FIELD_PLACEHOLDERS.EMAIL_PLACEHOLDER}
								required
							/>
						</div>
						<CardFooter className="p-0">
							<Button
								type="submit"
								variant="default"
								size="lg"
								asChild>
								<Link to="/password/forgot">{AUTH_FORM_TEXTS.FORGOT_PASSWORD_BUTTON_TEXT}</Link>
							</Button>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}