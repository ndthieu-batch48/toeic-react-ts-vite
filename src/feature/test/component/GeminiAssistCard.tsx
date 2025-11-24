import { Card, CardContent } from '@/shadcn/component/ui/card'
import { Tabs, TabsContent, TabsList } from '@/shadcn/component/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/component/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shadcn/component/ui/tooltip'
import { Button } from '@/shadcn/component/ui/button'
import { Languages, Lightbulb, Headphones, NotebookText } from 'lucide-react'
import { useState, useCallback, useEffect, useRef } from 'react'
import { LANGUAGE_MAP, type LANGUAGE_ID } from '@/feature/test/const/testConst'
import { useGeminiMutation } from '../hook/useGeminiMutation'
import { TranslateAudioScriptCard } from './TranslateAudioScriptCard'
// import { TranslateMainParagraphCard } from './TranslateMainParagraphCard'
import { TranslationCard } from './TranslationCard'
import { ExplainationCard } from './ExplainationCard'
import { GeminiGradientDefs } from '@/common/component/GeminiIcon'
import type { AnswerDetailResponse } from '../type/testServiceType'

interface GeminiAssistCardProps {
	isExpanded: boolean
	mediaId: number
	questionId: number
	audioScript?: string
	questionContent: string
	answerList: AnswerDetailResponse[]
}

export const GeminiAssistCard: React.FC<GeminiAssistCardProps> = ({
	isExpanded,
	// mediaId,
	questionId,
	audioScript,
	questionContent,
	answerList,
}) => {
	const [selectedLang, setSelectedLang] = useState<LANGUAGE_ID>('vi');
	const [activeTab, setActiveTab] = useState('translate');
	const hasInitializedRef = useRef(false);

	// Helper function to check if content is empty or only contains single letters
	const isContentMeaningless = (content: string): boolean => {
		const trimmed = content.trim()
		// Check if empty or only contains A, B, C, D (single letter)
		return trimmed === '' || /^[A-D]$/i.test(trimmed)
	}

	// Check if question and all answers are meaningless
	const hasNoMeaningfulContent = (): boolean => {
		const questionMeaningless = isContentMeaningless(questionContent)
		const allAnswersMeaningless = answerList.every(answer =>
			isContentMeaningless(answer.content)
		)
		return questionMeaningless && allAnswersMeaningless
	}

	// Determine if translate and explain tabs should be hidden
	const shouldHideTranslateExplain = hasNoMeaningfulContent()

	// Initiate target language on mount
	useEffect(() => {
		setSelectedLang('vi')
	}, [])

	// Hook logic
	const { transQuesMutation, explainQuesMutation } = useGeminiMutation()

	const handleTranslate = useCallback(async () => {
		if (!selectedLang) return;
		await transQuesMutation.mutateAsync({
			question_id: questionId,
			language_id: selectedLang
		});
	}, [selectedLang, questionId, transQuesMutation]);

	const handleExplain = useCallback(async () => {
		if (!selectedLang) return;
		await explainQuesMutation.mutateAsync({
			question_id: questionId,
			language_id: selectedLang
		});
	}, [selectedLang, questionId, explainQuesMutation]);

	// Trigger initial translation when card is first expanded
	useEffect(() => {
		if (isExpanded && !hasInitializedRef.current && !shouldHideTranslateExplain) {
			hasInitializedRef.current = true;
			handleTranslate();
		}
	}, [isExpanded, shouldHideTranslateExplain, handleTranslate]);

	// Available tabs
	const availableTabs = [
		{ id: 'translate', label: 'Translate', icon: Languages, show: !shouldHideTranslateExplain, tooltip: 'Translate the content of this question.', buttonText: 'Translate this question' },
		{ id: 'explain', label: 'Explain', icon: Lightbulb, show: !shouldHideTranslateExplain, tooltip: 'Show an explanation for this question.', buttonText: 'Explain this question' },
		{ id: 'audio', label: 'Audio script', icon: Headphones, show: !!audioScript, tooltip: 'Show the audio script for this listening question.', buttonText: 'Translate the audio content' },

		//TODO: Implement translate main paragraph feature
		{ id: 'paragraph', label: 'Paragraph', icon: NotebookText, show: false, tooltip: 'Translate the content of the paragraphs.', buttonText: 'Translate the paragraph content' },
	].filter(tab => tab.show);

	// Handler for tab click
	const handleTabClick = useCallback((tabId: string) => {
		setActiveTab(tabId);

		// Trigger mutation based on tab type
		if (tabId === 'translate') {
			handleTranslate();
		} else if (tabId === 'explain') {
			handleExplain();
		}
		// Audio and paragraph tabs don't trigger mutations
	}, [handleTranslate, handleExplain]);

	// Shared Tabs Content Component
	const TabsContentComponent = () => (
		<TooltipProvider>
			<Tabs value={activeTab} onValueChange={handleTabClick} className="w-full">
				{/* Responsive container that wraps on small screens */}
				<div className="flex flex-col gap-3 sm:gap-2">

					{/* Top row: Language selector */}
					<div className="flex items-center gap-2">
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
					</div>

					{/* Tabs row - scrollable on small screens */}
					<div className="w-full overflow-x-auto py-1 xl:py-2">
						<TabsList className="inline-flex bg-transparent gap-1">
							{availableTabs.map(tab => (
								<Tooltip key={tab.id}>
									<TooltipTrigger asChild>
										<Button
											variant={activeTab === tab.id ? "default" : "outline"}
											size="sm"
											onClick={() => handleTabClick(tab.id)}
											className="flex flex-col items-center gap-1 min-w-[80px] h-auto py-2"
										>
											<tab.icon className="w-4 h-4" />
											<span className="md:text-xs xl:text-base">{tab.label}</span>
										</Button>
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

				{/* TODO: Implement translate main paragraph feature */}
				{/* <TabsContent value="paragraph" className="mt-2">
					<TranslateMainParagraphCard />
				</TabsContent> */}
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