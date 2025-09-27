import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect, useRef } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

type CountDownTimerProps = {
	duration?: number | null
	className?: string
}

export const CountDownTimer: React.FC<CountDownTimerProps> = ({ className, duration }) => {
	const [timeLeft, setTimeLeft] = useState(duration || 0)
	const [isRunning, setIsRunning] = useState(false)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const hasTimeLimit = duration != null && duration > 0

	useEffect(() => {
		if (hasTimeLimit && isRunning && timeLeft > 0) {
			intervalRef.current = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						setIsRunning(false)
						return 0
					}
					return prev - 1
				})
			}, 1000)
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [isRunning, timeLeft, hasTimeLimit])

	const formatTime = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		const remainingSeconds = seconds % 60

		if (hours > 0) {
			return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
		}
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	const progressValue = hasTimeLimit && duration ? ((duration - timeLeft) / duration) * 100 : 0
	const isExpired = hasTimeLimit && timeLeft === 0

	return (
		<Card className={cn("w-full h-auto p-3 bg-card border-border", className)}>
			<CardContent>
				{/* Progress Bar */}
				<div>
					<div className="flex gap-2 mb-2">
						<Clock className="text-foreground" />
						<span className={`${isExpired ? 'text-destructive' : 'text-foreground'}`}>
							{hasTimeLimit ? formatTime(timeLeft) : 'No limit'}
						</span>
					</div>

					{hasTimeLimit && (
						<Progress
							value={progressValue}
							className={`h-2 ${isExpired ? '[&>div]:bg-destructive' : ''}`}
						/>
					)}
				</div>

				{/* Status Message */}
				{isExpired && (
					<div className="text-center">
						<p className="text-destructive font-medium">Time's Up!</p>
					</div>
				)}
			</CardContent>
		</Card>
	)
}