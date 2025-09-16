import { TestPractice } from '@/features/tests/components/test-practice';
import { useGetTestDetail } from '@/features/tests/hooks/userTestApi';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/test/$testId/$partId')({
	component: TestDetailPage,
})

function TestDetailPage() {

	const { testId } = Route.useParams();
	const { data, isLoading, error } = useGetTestDetail(Number(testId));

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<>
			<TestPractice testData={data!} testTitle={'TMA TOEIC'} testDuration={0} />
		</>
	)
}
