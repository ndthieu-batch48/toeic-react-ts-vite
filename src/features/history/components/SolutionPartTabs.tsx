import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SolutionQuestionMediaCard } from "./SolutionQuestionMediaCard"
import { SolutionQuestionCard } from "./SolutionQuestionCard"
import { Audio } from "@/features/tests/components/Audio"
import { cn } from "@/lib/utils"
import React from "react"
import type { Part } from "@/features/tests/types/test"
import { useSolutionContext } from "../context/SolutionContext"

type SolutionPartTabsProps = {
	partData: Part[]
	className?: string,
	isScrolling: boolean,
	scrollPosition: {
		x: number;
		y: number;
	}
	scrollRef: React.RefObject<HTMLDivElement | null> | null
	pageRef: React.RefObject<Record<number, HTMLElement | null>>
}

const SolutionPartTabComponent: React.FC<SolutionPartTabsProps> = ({ className, partData, scrollRef, pageRef, isScrolling, scrollPosition }) => {
	const {
		activeQuestion,
		setActivePart,
	} = useSolutionContext()

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
			className={cn("w-full ml-5 mb-50", className)}
		>
			<div
				className={`${scrollPosition.y > 200 ? 'bg-background fixed top-0 z-5 w-5xl' : 'bg-transparent w-5xl'}`}
				style={{
					transform: isScrolling ? `translateY(${scrollPosition.y * 0.0005}px)` : 'translateY(0)',
				}}
			>
				<TabsList
					className="h-auto w-full grid gap-5 bg-transparent"
					style={{ gridTemplateColumns: `repeat(${partData.length}, 1fr)` }}
				>
					{partData.map((part, index) => (
						<TabsTrigger
							key={part.part_id || index}
							value={`part-${part.part_id}`}
							className="h-[50px] text-lg font-bold cursor-pointer border border-border shadow bg-background hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
						>
							{part.part_order || index + 1}
						</TabsTrigger>
					))}
				</TabsList>

				<Audio audio={"this-is-just-a-text"} />
			</div>

			{
				partData.map((part, index) => (
					<TabsContent
						ref={scrollRef}
						key={part.part_id || index}
						value={`part-${part.part_id}`}
						className="mt-6"
					>

						<div>
							{part.media_list?.map((media, key) =>
								media.question_list.length === 1 ? (
									<div key={media.media_id}
										ref={(el: HTMLDivElement | null) => { pageRef.current[media.media_id] = el }}>
										<SolutionQuestionCard
											questionData={media.question_list[0]}
											paragraphMain={media.media_paragraph_main}
											translateScript={media.media_translate_script}
										/>
									</div>
								) : (
									<div key={key}
										ref={(el: HTMLDivElement | null) => { pageRef.current[media.media_id] = el }}>
										<SolutionQuestionMediaCard
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

export const SolutionPartTab = React.memo(SolutionPartTabComponent)