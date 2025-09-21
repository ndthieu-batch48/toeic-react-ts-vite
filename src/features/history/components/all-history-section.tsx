import { Calendar, History } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { HistoryResultListResponse } from '../types/history'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/utils/common'
import { Label } from '@/components/ui/label'


type AllHistorySectionProps = {
	historyResultList: HistoryResultListResponse[]
}

export const AllHistorySection: React.FC<AllHistorySectionProps> = ({ historyResultList }) => (
	<section className="space-y-4 font-sans">
		<div className="flex items-center gap-2">
			<History className="h-6 w-6 text-primary" />
			<h2 className="text-3xl font-bold text-foreground font-serif">Test History</h2>
		</div>

		<p className="text-muted-foreground font-sans">Review your previous test attempts and results</p>

		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{historyResultList.map((history) => {

				const [currentScore, totalScore] = history.score.split('/');
				const isFailed = Number(currentScore) <= Number(totalScore) / 2;

				return (
					<Card key={history.history_id} className="hover:shadow-md transition-shadow bg-card border-border md:max-w-[350px]">
						<CardHeader>
							<CardTitle className="text-lg text-card-foreground font-serif">{history.testname}</CardTitle>
							<div className="flex justify-between items-center">
								<Badge variant={isFailed ? 'destructive' : 'default'}>
									{isFailed ? "Failed" : "Passed"}
								</Badge>
								<Label className={`text-lg font-semibold font-serif ${isFailed ? 'text-destructive' : 'text-primary'}`}>Overall score: {history.score}</Label>
							</div>
						</CardHeader>

						<CardContent className="flex flex-col gap-2">
							<div className="flex gap-1 flex-wrap">
								{history.part_list.map((part, key) => (
									<Badge key={key} variant="secondary" className="bg-secondary text-secondary-foreground">
										{part}
									</Badge>
								))}
							</div>

							<div className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
								<Calendar className="h-4 w-4" />
								Completed at: {formatDateTime(history.create_at)}
							</div>

						</CardContent>

						<CardFooter>
							<Button
								variant="outline"
								className="w-full border-border text-foreground hover:bg-secondary font-sans"
								asChild>
								<Link to="/history/$historyId"
									params={{ historyId: String(history.history_id) }}
									search={{ isFailed: isFailed }}
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