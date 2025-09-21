import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Part } from "../types/test"
import { QuestionMediaCard } from "./question-media-card"
import { QuestionCard } from "./question-card"
import { cn } from "@/lib/utils"
import { Audio } from "./audio"
import { useTestContext } from "../context/TestContext"
import React from "react"

type PartTabsProps = {
	partData: Part[]
	className?: string
}

const PartTabComponent: React.FC<PartTabsProps> = ({ className, partData }) => {
	const {
		activeQuestion,
		// setActiveQuestion,
		setActivePart,
		// selectedAnswers,
		// setSelectedAnswer
	} = useTestContext()

	const tabValue = `part-${activeQuestion.part_id}`

	const handleTabChange = (value: string) => {
		// Extract part_id from the tab value (e.g., "part-1" -> 1)
		const partId = parseInt(value.replace('part-', ''))
		const part = partData.find(p => p.part_id === partId)

		if (part && part.media_list?.[0]?.question_list?.[0]) {
			const firstQuestionId = part.media_list[0].question_list[0].question_id
			setActivePart(partId, firstQuestionId)
		}
	}

	return (
		<Tabs
			value={tabValue}
			onValueChange={handleTabChange}
			className={cn("w-full ml-5", className)}
		>
			<TabsList
				className="h-auto w-full p-0 grid gap-5"
				style={{ gridTemplateColumns: `repeat(${partData.length}, 1fr)` }}
			>
				{partData.map((part, index) => (
					<TabsTrigger
						key={part.part_id || index}
						value={`part-${part.part_id}`}
						className="h-[40px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/20 border border-border"
					>
						{part.part_order || index + 1}
					</TabsTrigger>
				))}
			</TabsList>

			<Audio audio={"this-is-just-a-text"} />

			{
				partData.map((part, index) => (
					<TabsContent
						key={part.part_id || index}
						value={`part-${part.part_id}`}
						className="mt-6"
					>

						<div>
							{part.media_list?.map((media, key) =>
								media.question_list.length === 1 ? (
									<QuestionCard
										key={key}
										questionData={media.question_list[0]}
										paragraphMain={media.media_paragraph_main}
										translateScript={media.media_translate_script}
									// selectedAnswers={selectedAnswers}
									// onSelectedAnswer={setSelectedAnswer}
									/>
								) : (
									<QuestionMediaCard
										key={key}
										mediaName={media.media_name}
										paragraphMain={media.media_paragraph_main}
										questionData={media.question_list}
										translateScript={media.media_translate_script}
									// selectedAnswers={selectedAnswers}
									// onSelectedAnswer={setSelectedAnswer}
									/>
								)
							)}
						</div>
					</TabsContent>
				))
			}
		</Tabs >
	)
}

export const PartTab = React.memo(PartTabComponent)