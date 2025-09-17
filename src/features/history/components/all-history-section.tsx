import { Calendar, History } from 'lucide-react'
import type { HistoryResultListResponse } from '../types/history'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'


type AllHistorySectionProps = {
	historyResultList: HistoryResultListResponse[]
}

export const AllHistorySection: React.FC<AllHistorySectionProps> = ({ historyResultList }) => (
	<section className="space-y-4">
		<div className="flex items-center gap-2">
			<History className="h-6 w-6 text-primary" />
			<h2 className="text-3xl font-bold">Test History</h2>
		</div>
		<p className="text-muted-foreground">Review your previous test attempts and results</p>

		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{historyResultList.map((history) => (
				<Card key={history.history_id} className="hover:shadow-md transition-shadow">
					<CardHeader>
						<CardTitle className="text-lg">{history.testname}</CardTitle>
						<div className="flex justify-between items-center">
							<Badge variant={Number(history.score) > 5 ? 'default' : 'destructive'}>
								{Number(history.score) > 5 ? "Passed" : "Failed"}
							</Badge>
							<span className="text-lg font-semibold text-primary">{history.score}</span>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Calendar className="h-4 w-4" />
							Completed: {history.create_at}
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
)