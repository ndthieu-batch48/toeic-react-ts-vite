import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Globe, ChevronDown, ChevronUp, X } from 'lucide-react';

type TranslationCardProps = {
	translateScript?: string,
	isExpanded: boolean,
	onToggle: () => void,
	selectedLanguage: string,
	onLanguageChange: (lang: string) => void
}

export const TranslationCard: React.FC<TranslationCardProps> = ({
	translateScript,
	isExpanded,
	onToggle,
	selectedLanguage = 'vi',
	onLanguageChange
}) => {

	// const getCurrentTranslation = () => {
	// 	return question.translations?.[selectedLanguage] || question.translations?.['vi'];
	// };

	// const getLanguageName = (langCode) => {
	// 	const languages = {
	// 		vi: 'Vietnamese',
	// 		ja: 'Japanese'
	// 	};
	// 	return languages[langCode] || 'Vietnamese';
	// };

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
										<SelectTrigger className="w-[140px] h-8">
											<SelectValue placeholder="Select language" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="vi">🇻🇳 Vietnamese</SelectItem>
											<SelectItem value="ja">🇯🇵 Japanese</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={onToggle}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>

							<Separator />

							<div className="space-y-3">
								<div className="p-3 bg-background rounded-lg border">
									{/* <p className="text-sm font-medium">{getCurrentTranslation()?.question_content}</p> */}
									<p className="text-sm font-medium">{translateScript}</p>

								</div>

								<div className="space-y-2">
									<h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Answer Options</h5>
									<div className="space-y-1">
										<p className="text-sm font-medium">{translateScript}</p>

										{/* {question.answer_list?.map((answer, idx) => (
											<div key={idx} className="p-2 bg-background rounded border">
												<p className="text-xs text-muted-foreground">
													<span className="font-medium text-primary">{String.fromCharCode(65 + idx)}.</span> {answer.translations?.[selectedLanguage]}
												</p>
											</div>
										))} */}
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