import { useGetTestDetail } from '@/features/tests/hooks/userTestApi';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/test/_protected/$testId/{-$partId}')({
	component: RouteComponent,
})

function RouteComponent() {
	const { testId } = Route.useParams();
	console.log("DETAILLLL", testId)
	const { data, isLoading, error } = useGetTestDetail(Number(testId));

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (

		<div>
			<p>Data: {String(data)}</p>
		</div>
	)
}
