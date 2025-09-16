import { Button } from "@/components/ui/button"
import type { Test } from "../types/test"
import { PartTabs } from "./part-tabs"
import { QuestionTab } from "./question-tab"
import { CountDownTimer } from "./timer"
import { useState } from "react"


type TestPracticeProps = {
	testTitle: string
	testDuration: number
	testData: Test,
}

export type ActiveQuestion = {
	part_id: number
	question_id: number
}

export const TestPractice: React.FC<TestPracticeProps> = ({ testTitle, testDuration, testData }) => {
	const [activeQuestion, setActiveQuestion] = useState<ActiveQuestion>({
		part_id: testData.part_list[0].part_id,
		question_id: testData.part_list[0].media_list![0].question_list[0].question_id
	})

	return (
		<>
			<div className="flex justify-center items-center w-full h-32 gap-2">
				<span className="text-xl font-bold">{testTitle || "THIS IS A TEST"}</span>
				<Button className="border-destructive text-destructive hover:bg-destructive hover:text-white" variant="outline">
					<span>Exit</span>
				</Button>
			</div>

			<div className="flex flex-col md:flex-row gap-4">
				<PartTabs
					className="md:max-w-4xl flex-1"
					partData={testData.part_list}
					activeQuestion={activeQuestion}
					onSelectTab={setActiveQuestion}
				/>

				<div className="flex flex-col w-100 h-100 md:sticky md:top-32 self-start">
					<CountDownTimer className="mb-1 h-20" duration={testDuration} />
					<QuestionTab
						partData={testData.part_list}
						activateQuestion={activeQuestion}
						onSelectQuestion={setActiveQuestion}
					>

					</QuestionTab>
				</div>

			</div>

		</>
	)
}