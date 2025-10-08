import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Part } from "../types/test"
import { QuestionMediaCard } from "./QuestionMediaCard"
import { QuestionCard } from "./QuestionCard"
import { CountDownTimer } from "./CountdownTimer"
import { SubmitTestButton } from "./SubmitTestButton"
import { cn } from "@/lib/utils"
import { useTestContext } from "../context/TestContext"
import React, { useEffect } from "react"
import { Audio } from "../components/Audio"
import { useTestScrollContext } from "../context/TestScrollContext"
import { useScrollControl } from "@/hook/useScrollControl"


type PartTabsProps = {
	partData: Part[]
	className?: string,
}

const PartTabComponent: React.FC<PartTabsProps> = ({ className, partData }) => {

	// TAB CHANGE LOGIC
	const { activeQuestion, setActivePart } = useTestContext()

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

	const { getTargetQuestionCardRef } = useTestScrollContext()
	const { scrollTo } = useScrollControl('window')

	useEffect(() => {
		if (activeQuestion) {
			setTimeout(() => {
				const questionElement = getTargetQuestionCardRef(activeQuestion.question_id);
				if (questionElement) {
					const elementTop = questionElement.offsetTop;
					scrollTo(0, elementTop - 70);
				}
			}, 100);
		}
	}, [activeQuestion, getTargetQuestionCardRef, scrollTo])


	return (
		<Tabs
			value={tabValue}
			onValueChange={handleTabChange}
			className={cn("w-full", className)}
		>

			{/* Full Part Tab control */}
			<div className="w-full flex items-center fixed top-0 z-25 bg-background p-1">

				{/* TabsList */}
				<TabsList
					className="h-auto w-auto grid gap-1 bg-transparent p-0"
					style={{ gridTemplateColumns: `repeat(${partData.length}, 1fr)` }}
				>
					{partData.map((part, index) => (
						<TabsTrigger
							key={part.part_id || index}
							value={`part-${part.part_id}`}
							className="h-10 text-sm font-bold cursor-pointer border border-border shadow bg-background hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
						>
							{part.part_order || index + 1}
						</TabsTrigger>
					))}
				</TabsList>

				{/* Audio Control */}
				<div className="flex-1 mx-5">
					<Audio />
				</div>

				{/* Right side */}
				<div className="flex items-center gap-2 md:max-w-60">
					<CountDownTimer />
					<SubmitTestButton />
				</div>
			</div>

			{
				partData.map((part, index) => (
					<TabsContent
						key={part.part_id || index}
						value={`part-${part.part_id}`}
					>
						<div>
							{part.media_list?.map((media, key) =>
								media.question_list.length === 1 ? (
									<QuestionCard
										key={media.media_id}
										questionData={media.question_list[0]}
										paragraphMain={media.media_paragraph_main}
										translateScript={media.media_translate_script}
									/>
								) : (
									<QuestionMediaCard
										key={key}
										mediaName={media.media_name}
										paragraphMain={media.media_paragraph_main}
										questionData={media.question_list}
										translateScript={media.media_translate_script} />
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