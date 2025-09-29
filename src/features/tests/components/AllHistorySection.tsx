import { Calendar, History } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { HistoryResultListResponse } from '../../history/types/history'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/utils/common'
import { Label } from '@/components/ui/label'


type AllHistorySectionProps = {
	historyResultList: HistoryResultListResponse[]
}

export const AllHistorySection: React.FC<AllHistorySectionProps> = ({ historyResultList }) => (
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
					<Card key={history.history_id} className="hover:shadow-lg hover:cursor-pointer transition-shadow md:max-w-[400px]">
						<CardHeader>
							<CardTitle className="text-2xl">{history.test_name}</CardTitle>
							<div className="flex justify-between items-center">
								<Badge variant={isFailed ? 'destructive' : 'default'} className="text-lg">
									{isFailed ? "Failed" : "Passed"}
								</Badge>
								<Label className={`text-lg font-semibold ${isFailed ? 'text-destructive' : 'text-primary'}`}>Overall score: {history.score}</Label>
							</div>
						</CardHeader>

						<CardContent className="flex flex-col gap-2">
							<div className="flex gap-2 flex-wrap">
								{history.part_list.map((part, key) => (
									<Badge key={key} variant="outline" className="text-base">
										{part}
									</Badge>
								))}
							</div>

							<div className="flex items-center gap-2 text-base text-muted-foreground">
								<Calendar/>
								Completed at: {formatDateTime(history.create_at)}
							</div>

						</CardContent>

						<CardFooter>
							<Button
								variant="outline"
								className="w-full hover:bg-secondary font-semibold text-xl rounded-2xl"
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