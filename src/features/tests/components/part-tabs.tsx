import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Part } from "../types/test"
import { QuestionMediaCard } from "./question-media-card"
import { QuestionCard } from "./question-card"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Audio } from "./audio"
import { useEffect, useState } from "react"
import { useQuestionContext } from "../context/question-context"
import React from "react"

type PartTabsProps = {
	partData: Part[]
	className?: string
}

const PartTabComponent: React.FC<PartTabsProps> = ({ className, partData }) => {
	const { activeQuestion, setActiveQuestion } = useQuestionContext()

	const defaultValue = `part-${partData[0].part_id}`
	const tabValue = `part-${activeQuestion.part_id}`

	const [selectedTab, setSelectedTab] = useState(defaultValue)

	const handleTabChange = (value: string) => {
		setSelectedTab(value)

		// Extract part_id from the tab value (e.g., "part-1" -> 1)
		const partId = parseInt(value.replace('part-', ''))
		const part = partData.find(p => p.part_id === partId)

		if (part && part.media_list?.[0]?.question_list?.[0]) {
			setActiveQuestion({
				part_id: partId,
				question_id: part.media_list[0].question_list[0].question_id
			})
		}
	}

	useEffect(() => {
		setSelectedTab(tabValue)
	}, [tabValue])

	return (
		<Tabs
			value={selectedTab}
			onValueChange={handleTabChange}
			className={cn("w-full ml-5", className)}
		>
			<TabsList
				className="h-auto w-full bg-transparent p-0 grid gap-5"
				style={{ gridTemplateColumns: `repeat(${partData.length}, 1fr)` }}
			>
				{partData.map((part, index) => (
					<Card key={part.part_id || index} className="p-0 h-[40px] rounded-md">
						<TabsTrigger
							key={part.part_id || index}
							value={`part-${part.part_id}`}
							className="bg-muted"
						>
							{part.part_order || index + 1}
						</TabsTrigger>
					</Card>
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
									<QuestionCard key={key} questionData={media.question_list[0]} />
								) : (
									<QuestionMediaCard key={key} mediaName={media.media_name} paragraphMain={""} questionData={media.question_list} />
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