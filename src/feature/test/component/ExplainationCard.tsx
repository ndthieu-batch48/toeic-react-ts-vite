import { Card, CardContent } from '@/shadcn/component/ui/card';
import type { GeminiExplainQuesResp } from '@/feature/test/type/testServiceType';
import { Separator } from '@radix-ui/react-separator';
import { Skeleton } from '@/shadcn/component/ui/skeleton';

type ExplainationCardProps = {
	explainScript?: GeminiExplainQuesResp;
	isExplainPending: boolean;
}

export const ExplainationCard: React.FC<ExplainationCardProps> = ({
	explainScript,
	isExplainPending,
}) => {
	return (
		<div className="w-full">
			<Card className="bg-primary/5 border-primary/20 p-0 w-full">
				<CardContent className="p-3">
					<div className="space-y-2">
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
		</div>
	);
};