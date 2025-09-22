import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Clock, BookOpen, Info } from 'lucide-react'
import type { Test, Part } from '../types/test'
import { useNavigate } from '@tanstack/react-router'
import { TimePickerComponent } from './time-picker'
import type { HistoryResponse } from '@/features/history/types/history'

interface TestDetailProps {
	currentTest: Test
	saveHistoryData?: HistoryResponse 
}

const TestSetupComponent: React.FC<TestDetailProps> = ({ currentTest, saveHistoryData }) => {
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
			<div className="max-w-2xl mx-auto p-6 space-y-6 font-sans">
				{/* Header Section */}
				<div className="text-center space-y-4">
					<h1 className="text-3xl font-bold text-foreground font-serif">{currentTest.test_title}</h1>

					<div className="flex items-center justify-center gap-2 text-muted-foreground font-sans">
						<Clock className="h-4 w-4" />
						<span>Time: {currentTest.test_duration} minutes</span>
					</div>

					{/* Display info about selected parts */}
					<div className="w-full h-5 flex items-center justify-center">
						{isPracticeTest && hasSelectedParts ? (
							<div className="flex items-center justify-center gap-4 text-sm text-muted-foreground font-sans">
								<span>Selected: {selectedPartIds.size} part(s)</span>
								<span>•</span>
								<span>Total: {getTotalQuestions()} questions</span>
							</div>
						) : !isPracticeTest ? (
							<div className="flex items-center justify-center gap-4 text-sm text-muted-foreground font-sans">
								<span>Full Test: {currentTest.part_list.length} parts</span>
								<span>•</span>
								<span>Total: {getTotalQuestions()} questions</span>
							</div>
						) : (
							<div></div> // Empty div to maintain height
						)}
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-3 justify-center">
					<Button
						variant={isPracticeTest ? "default" : "outline"}
						className={isPracticeTest ? "px-6 font-sans" : "px-6 font-sans"}
						onClick={() => { handlePracticeToggle(true) }}>
						Practice
					</Button>
					<Button
						variant={!isPracticeTest ? "default" : "outline"}
						className={!isPracticeTest ? "px-6 font-sans" : "px-6 font-sans"}
						onClick={() => { handlePracticeToggle(false) }}>
						Full test
					</Button>
				</div>

				{/* Main Content Section - Always maintain the same height */}
				<section className="grid gap-2 min-h-[400px]">
					{isPracticeTest ? (
						<>
							{/* Test Parts Selection for Practice Mode */}
							<Card className="bg-card border-border">
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-card-foreground font-serif">
										<BookOpen className="h-5 w-5" />
										Select Test Parts
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									{/* Select All / Deselect All */}
									<div className="flex items-center justify-between pb-2 border-b border-border">
										<span className="text-sm font-medium text-card-foreground font-sans">Select Parts:</span>
										<div className="flex gap-2">
											<Button
												variant="outline"
												onClick={() => setSelectedPartIds(new Set(currentTest.part_list.map(p => p.part_id)))}
											>
												Select All
											</Button>
											<Button
												variant="outline"
												onClick={() => setSelectedPartIds(new Set())}
											>
												Deselect All
											</Button>
										</div>
									</div>

									{currentTest.part_list.map((part) => (
										<div key={part.part_id} className="flex items-center space-x-3">
											<Checkbox
												id={String(part.part_id)}
												checked={selectedPartIds.has(part.part_id)}
												onCheckedChange={() => handlePartSelect(part.part_id)}
											/>
											<label
												htmlFor={String(part.part_id)}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer flex-1 text-card-foreground font-sans"
											>
												<span>{part.part_order}</span>
												<span className="text-muted-foreground">-</span>
												<span className="text-muted-foreground text-xs">{part.part_title}</span>
											</label>
										</div>
									))}
								</CardContent>
							</Card>

							<TimePickerComponent
								timeLimit={timeLimit}
								onTimeLimitChange={setTimeLimit}
								testDuration={String(currentTest.test_duration)}
							/>

							{/* Info Message for Practice Mode */}
							{!hasSelectedParts && (
								<div className="text-center">
									<p className="text-sm text-muted-foreground font-sans">
										Please select at least one test part to continue
									</p>
								</div>
							)}
						</>
					) : (
						/* Full Test Mode - Show test overview instead of empty space */
						<Card className="bg-card border-border">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-card-foreground font-serif">
									<Info className="h-5 w-5" />
									Full Test Overview
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="text-sm text-muted-foreground mb-4 font-sans">
									You will take the complete test with all sections included.
								</div>

								{/* Show all parts that will be included */}
								<div className="space-y-3">
									<div className="text-sm font-medium border-b border-border pb-2 text-card-foreground font-sans">
										Test Sections:
									</div>
									{currentTest.part_list.map((part) => (
										<div key={part.part_id} className="flex items-center space-x-3">
											<div className="w-4 h-4 bg-primary rounded-full flex-shrink-0"></div>
											<label className="text-sm font-medium leading-none flex items-center gap-2 flex-1 text-card-foreground font-sans">
												<span>{part.part_order}</span>
												<span className="text-muted-foreground">-</span>
												<span className="text-muted-foreground text-xs">{part.part_title}</span>
											</label>
										</div>
									))}
								</div>

								<Separator className="border-border" />

								<div className="flex items-center justify-between text-sm">
									<span className="font-medium text-card-foreground font-sans">Total Duration:</span>
									<span className="text-muted-foreground font-sans">{currentTest.test_duration} minutes</span>
								</div>

								<div className="bg-accent p-3 rounded-md">
									<p className="text-xs text-accent-foreground font-sans">
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
						className="hover:bg-primary/80 text-primary-foreground px-8 cursor-pointer"
						disabled={!hasSelectedParts}
						onClick={handleStartTest}
					>
						Start {isPracticeTest ? 'Practice' : 'Full Test'}
					</Button>

					{saveHistoryData && (
						<Button
							size="lg"
							variant="secondary"
							className="hover:bg-primary/20 px-8 cursor-pointer"
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

export default TestSetupComponent