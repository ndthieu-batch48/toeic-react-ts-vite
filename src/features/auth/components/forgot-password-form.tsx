import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "lucide-react"

export function RequestOtpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex justify-center p-6", className)} {...props}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Reset your password</CardTitle>
          <CardDescription className="p-2">
            Enter your account’s verified email or username and we’ll send you an OTP.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="credential">Email or Username</Label>
              <Input
                id="credential"
                type="text"
                placeholder="example@example.com"
                required
              />
            </div>
            <CardFooter className="p-0">	
							<Button		
								type="submit"
								variant="default"
								size="lg"
								asChild>
								<Link to="/password/forgot">Login to your account</Link>
							</Button>	
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
