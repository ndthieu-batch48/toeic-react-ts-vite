import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

type TranslationCardProps = {
	mediaId: string
}

export const TranslationCard: React.FC<TranslationCardProps> = () => {

	return (
		<Popover>
			<PopoverTrigger>Translate</PopoverTrigger>
			<PopoverContent>Place content for the popover here.</PopoverContent>
		</Popover>
	)
}