import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import type { Test } from "../types/test";

type AllTestsSection = React.ComponentProps<"section"> & {
	availableTests: Test[]
}

export function AllTestsSection({ availableTests }: AllTestsSection) {

	return (
		<section className="space-y-4">
			<div className="flex items-center gap-2">
				<BookOpen className="h-6 w-6 text-primary" />
				<h2 className="text-3xl font-bold">Available Tests</h2>
			</div>
			<p className="text-muted-foreground">Choose from our comprehensive collection of assessments</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{availableTests.map((test) => (
					<Card key={test.test_id} className="hover:shadow-md transition-shadow">

						<CardHeader>
							<CardTitle className="text-lg">{test.test_title}</CardTitle>
							<div className="flex justify-between items-center">
								<Badge variant="outline">TOEIC</Badge>
							</div>
						</CardHeader>

						<CardContent>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Clock className="h-4 w-4" />
								{test.test_duration}
							</div>
						</CardContent>

						<CardFooter>
							<Button
								className="w-full"
								variant="default"
								size="lg"
								asChild>
								<Link
									to="/test/$testId"
									params={{ testId: String(test.test_id) }}
								>
									Start Test
								</Link>
							</Button>
						</CardFooter>

					</Card>
				))}
			</div>
		</section>
	)
}