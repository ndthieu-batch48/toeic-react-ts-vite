import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { LucidePlay, LucidePause, LucideVolume2, LucideVolumeX } from "lucide-react"
import { useState, useRef, useEffect } from "react"

type AudioProps = {
	audio: string
}

export const Audio: React.FC<AudioProps> = ({ audio }) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [duration, setDuration] = useState<number>(0)
	const [volume, setVolume] = useState<number>(50)
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const audioRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		const audioElement = audioRef.current
		if (!audioElement) return

		const updateTime = () => setCurrentTime(audioElement.currentTime)
		const updateDuration = () => setDuration(audioElement.duration)

		audioElement.addEventListener('timeupdate', updateTime)
		audioElement.addEventListener('loadedmetadata', updateDuration)
		audioElement.addEventListener('ended', () => setIsPlaying(false))

		return () => {
			audioElement.removeEventListener('timeupdate', updateTime)
			audioElement.removeEventListener('loadedmetadata', updateDuration)
			audioElement.removeEventListener('ended', () => setIsPlaying(false))
		}
	}, [])

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : volume / 100
		}
	}, [volume, isMuted])

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

	const formatTime = (time: number): string => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds.toString().padStart(2, '0')}`
	}

	const progressValue = duration ? (currentTime / duration) * 100 : 0

	return (
		<Card className="w-full max-h-20 border border-border">
			<CardContent className="flex items-start gap-4">
				<audio ref={audioRef} src={audio} preload="metadata" />

				{/* Main Controls */}
				<div className="flex flex-1 gap-4">
					<Button
						variant="outline"
						size="icon"
						onClick={togglePlayPause}
						className="h-10 w-10 rounded-2xl hover:bg-accent"
					>
						{isPlaying ? (
							<LucidePause />
						) : (
							<LucidePlay />
						)}
					</Button>

					<div className="flex-1 space-y-2">
						{/* Progress Bar */}
						<Slider
							value={[progressValue]}
							max={100}
							step={0.1}
							onValueChange={handleProgressChange}
							className="w-full"
						/>

						{/* Time Display */}
						<div className="text-base text-muted-foreground">
							<span>{formatTime(currentTime)} / {formatTime(duration)}</span>
						</div>
					</div>
				</div>

				{/* Volume Controls */}
				<div className="flex items-center gap-2 min-w-[120px]">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleMute}
						className="h-8 w-8"
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
						className="w-26"
					/>
					<span className="text-base text-muted-foreground w-8 text-right">
						{isMuted ? 0 : volume}
					</span>
				</div>
			</CardContent>
		</Card>
	)
}