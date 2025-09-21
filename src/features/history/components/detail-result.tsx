import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Clock, Calendar, BookOpen, Headphones, Eye } from 'lucide-react';
import type { HistoryResultDetailResponse } from '../types/history';
import { Button } from '@/components/ui/button';

type DetailResultProps = {
	detailResult: HistoryResultDetailResponse;
	isFailed: boolean;
};

const DetailResult: React.FC<DetailResultProps> = ({ detailResult, isFailed }) => {
	// Convert duration from seconds to minutes
	const durationMinutes = Math.floor(detailResult.duration / 60);
	const durationSeconds = detailResult.duration % 60;

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
				<Card className={isFailed ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}>
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
						<div className="text-4xl font-bold mb-2">{detailResult.total_question - detailResult.no_answer}</div>
						<p className="text-sm text-muted-foreground">of {detailResult.total_question} total</p>
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
							<span className="text-sm text-muted-foreground">{detailResult.correct_count}/{detailResult.total_question}</span>
						</div>
						<Progress value={detailResult.accuracy} className="h-2" />
					</div>

					<Separator />

					{/* Results Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<h3 className="font-semibold text-lg">Answer Summary</h3>

							<div className="space-y-3">
								<div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
									<div className="flex items-center gap-2">
										<CheckCircle className="h-4 w-4 text-green-600" />
										<span className="font-medium">Correct Answers</span>
									</div>
									<Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
										{detailResult.correct_count}
									</Badge>
								</div>

								<div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg">
									<div className="flex items-center gap-2">
										<XCircle className="h-4 w-4 text-red-600" />
										<span className="font-medium">Incorrect Answers</span>
									</div>
									<Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
										{detailResult.incorrect_count}
									</Badge>
								</div>

								{detailResult.no_answer > 0 && (
									<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
										<div className="flex items-center gap-2">
											<Clock className="h-4 w-4 text-gray-600" />
											<span className="font-medium">No Answer</span>
										</div>
										<Badge variant="secondary">
											{detailResult.no_answer}
										</Badge>
									</div>
								)}
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
								<Progress value={(detailResult.correct_listening / 100) * 100} className="h-2" />
							</div>
						</div>

						<div className="space-y-3">
							<h4 className="font-semibold">Reading Section</h4>
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Correct Answers</span>
									<span>{detailResult.correct_reading}/100</span>
								</div>
								<Progress value={(detailResult.correct_reading / 100) * 100} className="h-2" />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-center pt-4">
				<Button
					className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold"
					size="lg"
				>
					<Eye className="h-5 w-5 mr-2" />
					View Detail Solution
				</Button>
			</div>

		</div>
	);
};

export default DetailResult;