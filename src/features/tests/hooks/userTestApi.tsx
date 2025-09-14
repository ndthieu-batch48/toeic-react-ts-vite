import { useQuery } from "@tanstack/react-query"
import { getAllTests, getTestDetail } from "../services/testService"

export const useGetAllTests = () => {
	return useQuery({
		queryKey: ['tests'],
		queryFn: getAllTests,
		staleTime: 5 * 60 * 1000,
	});
};

export const useGetTestDetail = (id: number) => {
	return useQuery({
		queryKey: ['test', id],
		queryFn: () => getTestDetail(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}