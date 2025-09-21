import { TestPractice } from '@/features/tests/components/test-practice';
import { useGetTestDetail } from '@/features/tests/hooks/userTestApi';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const searchSchema = z.object({
	selectedParts: z.array(z.number()),
	timeLimit: z.number(),
})

export const Route = createFileRoute('/_protected/test/$testId/practice')({
	validateSearch: searchSchema,
	component: TestPracticePage,
})

function TestPracticePage() {

	const { testId } = Route.useParams();
	const { selectedParts, timeLimit } = Route.useSearch();
	const { data, isLoading, error } = useGetTestDetail(Number(testId));

	if (isLoading) return <div className="text-center text-foreground font-sans">Loading...</div>;
	if (error) return <div className="text-center text-destructive font-sans">Error: {error.message}</div>;

	console.log("SEARCHHH", { selectedParts, timeLimit })

	return (
		<>
			<TestPractice
				testData={data!}
				testTitle={data?.test_title || "TMA TOEIC"}
				testDuration={timeLimit} />
		</>
	)
}
