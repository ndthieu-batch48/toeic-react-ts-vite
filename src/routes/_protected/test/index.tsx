import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, History } from 'lucide-react'
import { useGetAllTests } from '@/features/tests/hooks/userTestApi'
import { AllTestsSection } from '@/features/tests/components/all-tests-section'

export const Route = createFileRoute('/_protected/test/')({
	component: TestDashBoardComponent,
})


const testHistory = [
	{ id: 1, title: "JavaScript Fundamentals", completedDate: "2025-09-05", score: "85%", status: "Passed" },
	{ id: 2, title: "React Basics Assessment", completedDate: "2025-09-03", score: "92%", status: "Passed" },
	{ id: 3, title: "TypeScript Advanced", completedDate: "2025-09-01", score: "78%", status: "Passed" },
	{ id: 4, title: "Node.js Backend Development", completedDate: "2025-08-28", score: "65%", status: "Failed" },
	{ id: 5, title: "Database Design Principles", completedDate: "2025-08-25", score: "88%", status: "Passed" },
	{ id: 6, title: "System Design Interview", completedDate: "2025-08-20", score: "74%", status: "Passed" }
]

function TestDashBoardComponent() {
	const { status, data, isError, error } = useGetAllTests();

	if (status === 'pending') {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center">Loading tests...</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-red-500">
					Error loading tests: {error?.message}
				</div>
			</div>
		)
	}

	return (
		<div className="container mx-auto p-6 space-y-8">
			<Separator className="my-8" />

			<AllTestsSection availableTests={data || []} />

			<Separator className="my-8" />

			{/* History Section */}
			<section className="space-y-4">
				<div className="flex items-center gap-2">
					<History className="h-6 w-6 text-primary" />
					<h2 className="text-3xl font-bold">Test History</h2>
				</div>
				<p className="text-muted-foreground">Review your previous test attempts and results</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{testHistory.map((test) => (
						<Card key={test.id} className="hover:shadow-md transition-shadow">
							<CardHeader>
								<CardTitle className="text-lg">{test.title}</CardTitle>
								<div className="flex justify-between items-center">
									<Badge variant={test.status === 'Passed' ? 'default' : 'destructive'}>
										{test.status}
									</Badge>
									<span className="text-lg font-semibold text-primary">{test.score}</span>
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Calendar className="h-4 w-4" />
									Completed: {test.completedDate}
								</div>
							</CardContent>
							<CardFooter>
								<Button variant="outline" className="w-full">
									View Details
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</section>
		</div>
	)
}