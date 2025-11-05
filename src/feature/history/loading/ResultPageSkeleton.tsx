import { Skeleton } from "@/component/ui/skeleton";
import { Separator } from "@/component/ui/separator";

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
					<div key={i} className="border rounded-lg p-6 text-center space-y-3">
						<Skeleton className="h-5 w-32 mx-auto" />
						<Skeleton className="h-10 w-20 mx-auto" />
						<Skeleton className="h-4 w-24 mx-auto" />
					</div>
				))}
			</div>

			{/* Detailed Results */}
			<div className="border rounded-lg p-6 space-y-6">
				<div className="flex items-center gap-2">
					<Skeleton className="h-5 w-5 rounded" />
					<Skeleton className="h-6 w-40" />
				</div>

				{/* Progress */}
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
					{/* Answer Summary */}
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

					{/* Section Breakdown */}
					<div className="space-y-4">
						<Skeleton className="h-6 w-40" />
						<div className="space-y-3">
							{[1, 2].map((i) => (
								<div key={i} className="border rounded-lg p-4">
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
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Performance Insights */}
			<div className="border rounded-lg p-6 space-y-6">
				<Skeleton className="h-6 w-48" />
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
			</div>

			{/* Button */}
			<div className="flex justify-center pt-4">
				<Skeleton className="h-12 w-64 rounded-lg" />
			</div>
		</div>
	);
}