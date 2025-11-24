import { Button } from "@/shadcn/component/ui/button"
import { Slider } from "@/shadcn/component/ui/slider"
import { LucidePlay, LucidePause, LucideVolumeX, LucideVolume2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useTestContext } from "../context/TestContext"
import { useQuery } from "@tanstack/react-query"
import { testQuery } from "../service/testService"
import { getAudioPlaybackPosition, saveAudioPlaybackPosition } from "../helper/testHelper"

export const Audio = () => {
	const { testId, activePart: partId, testType, isSaving } = useTestContext()

	const { data: audioUrl } = useQuery(testQuery.partAudioUrl(testId, partId))

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [duration, setDuration] = useState<number>(0)
	const [volume, setVolume] = useState<number>(50)
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [audioLoading, setAudioLoading] = useState<boolean>(false)
	const audioRef = useRef<HTMLAudioElement>(null)
	const previousPartIdRef = useRef<number>(partId)
	const currentTimeRef = useRef<number>(0)


	useEffect(() => {
		const audioElement = audioRef.current
		if (!audioElement) return

		const updateTime = () => {
			setCurrentTime(audioElement.currentTime);
			currentTimeRef.current = audioElement.currentTime;
		}
		const handleLoadStart = () => {
			setAudioLoading(true);
		}
		const handleCanPlay = () => {
			setAudioLoading(false);
		}
		const handleLoadError = () => {
			setAudioLoading(false);
		}
		const handleEnded = () => setIsPlaying(false);

		audioElement.addEventListener('timeupdate', updateTime)
		audioElement.addEventListener('ended', handleEnded)
		audioElement.addEventListener('loadstart', handleLoadStart)
		audioElement.addEventListener('canplay', handleCanPlay)
		audioElement.addEventListener('error', handleLoadError)

		return () => {
			audioElement.removeEventListener('timeupdate', updateTime)
			audioElement.removeEventListener('ended', handleEnded)
			audioElement.removeEventListener('loadstart', handleLoadStart)
			audioElement.removeEventListener('canplay', handleCanPlay)
			audioElement.removeEventListener('error', handleLoadError)
		}
	}, [audioUrl])

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : volume / 100
		}
	}, [volume, isMuted])

	// Save all audio playback positions when user saves the test
	useEffect(() => {
		if (isSaving && currentTimeRef.current > 0) {
			saveAudioPlaybackPosition(testId, partId, currentTimeRef.current);
		}
	}, [isSaving, testId, partId])

	// Reset audio state when audio URL changes (switching parts)
	useEffect(() => {
		const audioElement = audioRef.current;

		// Only save if we're actually switching to a different part
		if (partId !== previousPartIdRef.current && currentTimeRef.current > 0) {
			saveAudioPlaybackPosition(testId, previousPartIdRef.current, currentTimeRef.current);
		}

		// Update previous part ID for next switch
		previousPartIdRef.current = partId;

		if (audioElement && audioUrl) {

			// Reset all states
			setIsPlaying(false);
			setCurrentTime(0);
			setDuration(0);
			setAudioLoading(true);

			// Explicitly set the src and reload
			audioElement.src = audioUrl;
			audioElement.load();

			// Add a one-time listener for when metadata loads
			const handleLoadedMetadata = () => {
				setDuration(audioElement.duration || 0);
				setAudioLoading(false);

				const savedPlaybackPosition = getAudioPlaybackPosition(testId, partId);
				if (savedPlaybackPosition) {
					audioElement.currentTime = savedPlaybackPosition;
					setCurrentTime(savedPlaybackPosition);
				}
			};

			const handleError = () => {
				console.error("Audio loading error");
				setAudioLoading(false);
			};

			audioElement.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
			audioElement.addEventListener('error', handleError, { once: true });
		}
	}, [audioUrl, testId, partId])

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
		if (testType === "exam") return;

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

	const formatTime = (time: number): string => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds.toString().padStart(2, '0')}`
	}

	const progressValue = duration ? (currentTime / duration) * 100 : 0

	if (!audioUrl) {
		return <></>
	}

	return (
		<div className="flex items-center gap-1">

			<audio ref={audioRef} src={audioUrl} preload="metadata" />

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

			{/* Progress div */}
			<div className="flex w-full gap-2 items-center">

				{/* Time Display */}
				<div className="text-xs text-muted-foreground whitespace-nowrap min-w-[70px]">
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

			{/* Volume control */}
			<div className="flex items-center min-w-[120px]">
				<Button
					variant="ghost"
					onClick={toggleMute}
					className="h-3 w-3"
				>
					{isMuted || volume === 0 ? (
						<LucideVolumeX />
					) : (
						<LucideVolume2 />
					)}
				</Button>

				<Slider
					value={[isMuted ? 0 : volume]}
					max={100}
					step={1}
					onValueChange={handleVolumeChange}
				/>
				<span className="text-xs text-muted-foreground w-8">
					{isMuted ? 0 : volume}
				</span>
			</div>

		</div>

	)
}