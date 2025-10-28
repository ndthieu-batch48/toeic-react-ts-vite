import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { Skeleton } from "@/component/ui/skeleton";
import { Separator } from "@radix-ui/react-separator";


export default function ResultPageSkeleton() {
	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			{/* Header Section */}
			<div className="text-center space-y-4">
				<div className="flex items-center justify-center gap-3">
					<Skeleton className="h-8 w-8 rounded" />
					<Skeleton className="h-9 w-64" />
				</div>
				<Skeleton className="h-8 w-32 mx-auto rounded-full" />
			</div>

			{/* Overview Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{[1, 2, 3].map((i) => (
					<Card key={i}>
						<CardHeader className="text-center pb-3">
							<Skeleton className="h-5 w-32 mx-auto" />
						</CardHeader>
						<CardContent className="text-center space-y-2">
							<Skeleton className="h-10 w-20 mx-auto" />
							<Skeleton className="h-4 w-24 mx-auto" />
						</CardContent>
					</Card>
				))}
			</div>

			{/* Detailed Results */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Skeleton className="h-5 w-5 rounded" />
						<Skeleton className="h-6 w-40" />
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Progress Overview */}
					<div className="space-y-3">
						<div className="flex justify-between">
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-5 w-16" />
						</div>
						<Skeleton className="h-2 w-full" />
					</div>

					<Separator />

					{/* Results Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<Skeleton className="h-6 w-40" />
							<div className="space-y-3">
								{[1, 2, 3].map((i) => (
									<div key={i} className="flex items-center justify-between p-3 rounded-lg border">
										<div className="flex items-center gap-2">
											<Skeleton className="h-5 w-5 rounded-full" />
											<Skeleton className="h-5 w-32" />
										</div>
										<Skeleton className="h-6 w-12 rounded" />
									</div>
								))}
							</div>
						</div>

						<div className="space-y-4">
							<Skeleton className="h-6 w-40" />
							<div className="space-y-3">
								{[1, 2].map((i) => (
									<Card key={i}>
										<CardContent className="p-4">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<Skeleton className="h-4 w-4 rounded" />
													<Skeleton className="h-5 w-20" />
												</div>
												<div className="text-right space-y-1">
													<Skeleton className="h-6 w-8" />
													<Skeleton className="h-3 w-12" />
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</div>

					<Separator />

					{/* Test Information */}
					<div className="space-y-3">
						<Skeleton className="h-6 w-40" />
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{[1, 2].map((i) => (
								<div key={i} className="flex items-center gap-2">
									<Skeleton className="h-4 w-4 rounded" />
									<Skeleton className="h-4 w-20" />
									<Skeleton className="h-4 w-24" />
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Performance Insights */}
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-48" />
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{[1, 2].map((i) => (
							<div key={i} className="space-y-3">
								<Skeleton className="h-5 w-32" />
								<div className="space-y-2">
									<div className="flex justify-between">
										<Skeleton className="h-4 w-28" />
										<Skeleton className="h-4 w-16" />
									</div>
									<Skeleton className="h-2 w-full" />
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Button */}
			<div className="flex justify-center pt-4">
				<Skeleton className="h-12 w-64 rounded-lg" />
			</div>
		</div>
	);
}