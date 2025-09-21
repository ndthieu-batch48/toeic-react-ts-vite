import { Button } from "@/components/ui/button"
import type { Test } from "../types/test"
import { PartTab } from "./part-tabs"
import { QuestionTab } from "./question-tab"
import { CountDownTimer } from "./countdown-timer"
import { useMemo } from "react"
import { mediaQuestionSorter } from "../helper/testHelper"
import { Link } from "@tanstack/react-router"
import { TestProvider, type TestState } from "../context/TestContext"
import { Card, CardContent } from "@/components/ui/card"


type TestPracticeProps = {
	testTitle: string
	testDuration: number
	testData: Test,
}

export const TestPractice: React.FC<TestPracticeProps> = ({ testTitle, testDuration, testData }) => {

	const sortedParts = useMemo(() => {
		return testData.part_list.map((part) => ({
			...part,
			media_list: part.media_list ? mediaQuestionSorter(part.media_list) : []
		}))
	}, [testData])

	const initialActive = (() => {
		const part = sortedParts[0]
		const questionId = part?.media_list?.[0]?.question_list?.[0]?.question_id ?? 0
		return { part_id: part?.part_id ?? 0, question_id: questionId }
	})()

	const initialState: TestState = {
		activePart: initialActive.part_id,
		activeQuestion: initialActive,
		selectedAnswers: {},
		isSubmitted: false,
		timeRemaining: testDuration * 60,
		timeLimit: testDuration
	}

	return (
		<TestProvider initialState={initialState}>
			<div className="flex justify-center items-center w-full h-32 gap-2 font-sans">
				<span className="text-xl font-bold text-foreground font-serif">{testTitle || "THIS IS A TEST"}</span>
				<Button
					className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground font-sans"
					variant="outline"
					asChild>
					<Link to="..">Exit</Link>
				</Button>
			</div>

			<div className="flex flex-col md:flex-row gap-4 px-2">
				<PartTab
					className="flex-1"
					partData={sortedParts}
				/>

				<div className="flex flex-col gap-3 md:sticky md:top-32 self-start md:w-80 h-150">
					<Card>
						<CardContent className="flex flex-col gap-2">
							<Button variant="default">Submit</Button>
							<Button variant="secondary">Save</Button>
						</CardContent>
					</Card>
					<CountDownTimer className="mb-1 h-20" duration={testDuration} />
					<QuestionTab
						partData={sortedParts}
					>

					</QuestionTab>
				</div>

			</div>
		</TestProvider>
	)
}