import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import type { TestSummaryRes } from "../types/test";

type AllTestsSection = React.ComponentProps<"section"> & {
	availableTests: TestSummaryRes[]
}

export function AllTestsSection({ availableTests }: AllTestsSection) {

	return (
		<section className="space-y-4">
			<div className="flex items-center gap-4">
				<BookOpen className="text-primary" />
				<h2 className="text-3xl font-bold text-foreground">Available Tests</h2>
			</div>
			<p className="text-xl text-muted-foreground">Choose from our comprehensive collection of assessments</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{availableTests.map((test) => (
					<Card key={test.test_id} className="hover:shadow-lg hover:cursor-pointer transition-shadow bg-card border-border md:min-w-[350px]">

						<CardHeader>
							<CardTitle className="text-xl">{test.test_title}</CardTitle>
							<Badge variant="outline" className="text-xl">TOEIC</Badge>
						</CardHeader>

						<CardContent>
							<div className="flex items-center gap-2 text-lg text-muted-foreground">
								<Clock />
								{test.test_dura} minutes
							</div>
						</CardContent>

						<CardFooter className="mt-auto">
							<Button
								className="w-full hover:bg-primary/90 font-semibold text-xl rounded-2xl"
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