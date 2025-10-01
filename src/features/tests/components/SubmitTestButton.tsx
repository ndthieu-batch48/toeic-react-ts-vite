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
	const { testId, testType, selectedAnswers, selectedParts, remainingDuration } = useTestContext()
	const { createHistoryMutation } = useCreateHistory()

	const handleSubmitTest = () => {
		const submitPayload: HistoryCreateRequest = {
			test_id: testId,
			type: testType,
			dataprogress: selectedAnswers,
			part: selectedParts,
			time: remainingDuration / 60,
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
			time: remainingDuration / 60,
			status: 'save'
		}
		createHistoryMutation.mutateAsync(savePayload)
	}

	useEffect(() => {
		if (createHistoryMutation.isSuccess) {
			navigate({ to: "/test", replace: true })
		}
	}, [createHistoryMutation.isSuccess, navigate])

	return (
		<Card className="p-1">
			<CardContent className="flex gap-1 p-1">
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className="font-bold text-lg h-10 flex-1" variant="default">
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
							className="font-bold text-xl h-10 flex-1"
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


