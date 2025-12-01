import { Button } from "@/shadcn/component/ui/button"
import { useTestContext } from "../context/TestContext"
import type { HistoryCreateRequest } from "@/feature/history/type/historyServiceType"
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
} from "@/shadcn/component/ui/alert-dialog"
import { useNavigate } from "@tanstack/react-router"
import { useCreateHistory } from "@/feature/history/hook/useCreateHistory"
import { clearAllAudioPlaybackPosition, clearPracticeDuration } from "../helper/testHelper"
import { useQueryClient } from "@tanstack/react-query"

export const SubmitTestButton = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { testId, testType, selectedAnswers, selectedParts, practiceDuration, examDuration, setIsSubmitting, setIsSaving, setIsClosing } = useTestContext()

	// Submit and Save features using the same useCreateHistory hook 
	// but different payloads, and different actions
	// Hence, we create two separate mutation instancses to avoid conflicts
	const submitMutation = useCreateHistory(testId)
	const saveMutation = useCreateHistory(testId)

	const isPracticeMode = testType.toLowerCase().trim() === "practice"
	const isExamMode = testType.toLowerCase().trim() === "exam"

	const handleClose = () => {
		setIsClosing(true)
		setTimeout(() => {
			navigate({
				to: "/test/$testId",
				params: { testId: String(testId) },
				replace: true
			})
		}, 0)
	}

	const handleSubmitTest = async () => {
		const submitPayload: HistoryCreateRequest = {
			test_id: testId,
			type: testType,
			data_progress: selectedAnswers,
			part_id_list: selectedParts,
			practice_duration: isPracticeMode ? practiceDuration : undefined,
			exam_duration: isExamMode ? examDuration : undefined,
			status: 'submit'
		}
		try {
			const result = await submitMutation.mutateAsync(submitPayload)
			if (result.status === 'submit') {
				clearAllAudioPlaybackPosition(testId)
				clearPracticeDuration(testId)
				navigate({
					to: "/history/$historyId",
					params: { historyId: String(result.history_id) },
					replace: true
				})
			}
			setIsSubmitting(false)
		} catch (error) {
			setIsSubmitting(false)
			console.error('Failed to submit test:', error)
		}
	}

	const handleSaveTest = async () => {
		setIsSaving(true)
		const savePayload: HistoryCreateRequest = {
			test_id: testId,
			type: testType,
			data_progress: selectedAnswers,
			part_id_list: selectedParts,
			practice_duration: isPracticeMode ? practiceDuration : undefined,
			exam_duration: isExamMode ? examDuration : undefined,
			status: 'save'
		}
		try {
			await saveMutation.mutateAsync(savePayload)

			// Invalidate history queries to refetch the saved progress
			await queryClient.invalidateQueries({ queryKey: ['historyProgress', testId] })
			await queryClient.invalidateQueries({ queryKey: ['historyList'] })

			// Set to false after save completes
			setIsSaving(false)
		} catch (error) {
			setIsSaving(false)
			console.error('Failed to save test:', error)
		}
	}

	return (
		<div className="flex gap-1 w-full">
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						className="font-bold h-8 text-sm p-1"
						variant="destructive"
						onClick={() => { setIsSubmitting(true) }}
					>
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
						<AlertDialogCancel
							className="text-base"
							onClick={() => setIsSubmitting(false)}
						>Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className="text-base"
							onClick={handleSubmitTest}
							disabled={submitMutation.isPending}
						>
							{submitMutation.isPending ? 'Submitting...' : 'Confirm'}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{isPracticeMode && (
				<Button
					className="font-bold h-8 p-1 text-sm bg-marker hover:bg-marker text-primary-foreground"
					variant="default"
					onClick={handleSaveTest}
					disabled={saveMutation.isPending}
				>
					{saveMutation.isPending ? 'Saving...' : 'Save'}
				</Button>
			)}			{isPracticeMode &&
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							className="font-bold h-8 text-sm p-1"
							variant="outline"
						>
							Close
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle className="text-lg">Are you sure you want to quit the test?</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel className="text-base">
								Keep going
							</AlertDialogCancel>
							<AlertDialogAction
								className="text-base"
								onClick={handleClose}
							>
								Confirm
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			}
		</div>
	)
}