import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTestContext } from "../context/TestContext"
import type { HistoryCreateRequest } from "@/features/history/types/history"
import { useCreateHistory } from "@/features/history/hooks/useHistoryApi"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"

export const CreateSubmit: React.FC = () => {
	const navigate = useNavigate()
 	const {  testId, testType, selectedAnswers, selectedParts } = useTestContext()
	const { createHistoryMutation } = useCreateHistory()

	// Calculate elapsed time in minutes
	const elapsedTime = 0

	const handleSubmitTest = () => {
		const submitPayload: HistoryCreateRequest = {
			test_id: testId, 
			type: testType,
			dataprogress: selectedAnswers,
			part: selectedParts,
			time: elapsedTime,
			status: 'submit'
		}
		createHistoryMutation.mutateAsync(submitPayload)
	}

	const handleSaveTest = () => {
		const savePayload: HistoryCreateRequest = {
			test_id: testId, 
			type: testType,
			dataprogress: selectedAnswers,
			part: selectedParts,
			time: elapsedTime,
			status: 'save'
		}
		createHistoryMutation.mutateAsync(savePayload)
	}
	
	useEffect(() => {
		if (createHistoryMutation.isSuccess) { 
			navigate({ to: "/test", replace: true })
		}
	},[createHistoryMutation.isSuccess, navigate])

	return (
		<Card>
			<CardContent className="flex flex-col gap-2">
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="default">
							Submit
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								You are going to submit your test. This action cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleSubmitTest}>Submit Test</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				
				<Button
					variant="secondary"
					onClick={handleSaveTest}
					disabled={createHistoryMutation.isPending}>
					{createHistoryMutation.isPending ? 'Saving...' : 'Save'}
				</Button>

			</CardContent>
		</Card>
	)
}


