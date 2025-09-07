import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, BookOpen } from 'lucide-react'
import { MainNavigationMenu } from '@/components/main-navigation-menu'
import { LandingFooter } from '@/features/landing/component/footer'

interface TestPart {
	id: string
	name: string
	questionCount: number
	selected: boolean
}

interface TestDetailProps {
	testTitle?: string
	duration?: string
	parts?: TestPart[]
}

const TestDetail: React.FC<TestDetailProps> = ({
	testTitle = "Reading - Test 3",
	duration = "75 minutes",
	parts = [
		{ id: "part5", name: "Part 5", questionCount: 40, selected: false },
		{ id: "part6", name: "Part 6", questionCount: 12, selected: false },
		{ id: "part7", name: "Part 7", questionCount: 48, selected: false }
	]
}) => {
	const [selectedParts, setSelectedParts] = useState<TestPart[]>(parts)
	const [timeLimit, setTimeLimit] = useState<string>("")

	const handlePartToggle = (partId: string) => {
		setSelectedParts(prev =>
			prev.map(part =>
				part.id === partId
					? { ...part, selected: !part.selected }
					: part
			)
		)
	}

	const hasSelectedParts = selectedParts.some(part => part.selected)

	return (
		<>
			<MainNavigationMenu />
			<div className="max-w-2xl mx-auto p-6 space-y-6">
				{/* Header Section */}
				<div className="text-center space-y-4">
					<h1 className="text-3xl font-bold text-gray-900">{testTitle}</h1>

					<div className="flex items-center justify-center gap-2 text-muted-foreground">
						<Clock className="h-4 w-4" />
						<span>Time: {duration}</span>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-wrap gap-3 justify-center">
					<Button
						variant="default"
						className="bg-green-600 hover:bg-green-700 text-white px-6"
					>
						Practice
					</Button>
					<Button
						variant="default"
						className="bg-blue-600 hover:bg-blue-700 text-white px-6"
					>
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
						{selectedParts.map((part) => (
							<div key={part.id} className="flex items-center space-x-3">
								<Checkbox
									id={part.id}
									checked={part.selected}
									onCheckedChange={() => handlePartToggle(part.id)}
								/>
								<label
									htmlFor={part.id}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 cursor-pointer"
								>
									{part.name}
									<Badge variant="secondary" className="text-xs">
										{part.questionCount} questions
									</Badge>
								</label>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Time Limit Section */}
				<Card>
					<CardContent className="pt-6">
						<div className="space-y-4">
							<div className="flex flex-col space-y-2">
								<label className="text-sm font-medium">
									Time Limit <span className="text-muted-foreground">(Don't choose unless you want to set):</span>
								</label>
								<div className="flex items-center gap-2">
									<Select value={timeLimit} onValueChange={setTimeLimit}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="-- Pick time --" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="15">15</SelectItem>
											<SelectItem value="30">30</SelectItem>
											<SelectItem value="45">45</SelectItem>
											<SelectItem value="60">60</SelectItem>
											<SelectItem value="75">75</SelectItem>
											<SelectItem value="90">90</SelectItem>
											<SelectItem value="120">120</SelectItem>
											<SelectItem value="150">150</SelectItem>
											<SelectItem value="180">180</SelectItem>
										</SelectContent>
									</Select>
									<span className="text-sm text-muted-foreground">minutes</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Separator />

				{/* Start Practice Button */}
				<div className="flex justify-start">
					<Button
						size="lg"
						className="bg-blue-600 hover:bg-blue-700 text-white px-8"
						disabled={!hasSelectedParts}
					>
						Start Practice
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
			<LandingFooter />
		</>
	)
}

export default TestDetail