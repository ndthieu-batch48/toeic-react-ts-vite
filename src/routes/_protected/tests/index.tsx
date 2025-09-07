import { MainNavigationMenu } from '@/components/main-navigation-menu'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, BookOpen, History } from 'lucide-react'
import LandingCarousel from '@/features/landing/component/carousel'
import { LandingFooter } from '@/features/landing/component/footer'

export const Route = createFileRoute('/_protected/tests/')({
	component: RouteComponent,
})



const availableTests = [
	{ id: 1, title: "Data Structures & Algorithms", category: "Programming", duration: "150 min" },
	{ id: 2, title: "World History Overview", category: "History", duration: "90 min" },
	{ id: 3, title: "Business Management Fundamentals", category: "Business", duration: "120 min" },
	{ id: 4, title: "Psychology Basics", category: "Psychology", duration: "75 min" },
	{ id: 5, title: "Digital Marketing Strategy", category: "Marketing", duration: "100 min" },
	{ id: 6, title: "Environmental Science", category: "Science", duration: "110 min" },
	{ id: 7, title: "Financial Accounting", category: "Finance", duration: "130 min" },
	{ id: 8, title: "Web Development Fundamentals", category: "Technology", duration: "140 min" }
]

const testHistory = [
	{ id: 1, title: "JavaScript Fundamentals", completedDate: "2025-09-05", score: "85%", status: "Passed" },
	{ id: 2, title: "React Basics Assessment", completedDate: "2025-09-03", score: "92%", status: "Passed" },
	{ id: 3, title: "TypeScript Advanced", completedDate: "2025-09-01", score: "78%", status: "Passed" },
	{ id: 4, title: "Node.js Backend Development", completedDate: "2025-08-28", score: "65%", status: "Failed" },
	{ id: 5, title: "Database Design Principles", completedDate: "2025-08-25", score: "88%", status: "Passed" },
	{ id: 6, title: "System Design Interview", completedDate: "2025-08-20", score: "74%", status: "Passed" }
]

function RouteComponent() {
	return (
		<>
			{/* Header */}
			<header className="flex">
				<div style={{ width: '150px', backgroundColor: 'blue' }}>TMA LOGO</div>
				<MainNavigationMenu />
			</header>

			{/* Main Content */}
			<div className="container mx-auto p-6 space-y-8">

				{/* Carousel Section */}
				<LandingCarousel />

				<Separator className="my-8" />

				{/* Test List Section */}
				<section className="space-y-4">
					<div className="flex items-center gap-2">
						<BookOpen className="h-6 w-6 text-primary" />
						<h2 className="text-3xl font-bold">Available Tests</h2>
					</div>
					<p className="text-muted-foreground">Choose from our comprehensive collection of assessments</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{availableTests.map((test) => (
							<Card key={test.id} className="hover:shadow-md transition-shadow">
								<CardHeader>
									<CardTitle className="text-lg">{test.title}</CardTitle>
									<div className="flex justify-between items-center">
										<Badge variant="outline">{test.category}</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Clock className="h-4 w-4" />
										{test.duration}
									</div>
								</CardContent>
								<CardFooter>
									<Button className="w-full" variant="default">
										Take Test
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</section>

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

			<LandingFooter />
		</>
	)
}