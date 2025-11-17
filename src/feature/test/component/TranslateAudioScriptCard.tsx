import { Headphones } from "lucide-react"

interface TranslateAudioScriptCardProps {
	audioScript: string
}

export const TranslateAudioScriptCard: React.FC<TranslateAudioScriptCardProps> = ({ audioScript }) => {
	return (
		<div className="p-4 rounded-lg border bg-muted/50">
			<h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-foreground">
				<Headphones className="w-4 h-4 text-primary" />
				Audio Script
			</h4>
			<p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
				{audioScript}
			</p>
		</div>
	)
}