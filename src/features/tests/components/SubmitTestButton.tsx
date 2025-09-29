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
						<Button className="font-bold text-xl h-10" variant="default">
							Submit
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle className="text-lg">Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription className="text-base">
								You are going to submit your test. This action cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel className="text-base">Cancel</AlertDialogCancel>
							<AlertDialogAction
								className="text-base"
								onClick={handleSubmitTest}
								disabled={createHistoryMutation.isPending}
							>
								{createHistoryMutation.isPending ? 'Submitting...' : 'Confirm'}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							className="font-bold text-xl h-10"
							variant="outline">
							Save
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle className="text-lg">Do you want to save your progress?</AlertDialogTitle>
							<AlertDialogDescription className="text-base">
								You can continue your test later.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								className="text-base"
								onClick={handleSaveTest}
								disabled={createHistoryMutation.isPending}
							>
								{createHistoryMutation.isPending ? 'Saving...' : 'Confirm'}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

			</CardContent>
		</Card>
	)
}


