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
import { TranslationCard } from './TranslationCard'
import { ExplainationCard } from './ExplainationCard'
import { GeminiGradientDefs } from '@/common/component/GeminiIcon'
import type { AnswerDetailResponse } from '../type/testServiceType'
import { hasNoMeaningfulContent } from '../helper/testHelper'

interface GeminiAssistCardProp {
	isExpanded: boolean
	mediaId: number
	questionId: number
	audioScript?: string
	questionContent: string
	answerList: AnswerDetailResponse[]
}

export const GeminiAssistCard = ({
	isExpanded,
	// mediaId,
	questionId,
	audioScript,
	questionContent,
	answerList,
}: GeminiAssistCardProp) => {
	const [selectedLang, setSelectedLang] = useState<LANGUAGE_ID>('vi');
	const [activeTab, setActiveTab] = useState('translate');
	const [clickedTab, setClickedTab] = useState('');
	const hasInitializedRef = useRef(false);

	const shouldHideTranslateExplain = hasNoMeaningfulContent(questionContent, answerList)
	const hasAnyFeature = !shouldHideTranslateExplain || !!audioScript
	const shouldHideEntireCard = !hasAnyFeature

	const { transQuesMutation, explainQuesMutation } = useGeminiMutation()

	useEffect(() => {
		setSelectedLang('vi')
	}, [])


	const handleTranslate = useCallback(async () => {
		if (!selectedLang) return;
		await transQuesMutation.mutateAsync({
			question_id: questionId,
			language_id: selectedLang
		});
	}, [selectedLang, transQuesMutation, questionId]);

	const handleExplain = useCallback(async () => {
		if (!selectedLang) return;
		await explainQuesMutation.mutateAsync({
			question_id: questionId,
			language_id: selectedLang
		});
	}, [selectedLang, explainQuesMutation, questionId]);

	useEffect(() => {
		if (isExpanded && !hasInitializedRef.current && !shouldHideTranslateExplain) {
			hasInitializedRef.current = true;
		}
	}, [isExpanded, shouldHideTranslateExplain]);

	const availableTabs = [
		{ id: 'translate', label: 'Translate', icon: Languages, show: !shouldHideTranslateExplain, tooltip: 'Translate the content of this question.', buttonText: 'Translate this question' },
		{ id: 'explain', label: 'Explain', icon: Lightbulb, show: !shouldHideTranslateExplain, tooltip: 'Show an explanation for this question.', buttonText: 'Explain this question' },
		{ id: 'audio', label: 'Audio script', icon: Headphones, show: !!audioScript, tooltip: 'Show the audio script for this listening question.', buttonText: 'Translate the audio content' },
		{ id: 'paragraph', label: 'Paragraph', icon: NotebookText, show: false, tooltip: 'Translate the content of the paragraphs.', buttonText: 'Translate the paragraph content' },
	].filter(tab => tab.show);

	const handleTabClick = useCallback((tabId: string) => {
		setActiveTab(tabId);
		setClickedTab(tabId);
		setTimeout(() => setClickedTab(''), 200);

		if (tabId === 'translate') {
			handleTranslate();
		} else if (tabId === 'explain') {
			handleExplain();
		}
	}, [handleTranslate, handleExplain]);

	return (
		<>
			<GeminiGradientDefs />
			{!shouldHideEntireCard && (
				<div>
					{isExpanded && (
						<div className="rounded-xl p-[1.5px] bg-[linear-gradient(135deg,_var(--gemini-blue)_0%,_var(--gemini-blue)_55%,_var(--gemini-red)_75%,_var(--gemini-yellow)_90%,_var(--gemini-green)_100%)]">
							<Card className="p-0 rounded-xl border-none bg-background">
								<CardContent className="p-2">
									<TooltipProvider>
										{/* Language selector OUTSIDE of Tabs */}
										<div className="flex items-center gap-2 mb-3">
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

										{/* Tabs component with only tabs and content */}
										<Tabs value={activeTab} onValueChange={handleTabClick} className="w-full">
											<div className="w-full overflow-x-auto py-3 xl:py-2">
												<TabsList className="inline-flex bg-transparent gap-1">
													{availableTabs.map(tab => (
														<Tooltip key={tab.id}>
															<TooltipTrigger asChild>
																<Button
																	variant={activeTab === tab.id ? "default" : "outline"}
																	size="sm"
																	onClick={() => handleTabClick(tab.id)}
																	className={`
																		flex flex-col items-center gap-1 min-w-[90px] h-auto py-2
																		transition-all duration-200
																		${clickedTab === tab.id ? 'scale-95' : 'scale-100'}
																		${activeTab === tab.id && clickedTab === tab.id ? 'brightness-90' : ''}
																	`}
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

											<TabsContent value="translate" hidden={shouldHideTranslateExplain}>
												<TranslationCard
													translateScript={transQuesMutation.data}
													isTranslatePending={transQuesMutation.isPending}
												/>
											</TabsContent>

											<TabsContent value="explain" hidden={shouldHideTranslateExplain}>
												<ExplainationCard
													explainScript={explainQuesMutation.data}
													isExplainPending={explainQuesMutation.isPending}
												/>
											</TabsContent>

											{audioScript && (
												<TabsContent value="audio">
													<TranslateAudioScriptCard audioScript={audioScript} />
												</TabsContent>
											)}
										</Tabs>
									</TooltipProvider>
								</CardContent>
							</Card>
						</div>
					)}
				</div>
			)}
		</>
	)
}