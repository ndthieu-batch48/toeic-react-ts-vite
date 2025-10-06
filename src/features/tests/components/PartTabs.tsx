import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Part } from "../types/test"
import { QuestionMediaCard } from "./QuestionMediaCard"
import { QuestionCard } from "./QuestionCard"
import { CountDownTimer } from "./CountdownTimer"
import { SubmitTestButton } from "./SubmitTestButton"
import { cn } from "@/lib/utils"
import { useTestContext } from "../context/TestContext"
import { Label } from "@/components/ui/label"
import React from "react"
import { Audio } from "../components/Audio"


type PartTabsProps = {
	partData: Part[]
	className?: string,
	scrollRef: React.RefObject<HTMLDivElement | null> | null
	pageRef: React.RefObject<Record<number, HTMLElement | null>>
}

const PartTabComponent: React.FC<PartTabsProps> = ({ className, partData, scrollRef, pageRef }) => {
	const {
		activeQuestion,
		setActivePart,
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
			className={cn("w-full pb-20", className)}
		>
			{/* Header with flex row layout */}
			<div className="w-full flex flex-col fixed top-0 z-25 bg-background border-b">
				<div className="flex items-center justify-between h-15 px-4">

					<Label className="text-xl font-bold text-foreground">TMA TOEIC</Label>

					{/* TabsList */}
					<TabsList
						className="h-auto w-auto grid gap-2 bg-transparent p-1"
						style={{ gridTemplateColumns: `repeat(${partData.length}, 1fr)` }}
					>
						{partData.map((part, index) => (
							<TabsTrigger
								key={part.part_id || index}
								value={`part-${part.part_id}`}
								className="h-10 text-lg font-bold cursor-pointer border border-border shadow bg-background hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								{part.part_order || index + 1}
							</TabsTrigger>
						))}
					</TabsList>

					{/* Right side: Timer and Submit */}
					<div className="flex items-center">
						<CountDownTimer />
						<SubmitTestButton />
					</div>
				</div>

				<Audio />
			</div>

			{
				partData.map((part, index) => (
					<TabsContent
						ref={scrollRef}
						key={part.part_id || index}
						value={`part-${part.part_id}`}
						className="pt-10"
					>
						<div>
							{part.media_list?.map((media, key) =>
								media.question_list.length === 1 ? (
									<div key={media.media_id}
										ref={(el: HTMLDivElement | null) => { pageRef.current[media.media_id] = el }}>
										<QuestionCard
											questionData={media.question_list[0]}
											paragraphMain={media.media_paragraph_main}
											translateScript={media.media_translate_script}
										/>
									</div>
								) : (
									<div key={key}
										ref={(el: HTMLDivElement | null) => { pageRef.current[media.media_id] = el }}>
										<QuestionMediaCard
											mediaName={media.media_name}
											paragraphMain={media.media_paragraph_main}
											questionData={media.question_list}
											translateScript={media.media_translate_script}
										/>
									</div>
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