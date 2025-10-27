import { Button } from "@/component/ui/button"
import { Slider } from "@/component/ui/slider"
import { LucidePlay, LucidePause, LucideVolumeX, LucideVolume2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useSolutionContext } from "../context/SolutionContext"
import { useQuery } from "@tanstack/react-query"
import { partAudioUrlOption } from "@/feature/test/query/testQuery"

export const SolutionAudio: React.FC = () => {
	const { testId, activePart: partId } = useSolutionContext()

	const { data: audioUrl } = useQuery(partAudioUrlOption(testId, partId))

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [duration, setDuration] = useState<number>(0)
	const [volume, setVolume] = useState<number>(50)
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [audioLoading, setAudioLoading] = useState<boolean>(false)
	const audioRef = useRef<HTMLAudioElement>(null)


	useEffect(() => {
		const audioElement = audioRef.current
		if (!audioElement) return

		const updateTime = () => {
			setCurrentTime(audioElement.currentTime);
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
		const audioElement = audioRef.current
		if (audioElement) {
			audioElement.volume = isMuted ? 0 : volume / 100
		}
	}, [volume, isMuted])

	useEffect(() => {
		if (audioRef.current) {
			const audioElement = audioRef.current
			audioElement.addEventListener('loadedmetadata', () => {
				setDuration(audioElement.duration)
			})
		}
	}, [audioUrl])

	// Auto-pause when switching parts
	useEffect(() => {
		if (isPlaying) {
			setIsPlaying(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [partId])

	const togglePlayPause = () => {
		const audioElement = audioRef.current
		if (!audioElement || !audioUrl || audioLoading) return

		if (isPlaying) {
			audioElement.pause()
		} else {
			audioElement.play()
		}
		setIsPlaying(!isPlaying)
	}

	const handleSeek = (newTime: number[]) => {
		const audioElement = audioRef.current
		if (audioElement && newTime.length > 0) {
			audioElement.currentTime = newTime[0]
			setCurrentTime(newTime[0])
		}
	}

	const handleVolumeChange = (newVolume: number[]) => {
		if (newVolume.length > 0) {
			setVolume(newVolume[0])
		}
	}

	const toggleMute = () => {
		setIsMuted(!isMuted)
	}

	const formatTime = (time: number): string => {
		if (isNaN(time)) return "0:00"
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds.toString().padStart(2, '0')}`
	}

	// Don't render if no audio URL is available
	if (!audioUrl) {
		return null
	}

	return (
		<div className="flex items-center gap-2 w-full max-w-2xl mx-auto">
			{/* Audio element */}
			<audio
				ref={audioRef}
				src={audioUrl}
				preload="metadata"
			/>

			{/* Play/Pause Button */}
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

			{/* Time Display */}
			<span className="text-xs text-muted-foreground flex-shrink-0">
				{formatTime(currentTime)} / {formatTime(duration)}
			</span>

			{/* Progress Slider */}
			<div className="flex-1 min-w-0">
				<Slider
					value={[currentTime]}
					max={duration || 100}
					step={1}
					onValueChange={handleSeek}
					className="w-full"
					disabled={!audioUrl || audioLoading}
				/>
			</div>

			{/* Volume Controls */}
			<div className="flex items-center gap-1 flex-shrink-0">
				<Button
					variant="ghost"
					size="sm"
					onClick={toggleMute}
					className="p-1"
				>
					{isMuted || volume === 0 ? (
						<LucideVolumeX className="w-4 h-4" />
					) : (
						<LucideVolume2 className="w-4 h-4" />
					)}
				</Button>

				<div className="w-16">
					<Slider
						value={[isMuted ? 0 : volume]}
						max={100}
						step={1}
						onValueChange={handleVolumeChange}
						className="w-full"
					/>
				</div>
			</div>
		</div>
	)
}