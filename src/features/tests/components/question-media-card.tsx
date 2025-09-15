import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MainParagraph } from './main-paragraph'
import type { Question } from '../types/test'

type QuestionMediaCardProps = {
	mediaName: string,
	paragraphMain: string,
	questionData: Question[],
	selectedAnswers?: Record<string, string> // questionId -> answerId
	onAnswerChange?: (questionId: string, answerId: string) => void
}

export const QuestionMediaCard: React.FC<QuestionMediaCardProps> = ({
	mediaName,
	paragraphMain,
	questionData,
	selectedAnswers = {},
	onAnswerChange
}) => {

	const handleValueChange = (questionId: string) => (value: string) => {
		onAnswerChange?.(questionId, value)
	}

	return (
		<Card className="w-full max-w-6xl mx-auto">
			<CardHeader className="pb-4">
				<div className="flex flex-col mb-2 space-y-2">
					<Badge variant="default" className="text-sm font-medium w-fit">
						{mediaName}
					</Badge>
					<h2 className="text-lg font-semibold text-gray-900">
						Reading Comprehension
					</h2>
				</div>
			</CardHeader>

			<CardContent className="flex gap-6">
				{/* Left side - Main Paragraph */}
				<div className="w-[400px] flex-shrink-0">
					<MainParagraph paragraphMain={paragraphMain} />
				</div>

				{/* Vertical Separator */}
				<Separator orientation="vertical" className="h-auto" />

				{/* Right side - Questions */}
				<div className="flex-1 space-y-6">
					{questionData.map((question, index) => (
						<div key={question.question_id || index}>
							{/* Question Block */}
							<div className="space-y-4">
								{/* Question Header */}
								<div className="flex items-center gap-3">
									<Badge variant="outline" className="text-xs">
										Question {question.question_number}
									</Badge>
									<h3 className="text-base font-medium text-gray-900">
										{question.question_content}
									</h3>
								</div>

								{/* Answer Options */}
								<RadioGroup
									value={selectedAnswers[String(question.question_id)] || ''}
									onValueChange={handleValueChange(String(question.question_id))}
									className="space-y-2 ml-4"
								>
									{question.answer_list.map((answer, answerIndex) => (
										<div
											key={answer.answer_id || answerIndex}
											className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${selectedAnswers[String(question.question_id)] === String(answer.answer_id)
												? "border-blue-200 bg-blue-50"
												: "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
												} cursor-pointer`}
										>
											<RadioGroupItem
												value={String(answer.answer_id)}
												id={`question-${question.question_id}-answer-${answer.answer_id}`}
												className="mt-0.5"
											/>
											<div className="flex-1 min-w-0">
												<Label
													htmlFor={`question-${question.question_id}-answer-${answer.answer_id}`}
													className="text-sm font-medium text-gray-900 cursor-pointer flex items-start gap-2"
												>
													{/* Answer Content */}
													<span className="leading-relaxed">
														{answer.content}
													</span>
												</Label>
											</div>
										</div>
									))}
								</RadioGroup>
							</div>

							{/* Separator between questions (except for the last one) */}
							{index < questionData.length - 1 && (
								<Separator className="my-6" />
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}