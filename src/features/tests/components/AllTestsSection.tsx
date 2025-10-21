import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, FileText } from "lucide-react";
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
				{availableTests.map((test) => {
					const totalQues = test.part_list.reduce((sum, part) => sum + part.total_ques, 0);

					return (
						<Card
							key={test.test_id}
							className="hover:shadow-lg hover:cursor-pointer transition-shadow bg-card border-border md:min-w-[300px]"
						>

							<CardHeader className="space-y-3">
								<div className="flex items-start justify-between">
									<CardTitle className="text-xl font-bold">
										{test.test_title}
									</CardTitle>
									<Badge
										variant="outline"
										className="border-marker text-marker font-bold">
										TOEIC
									</Badge>
								</div>
								<p className="text-sm text-muted-foreground">{test.test_descrip}</p>
							</CardHeader>

							<CardContent className="space-y-4">
								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<Clock className="w-4 h-4" />
										<span>{test.test_dura} minutes</span>
									</div>
									<div className="flex items-center gap-2">
										<FileText className="w-4 h-4" />
										<span>{totalQues} questions</span>
									</div>
								</div>

								<div className="space-y-2">
									<p className="text-xs font-semibold text-muted-foreground uppercase">
										{test.part_list.length} Parts
									</p>
									<div className="flex flex-wrap gap-2">
										{test.part_list.map((part) => (
											<Badge
												key={part.part_id}
												variant="outline"
												className="text-xs"
											>
												{part.part_order}
											</Badge>
										))}
									</div>
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
					)
				}
				)}
			</div>
		</section>
	)
}