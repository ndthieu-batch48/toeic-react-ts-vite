import { Card, CardContent } from '@/component/ui/card';
import { Button } from '@/component/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/component/ui/select';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import type { GeminiExplainQuesResp } from '@/feature/test/type/testServiceType';
import { LANG_MAP, type LANG_ID } from '@/feature/test/const/testConst';
import { Separator } from '@radix-ui/react-separator';
import { Skeleton } from '@/component/ui/skeleton';


type ExplainationCardProps = {
	explainScript?: GeminiExplainQuesResp;
	isExpanded: boolean;
	onToggle: () => void;
	selectedLanguage: LANG_ID;
	onLanguageChange: (lang: LANG_ID) => void;
	onExplain: () => void
	isExplainPending: boolean;
	isExplainError: boolean;
}


export const ExplainationCard: React.FC<ExplainationCardProps> = ({
	explainScript,
	isExpanded,
	onToggle,
	selectedLanguage = 'vi',
	onLanguageChange,
	onExplain,
	isExplainPending,
}) => {
	return (
		<div className="space-y-1">
			{/* Explaination Toggle Button */}
			<Button
				size="sm"
				variant="outline"
				onClick={onToggle}
				className="flex items-center gap-2 text-sm font-semibold"
			>
				<Lightbulb className="w-4 h-4" />
				{isExpanded ? 'Hide Explanation' : 'Explain Question & Answers'}
				{isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
			</Button>

			{/* Expandable Explaination Card */}
			{isExpanded && (
				<Card className="bg-primary/5 border-primary/20 p-0">
					<CardContent className="p-3">
						<div className="space-y-2">
							<div className="flex gap-1">
								<Select value={selectedLanguage} onValueChange={onLanguageChange}>
									<SelectTrigger className="w-[130px] h-8">
										<SelectValue placeholder="Select language" />
									</SelectTrigger>
									<SelectContent>
										{Object.entries(LANG_MAP).map(([langId, langName]) => (
											<SelectItem key={langId} value={langId}>
												{langName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Button
									size="sm"
									variant="outline"
									onClick={onExplain}
									disabled={isExplainPending || !selectedLanguage}
									className="text-sm font-semibold border border-primary"
								>
									Explain
								</Button>
							</div>

							<Separator />

							<div className="space-y-2">
								{/* Question Need Section */}
								<div className="p-2 bg-background rounded-lg border">
									<h5 className="text-sm font-semibold text-muted-foreground mb-1">
										Question Requirement
									</h5>
									{isExplainPending ? (
										<Skeleton className="h-4 w-full" />
									) : explainScript?.ques_need ? (
										<p className="text-base font-medium">{explainScript.ques_need}</p>
									) : (
										<p className="text-sm font-medium text-muted-foreground">
											Select a language and click explain to see the analysis
										</p>
									)}
								</div>

								{/* Question Ask Section */}
								<div className="p-2 bg-background rounded-lg border">
									<h5 className="text-sm font-semibold text-muted-foreground mb-1">
										Question Intent
									</h5>
									{isExplainPending ? (
										<Skeleton className="h-4 w-full" />
									) : explainScript?.ques_ask ? (
										<p className="text-base font-medium">{explainScript.ques_ask}</p>
									) : (
										<p className="text-sm font-medium text-muted-foreground">No intent analysis available</p>
									)}
								</div>

								{/* Correct Answer Reason */}
								<div className="p-2 bg-positive/10 rounded-lg border border-positive/30">
									<h5 className="text-sm font-semibold text-positive mb-1">
										Correct Answer Explanation
									</h5>
									{isExplainPending ? (
										<Skeleton className="h-4 w-full" />
									) : explainScript?.correct_ans_reason ? (
										<p className="text-base text-muted-foreground">
											{explainScript.correct_ans_reason}
										</p>
									) : (
										<p className="text-sm text-muted-foreground">
											No explanation available
										</p>
									)}
								</div>

								{/* Incorrect Answers Reasons */}
								<div className="space-y-1 p-2 rounded-lg bg-destructive/10 border border-destructive/30">
									<h5 className="text-sm font-semibold text-destructive">
										Incorrect Answers Explanation
									</h5>
									<div className="space-y-1">
										{isExplainPending ? (
											<div className="p-2 bg-destructive/10 rounded-lg border border-destructive/30">
												<Skeleton className="h-4 w-full" />
											</div>
										) : explainScript?.incorrect_ans_reason &&
											Object.keys(explainScript.incorrect_ans_reason).length > 0 ? (
											Object.entries(explainScript.incorrect_ans_reason).map(
												([option, reason], idx) => (
													<div
														key={idx}
														className="p-2 bg-destructive/10 rounded-lg border border-destructive/30"
													>
														<p className="text-sm font-semibold text-muted-foreground mb-1">
															{option}
														</p>
														<p className="text-base text-muted-foreground">{reason}</p>
													</div>
												)
											)
										) : (
											<p className="text-xs text-muted-foreground">
												No incorrect answer explanations available
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};