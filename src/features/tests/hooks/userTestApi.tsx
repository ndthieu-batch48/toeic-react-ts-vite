import { useQuery, useMutation } from "@tanstack/react-query"
import { getAllTests, getTestDetail, geminiTranslateQuestion } from "../services/testService"

export const useGetAllTests = () => {
	return useQuery({
		queryKey: ['tests'],
		queryFn: getAllTests,

	});
};

export const getAllTestsQuery = {
	queryKey: ['tests'],
	queryFn: getAllTests,
};

export const useGetTestDetail = (id: number, partIds?: number[]) => {
	return useQuery({
		queryKey: ['test', id, partIds],
		queryFn: () => getTestDetail(id, partIds),
		enabled: !!id,
	});
}

export const useGeminiTranslateQuestion = () => {
	return useMutation({
		mutationFn: geminiTranslateQuestion,
	});
}