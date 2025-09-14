import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, BookOpen } from 'lucide-react'
import type { Test, TestPart } from '../types/test'
import { useNavigate } from '@tanstack/react-router'
import { TimePickerComponent } from './time-picker'

interface TestDetailProps {
	currentTest: Test
}

const TestSetupComponent: React.FC<TestDetailProps> = ({ currentTest }) => {
	const navigate = useNavigate({ from: '/test/$testId' });
	const [selectedPartIds, setSelectedPartIds] = useState<Set<number>>(
		new Set()
	)
	const [timeLimit, setTimeLimit] = useState<string>("")

	const handlePartToggle = (partId: number) => {
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

	const hasSelectedParts = selectedPartIds.size > 0

	// Lấy danh sách các parts đã được chọn
	const getSelectedPartIds = (): TestPart[] => {
		return currentTest.part_list.filter(part => selectedPartIds.has(part.part_id))
	}

	// Tính tổng số câu hỏi của các parts đã chọn
	const getTotalQuestions = (): number => {
		return getSelectedPartIds().reduce((total, part) => total + part.total_question, 0)
	}

	const handleStartTest = () => {
		const selectedParts = getSelectedPartIds()
		const testSetup = {
			testId: currentTest.test_id,
			selectedParts: selectedParts.map(p => p.part_id),
			timeLimit: timeLimit ? parseInt(timeLimit) : currentTest.test_duration,
		}

		console.log('Starting test with config:', testSetup)

		navigate({
			to: '/test/$testId/$partId',
			params: { testId: String(currentTest.test_id), partId: '45' }
		})

	}

	return (
		<>
			<div className="max-w-2xl mx-auto p-6 space-y-6">
				{/* Header Section */}
				<div className="text-center space-y-4">
					<h1 className="text-3xl font-bold text-gray-900">{currentTest.test_title}</h1>

					<div className="flex items-center justify-center gap-2 text-muted-foreground">
						<Clock className="h-4 w-4" />
						<span>Time: {currentTest.test_duration} minutes</span>
					</div>

					{/* Hiển thị thông tin về parts đã chọn */}
					{hasSelectedParts && (
						<div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
							<span>Selected: {selectedPartIds.size} part(s)</span>
							<span>•</span>
							<span>Total: {getTotalQuestions()} questions</span>
						</div>
					)}
				</div>

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-3 justify-center">
					<Button
						variant="default"
						className="bg-green-600 hover:bg-green-700 text-white px-6">
						Practice
					</Button>
					<Button
						variant="default"
						className="bg-blue-600 hover:bg-blue-700 text-white px-6">
						Full test
					</Button>
					<Button
						variant="default"
						className="bg-blue-600 hover:bg-blue-700 text-white px-6"
					>
						Answer
					</Button>
				</div>

				{/* Test Parts Selection */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BookOpen className="h-5 w-5" />
							Select Test Parts
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Select All / Deselect All */}
						<div className="flex items-center justify-between pb-2 border-b">
							<span className="text-sm font-medium">Select Parts:</span>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setSelectedPartIds(new Set(currentTest.part_list.map(p => p.part_id)))}>
									Select All
								</Button>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setSelectedPartIds(new Set())}>
									Deselect All
								</Button>
							</div>
						</div>

						{currentTest.part_list.map((part) => (
							<div key={part.part_id} className="flex items-center space-x-3">
								<Checkbox
									id={String(part.part_id)}
									checked={selectedPartIds.has(part.part_id)}
									onCheckedChange={() => handlePartToggle(part.part_id)}
								/>
								<label
									htmlFor={String(part.part_id)}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer flex-1"
								>
									<span>{part.part_order}</span>
									<span className="text-muted-foreground">-</span>
									<span className="text-muted-foreground text-xs">{part.part_title}</span>
									<Badge variant="secondary" className="text-xs ml-auto">
										{part.total_question} questions
									</Badge>
								</label>
							</div>
						))}

					</CardContent>
				</Card>

				<TimePickerComponent timeLimit={timeLimit} onTimeLimitChange={setTimeLimit} testDuration={String(currentTest.test_duration)} />

				<Separator />

				{/* Start Practice Button */}
				<div className="flex justify-start">
					<Button
						size="lg"
						className="bg-blue-600 hover:bg-blue-700 text-white px-8"
						disabled={!hasSelectedParts}
						onClick={handleStartTest}
					>
						Start Test
					</Button>
				</div>

				{/* Info Message */}
				{!hasSelectedParts && (
					<div className="text-center">
						<p className="text-sm text-muted-foreground">
							Please select at least one test part to continue
						</p>
					</div>
				)}
			</div>
		</>
	)
}

export default TestSetupComponent