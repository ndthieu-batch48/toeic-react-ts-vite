import { Button } from '@/shadcn/component/ui/button'
import { Card, CardContent } from '@/shadcn/component/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/component/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/component/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shadcn/component/ui/tooltip'
import { Languages, Lightbulb, Headphones, NotebookText, Send } from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import { LANGUAGE_MAP, type LANGUAGE_ID } from '@/feature/test/const/testConst'
import { useGeminiMutation } from '../hook/useGeminiMutation'
import { TranslateAudioScriptCard } from './TranslateAudioScriptCard'
import { TranslateMainParagraphCard } from './TranslateMainParagraphCard'
import { TranslationCard } from './TranslationCard'
import { ExplainationCard } from './ExplainationCard'
import { GeminiGradientDefs } from '@/common/component/GeminiIcon'

interface GeminiAssistCardProps {
	isExpanded: boolean
	mediaId: number
	questionId: number
	audioScript?: string
}

export const GeminiAssistCard: React.FC<GeminiAssistCardProps> = ({
	isExpanded,
	// mediaId,
	questionId,
	audioScript,
}) => {
	const [selectedLang, setSelectedLang] = useState<LANGUAGE_ID>('vi');
	const [activeTab, setActiveTab] = useState('translate');

	// Initiate target language on mount
	useEffect(() => {
		setSelectedLang('vi')
	}, [])

	// Hook logic
	const { transQuesMutation, explainQuesMutation } = useGeminiMutation()

	const handleGemini = useCallback(async () => {
		if (!selectedLang) return;

		if (activeTab === 'translate') {
			await transQuesMutation.mutateAsync({
				question_id: questionId,
				language_id: selectedLang
			});
		} else if (activeTab === 'explain') {
			await explainQuesMutation.mutateAsync({
				question_id: questionId,
				language_id: selectedLang
			});
		}
	}, [selectedLang, questionId, transQuesMutation, explainQuesMutation, activeTab]);

	// Available tabs
	const availableTabs = [
		{ id: 'translate', label: 'Translate', icon: Languages, show: true, tooltip: 'Translate the content of this question.', buttonText: 'Translate this question' },
		{ id: 'explain', label: 'Explain', icon: Lightbulb, show: true, tooltip: 'Show an explanation for this question.', buttonText: 'Explain this question' },
		{ id: 'audio', label: 'Audio script', icon: Headphones, show: !!audioScript, tooltip: 'Show the audio script for this listening question.', buttonText: 'Translate the audio content' },
		{ id: 'paragraph', label: 'Paragraph', icon: NotebookText, show: true, tooltip: 'Translate the content of the paragraphs.', buttonText: 'Translate the paragraph content' },
	].filter(tab => tab.show);

	const activeTabConfig = availableTabs.find(tab => tab.id === activeTab) ?? availableTabs[0];

	// Shared Tabs Content Component
	const TabsContentComponent = () => (
		<TooltipProvider>
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				{/* Responsive container that wraps on small screens */}
				<div className="flex flex-col gap-3 sm:gap-2">

					{/* Top row: Language selector and Generate button */}
					<div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
						<Select value={selectedLang} onValueChange={(lang: LANGUAGE_ID) => setSelectedLang(lang)}>
							<SelectTrigger className="w-auto gap-0 p-1">
								<SelectValue placeholder="Select language" />
							</SelectTrigger>
							<SelectContent>
								{LANGUAGE_MAP.map((lang) => (
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

						<Button
							size="sm"
							variant="outline"
							className="gap-2"
							onClick={handleGemini}
						>
							<Send className="text-primary w-4 h-4" />
							<span className="font-semibold">{activeTabConfig?.buttonText ?? 'Generate'}</span>
						</Button>
					</div>

					{/* Tabs row - scrollable on small screens */}
					<div className="w-full overflow-x-auto py-1 xl:py-2">
						<TabsList className="inline-flex bg-transparent">
							{availableTabs.map(tab => (
								<Tooltip key={tab.id}>
									<TooltipTrigger>
										<TabsTrigger
											value={tab.id}
											className="flex flex-col items-center gap-1 min-w-[80px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
										>
											<tab.icon />
											<span className="md:text-xs xl:text-base">{tab.label}</span>
										</TabsTrigger>
									</TooltipTrigger>
									<TooltipContent side="bottom" className="xl:text-base">
										{tab.tooltip}
									</TooltipContent>
								</Tooltip>
							))}
						</TabsList>
					</div>
				</div>

				{/* Tab Contents */}
				<TabsContent value="translate" className="mt-2">
					<TranslationCard
						translateScript={transQuesMutation.data}
						isTranslatePending={transQuesMutation.isPending}
					/>
				</TabsContent>

				<TabsContent value="explain" className="mt-2">
					<ExplainationCard
						explainScript={explainQuesMutation.data}
						isExplainPending={explainQuesMutation.isPending}
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
		<>
			<GeminiGradientDefs />
			<div>
				{isExpanded && (
					<div className="rounded-xl p-[1.5px] bg-[linear-gradient(135deg,_var(--gemini-blue)_0%,_var(--gemini-blue)_55%,_var(--gemini-red)_75%,_var(--gemini-yellow)_90%,_var(--gemini-green)_100%)]">
						<Card className="p-0 rounded-xl border-none bg-background">
							<CardContent className="p-2">
								<TabsContentComponent />
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</>
	)
}