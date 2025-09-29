import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';
import type { TranslateQuestionResponse } from '../types/test';
import { LANGUAGE_MAP, type LANGUAGE_ID } from '../constants/const';

type TranslationCardProps = {
	translateScript?: TranslateQuestionResponse,
	isExpanded: boolean,
	onToggle: () => void,
	selectedLanguage: LANGUAGE_ID,
	onLanguageChange: (lang: LANGUAGE_ID) => void,
	onTranslate: () => void,
	isTranslatePending: boolean,
	isTranslateError: boolean,
}

export const TranslationCard: React.FC<TranslationCardProps> = ({
	translateScript,
	isExpanded,
	onToggle,
	selectedLanguage = 'vi',
	onLanguageChange,
	onTranslate,
	isTranslatePending,
	isTranslateError,
}) => {

	return (
		<div className="space-y-4">

			{/* Translation Toggle Button */}
			<Button
				variant="default"
				size="sm"
				onClick={onToggle}
				className="flex items-center gap-2 text-base font-semibold cursor-pointer"
			>
				<Globe />
				Translate
				{isExpanded ?
					<ChevronUp /> :
					<ChevronDown />
				}
			</Button>

			{/* Expandable Translation Card */}
			{isExpanded && (
				<Card className="bg-primary/5 border-primary/20">
					<CardContent className="p-4">
						<div className="space-y-4">
							<div className="flex">
								<Select value={selectedLanguage} onValueChange={onLanguageChange}>
									<SelectTrigger className="w-[130px] h-8">
										<SelectValue placeholder="Select language" />
									</SelectTrigger>
									<SelectContent>
										{Object.entries(LANGUAGE_MAP).map(([langId, langName]) => (
											<SelectItem key={langId} value={langId}>
												{langName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Button
									variant="default"
									size="sm"
									onClick={onTranslate}
									disabled={isTranslatePending || !selectedLanguage}
									className="ml-2 font-bold text-base cursor-pointer"
								>
									Translate
								</Button>
							</div>

							<Separator />

							<div className="space-y-3">
								<div className="p-3 bg-background rounded-lg border">
									{isTranslatePending ? (
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 border border-primary border-t-transparent rounded-2xl animate-spin" />
											<p className="text-base">Translating question...</p>
										</div>
									) : translateScript?.question_content ? (
										<p className="text-lg font-medium">{translateScript.question_content}</p>
									) : (
										<p className="text-lg font-medium">Select a language and click translate to see the translation</p>
									)}
								</div>

								<div className="space-y-2">
									<h5 className="text-sm font-semibold text-muted-foreground uppercase">Answer Options</h5>
									<div className="space-y-1">
										{isTranslatePending ? (
											<div className="flex items-center gap-2 p-2 bg-background rounded border">
												<div className="w-3 h-3 border border-primary border-t-transparent rounded-2xl animate-spin" />
												<p className="text-base text-muted-foreground">Translating answers...</p>
											</div>
										) : translateScript?.answer_list && translateScript.answer_list.length > 0 ? (
											translateScript.answer_list.map((answer, idx) => (
												<div key={idx} className="p-2 bg-background rounded-xl border">
													<p className="text-base">
														{answer}
													</p>
												</div>
											))
										) : (
											<div className="p-2 bg-background rounded-xl border">
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
			)}
		</div>
	);
};