import { Button } from '@/component/ui/button'
import { Card, CardContent } from '@/component/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/component/ui/tabs'
import { Globe, Lightbulb, ChevronDown, ChevronUp, Headphones, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { TranslationCard } from '@/feature/test/component/TranslationCard'
import { ExplainationCard } from '@/feature/test/component/ExplainationCard'
import type { LANG_ID } from '@/feature/test/const/testConst'
import type { useTranslationCard } from '@/feature/test/hook/useTranslationCard'
import type { useExplainationCard } from '@/feature/test/hook/useExplainationCard'

interface GeminiAssistComponentProps {
	questionId: number
	translationHook: ReturnType<typeof useTranslationCard>
	explainationHook: ReturnType<typeof useExplainationCard>
}

export const GeminiAssistComponent: React.FC<GeminiAssistComponentProps> = ({
	questionId,
	translationHook,
	explainationHook
}) => {
	const [isHelpExpanded, setIsHelpExpanded] = useState(false)

	const {
		translateScript,
		getSelectedLanguage: getSelectedTranslateLanguage,
		handleSelectLanguage: handleSelectTranslateLanguage,
		handleTranslation,
		isTranslatePending,
		isTranslateError
	} = translationHook

	const {
		explainScript,
		getSelectedLanguage: getSelectedExplainLanguage,
		handleSelectLanguage: handleSelectExplainLanguage,
		handlExplaination,
		isExplainPending,
		isExplainError
	} = explainationHook

	return (
		<div className="space-y-2">
			{/* Toggle Button for AI Help Section */}
			<Button
				size="sm"
				variant="outline"
				onClick={() => setIsHelpExpanded(!isHelpExpanded)}
				className="flex items-center gap-2 text-sm font-semibold w-fit"
			>
				<Sparkles className="fill-primary text-primary" />
				{isHelpExpanded ? 'Hide AI Help' : 'Show AI Help'}
				{isHelpExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
			</Button>

			{/* Tabbed AI Help Section */}
			{isHelpExpanded && (
				<Tabs defaultValue="translation" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="translation" className="flex items-center gap-2">
							<Globe className="w-4 h-4" />
							<span className="hidden sm:inline">Translation</span>
							<span className="sm:hidden">Trans.</span>
						</TabsTrigger>
						<TabsTrigger value="explanation" className="flex items-center gap-2">
							<Lightbulb className="w-4 h-4" />
							<span className="hidden sm:inline">Explanation</span>
							<span className="sm:hidden">Explain</span>
						</TabsTrigger>
						<TabsTrigger value="audio-script" className="flex items-center gap-2">
							<Headphones className="w-4 h-4" />
							<span className="hidden sm:inline">Audio Script</span>
							<span className="sm:hidden">Audio</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent value="translation" className="mt-2">
						<TranslationCard
							translateScript={translateScript[questionId]}
							selectedLanguage={getSelectedTranslateLanguage(questionId)}
							onLanguageChange={(lang: LANG_ID) => handleSelectTranslateLanguage(questionId, lang)}
							onTranslate={() => handleTranslation(questionId)}
							isTranslatePending={isTranslatePending}
							isTranslateError={isTranslateError}
						/>
					</TabsContent>

					<TabsContent value="explanation" className="mt-2">
						<ExplainationCard
							explainScript={explainScript[questionId]}
							selectedLanguage={getSelectedExplainLanguage(questionId)}
							onLanguageChange={(lang: LANG_ID) => handleSelectExplainLanguage(questionId, lang)}
							onExplain={() => handlExplaination(questionId)}
							isExplainPending={isExplainPending}
							isExplainError={isExplainError}
						/>
					</TabsContent>

					<TabsContent value="audio-script" className="mt-2">
						<Card className="bg-primary/5 border-primary/20 p-0">
							<CardContent className="p-3">
								<div className="space-y-2">
									<p className="text-sm font-medium text-muted-foreground">
										Audio script translation will be available here
									</p>
									{/* TODO: Add AudioScriptCard component here */}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			)}
		</div>
	)
}