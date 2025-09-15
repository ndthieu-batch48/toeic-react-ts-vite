import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Part } from "../types/test"
import { QuestionMediaCard } from "./question-media-card"
import { QuestionCard } from "./question-card"
import { Card } from "@/components/ui/card"

type PartTabsProps = {
	partData: Part[]
}

export const PartTabs: React.FC<PartTabsProps> = ({ partData }) => {

	const defaultValue = partData.length > 0 ? `part-${partData[0].part_id}` : 'part-1'

	return (
		<Tabs defaultValue={defaultValue} className="w-full ml-5">
			<TabsList
				className="h-auto w-[1000px] bg-transparent p-0 grid gap-5 mt-6"
				style={{ gridTemplateColumns: `repeat(${partData.length}, 1fr)` }}
			>
				{partData.map((part, index) => (
					<Card className="p-0 h-[40px] rounded-md">
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


			{partData.map((part, index) => (
				<TabsContent
					key={part.part_id || index}
					value={`part-${part.part_id}`}
					className="mt-6 flex flex-col"
				>
					<div className="self-start w-[1000px]">
						{part.media_list?.map((media, key) =>
							media.question_list.length === 1 ? (
								<QuestionCard key={key} questionData={media.question_list[0]} />
							) : (
								<QuestionMediaCard key={key} mediaName={media.media_name} paragraphMain={""} questionData={media.question_list} />
							)
						)}
					</div>

				</TabsContent>
			))}
		</Tabs>
	)
}