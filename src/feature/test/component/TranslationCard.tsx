import { Skeleton } from '@/shadcn/component/ui/skeleton';
import type { GeminiTranslateQuestionResponse } from '../type/testServiceType';
import { Languages } from 'lucide-react';

type TranslationCardProp = {
	translateScript?: GeminiTranslateQuestionResponse;
	isTranslatePending: boolean;
}

export const TranslationCard = ({ translateScript, isTranslatePending }: TranslationCardProp) => {
	const shouldShowPlaceholder = !isTranslatePending && !translateScript;

	return (
		<div className="w-full border border-foreground bg-background rounded-lg p-3">
			{isTranslatePending ? (
				<>
					<span className="font-semibold">Processing...</span>
					<Skeleton className="h-5 w-full" />
				</>
			) : shouldShowPlaceholder ? (
				<div className="text-sm text-muted-foreground">
					Select a <span className="font-semibold">language</span> and click <span className="font-semibold"> Translate this question</span> to view the AI translation here.
				</div>
			) : (
				<div className="space-y-2">
					<h4 className="font-semibold text-sm flex items-center gap-2 text-foreground">
						<Languages className="w-4 h-4 text-primary" />
						Translated question content
					</h4>

					{/* Translated question content */}
					{translateScript?.question_content && (
						<div className="space-y-2">
							<h5 className="text-sm font-semibold text-muted-foreground">Questions</h5>
							<div className="p-2 rounded-lg border mb-2">
								<p className="text-sm font-medium">{translateScript.question_content}</p>
							</div>
						</div>
					)}

					{/* Translated option content */}
					{translateScript?.answer_list && translateScript.answer_list.length > 0 && (
						<div className="space-y-1">
							<h5 className="text-sm font-medium text-muted-foreground">Options</h5>
							<div className="space-y-1">
								{translateScript.answer_list.map((answer, idx) => (
									<div key={idx} className="p-2 rounded-lg border">
										<p className="text-sm">{answer}</p>
									</div>
								))}
							</div>
						</div>
					)}

				</div>
			)}
		</div>
	);
};