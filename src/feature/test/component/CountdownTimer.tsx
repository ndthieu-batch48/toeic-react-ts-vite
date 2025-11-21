import { Progress } from "@/shadcn/component/ui/progress"
import { useEffect, useRef, useState } from "react"
import { AlarmClock } from "lucide-react"
import { cn } from "@/shadcn/lib/util"
import { useTestContext } from "../context/TestContext"

type CountDownTimerProps = {
	className?: string
}

export const CountDownTimer: React.FC<CountDownTimerProps> = ({ className }) => {
	const { remainingDuration, setRemainingDuration } = useTestContext()

	const intervalRef = useRef<NodeJS.Timeout | null>(null)
	const initialDurationRef = useRef<number>(remainingDuration) // Store initial duration to calculate progress

	const [seconds, setSeconds] = useState<number>(0) // Track seconds within the current minute (countdown mode)
	const [elapsedSeconds, setElapsedSeconds] = useState<number>(0) // Track total elapsed seconds when counting up
	const [hasTimeLimit] = useState<boolean>(remainingDuration > 0) // Initialize hasTimeLimit and keep it constant

	// Convert minutes to total seconds for display
	const totalSecondsLeft = (remainingDuration * 60) + seconds
	const displaySeconds = hasTimeLimit ? totalSecondsLeft : elapsedSeconds

	// Set initial duration on first render
	useEffect(() => {
		if (initialDurationRef.current === 0 && remainingDuration > 0) {
			initialDurationRef.current = remainingDuration
		}
	}, [remainingDuration])

	// Start the timer interval depending on mode
	useEffect(() => {
		if (hasTimeLimit) {
			intervalRef.current = setInterval(() => {
				setSeconds(prevSeconds => {
					if (remainingDuration === 0 && prevSeconds === 0) {
						return 0
					}
					if (prevSeconds > 0) {
						return prevSeconds - 1
					} else {
						if (remainingDuration > 0) {
							setRemainingDuration(Math.max(remainingDuration - 1, 0))
						}
						return 59
					}
				})
			}, 1000)
		} else {
			intervalRef.current = setInterval(() => {
				setElapsedSeconds(prev => prev + 1)
			}, 1000)
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
		<div className={cn("h-auto bg-transparent text-sm", className)}>
			{hasTimeLimit ? (
				<div>
					<div className="flex gap-1 pb-1">
						<AlarmClock className="text-primary" />

						{isExpired ? (
							<span className="text-destructive/80 font-semibold">
								Time up!
							</span>
						) : (
							<span className="text-primary font-semibold">
								{formatTime(displaySeconds)}
							</span>
						)}

					</div>

					<Progress
						value={progressValue}
						className={`h-2 ${isExpired ? '[&>div]:bg-destructive/80' : ''}`}
					/>
				</div>
			) : (
				<div>
					<div className="flex gap-1 pb-1">
						<AlarmClock className="text-primary" />
						<span className="text-primary font-semibold">
							{formatTime(displaySeconds)}
						</span>
					</div>
				</div>
			)}
		</div>
	)
}