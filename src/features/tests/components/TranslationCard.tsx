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
				variant="outline"
				size="sm"
				onClick={onToggle}
				className="flex items-center gap-2"
			>
				<Globe className="h-4 w-4" />
				Translate
				{isExpanded ?
					<ChevronUp className="h-4 w-4" /> :
					<ChevronDown className="h-4 w-4" />
				}
			</Button>

			{/* Expandable Translation Card */}
			{isExpanded && (
				<Card className="bg-primary/5 border-primary/20">
					<CardContent className="p-4">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<h4 className="text-sm font-semibold text-primary">Translation</h4>
									<Select value={selectedLanguage} onValueChange={onLanguageChange}>
										<SelectTrigger className="w-[160px] h-8">
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
								</div>
								<Button
									variant="default"
									size="sm"
									onClick={onTranslate}
									disabled={isTranslatePending || !selectedLanguage}
									className="ml-2"
								>
									{isTranslatePending ? (
										<>
											<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
											Translating...
										</>
									) : (
										'Translate'
									)}
								</Button>
							</div>

							<Separator />

							<div className="space-y-3">
								<div className="p-3 bg-background rounded-lg border">
									{isTranslatePending ? (
										<div className="flex items-center gap-2">
											<div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
											<p className="text-sm text-muted-foreground">Translating question...</p>
										</div>
									) : translateScript?.question_content ? (
										<p className="text-sm font-medium">{translateScript.question_content}</p>
									) : (
										<p className="text-sm text-muted-foreground">Select a language and click translate to see the translation</p>
									)}
								</div>

								<div className="space-y-2">
									<h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Answer Options</h5>
									<div className="space-y-1">
										{isTranslatePending ? (
											<div className="flex items-center gap-2 p-2 bg-background rounded border">
												<div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
												<p className="text-xs text-muted-foreground">Translating answers...</p>
											</div>
										) : translateScript?.answer_list && translateScript.answer_list.length > 0 ? (
											translateScript.answer_list.map((answer, idx) => (
												<div key={idx} className="p-2 bg-background rounded border">
													<p className="text-xs text-muted-foreground">
														{answer}
													</p>
												</div>
											))
										) : (
											<div className="p-2 bg-background rounded border">
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