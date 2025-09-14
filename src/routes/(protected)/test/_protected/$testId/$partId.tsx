import { useGetTestDetail } from '@/features/tests/hooks/userTestApi';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/test/_protected/$testId/$partId')({
	beforeLoad: () => {
		console.log("TestDetailPage RENDERED", window.location.pathname);

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

		<div style={{ backgroundColor: 'red', width: '50000px' }}>
			<p>Data: {String(data)}</p>
		</div>
	)
}
