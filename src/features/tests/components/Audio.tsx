import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { LucidePlay, LucidePause, RotateCcw, RotateCw } from "lucide-react"
import { useState, useRef, useEffect } from "react"
// import { useTestContext } from "../context/TestContext"
// import { useQuery } from "@tanstack/react-query"
// import { getPartAudioOption } from "../util/queryUtil"


export const Audio: React.FC = () => {
	// const { testId, activePart: partId } = useTestContext()
	// const { data: audioResult, isLoading, error } = useQuery(getPartAudioOption(testId, partId));

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [duration, setDuration] = useState<number>(0)
	const [volume, setVolume] = useState<number>(50)
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [audioLoading, setAudioLoading] = useState<boolean>(false)
	const audioRef = useRef<HTMLAudioElement>(null)

	// Get the actual audio URL from API result
	const audioUrl = '';//audioResult?.success ? audioResult.audioUrl : null;

	useEffect(() => {
		const audioElement = audioRef.current
		if (!audioElement) return

		const updateTime = () => setCurrentTime(audioElement.currentTime)
		const updateDuration = () => setDuration(audioElement.duration)
		const handleLoadStart = () => setAudioLoading(true)
		const handleCanPlay = () => setAudioLoading(false)
		const handleLoadError = () => setAudioLoading(false)

		audioElement.addEventListener('timeupdate', updateTime)
		audioElement.addEventListener('loadedmetadata', updateDuration)
		audioElement.addEventListener('ended', () => setIsPlaying(false))
		audioElement.addEventListener('loadstart', handleLoadStart)
		audioElement.addEventListener('canplay', handleCanPlay)
		audioElement.addEventListener('error', handleLoadError)

		return () => {
			audioElement.removeEventListener('timeupdate', updateTime)
			audioElement.removeEventListener('loadedmetadata', updateDuration)
			audioElement.removeEventListener('ended', () => setIsPlaying(false))
			audioElement.removeEventListener('loadstart', handleLoadStart)
			audioElement.removeEventListener('canplay', handleCanPlay)
			audioElement.removeEventListener('error', handleLoadError)
		}
	}, [])

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : volume / 100
		}
	}, [volume, isMuted])

	// Reset audio state when audio URL changes (switching parts)
	useEffect(() => {
		if (audioRef.current && audioUrl) {
			setIsPlaying(false);
			setCurrentTime(0);
			setDuration(0);
			// Load the new audio
			audioRef.current.load();
		}
	}, [audioUrl])

	const togglePlayPause = () => {
		if (!audioRef.current) return

		if (isPlaying) {
			audioRef.current.pause()
		} else {
			audioRef.current.play()
		}
		setIsPlaying(!isPlaying)
	}

	const handleProgressChange = (value: number[]) => {
		if (audioRef.current && duration) {
			const newTime = (value[0] / 100) * duration
			audioRef.current.currentTime = newTime
			setCurrentTime(newTime)
		}
	}

	const handleVolumeChange = (value: number[]) => {
		setVolume(value[0])
		setIsMuted(false)
	}

	const toggleMute = () => {
		setIsMuted(!isMuted)
	}

	const skipBackward = () => {
		if (audioRef.current) {
			const newTime = Math.max(0, currentTime - 10)
			audioRef.current.currentTime = newTime
			setCurrentTime(newTime)
		}
	}

	const skipForward = () => {
		if (audioRef.current) {
			const newTime = Math.min(duration, currentTime + 10)
			audioRef.current.currentTime = newTime
			setCurrentTime(newTime)
		}
	}

	const formatTime = (time: number): string => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds.toString().padStart(2, '0')}`
	}

	const progressValue = duration ? (currentTime / duration) * 100 : 0

	// // Show loading or error states
	// if (isLoading) {
	// 	return (
	// 		<div className="flex flex-col items-center p-4">
	// 			<div className="text-muted-foreground">Loading audio...</div>
	// 		</div>
	// 	);
	// }

	// if (error || (audioResult && !audioResult.success)) {
	// 	return (
	// 		<div className="flex flex-col items-center p-4">
	// 			<div className="text-destructive">
	// 				{audioResult?.error || "Failed to load audio"}
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div className="flex items-center">

			<audio ref={audioRef} src={audioUrl} preload="metadata" />

			<div className="flex items-center gap-2">

				{/* Back 10s */}
				<Button
					variant="ghost"
					size="icon"
					onClick={skipBackward}
					className="rounded-2xl hover:bg-accent"
				>
					<RotateCcw />
				</Button>

				<Button
					variant="outline"
					size="icon"
					onClick={togglePlayPause}
					className="h-10 w-10 rounded-full hover:bg-accent"
					disabled={audioLoading}
				>
					{audioLoading ? (
						<div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
					) : isPlaying ? (
						<LucidePause />
					) : (
						<LucidePlay />
					)}
				</Button>

				{/* Forward 10s */}
				<Button
					variant="ghost"
					size="icon"
					onClick={skipForward}
					className="rounded-2xl hover:bg-accent"
				>
					<RotateCw />
				</Button>

			</div>

			<div className="flex flex-col w-full gap-1 px-2">

				{/* Time Display */}
				<div className="text-base text-muted-foreground">
					<span>{formatTime(currentTime)} / {formatTime(duration)}</span>
				</div>

				{/* Progress Bar */}
				<Slider
					value={[progressValue]}
					max={100}
					step={0.1}
					onValueChange={handleProgressChange}
					className="w-full [&_[data-slot=slider-track]]:bg-primary/20"
				/>


			</div>

		</div>

		// <div className="w-full max-h-20">
		// 	<div className="flex  gap-4">


		// 		{/* Main Controls */}


		// 		{/* Volume Controls */}
		// 		<div className="flex items-center gap-2 min-w-[120px]">
		// 			<Button
		// 				variant="ghost"
		// 				size="icon"
		// 				onClick={toggleMute}
		// 				className="h-8 w-8"
		// 			>
		// 				{isMuted || volume === 0 ? (
		// 					<LucideVolumeX />
		// 				) : (
		// 					<LucideVolume2 />
		// 				)}
		// 			</Button>

		// 			<Slider
		// 				value={[isMuted ? 0 : volume]}
		// 				max={100}
		// 				step={1}
		// 				onValueChange={handleVolumeChange}
		// 				className="w-26"
		// 			/>
		// 			<span className="text-base text-muted-foreground w-8 text-right">
		// 				{isMuted ? 0 : volume}
		// 			</span>
		// 		</div>

		// 	</div>
		// </div>
	)
}