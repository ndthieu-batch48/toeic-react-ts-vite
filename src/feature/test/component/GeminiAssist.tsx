import { Button } from '@/shadcn/component/ui/button'
import { Card, CardContent } from '@/shadcn/component/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/component/ui/tabs'
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
		{ id: 'translate', label: 'Translate', icon: Globe, show: true },
		{ id: 'explain', label: 'Explain', icon: Lightbulb, show: true },
		{ id: 'audio', label: 'Audio', icon: Headphones, show: true },
		{ id: 'paragraph', label: 'Paragraph', icon: NotebookText, show: true },
	].filter(tab => tab.show);

	// Shared Tabs Content Component
	const TabsContentComponent = () => (
		<div className="space-y-4">
			{/* Shared Language Selector */}
			<div className="flex items-center gap-3 flex-wrap p-3 rounded-lg border bg-muted/50">
				<span className="text-sm font-medium text-foreground">Language:</span>
				<div className="flex gap-2 flex-wrap">
					{LANG_MAP.map((lang) => (
						<Button
							key={lang.id}
							size="sm"
							variant={selectedLang === lang.id ? "default" : "outline"}
							onClick={() => handleLanguageChange(lang.id)}
							className="text-xs"
						>
							<span className="mr-1">{lang.flag}</span>
							<span className="hidden sm:inline">{lang.name}</span>
						</Button>
					))}
				</div>
			</div>

			<Tabs defaultValue="translate" className="w-full">
				<TabsList
					className="grid w-full bg-background/80"
					style={{ gridTemplateColumns: `repeat(${availableTabs.length}, minmax(0, 1fr))` }}
				>
					{availableTabs.map(tab => (
						<TabsTrigger
							key={tab.id}
							value={tab.id}
							className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4"
						>
							<tab.icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
							<span className="text-xs sm:text-sm truncate">{tab.label}</span>
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent value="translate" className="mt-4 space-y-3">
					<div className="flex justify-center">
						<Button
							size="sm"
							variant="outline"
							onClick={handleTranslate}
							disabled={translationHook.isTranslatePending}
							className="w-full max-w-xs text-sm font-semibold border-primary"
						>
							{translationHook.isTranslatePending ? 'Translating...' : 'Translate this question'}
						</Button>
					</div>
					<TranslationCard
						translateScript={translationHook.translateScript[questionId]}
						isTranslatePending={translationHook.isTranslatePending}
					/>
				</TabsContent>

				<TabsContent value="explain" className="mt-4 space-y-3">
					<div className="flex justify-center">
						<Button
							size="sm"
							variant="outline"
							onClick={handleExplain}
							disabled={explainationHook.isExplainPending}
							className="w-full max-w-xs text-sm font-semibold border-primary"
						>
							{explainationHook.isExplainPending ? 'Explaining...' : 'Explain this question'}
						</Button>
					</div>
					<ExplainationCard
						explainScript={explainationHook.explainScript[questionId]}
						isExplainPending={explainationHook.isExplainPending}
					/>
				</TabsContent>

				<TabsContent value="audio" className="mt-4 space-y-3">
					<div className="flex justify-center">
						<Button
							size="sm"
							variant="outline"
							onClick={() => console.log(questionId)}
							className="w-full max-w-xs text-sm font-semibold border-primary"
						>
							Translate this audio script
						</Button>
					</div>
					<TranslateAudioScriptCard audioScript={audioScript} />
				</TabsContent>

				<TabsContent value="paragraph" className="mt-4">
					<TranslateMainParagraphCard />
				</TabsContent>
			</Tabs>
		</div>
	);

	return (
		<div className="mb-4">
			<Button
				size="sm"
				variant="outline"
				onClick={() => setIsHelpExpanded(!isHelpExpanded)}
				className="flex items-center gap-2 text-sm font-semibold bg-primary/5 border-primary/20 hover:bg-primary/10 w-full sm:w-auto"
			>
				<Sparkles className="fill-primary text-primary w-4 h-4" />
				<span>AI Assistant</span>
				{isHelpExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
			</Button>

			{isHelpExpanded && (
				<Card className="mt-3 border-primary/20 bg-primary/5">
					<CardContent className="p-3 sm:p-4">
						<TabsContentComponent />
					</CardContent>
				</Card>
			)}
		</div>
	)
}