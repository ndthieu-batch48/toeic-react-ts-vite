import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import type { Question } from '../types/test'

export interface QuestionCardProps {
	questionData: Question,
	selectedValue?: string
	onValueChange?: (value: string) => void
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
	questionData,
	selectedValue,
	onValueChange,

}) => {

	const { question_number, question_content, answer_list } = questionData

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader className="pb-4">
				<div className="flex items-center justify-between mb-4">
					<Badge variant="default" className="text-sm font-medium">
						Question {question_number}
					</Badge>
				</div>

				<div className="space-y-4">
					<h3 className="text-lg font-semibold leading-relaxed text-gray-900">
						{question_content}
					</h3>
				</div>
			</CardHeader>

			<CardContent className="pt-0">
				{/* Radio Group for Answer Options */}
				<div className="space-y-4">
					<p className="text-sm font-medium text-gray-700 mb-3">
						Select your answer:
					</p>

					<RadioGroup
						value={selectedValue}
						onValueChange={onValueChange}
						className="space-y-3">
						{answer_list.map((answer, index) => (
							<div
								key={index}
								className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${selectedValue === String(answer.answer_id)
									? "border-blue-200 bg-blue-50"
									: "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
									} cursor-pointer`}
							>
								<RadioGroupItem
									value={String(answer.answer_id)}
									id={`question-${question_number}-option-${answer.answer_id}`}
									className="mt-0.5"
								/>
								<div className="flex-1 min-w-0">
									<Label
										htmlFor={`question-${question_number}-option-${answer.answer_id}`}
										className="text-sm font-medium text-gray-900 cursor-pointer flex items-start gap-2"
									>
										<span className="leading-relaxed">{answer.content}</span>
									</Label>
								</div>
							</div>
						))}

					</RadioGroup>
				</div>
			</CardContent>
		</Card>
	)

}
