import { Label } from "@/shadcn/component/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/component/ui/select'

type TimePickerProps = {
	timeLimit?: string
	testDuration?: string
	onTimeLimitChange?(value: string): void
}

export function TimePicker({ timeLimit, onTimeLimitChange }: TimePickerProps) {
	return (
		<div className="flex gap-1">
			<Label className="text-base font-medium">
				Time Limit
			</Label>
			<div className="flex items-center gap-2">
				<Select value={timeLimit} onValueChange={onTimeLimitChange}>
					<SelectTrigger className="w-[120px] border-border text-sm">
						<SelectValue placeholder="Pick time" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="30">30</SelectItem>
						<SelectItem value="45">45</SelectItem>
						<SelectItem value="60">60</SelectItem>
						<SelectItem value="75">75</SelectItem>
						<SelectItem value="90">90</SelectItem>
						<SelectItem value="120">120</SelectItem>
						<SelectItem value="150">150</SelectItem>
						<SelectItem value="180">180</SelectItem>
					</SelectContent>
				</Select>
				<Label className="text-muted-foreground text-sm">
					min
					<span className="text-xs">(Don't choose unless you want to set)</span>
				</Label>
			</div>
		</div>
	)
}