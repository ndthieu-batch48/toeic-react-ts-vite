import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Award, Target, Flame } from 'lucide-react';


export type UserInsightsData = {
	accessDates: string[];
	currentStreak: number;
	longestStreak: number;
	totalTestsTaken: number;
	averageAccuracy: number;
	averageListeningScore: number;
	averageReadingScore: number;
	totalStudyTime: number;
	recentScores: number[];
	improvementRate: number;
};

export const UserInsightsPanel = ({ insightsData }: { insightsData: UserInsightsData }) => {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

	const getDaysInMonth = (month: number, year: number): number => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (month: number, year: number): number => {
		return new Date(year, month, 1).getDay();
	};

	const daysInMonth = getDaysInMonth(currentMonth, currentYear);
	const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

	const isDateMarked = (day: number): boolean => {
		const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		return insightsData.accessDates.includes(dateStr);
	};

	const isToday = (day: number): boolean => {
		return day === currentDate.getDate();
	};

	const calendarDays = [];
	for (let i = 0; i < firstDay; i++) {
		calendarDays.push(<div key={`empty-${i}`} className="h-8" />);
	}
	for (let day = 1; day <= daysInMonth; day++) {
		calendarDays.push(
			<div
				key={day}
				className={`h-8 flex items-center justify-center text-sm rounded-md transition-colors ${isToday(day)
					? 'bg-primary text-primary-foreground font-bold'
					: isDateMarked(day)
						? 'bg-blue-500 text-white font-semibold'
						: 'text-muted-foreground hover:bg-muted'
					}`}
			>
				{day}
			</div>
		);
	}

	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'];

	return (
		<div className="min-w-70 space-y-6">
			<Card className="border-2 border-orange-200 dark:border-orange-900">
				<CardHeader className="pb-3">
					<CardTitle className="text-lg flex items-center gap-2">
						<Flame className="w-5 h-5 text-orange-500" />
						Learning Streak
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-3xl font-bold text-orange-500">
								{insightsData.currentStreak}
							</p>
							<p className="text-sm text-muted-foreground">Days</p>
						</div>
						<div className="text-right">
							<p className="text-xl font-semibold">{insightsData.longestStreak}</p>
							<p className="text-xs text-muted-foreground">Longest Streak</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-lg flex items-center gap-2">
						<Calendar className="w-5 h-5" />
						{monthNames[currentMonth]} {currentYear}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-7 gap-1 mb-2">
						{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
							<div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-muted-foreground">
								{day}
							</div>
						))}
					</div>
					<div className="grid grid-cols-7 gap-1">
						{calendarDays}
					</div>
					<div className="mt-4 flex items-center gap-4 text-xs">
						<div className="flex items-center gap-1">
							<div className="w-3 h-3 rounded bg-blue-500" />
							<span className="text-muted-foreground">Studied</span>
						</div>
						<div className="flex items-center gap-1">
							<div className="w-3 h-3 rounded bg-primary" />
							<span className="text-muted-foreground">Today</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-lg flex items-center gap-2">
						<Target className="w-5 h-5" />
						Overall Performance
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span className="font-medium">Average Accuracy</span>
							<span className="font-bold">{insightsData.averageAccuracy.toFixed(1)}%</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2">
							<div
								className="bg-blue-500 h-2 rounded-full transition-all"
								style={{ width: `${insightsData.averageAccuracy}%` }}
							/>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span className="font-medium">Listening</span>
							<span className="font-bold">{insightsData.averageListeningScore.toFixed(1)}%</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2">
							<div
								className="bg-green-500 h-2 rounded-full transition-all"
								style={{ width: `${insightsData.averageListeningScore}%` }}
							/>
						</div>
					</div>

					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span className="font-medium">Reading</span>
							<span className="font-bold">{insightsData.averageReadingScore.toFixed(1)}%</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2">
							<div
								className="bg-purple-500 h-2 rounded-full transition-all"
								style={{ width: `${insightsData.averageReadingScore}%` }}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-lg flex items-center gap-2">
						<Award className="w-5 h-5" />
						Statistics
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">Tests Completed</span>
						<Badge variant="secondary" className="text-base font-bold">
							{insightsData.totalTestsTaken}
						</Badge>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">Study Time</span>
						<Badge variant="secondary" className="text-base font-bold">
							{Math.floor(insightsData.totalStudyTime / 60)}h {insightsData.totalStudyTime % 60}m
						</Badge>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">Improvement</span>
						<Badge
							variant={insightsData.improvementRate >= 0 ? "default" : "destructive"}
							className="text-base font-bold"
						>
							<TrendingUp className="w-3 h-3 mr-1" />
							{insightsData.improvementRate >= 0 ? '+' : ''}{insightsData.improvementRate.toFixed(1)}%
						</Badge>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-lg">Recent Progress</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						{insightsData.recentScores.slice(-5).map((score, index) => (
							<div key={index} className="flex items-center gap-2">
								<span className="text-xs text-muted-foreground w-12">Test {index + 1}</span>
								<div className="flex-1 bg-muted rounded-full h-2">
									<div
										className="bg-blue-500 h-2 rounded-full transition-all"
										style={{ width: `${score}%` }}
									/>
								</div>
								<span className="text-xs font-medium w-12 text-right">{score.toFixed(1)}%</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}