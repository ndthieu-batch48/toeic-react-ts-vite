import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Clock, BookOpen, Info } from 'lucide-react'
import type { Test, Part } from '../types/test'
import { useNavigate } from '@tanstack/react-router'
import { TimePickerComponent } from '../components/TimePicker'
import type { HistoryResponse } from '@/features/history/types/history'
import { Label } from '@/components/ui/label'

interface TestDetailProps {
	currentTest: Test
	saveHistoryData?: HistoryResponse
}

const TestSetupPage: React.FC<TestDetailProps> = ({ currentTest, saveHistoryData }) => {
	const navigate = useNavigate();

	const [isPracticeTest, setIsPracticeTest] = useState<boolean>(true)
	const [selectedPartIds, setSelectedPartIds] = useState<Set<number>>(new Set())
	const [timeLimit, setTimeLimit] = useState<string>("")

	const handlePartSelect = (partId: number) => {
		setSelectedPartIds(prev => {
			const newSet = new Set(prev)
			if (newSet.has(partId)) {
				newSet.delete(partId)
			} else {
				newSet.add(partId)
			}
			return newSet
		})
	}

	const hasSelectedParts = isPracticeTest ? selectedPartIds.size > 0 : true

	// Lấy danh sách các parts đã được chọn
	const getSelectedParts = (): Part[] => {
		if (isPracticeTest) {
			return currentTest.part_list.filter(part => selectedPartIds.has(part.part_id))
		}
		return currentTest.part_list
	}

	// Tính tổng số câu hỏi của các parts đã chọn
	const getTotalQuestions = (): number => {
		return getSelectedParts().reduce((total, part) => total + part.total_question, 0)
	}

	const handleStartTest = () => {
		const selectedParts = getSelectedParts()
		const testSetup = {
			testId: String(currentTest.test_id),
			type: isPracticeTest ? "Practice" : "FullTest",
			selectedPartIds: selectedParts.map(p => p.part_id),
			timeLimit: isPracticeTest
				? (timeLimit ? parseInt(timeLimit) : 0)
				: currentTest.test_duration,
		}

		navigate({
			to: '/test/$testId/practice',
			params: { testId: testSetup.testId },
			search: {
				type: isPracticeTest ? "Practice" : "FullTest",
				selectedPartIds: testSetup.selectedPartIds,
				timeLimit: testSetup.timeLimit,
			}
		})
	}

	const handleContinueTest = () => {
		if (!saveHistoryData) return;

		const saveTestSetup = {
			testId: String(saveHistoryData.test_id),
			selectedPartIds: saveHistoryData.part,
			selectedAnswers: saveHistoryData.dataprogress,
			timeLimit: isPracticeTest
				? (timeLimit ? parseInt(timeLimit) : 0)
				: currentTest.test_duration,
		}

		navigate({
			to: '/test/$testId/practice',
			params: { testId: saveTestSetup.testId },
			search: {
				type: saveHistoryData.type,
				selectedPartIds: saveTestSetup.selectedPartIds.map(Number),
				selectedAnswers: saveTestSetup.selectedAnswers,
				timeLimit: saveTestSetup.timeLimit,
			}
		})
	}


	const handlePracticeToggle = (practice: boolean) => {
		setIsPracticeTest(practice)
		if (!practice) {
			// For full test, select all parts automatically
			setSelectedPartIds(new Set(currentTest.part_list.map(p => p.part_id)))
		} else {
			// For practice test, start with no selections
			setSelectedPartIds(new Set())
		}
	}

	return (
		<>
			<div className="max-w-3xl mx-auto p-6 space-y-6">
				{/* Header Section */}
				<div className="flex flex-col items-start space-y-4">
					<h1 className="text-3xl font-bold text-foreground self-center">{currentTest.test_title}</h1>

					<div className="flex items-center justify-center gap-2 text-muted-foreground text-xl">
						<Clock className="h-4 w-4" />
						<span>Time: {currentTest.test_duration} minutes</span>
					</div>

					{/* Display info about selected parts */}
					<div className="h-5 flex items-center justify-center">
						{isPracticeTest && hasSelectedParts ? (
							<Label className="text-lg text-muted-foreground">
								<span>Selected: {selectedPartIds.size} part(s)</span>
								<span>•</span>
								<span>Total: {getTotalQuestions()} questions</span>
							</Label>
						) : !isPracticeTest ? (
							<Label className="text-lg text-muted-foreground">
								<span>Full Test: {currentTest.part_list.length} parts</span>
								<span>•</span>
								<span>Total: {getTotalQuestions()} questions</span>
							</Label>
						) : (
							<div></div> // Empty div to maintain height
						)}
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-3">
					<Button
						variant={isPracticeTest ? "default" : "outline"}
						className={`${isPracticeTest ? "px-6 " : "px-6 "} text-lg font-bold`}
						onClick={() => { handlePracticeToggle(true) }}>
						Practice
					</Button>
					<Button
						variant={!isPracticeTest ? "default" : "outline"}
						className={`${!isPracticeTest ? "px-6 " : "px-6 "} text-lg font-bold`}
						onClick={() => { handlePracticeToggle(false) }}>
						Full test
					</Button>
				</div>

				{/* Main Content Section - Always maintain the same height */}
				<section className="grid gap-2 min-h-[400px]">
					{isPracticeTest ? (
						<>
							{/* Test Parts Selection for Practice Mode */}
							<Card className="shadow-md">
								{/* <CardHeader>
									<CardTitle className="flex items-center gap-2 text-xl">
										<BookOpen className="h-5 w-5" />
										Select Test Parts
									</CardTitle>
								</CardHeader> */}
								<CardContent className="space-y-4">
									{/* Select All / Deselect All */}
									<div className="flex gap-2 pb-2">
										<Button
											variant="outline"
											className="text-lg font-medium"
											onClick={() => setSelectedPartIds(new Set(currentTest.part_list.map(p => p.part_id)))}
										>
											Select All
										</Button>
										<Button
											variant="outline"
											className="text-lg font-medium"
											onClick={() => setSelectedPartIds(new Set())}
										>
											Deselect All
										</Button>
									</div>

									<Separator />

									{currentTest.part_list.map((part, index) => (
										<Label
											key={index}
											htmlFor={String(part.part_id)}
											className="cursor-pointer text-xl"
										>
											<Checkbox
												id={String(part.part_id)}
												checked={selectedPartIds.has(part.part_id)}
												onCheckedChange={() => handlePartSelect(part.part_id)}
											/>
											<span>{part.part_order}</span>
											<span className="text-muted-foreground">-</span>
											<span className="text-muted-foreground">{part.total_question} questions</span>
										</Label>
									))}
								</CardContent>
							</Card>

							<TimePickerComponent
								timeLimit={timeLimit}
								onTimeLimitChange={setTimeLimit}
								testDuration={String(currentTest.test_duration)}
							/>

							{/* Info Message for Practice Mode */}
							{!hasSelectedParts && !saveHistoryData && (
								<div className="text-center">
									<p className="text-lg text-muted-foreground ">
										Please select at least one test part to continue
									</p>
								</div>
							)}
						</>
					) : (
						/* Full Test Mode - Show test overview instead of empty space */
						<Card className="shadow-md">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-xl">
									<BookOpen className="h-5 w-5" />
									Full Test Overview
								</CardTitle>
							</CardHeader>

							<CardContent className="space-y-4">
								<div className="text-lg text-muted-foreground mb-4">
									You will take the complete test with all sections included.
								</div>

								<Separator />

								{/* Show all parts that will be included */}
								<div className="space-y-3">
									{currentTest.part_list.map((part) => (
										<Label className="text-xl">
											<span>{part.part_order}</span>
											<span className="text-muted-foreground">-</span>
											<span className="text-muted-foreground">{part.total_question} question</span>
										</Label>
									))}
								</div>

								<Separator />

								<div className="flex items-center justify-between text-lg">
									<span className="font-medium">Total Duration:</span>
									<span className="text-muted-foreground">{currentTest.test_duration} minutes</span>
								</div>

								<div className="flex gap-2 p-3">
									<Info />
									<p className="gap-2 text-base text-accent-foreground">
										<strong>Note:</strong> In full test mode, you'll complete all sections in order with the standard time allocation.
									</p>
								</div>
							</CardContent>
						</Card>
					)}
				</section>

				{/* Start Practice Button */}
				<div className="flex justify-start gap-3">
					<Button
						size="lg"
						variant="default"
						className="hover:bg-primary/80 px-8 text-lg font-bold"
						disabled={!hasSelectedParts}
						onClick={handleStartTest}
					>
						Start {isPracticeTest ? 'Practice' : 'Full Test'}
					</Button>

					{saveHistoryData && (
						<Button
							size="lg"
							variant="outline"
							className="hover:bg-primary/10 px-8 text-lg font-bold border shadow-md"
							onClick={handleContinueTest}
						>
							Continue Saved Test
						</Button>
					)}
				</div>

			</div>
		</>
	)
}

export default TestSetupPage