import { Card, CardContent } from '@/component/ui/card';
import { Badge } from '@/component/ui/badge';
import { Calendar, Clock, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/component/ui/button';
import { Link } from '@tanstack/react-router';
import type { HistoryResultListRes } from '../type/historyType';

interface HistoryPageProps {
	historyList: HistoryResultListRes[];
}

const HistoryPage = ({ historyList }: HistoryPageProps) => {

	const getTestTypeBadgeColor = (testType: string) => {
		if (testType === "exam") {
			return "text-sm font-semibold border-marker text-marker"
		}

		return "text-sm font-semibold border-foreground/20"
	}

	const parseScore = (scoreString: string) => {
		const [achieved, total] = scoreString.split('/').map(Number);
		return { achieved, total };
	};

	const getScoreStatus = (scoreString: string) => {
		const { achieved } = parseScore(scoreString);
		return achieved < 100 ? 'failed' : 'passed';
	};

	const getScoreColor = (scoreString: string) => {
		const status = getScoreStatus(scoreString);
		return status === 'failed'
			? 'text-destructive'
			: 'text-possitive';
	};

	const getScoreBgColor = (scoreString: string) => {
		const status = getScoreStatus(scoreString);
		return status === 'failed'
			? 'bg-destructive/8'
			: 'bg-possitive/10';
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const formatDuration = (minutes: number) => {
		if (minutes === 0) return 'Not recorded';
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		if (hours > 0) {
			return `${hours}h ${mins}m`;
		}
		return `${mins}m`;
	};

	return (
		<div className="p-8">
			<div className="mx-auto">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-foreground">
						Test History
					</h1>
					<p className="text-sm text-foreground">
						Review your past TOEIC test performances
					</p>
				</div>

				{/* History Items */}
				<div className="flex flex-col gap-3">
					{historyList.map((history) => {
						const { achieved, total } = parseScore(history.score);
						const percentage = ((achieved / total) * 100).toFixed(0);
						const status = getScoreStatus(history.score);

						return (
							<Card
								key={history.history_id}
								className="hover:shadow-md transition-shadow duration-200 gap-1 py-3"
							>
								<CardContent>
									{/* Top Row: Test Name, Type, Status, and Score */}
									<div className="flex items-center justify-between gap-4 mb-3">
										<div className="flex items-center gap-3 flex-1 min-w-0">
											<h3 className="text-lg font-semibold text-foreground">
												{history.test_name}
											</h3>
											<div className="flex items-center gap-2 flex-shrink-0">
												<Badge
													variant="outline"
													className={getTestTypeBadgeColor(history.test_type)}
												>
													{history.test_type}
												</Badge>
												<Badge
													variant="outline"
													className={`text-xs font-semibold ${status === 'failed'
														? 'border-destructive text-destructive'
														: 'border-positive text-positive'
														}`}
												>
													{status === 'failed' ? (
														<XCircle className="w-3 h-3 mr-1" />
													) : (
														<CheckCircle2 className="w-3 h-3 mr-1" />
													)}
													{status === 'failed' ? 'Failed' : 'Passed'}
												</Badge>
											</div>
										</div>

										{/* Score Display */}
										<div className={`rounded-lg px-4 py-3 ${getScoreBgColor(history.score)} flex items-center gap-4 flex-shrink-0`}>
											<div className="flex items-center gap-1">
												<p className="text-sm font-medium text-card-foreground">
													Score:
												</p>
												<p className={`text-lg font-semibold ${getScoreColor(history.score)}`}>
													{history.score}
												</p>
											</div>
											<div className="flex items-center gap-1">
												<p className="text-sm font-medium text-card-foreground">
													Accuracy:
												</p>
												<p className={`text-lg font-semibold ${getScoreColor(history.score)}`}>
													{percentage}%
												</p>
											</div>
										</div>

										<Button
											variant="outline"
											size="sm"
											asChild>
											<Link to="/history/$historyId"
												params={{ historyId: String(history.history_id) }}
											>
												View Details
											</Link>

										</Button>
									</div>

									{/* Middle Row: Date, Duration, Test ID */}
									<div className="flex items-center gap-4 text-sm text-muted-foreground mb-2 flex-wrap">
										<div className="flex items-center gap-1.5">
											<Calendar className="w-3.5 h-3.5" />
											<span>{formatDate(history.create_at)}</span>
										</div>
										<div className="flex items-center gap-1.5">
											<Clock className="w-3.5 h-3.5" />
											<span>{formatDuration(history.dura)}</span>
										</div>
									</div>

									{/* Bottom Row: Parts */}
									<div className="flex items-center gap-2 text-sm">
										<span className="text-foreground text-xs font-medium">
											Parts:
										</span>
										<div className="flex flex-wrap gap-1">
											{history.part_order_list.map((part, index) => (
												<Badge
													key={index}
													variant="outline"
													className="text-xs py-0 h-5 text-muted-foreground"
												>
													{part}
												</Badge>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* Empty State */}
				{history.length === 0 && (
					<Card className="py-12 text-center">
						<CardContent>
							<FileText className="w-12 h-12 mx-auto mb-3" />
							<h3 className="text-lg font-semibold text-foreground mb-1">
								No Test History
							</h3>
							<p className="text-sm text-muted-foreground">
								Your test history will appear here once you complete a test.
							</p>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
};

export default HistoryPage;