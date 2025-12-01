import { Progress } from "@/shadcn/component/ui/progress"
import { useEffect, useRef } from "react"
import { AlarmClock } from "lucide-react"
import { useTestContext } from "../context/TestContext"
import { savePracticeDuration } from "../helper/testHelper"

export const TimeCounter = () => {
	const { testId, testType, practiceDuration, setPracticeDuration, examDuration, setExamDuration, isSaving } = useTestContext()

	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	// Determine if exam mode based on test type
	const isExamMode = testType === "exam"

	// Store initial duration for progress calculation
	const initialDurationRef = useRef<number>(isExamMode ? examDuration : 0)

	// Display seconds: exam mode shows countdown, practice mode shows count up
	const displaySeconds = isExamMode ? examDuration : practiceDuration

	// Set initial duration on first render (for exam mode progress bar)
	useEffect(() => {
		if (isExamMode && initialDurationRef.current === 0 && examDuration > 0) {
			initialDurationRef.current = examDuration
		}
	}, [isExamMode, examDuration])

	// Save duration when user saves the test (practice mode only)
	useEffect(() => {
		if (isSaving && !isExamMode) {
			savePracticeDuration(testId, practiceDuration)
		}
	}, [isSaving, testId, isExamMode, practiceDuration])

	// Start the timer interval depending on mode
	useEffect(() => {
		if (isExamMode) {
			// Exam mode: countdown from examDuration (in seconds)
			intervalRef.current = setInterval(() => {
				setExamDuration(Math.max(examDuration - 1, 0))
			}, 1000)
		} else {
			// Practice mode: count up from 0 (in seconds)
			intervalRef.current = setInterval(() => {
				setPracticeDuration(practiceDuration + 1)
			}, 1000)
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [isExamMode, examDuration, setExamDuration, practiceDuration, setPracticeDuration])

	const formatTime = (totalSeconds: number): string => {
		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)
		const seconds = totalSeconds % 60

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
	}

	// Calculate progress and expiration
	const initialTotalSeconds = initialDurationRef.current
	const progressValue = initialTotalSeconds > 0
		? ((initialTotalSeconds - examDuration) / initialTotalSeconds) * 100
		: 0
	const isExpired = isExamMode && examDuration === 0
	return (
		<div className="h-auto bg-transparent text-sm">
			{isExamMode ? (
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