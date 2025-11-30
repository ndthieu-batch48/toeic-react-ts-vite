import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shadcn/component/ui/card'
import { Button } from '@/shadcn/component/ui/button'
import { Checkbox } from '@/shadcn/component/ui/checkbox'
import { Separator } from '@/shadcn/component/ui/separator'
import { Clock, Info } from 'lucide-react'
import type { TestSummaryResponse, PartSummaryResponse } from '../type/testServiceType'
import { useNavigate } from '@tanstack/react-router'
import type { HistoryResponse } from '@/feature/history/type/historyServiceType'
import { Label } from '@/shadcn/component/ui/label'
import { getToeicPartDescription, getToeicPartTopic } from '../helper/testHelper'
import { TEST_TYPE } from '../const/testConst'

interface TestSetupProps {
	currentTest: TestSummaryResponse
	saveHistoryData?: HistoryResponse
}

const TestSetupPage: React.FC<TestSetupProps> = ({ currentTest, saveHistoryData }) => {
	const navigate = useNavigate();

	const [isPracticeTest, setIsPracticeTest] = useState<boolean>(true)
	const [selectedPartIds, setSelectedPartIds] = useState<Set<number>>(new Set())

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

	const isPartsSelected = selectedPartIds.size > 0

	const getSelectedParts = (): PartSummaryResponse[] | [] => {
		if (isPracticeTest) {
			return currentTest.part_list.filter(part => selectedPartIds.has(part.part_id))
		}
		return []
	}

	const getTestType = () => {
		return isPracticeTest ? TEST_TYPE.PRACTICE : TEST_TYPE.EXAM
	}

	const getTotalQuestions = (): number => {
		return getSelectedParts().reduce((total, part) => total + part.total_question, 0)
	}

	const handleStartTest = () => {
		const selectedParts = getSelectedParts()
		const testSetup = {
			testId: String(currentTest.test_id),
			testTitle: currentTest.test_title,
			type: getTestType(),
			selectedPartIds: selectedParts.map(p => p.part_id),
			timeLimit: isPracticeTest
				? 0
				: currentTest.test_duration,
		}

		navigate({
			to: '/test/$testId/practice',
			params: { testId: testSetup.testId },
			search: {
				testTitle: testSetup.testTitle,
				type: testSetup.type,
				selectedPartIds: testSetup.selectedPartIds,
				timeLimit: testSetup.timeLimit,
				isContinue: false,
			}
		})
	}

	const handleContinueTest = () => {
		if (!saveHistoryData) return;

		const saveTestSetup = {
			testTitle: currentTest.test_title,
			testId: String(saveHistoryData.test_id),
			selectedPartIds: saveHistoryData.part_id_list,
			timeLimit: saveHistoryData.practice_duration,
		}

		navigate({
			to: '/test/$testId/practice',
			params: { testId: saveTestSetup.testId },
			search: {
				testTitle: saveTestSetup.testTitle,
				type: saveHistoryData.type,
				selectedPartIds: saveTestSetup.selectedPartIds.map(Number),
				timeLimit: saveTestSetup.timeLimit,
				isContinue: true, // This flag indicate the Test is continue
			}
		})
	}

	const handlePracticeToggle = (isPractice: boolean) => {
		setIsPracticeTest(isPractice)
		setSelectedPartIds(new Set())
	}

	// Common CardFooter component
	const TestCardFooter = () => (
		<CardFooter className="flex-col mt-auto">
			<Separator className="mb-3" />
			<div className="flex justify-start gap-3 w-full">
				<Button
					size="default"
					variant="default"
					className="hover:bg-primary/80 text-lg font-semibold"
					disabled={!isPartsSelected && isPracticeTest}
					onClick={handleStartTest}
				>
					Start {getTestType()}
				</Button>

				{saveHistoryData && isPracticeTest && (
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
	)

	return (
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
					className="px-3 text-base font-semibold"
					onClick={() => handlePracticeToggle(true)}
				>
					Practice
				</Button>
				<Button
					variant={!isPracticeTest ? "default" : "outline"}
					className="px-3 text-base font-semibold"
					onClick={() => handlePracticeToggle(false)}
				>
					Exam
				</Button>
			</div>

			{/* Main Content Section */}
			<section className="grid gap-2">
				{isPracticeTest ? (
					<Card className="py-3 gap-1">
						<CardHeader className="px-3">
							<CardTitle className="flex gap-2 text-lg">
								Practice Test Overview
								{isPartsSelected ? (
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
										<span className="text-muted-foreground">{part.total_question} questions</span>
									</Label>

									<p className="text-muted-foreground text-sm pl-6">
										{getToeicPartDescription(part.part_order)}
									</p>
								</div>
							))}
						</CardContent>

						<TestCardFooter />
					</Card>
				) : (
					<Card className="py-3 gap-1">
						<CardHeader className="px-3">
							<CardTitle className="flex gap-2 text-lg">
								Exam Overview
								<Label className="text-base text-muted-foreground">
									<span>•</span>
									<span>Total: {getTotalQuestions()} questions</span>
									<span>•</span>
									<span>You will take the complete test with all sections included</span>
								</Label>
							</CardTitle>
						</CardHeader>

						<CardContent className="px-3">
							{/* Note for Exam Mode */}
							<div className="flex items-center gap-1 max-h-10">
								<Info className="h-4 w-4" />
								<p className="text-sm text-destructive/80">
									<strong>Note:</strong> In exam mode, you'll complete all sections in order with the standard time allocation.
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
										<span className="text-muted-foreground">{part.total_question} questions</span>
									</Label>

									<p className="text-muted-foreground text-sm pl-6">
										{getToeicPartDescription(part.part_order)}
									</p>
								</div>
							))}
						</CardContent>

						<TestCardFooter />
					</Card>
				)}
			</section>
		</div>
	)
}

export default TestSetupPage