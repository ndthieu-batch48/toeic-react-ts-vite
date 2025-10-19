import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Clock, Info } from 'lucide-react'
import type { TestSummaryRes, PartSummaryRes } from '../types/test'
import { useNavigate } from '@tanstack/react-router'
import { TimePicker } from '../components/TimePicker'
import type { HistoryResponse } from '@/features/history/types/history'
import { Label } from '@/components/ui/label'
import { getToeicPartDescription, getToeicPartTopic } from '../helper/testHelper'

interface TestSetupProps {
	currentTest: TestSummaryRes
	saveHistoryData?: HistoryResponse
}

const TestSetupPage: React.FC<TestSetupProps> = ({ currentTest, saveHistoryData }) => {
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
	const getSelectedParts = (): PartSummaryRes[] => {
		if (isPracticeTest) {
			return currentTest.part_list.filter(part => selectedPartIds.has(part.part_id))
		}
		return currentTest.part_list
	}

	// Tính tổng số câu hỏi của các parts đã chọn
	const getTotalQuestions = (): number => {
		return getSelectedParts().reduce((total, part) => total + part.total_ques, 0)
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
			<div className="p-10">

				<div className="flex flex-col justify-start">
					{/* Header Section */}
					<div className="flex items-start text-muted-foreground text-base gap-1 pb-2">
						<h1 className="text-2xl font-bold text-foreground pr-2">{currentTest.test_title}</h1>
						<Clock />
						<span>Standard duration: {currentTest.test_duration} minutes</span>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-3 pb-3">
					<Button
						variant={isPracticeTest ? "default" : "outline"}
						className={`${isPracticeTest ? "px-3 " : "px-3 "} text-base font-semibold`}
						onClick={() => { handlePracticeToggle(true) }}>
						Practice
					</Button>
					<Button
						variant={!isPracticeTest ? "default" : "outline"}
						className={`${!isPracticeTest ? "px-3 " : "px-3 "} text-base font-semibold`}
						onClick={() => { handlePracticeToggle(false) }}>
						Full test
					</Button>
				</div>

				{/* Main Content Section - Always maintain the same height */}
				<section className="grid gap-2 min-h-[400px]">
					{isPracticeTest ? (
						<>
							<Card className="py-3 gap-1">
								<CardHeader className="px-3">
									<CardTitle className="flex gap-2 text-lg">
										Practice Test Overview
										{hasSelectedParts ? (
											<Label className="text-base text-muted-foreground">
												<span>•</span>
												<span>Selected: {selectedPartIds.size} part(s)</span>
												<span>•</span>
												<span>Total: {getTotalQuestions()} questions</span>
											</Label>
										) : (
											<Label className="text-base text-muted-foreground">
												<span>•</span>
												<span>Please select at least one test part to continue</span>
											</Label>
										)}
									</CardTitle>

								</CardHeader>

								<CardContent className="px-3">
									{/* Select All / Deselect All */}
									<div className="flex justify-between items-start max-h-10">
										<div className="flex gap-1">
											<Button
												variant="outline"
												className="text-base font-medium"
												onClick={() => setSelectedPartIds(new Set(currentTest.part_list.map(p => p.part_id)))}
											>
												Select All
											</Button>
											<Button
												variant="outline"
												className="text-base font-medium"
												onClick={() => setSelectedPartIds(new Set())}
											>
												Deselect All
											</Button>
										</div>
										<TimePicker
											timeLimit={timeLimit}
											onTimeLimitChange={setTimeLimit}
											testDuration={String(currentTest.test_duration)}
										/>
									</div>

									<Separator className="my-3" />

									{currentTest.part_list.map((part, index) => (
										<div key={index} className="flex flex-col pb-3">
											<Label
												htmlFor={String(part.part_id)}
												className="cursor-pointer text-base"
											>
												<Checkbox
													id={String(part.part_id)}
													checked={selectedPartIds.has(part.part_id)}
													onCheckedChange={() => handlePartSelect(part.part_id)}
													className="border border-foreground/30"
												/>
												<span>{part.part_order}:</span>
												<span>{getToeicPartTopic(part.part_order)}</span>
												<span className="text-muted-foreground">-</span>
												<span className="text-muted-foreground">{part.total_ques} questions</span>
											</Label>

											<p className="text-muted-foreground text-sm pl-6">
												{getToeicPartDescription(part.part_order)}
											</p>
										</div>
									))}
								</CardContent>

								<CardFooter className="flex-col">
									<Separator className="mb-2" />
									<div className="flex justify-start gap-3 w-full">
										<Button
											size="default"
											variant="default"
											className="hover:bg-primary/80 text-lg font-bold"
											disabled={!hasSelectedParts}
											onClick={handleStartTest}
										>
											Start {isPracticeTest ? 'Practice' : 'Full Test'}
										</Button>

										{saveHistoryData && (
											<Button
												size="lg"
												variant="outline"
												className="hover:bg-primary/10 text-lg font-bold border shadow-md"
												onClick={handleContinueTest}
											>
												Continue Saved Test
											</Button>
										)}
									</div>
								</CardFooter>
							</Card>

						</>
					) : (
						/* Full Test Mode*/
						<Card className="py-3 gap-1">
							<CardHeader className="px-3">
								<CardTitle className="flex gap-2 text-lg">
									Full Test Overview
									{hasSelectedParts ? (
										<Label className="text-base text-muted-foreground">
											<span>•</span>
											<span>Total: {getTotalQuestions()} questions</span>
											<span>•</span>
											<span>You will take the complete test with all sections included</span>
										</Label>
									) : (
										<Label className="text-base text-muted-foreground">
											<span>•</span>
											<span>Please select at least one test part to continue</span>
										</Label>
									)}
								</CardTitle>
							</CardHeader>

							<CardContent className="px-3">
								{/* Note for Full Test Mode */}
								<div className="flex items-center gap-1 max-h-10">
									<Info className="h-4 w-4" />
									<p className="text-sm text-accent-foreground">
										<strong>Note:</strong> In full test mode, you'll complete all sections in order with the standard time allocation.
									</p>
								</div>

								<Separator className="my-3" />

								{currentTest.part_list.map((part, index) => (
									<div key={index} className="flex flex-col pb-3">
										<Label className="text-base">
											<div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
											<span>{part.part_order}:</span>
											<span>{getToeicPartTopic(part.part_order)}</span>
											<span className="text-muted-foreground">-</span>
											<span className="text-muted-foreground">{part.total_ques} questions</span>
										</Label>

										<p className="text-muted-foreground text-sm pl-6">
											{getToeicPartDescription(part.part_order)}
										</p>
									</div>
								))}

							</CardContent>

							<CardFooter className="flex-col">
								<Separator className="mb-2" />
								<div className="flex justify-start gap-3 w-full">
									<Button
										size="default"
										variant="default"
										className="hover:bg-primary/80 text-lg font-semibold"
										disabled={!hasSelectedParts}
										onClick={handleStartTest}
									>
										Start {isPracticeTest ? 'Practice test' : 'Full Test'}
									</Button>

									{saveHistoryData && (
										<Button
											size="lg"
											variant="outline"
											className="hover:bg-primary/10 text-lg font-bold border shadow-md"
											onClick={handleContinueTest}
										>
											Continue Saved Test
										</Button>
									)}
								</div>
							</CardFooter>
						</Card>
					)}
				</section>

			</div >
		</>
	)
}

export default TestSetupPage