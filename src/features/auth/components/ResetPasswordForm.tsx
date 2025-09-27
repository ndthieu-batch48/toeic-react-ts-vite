import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { AUTH_FORM_TEXTS, FORM_FIELD_LABELS, FORM_FIELD_PLACEHOLDERS } from "../const/authConst"

export function ResetPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex justify-center p-6", className)} {...props}>
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle>{AUTH_FORM_TEXTS.RESET_PASSWORD_TITLE}</CardTitle>
					<CardDescription className="p-2">
						{AUTH_FORM_TEXTS.RESET_PASSWORD_DESCRIPTION}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="flex flex-col gap-4">
						<div className="grid gap-2">
							<Label htmlFor="password">{FORM_FIELD_LABELS.NEW_PASSWORD}</Label>
							<Input
								id="password"
								type="password"
								placeholder={FORM_FIELD_PLACEHOLDERS.PASSWORD_ASTERISKS}
								required
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="confirm-password">{FORM_FIELD_LABELS.CONFIRM_PASSWORD}</Label>
							<Input
								id="confirm-password"
								type="password"
								placeholder={FORM_FIELD_PLACEHOLDERS.PASSWORD_ASTERISKS}
								required
							/>
						</div>

						<CardFooter className="p-0">
							<Button type="submit" className="w-full h-9">
								{AUTH_FORM_TEXTS.RESET_PASSWORD_BUTTON_TEXT}
							</Button>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
