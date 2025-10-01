import { Calendar, Clock, History } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { HistoryResultListResponse } from '../../history/types/history'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/utils/common'
import { Label } from '@/components/ui/label'


type AllHistorySectionProps = {
	historyResultList: HistoryResultListResponse[]
}

export const AllHistorySection: React.FC<AllHistorySectionProps> = ({ historyResultList }) => {

	return (
		<section className="space-y-4">
			<div className="flex items-center gap-2">
				<History className="text-primary" />
				<h2 className="text-3xl font-bold text-foreground">Test History</h2>
			</div>

			<p className="text-xl text-muted-foreground">Review your previous test attempts and results</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{historyResultList.map((history) => {

					const [currentScore, totalScore] = history.score.split('/');
					const isFailed = Number(currentScore) <= Number(totalScore) / 2;

					return (
						<Card key={history.history_id} className="hover:shadow-lg hover:cursor-pointer transition-shadow md:min-w-[350px]">
							<CardHeader>
								<div className="flex">
									<CardTitle className="text-2xl mr-auto">{history.test_name}</CardTitle>
									<CardDescription>
										<Badge variant="outline" className="text-base">{history.test_type}</Badge>
									</CardDescription>
								</div>
								<div className="flex justify-between items-center">
									<Badge className={`text-lg font-semibold ${isFailed ? 'bg-destructive/80' : 'bg-positive/80'}`}>
										{isFailed ? "Failed" : "Passed"}
									</Badge>
									<Label className={`text-lg font-semibold ${isFailed ? 'text-destructive/80' : 'text-positive/80'}`}>
										Overall score: {history.score}
									</Label>
								</div>
							</CardHeader>

							<CardContent className="flex flex-col gap-2">
								<div className="flex gap-2 flex-wrap">
									{history.part_order_list.map((part, key) => (
										<Badge key={key} variant="outline" className="text-base">
											{part}
										</Badge>
									))}
								</div>

								{history.duration !== 0 &&
									<div className="flex items-center gap-2 text-base text-muted-foreground">
										<Clock />
										Duration: {history.duration} minutes
									</div>}

								<div className="flex items-center gap-2 text-base text-muted-foreground">
									<Calendar />
									Completed at: {formatDateTime(history.create_at)}
								</div>

							</CardContent>

							<CardFooter className="mt-auto">
								<Button
									variant="outline"
									className="w-full h-12 hover:bg-primary/5 font-semibold text-xl rounded-2xl"
									asChild>
									<Link to="/history/$historyId"
										params={{ historyId: String(history.history_id) }}
									>
										View Details Result
									</Link>
								</Button>
							</CardFooter>

						</Card>
					)
				})}
			</div>
		</section>
	)
}