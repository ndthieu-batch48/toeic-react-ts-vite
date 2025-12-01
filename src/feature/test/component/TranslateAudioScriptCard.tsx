import { Headphones } from "lucide-react"

interface TranslateAudioScriptCardProp {
	audioScript: string
}

export const TranslateAudioScriptCard = ({ audioScript }: TranslateAudioScriptCardProp) => {

	return (
		<div className="w-full border border-foreground bg-background rounded-lg p-4">
			<h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-foreground">
				<Headphones className="w-4 h-4 text-primary" />
				Audio script content
			</h4>
			<p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
				{audioScript}
			</p>
		</div>
	)
}