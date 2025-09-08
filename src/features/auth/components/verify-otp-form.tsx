import { useState } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function VerifyOTPForm() {
	const [value, setValue] = useState("")

  return (
    <Card className="w-full max-w-md mx-auto p-4 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Verify OTP Code</CardTitle>
        <CardDescription className="p-2">
          Enter the 6-digit OTP sent to your email.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <InputOTP
          maxLength={6}
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
          Didn&apos;t receive the code?{" "}
          <Button variant="link" className="p-0">
            Resend
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
