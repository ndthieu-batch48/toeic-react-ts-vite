import { Card, CardContent, CardHeader, CardTitle } from '@/component/ui/card';
import { Badge } from '@/component/ui/badge';
import { Progress } from '@/component/ui/progress';
import { Separator } from '@/component/ui/separator';
import { CheckCircle, XCircle, Clock, Calendar, BookOpen, Headphones, Eye } from 'lucide-react';
import type { HistoryResultDetailResp } from '../type/historyType';
import { Button } from '@/component/ui/button';
import { Link } from '@tanstack/react-router';

type ResultPageProps = {
	detailResult: HistoryResultDetailResp;
};

const ResultPage: React.FC<ResultPageProps> = ({ detailResult }) => {
	const isFailed = detailResult.accuracy < 50
	const durationMinutes = Math.floor(detailResult.dura / 60);
	const durationSeconds = detailResult.dura % 60;

	// Format date
	const testDate = new Date(detailResult.create_at).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			{/* Header Section */}
			<div className="text-center space-y-4">
				<div className="flex items-center justify-center gap-3">
					<BookOpen className="h-8 w-8 text-primary" />
					<h1 className="text-3xl font-bold">TOEIC Test Results</h1>
				</div>
				<Badge variant="secondary" className="text-lg px-4 py-2">
					{detailResult.test_type} Test
				</Badge>
			</div>

			{/* Overview Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className={
					isFailed
						? 'bg-destructive/30'
						: 'bg-positive/30'}>
					<CardHeader className="text-center pb-3">
						<CardTitle className="text-sm font-bold opacity-90">Overall Score</CardTitle>
					</CardHeader>
					<CardContent className="text-center">
						<div className="text-4xl font-bold mb-2">{detailResult.accuracy}%</div>
						<p className="text-sm font-medium opacity-80">Accuracy Rate</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="text-center pb-3">
						<CardTitle className="text-sm font-medium text-muted-foreground">Questions Answered</CardTitle>
					</CardHeader>
					<CardContent className="text-center">
						<div className="text-4xl font-bold mb-2">{detailResult.total_ques - detailResult.no_ans}</div>
						<p className="text-sm text-muted-foreground">of {detailResult.total_ques} total</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="text-center pb-3">
						<CardTitle className="text-sm font-medium text-muted-foreground">Test Duration</CardTitle>
					</CardHeader>
					<CardContent className="text-center">
						<div className="text-4xl font-bold mb-2">{durationMinutes}m</div>
						<p className="text-sm text-muted-foreground">{durationSeconds}s</p>
					</CardContent>
				</Card>
			</div>

			{/* Detailed Results */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<CheckCircle className="h-5 w-5" />
						Detailed Results
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Progress Overview */}
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium">Overall Progress</span>
							<span className="text-sm text-muted-foreground">{detailResult.correct_count}/{detailResult.total_ques}</span>
						</div>
						<Progress value={detailResult.accuracy} />
					</div>

					<Separator />

					{/* Results Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<h3 className="font-semibold text-lg">Answer Summary</h3>

							<div className="space-y-3">
								<div className="flex items-center justify-between font-bold p-3 bg-positive/10 rounded-lg">
									<div className="flex items-center gap-2">
										<CheckCircle className="bg-positive/10" />
										<span>Correct Answers</span>
									</div>
									<Badge variant="secondary" className="bg-positive/30">
										{detailResult.correct_count}
									</Badge>
								</div>

								<div className="flex items-center justify-between p-3 font-bold bg-destructive/10 rounded-lg">
									<div className="flex items-center gap-2">
										<XCircle className="bg-destructive/10" />
										<span>Incorrect Answers</span>
									</div>
									<Badge variant="secondary" className="bg-destructive/30">
										{detailResult.incorrect_count}
									</Badge>
								</div>

								<div className="flex items-center justify-between p-3 font-bold bg-background rounded-lg">
									<div className="flex items-center gap-2">
										<Clock />
										<span>No Answer</span>
									</div>
									<Badge variant="secondary">
										{detailResult.no_ans}
									</Badge>
								</div>

							</div>
						</div>

						<div className="space-y-4">
							<h3 className="font-semibold text-lg">Section Breakdown</h3>

							<div className="space-y-3">
								<Card className="bg-secondary text-secondary-foreground">
									<CardContent className="p-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Headphones className="h-4 w-4" />
												<span className="font-medium">Listening</span>
											</div>
											<div className="text-right">
												<div className="font-bold">{detailResult.correct_listening}</div>
												<div className="text-xs opacity-80">correct</div>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card className="bg-secondary text-secondary-foreground">
									<CardContent className="p-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<BookOpen className="h-4 w-4" />
												<span className="font-medium">Reading</span>
											</div>
											<div className="text-right">
												<div className="font-bold">{detailResult.correct_reading}</div>
												<div className="text-xs opacity-80">correct</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>

					<Separator />

					{/* Test Information */}
					<div className="space-y-3">
						<h3 className="font-semibold text-lg">Test Information</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<span className="text-muted-foreground">Test Date:</span>
								<span className="font-medium">{testDate}</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<span className="text-muted-foreground">Duration:</span>
								<span className="font-medium">{durationMinutes}m {durationSeconds}s</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Performance Insights */}
			<Card>
				<CardHeader>
					<CardTitle>Performance Insights</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-3">
							<h4 className="font-semibold">Listening Section</h4>
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Correct Answers</span>
									<span>{detailResult.correct_listening}/100</span>
								</div>
								<Progress value={(detailResult.correct_listening / 100) * 100} />
							</div>
						</div>

						<div className="space-y-3">
							<h4 className="font-semibold">Reading Section</h4>
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Correct Answers</span>
									<span>{detailResult.correct_reading}/100</span>
								</div>
								<Progress value={(detailResult.correct_reading / 100) * 100} />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-center pt-4">
				<Button
					className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold"
					size="lg"
					asChild
				>
					<Link
						to='/history/$historyId/solution'
						params={{ historyId: String(detailResult.history_id) }}
						search={{ testId: detailResult.test_id }}
					>
						<Eye className="h-5 w-5 mr-2" />
						View Detail Solution
					</Link>
				</Button>
			</div>

		</div>
	);
};

export default ResultPage;