import { Button } from "@/component/ui/button"
import { useTestContext } from "../context/TestContext"
import type { HistoryCreateReq } from "@/feature/history/type/historyType"
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
} from "@/component/ui/alert-dialog"
import { useNavigate } from "@tanstack/react-router"
import { useCreateHistory } from "@/feature/history/hook/useCreateHistory"

export const SubmitTestButton = () => {
	const navigate = useNavigate()
	const { testId, testType, selectedAnswers, selectedParts, remainingDuration } = useTestContext()
	const createHistoryMutation = useCreateHistory(testId)

	const isPracticeMode = testType.toLowerCase().trim() === "practice"

	const handleSubmitTest = async () => {
		const submitPayload: HistoryCreateReq = {
			test_id: testId,
			type: testType,
			dataprog: selectedAnswers,
			part_id_list: selectedParts,
			dura: remainingDuration / 60,
			status: 'submit'
		}
		try {
			const result = await createHistoryMutation.mutateAsync(submitPayload)
			if (result.status === 'submit') {
				navigate({
					to: "/history/$historyId",
					params: { historyId: String(result.history_id) },
					replace: true
				})
			}
		} catch (error) {
			console.error('Failed to submit test:', error)
		}
	}

	const handleSaveTest = async () => {
		const savePayload: HistoryCreateReq = {
			test_id: testId,
			type: testType,
			dataprog: selectedAnswers,
			part_id_list: selectedParts,
			dura: remainingDuration / 60,
			status: 'save'
		}
		try {
			await createHistoryMutation.mutateAsync(savePayload)
			navigate({ to: "/test", replace: true })
		} catch (error) {
			console.error('Failed to save test:', error)
		}
	}

	return (
		<div className="flex gap-1 w-full">
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						className={`font-bold h-8 text-sm ${isPracticeMode ? 'w-15 flex-1' : 'w-30'}`}
						variant="destructive"
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

			{isPracticeMode && (
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							className="font-bold h-8 text-sm w-15 flex-1 bg-marker hover:bg-marker text-primary-foreground"
							variant="default"
						>
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
			)}
		</div>
	)
}