import { Link } from "@tanstack/react-router"
import { Button } from "@/component/ui/button";
import { Badge } from '@/component/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/component/ui/card";
import { BookOpen, Clock, FileText, PlayCircle } from "lucide-react";
import type { TestSummaryRes } from "../type/testServiceType";

type AllTestsSection = React.ComponentProps<"section"> & {
	availableTests: TestSummaryRes[]
	testProgressMap: Record<number, boolean>
}

export function AllTestsSection({ availableTests, testProgressMap }: AllTestsSection) {

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
					const hasSavedProgress = testProgressMap[test.test_id] || false;

					return (
						<Card
							key={test.test_id}
							className={`hover:shadow-lg hover:cursor-pointer transition-shadow bg-card border-border md:min-w-[300px] ${hasSavedProgress ? 'border-primary/50' : ''}`}
						>

							<CardHeader className="space-y-3">
								<div className="flex items-start justify-between">
									<CardTitle className="text-xl font-bold">
										{test.test_title}
									</CardTitle>
									<div className="flex gap-2">
										<Badge
											variant="outline"
											className="border-marker text-marker font-bold">
											TOEIC
										</Badge>
										{hasSavedProgress && (
											<Badge
												variant="default"
												className="bg-primary text-primary-foreground font-semibold">
												<PlayCircle className="w-3 h-3 mr-1" />
												In Progress
											</Badge>
										)}
									</div>
								</div>
								<p className="text-sm text-muted-foreground">{test.test_descrip}</p>
							</CardHeader>

							<CardContent className="space-y-4">
								{hasSavedProgress && (
									<div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
										<p className="text-sm font-medium text-primary flex items-center gap-2">
											<PlayCircle className="w-4 h-4" />
											You have saved progress on this test
										</p>
									</div>
								)}

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
										{hasSavedProgress ? 'Continue Test' : 'Start Test'}
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