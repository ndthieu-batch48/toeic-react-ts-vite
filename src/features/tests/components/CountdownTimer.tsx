import { Progress } from "@/components/ui/progress"
import { useEffect, useRef, useState } from "react"
import { AlarmClock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTestContext } from "../context/TestContext"

type CountDownTimerProps = {
	className?: string
}

export const CountDownTimer: React.FC<CountDownTimerProps> = ({ className }) => {
	const { remainingDuration, setRemainingDuration } = useTestContext()
	const intervalRef = useRef<NodeJS.Timeout | null>(null)
	const [seconds, setSeconds] = useState<number>(0) // Track seconds within the current minute
	const initialDurationRef = useRef<number>(remainingDuration) // Store initial duration to calculate progress
	const [hasTimeLimit] = useState<boolean>(remainingDuration > 0) // Initialize hasTimeLimit and keep it constant

	// Convert minutes to total seconds for display
	const totalSecondsLeft = (remainingDuration * 60) + seconds

	// Set initial duration on first render
	useEffect(() => {
		if (initialDurationRef.current === 0 && remainingDuration > 0) {
			initialDurationRef.current = remainingDuration
		}
	}, [remainingDuration])

	// Start the countdown timer (count down every second)
	useEffect(() => {
		if (hasTimeLimit) {
			intervalRef.current = setInterval(() => {
				setSeconds(prevSeconds => {
					if (prevSeconds > 0) {
						// Decrement seconds
						return prevSeconds - 1
					} else if (remainingDuration > 0) {
						// When seconds reach 0, decrement minutes and reset seconds to 59
						setRemainingDuration(remainingDuration - 1)
						return 59
					}
					return 0
				})
			}, 1000)
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [hasTimeLimit, remainingDuration, setRemainingDuration])

	const formatTime = (totalSeconds: number): string => {
		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)
		const seconds = totalSeconds % 60

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
	}

	// Calculate progress and expiration
	const initialTotalSeconds = initialDurationRef.current * 60
	const progressValue = initialTotalSeconds > 0
		? ((initialTotalSeconds - totalSecondsLeft) / initialTotalSeconds) * 100
		: 0
	const isExpired = remainingDuration === 0 && seconds === 0

	return (
		<div className={cn("w-full h-auto p-3 bg-transparent", className)}>
			{hasTimeLimit ? (
				<div>
					<div className="flex gap-2 mb-2">
						<AlarmClock className="text-primary" />

						{isExpired ? (
							<span className="text-destructive/80 font-semibold">
								Time up!
							</span>
						) : (
							<span className="text-primary font-semibold">
								{formatTime(totalSecondsLeft)}
							</span>
						)}

					</div>

					<Progress
						value={progressValue}
						className={`h-2 ${isExpired ? '[&>div]:bg-destructive/80' : ''}`}
					/>
				</div>
			) : (
				<>
				</>
			)}
		</div>
	)
}