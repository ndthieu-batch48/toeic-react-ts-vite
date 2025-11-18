import { Card, CardContent } from '@/shadcn/component/ui/card';
import { Separator } from '@/shadcn/component/ui/separator';
import { Skeleton } from '@/shadcn/component/ui/skeleton';
import type { GeminiTransQuesResp } from '../type/testServiceType';

type TranslationCardProps = {
	translateScript?: GeminiTransQuesResp;
	isTranslatePending: boolean;
}

export const TranslationCard: React.FC<TranslationCardProps> = ({
	translateScript,
	isTranslatePending,
}) => {
	return (
		<div className="w-full">
			<Card className="bg-primary/5 border-primary/20 p-0 w-full">
				<CardContent className="p-3">
					<div className="space-y-2">
						<Separator />

						<div className="space-y-2">
							<div className="p-2 bg-background rounded-lg border">
								{isTranslatePending ? (
									<Skeleton className="h-4 w-full" />
								) : translateScript?.ques_content ? (
									<p className="text-sm font-medium">{translateScript.ques_content}</p>
								) : (
									<p className="text-sm font-medium text-muted-foreground">
										Select a language and click translate to see the translation
									</p>
								)}
							</div>

							<div className="space-y-1">
								<h5 className="text-sm font-semibold text-muted-foreground">Options</h5>
								<div className="space-y-1">
									{isTranslatePending ? (
										<>
											<div className="p-2 bg-background rounded-lg border">
												<Skeleton className="h-4 w-full" />
											</div>
											<div className="p-2 bg-background rounded-lg border">
												<Skeleton className="h-4 w-full" />
											</div>
											<div className="p-2 bg-background rounded-lg border">
												<Skeleton className="h-4 w-full" />
											</div>
											<div className="p-2 bg-background rounded-lg border">
												<Skeleton className="h-4 w-full" />
											</div>
										</>
									) : translateScript?.ans_list && translateScript.ans_list.length > 0 ? (
										translateScript.ans_list.map((answer, idx) => (
											<div key={idx} className="p-2 bg-background rounded-lg border">
												<p className="text-sm">{answer}</p>
											</div>
										))
									) : (
										<div className="p-2 bg-background rounded-lg border">
											<p className="text-xs text-muted-foreground">
												No translated answers available
											</p>
										</div>
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