import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type TimePickerComponentProps = {
	timeLimit?: string
	testDuration?: string
	onTimeLimitChange?(value: string): void
}

export function TimePickerComponent({ timeLimit, onTimeLimitChange }: TimePickerComponentProps) {
	return (
		<Card className="bg-card border-border">
			<CardContent className="pt-6">
				<div className="space-y-4">
					<div className="flex flex-col space-y-2">
						<label className="text-sm font-medium text-card-foreground">
							Time Limit <span className="text-muted-foreground">(Don't choose unless you want to set):</span>
						</label>
						<div className="flex items-center gap-2">
							<Select value={timeLimit} onValueChange={onTimeLimitChange}>
								<SelectTrigger className="w-[180px] border-border">
									<SelectValue placeholder="-- Pick time --" />
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
							<span className="text-sm text-muted-foreground ">minutes</span>
						</div>
						{timeLimit && (
							<p className="text-xs text-muted-foreground ">
								Time limit: {timeLimit} minutes
							</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}