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
import { getToeicPartTopic } from "../helper/testHelper"


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

	// SCROLL LOGIC
	const { getScrollTarget } = useTestScrollContext()
	const { scrollTo } = useScrollControl('window')

	useEffect(() => {
		if (activeQuestion) {
			setTimeout(() => {
				const questionElement = getScrollTarget(activeQuestion.question_id);
				if (questionElement) {
					const elementTop = questionElement.offsetTop;
					scrollTo(0, elementTop - 100);
				}
			}, 100);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeQuestion, getScrollTarget])


	return (
		<Tabs
			value={tabValue}
			onValueChange={handleTabChange}
			className={cn("w-full", className)}
		>

			{/* Full Part Tab control */}
			<div className="w-full fixed top-0 z-25 bg-background p-1">
				<div className="w-full flex items-center justify-between mb-2">
					{/* TabsList */}
					<TabsList
						className="h-auto w-auto grid gap-1 bg-transparent p-0"
						style={{ gridTemplateColumns: `repeat(${partData.length}, 1fr)` }}
					>
						{partData.map((part, index) => (
							<TabsTrigger
								key={part.part_id || index}
								value={`part-${part.part_id}`}
								className="h-auto min-h-10 text-sm font-bold cursor-pointer border border-border shadow bg-background hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								<div className="flex flex-col w-full justify-center min-h-13 max-w-[80px]">
									<span className="font-semibold">{part.part_order || `Part ${index + 1}`}</span>
									<span className="font-medium opacity-80 text-wrap text-xs">
										{getToeicPartTopic(part.part_order || `Part ${index + 1}`)}
									</span>
								</div>
							</TabsTrigger>
						))}
					</TabsList>


					<div className="w-full flex-1 mx-2">
						<Audio />
					</div>

					{/* Right side */}
					<div className="flex items-center gap-2 md:max-w-60">
						<CountDownTimer />
						<SubmitTestButton />
					</div>
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
										partId={part.part_id}
										questionData={media.question_list[0]}
										paragraphMain={media.media_paragraph_main}
										translateScript={media.media_translate_script}
									/>
								) : (
									<QuestionMediaCard
										key={key}
										mediaName={media.media_name}
										questionData={media.question_list}
										partId={part.part_id}
										paragraphMain={media.media_paragraph_main}
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