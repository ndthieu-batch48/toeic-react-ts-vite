import { TestPractice } from '@/features/tests/components/test-practice';
import { useGetTestDetail } from '@/features/tests/hooks/userTestApi';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/test/$testId/$partId')({
	beforeLoad: ({ context, location, search }) => {
		console.log("TestDetailPage RENDERED", context, location, search);
	},
	component: TestDetailPage,
})

function TestDetailPage() {

	const { testId, partId } = Route.useParams();
	const { data, isLoading, error } = useGetTestDetail(Number(testId));

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	console.log("DETAILLLL", testId, partId)

	return (
		<>
			<TestPractice testData={data!} />
		</>
	)
}
