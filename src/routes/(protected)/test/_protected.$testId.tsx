import TestSetupComponent from '@/features/tests/components/test-setup'
import { useGetAllTests } from '@/features/tests/hooks/userTestApi';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/test/_protected/$testId')({
	component: TestSetupPage,
})

function TestSetupPage() {
	const { testId } = Route.useParams();

	const { status, data, isError, error } = useGetAllTests();

	const currentTest = data?.find(test => test.test_id === Number(testId));

	if (status === 'pending') {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center">Loading tests...</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-red-500">
					Error loading tests: {error?.message}
				</div>
			</div>
		);
	}

	return (
		<>
			<TestSetupComponent currentTest={currentTest!} />
		</>
	)
}
