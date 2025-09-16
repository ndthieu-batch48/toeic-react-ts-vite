import { Button } from "@/components/ui/button"
import type { Test } from "../types/test"
import { PartTab } from "./part-tabs"
import { QuestionTab } from "./question-tab"
import { CountDownTimer } from "./timer"
import { useMemo, useState } from "react"
import { mediaQuestionSorter } from "../helper/testHelper"
import { QuestionProvider } from "../context/question-context"


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

	const sortedParts = useMemo(() => {
		return testData.part_list.map((part) => ({
			...part,
			media_list: part.media_list ? mediaQuestionSorter(part.media_list) : []
		}))
	}, [testData])

	const initialActive = (() => {
		const p = sortedParts[0]
		const qId = p?.media_list?.[0]?.question_list?.[0]?.question_id ?? 0
		return { part_id: p?.part_id ?? 0, question_id: qId }
	})()

	const [activeQuestion, setActiveQuestion] = useState<ActiveQuestion>(initialActive)


	const providerValue = useMemo(
		() => ({ activeQuestion, setActiveQuestion }),
		[activeQuestion]
	)

	return (
		<QuestionProvider value={providerValue}>
			<div className="flex justify-center items-center w-full h-32 gap-2">
				<span className="text-xl font-bold">{testTitle || "THIS IS A TEST"}</span>
				<Button className="border-destructive text-destructive hover:bg-destructive hover:text-white" variant="outline">
					<span>Exit</span>
				</Button>
			</div>

			<div className="flex flex-col md:flex-row gap-4">
				<PartTab
					className="md:max-w-4xl flex-1"
					partData={sortedParts}
				/>

				<div className="flex flex-col w-100 h-100 md:sticky md:top-32 self-start">
					<CountDownTimer className="mb-1 h-20" duration={testDuration} />
					<QuestionTab
						partData={sortedParts}
					>

					</QuestionTab>
				</div>

			</div>

		</QuestionProvider>
	)
}