import { Button } from '@/shadcn/component/ui/button'
import { Card, CardContent } from '@/shadcn/component/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/component/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/component/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shadcn/component/ui/tooltip'
import { Globe, Lightbulb, ChevronDown, ChevronUp, Headphones, Sparkles, NotebookText } from 'lucide-react'
import { useState, useEffect } from 'react'
import { LANG_MAP, type LANG_ID } from '@/feature/test/const/testConst'
import { TranslateAudioScriptCard } from './TranslateAudioScriptCard'
import { TranslateMainParagraphCard } from './TranslateMainParagraphCard'
import { useTranslationCard } from '../hook/useTranslationCard'
import { useExplainationCard } from '../hook/useExplainationCard'
import { TranslationCard } from './TranslationCard'
import { ExplainationCard } from './ExplainationCard'

interface GeminiAssistCardProps {
	mediaId: number
	questionId: number
	audioScript?: string
	translationHook: ReturnType<typeof useTranslationCard>
	explainationHook: ReturnType<typeof useExplainationCard>
}

export const GeminiAssistCard: React.FC<GeminiAssistCardProps> = ({
	questionId,
	audioScript,
	translationHook,
	explainationHook
}) => {
	const [isHelpExpanded, setIsHelpExpanded] = useState(false)
	const [selectedLang, setSelectedLang] = useState<LANG_ID>('vi');

	// Initialize default language on mount
	useEffect(() => {
		translationHook.handleSelectLanguage(questionId, 'vi');
		explainationHook.handleSelectLanguage(questionId, 'vi');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionId]);

	const handleLanguageChange = (lang: LANG_ID) => {
		setSelectedLang(lang);
		translationHook.handleSelectLanguage(questionId, lang);
		explainationHook.handleSelectLanguage(questionId, lang);
	};

	const handleTranslate = () => {
		translationHook.handleTranslation(questionId);
	};

	const handleExplain = () => {
		explainationHook.handlExplaination(questionId);
	};

	// Available tabs
	const availableTabs = [
		{ id: 'translate', label: 'Translate', icon: Globe, show: true, tooltip: 'Translate the content of this question.' },
		{ id: 'explain', label: 'Explain', icon: Lightbulb, show: true, tooltip: 'Show an explanation for this question.' },
		{ id: 'audio', label: 'Audio script', icon: Headphones, show: true, tooltip: 'Show the audio script for this listening question.' },
		{ id: 'paragraph', label: 'Paragraph', icon: NotebookText, show: true, tooltip: 'Translate the content of the paragraphs.' },
	].filter(tab => tab.show);

	// Shared Tabs Content Component
	const TabsContentComponent = () => (
		<TooltipProvider>
			<Tabs defaultValue="translate" className="w-full gap-0 p-0">
				<div className="flex items-center">
					{/* Language Selector */}
					<Select value={selectedLang} onValueChange={handleLanguageChange}>
						<SelectTrigger className="w-auto gap-0 p-1">
							<SelectValue placeholder="Select language" />
						</SelectTrigger>
						<SelectContent>
							{LANG_MAP.map((lang) => (
								<SelectItem
									key={lang.id}
									value={lang.id}
									className="flex items-center w-auto gap-1 p-1"
								>
									<img
										src={`/${lang.flag}_flag.svg`}
										alt={lang.name}
										className="w-4 h-4"
									/>
									{lang.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<TabsList className="flex bg-transparent">
						{availableTabs.map(tab => (
							<Tooltip key={tab.id}>
								<TooltipTrigger >
									<TabsTrigger
										value={tab.id}
										className="flex flex-col items-center gap-0 p-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
									>
										<tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
										<span className="text-xs">{tab.label}</span>
									</TabsTrigger>
								</TooltipTrigger>
								<TooltipContent side="bottom">
									{tab.tooltip}
								</TooltipContent>
							</Tooltip>
						))}
					</TabsList>
				</div>

				<TabsContent value="translate" className="mt-2">
					<TranslationCard
						translateScript={translationHook.translateScript[questionId]}
						isTranslatePending={translationHook.isTranslatePending}
					/>
				</TabsContent>

				<TabsContent value="explain" className="mt-2">
					<ExplainationCard
						explainScript={explainationHook.explainScript[questionId]}
						isExplainPending={explainationHook.isExplainPending}
					/>
				</TabsContent>

				{audioScript && (
					<TabsContent value="audio" className="mt-2">
						<TranslateAudioScriptCard audioScript={audioScript} />
					</TabsContent>
				)}

				<TabsContent value="paragraph" className="mt-2">
					<TranslateMainParagraphCard />
				</TabsContent>
			</Tabs>
		</TooltipProvider>
	);

	return (
		<div>
			<Button
				size="sm"
				variant="outline"
				onClick={() => setIsHelpExpanded(!isHelpExpanded)}
				className="flex items-center gap-1 text-sm font-semibold bg-primary/5 border-primary/20 hover:bg-primary/10 w-full sm:w-auto"
			>
				<Sparkles className="fill-primary text-primary w-4 h-4" />
				<span>AI Assistant</span>
				{isHelpExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
			</Button>

			{isHelpExpanded && (
				<Card className="gap-0 p-0 border-primary/20">
					<CardContent className="p-2">
						<TabsContentComponent />
					</CardContent>
				</Card>
			)}
		</div>
	)
}