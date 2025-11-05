import { useMutation, useQueryClient } from "@tanstack/react-query";
import { historyMutation } from "../service/historyService";

export const useCreateHistory = (testId: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		...historyMutation.create(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['historyList'] });
			queryClient.invalidateQueries({ queryKey: ['historyProgress', testId] });
		},
	});
}