import { Button } from '@/shadcn/component/ui/button'
import { Card, CardContent } from '@/shadcn/component/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/component/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/component/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shadcn/component/ui/tooltip'
import { Languages, Lightbulb, Headphones, NotebookText, Send } from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import { LANG_MAP, type LANG_ID } from '@/feature/test/const/testConst'
import { TranslateAudioScriptCard } from './TranslateAudioScriptCard'
import { TranslateMainParagraphCard } from './TranslateMainParagraphCard'
import { TranslationCard } from './TranslationCard'
import { useGeminiMutation } from '../hook/useGeminiMutation'
import { ExplainationCard } from './ExplainationCard'

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
	const [selectedLang, setSelectedLang] = useState<LANG_ID>('vi');
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
				ques_id: questionId,
				lang_id: selectedLang
			});
		} else if (activeTab === 'explain') {
			await explainQuesMutation.mutateAsync({
				ques_id: questionId,
				lang_id: selectedLang
			});
		}
	}, [selectedLang, questionId, transQuesMutation, explainQuesMutation, activeTab]);

	// Available tabs
	const availableTabs = [
		{ id: 'translate', label: 'Translate', icon: Languages, show: true, tooltip: 'Translate the content of this question.' },
		{ id: 'explain', label: 'Explain', icon: Lightbulb, show: true, tooltip: 'Show an explanation for this question.' },
		{ id: 'audio', label: 'Audio script', icon: Headphones, show: !!audioScript, tooltip: 'Show the audio script for this listening question.' },
		{ id: 'paragraph', label: 'Paragraph', icon: NotebookText, show: true, tooltip: 'Translate the content of the paragraphs.' },
	].filter(tab => tab.show);

	// Shared Tabs Content Component
	const TabsContentComponent = () => (
		<TooltipProvider>
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full gap-0 pt-0">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{/* Language Selector */}
						<Select value={selectedLang} onValueChange={(lang: LANG_ID) => setSelectedLang(lang)}>
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
											<tab.icon />
										</TabsTrigger>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										{tab.tooltip}
									</TooltipContent>
								</Tooltip>
							))}
						</TabsList>
					</div>

					<Button
						size="sm"
						variant="outline"
						onClick={handleGemini}
						disabled={transQuesMutation.isPending || explainQuesMutation.isPending}
						className="gap-1"
					>
						<Send className="text-primary w-4 h-4" />
						<span className="font-semibold">Generate</span>
					</Button>
				</div>

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
		<div>
			{isExpanded && (
				<Card className="border-primary/20 p-0">
					<CardContent className="p-2">
						<TabsContentComponent />
					</CardContent>
				</Card>
			)}
		</div>
	)
}