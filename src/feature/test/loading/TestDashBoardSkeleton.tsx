import { Skeleton } from "@/component/ui/skeleton";

export default function TestDashBoardSkeleton() {
	return (
		<div className="w-full max-w-7xl mx-auto p-6">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="border rounded-lg p-6 bg-white space-y-4">
						{/* Title and badge */}
						<div className="flex items-start justify-between">
							<Skeleton className="h-7 w-48" />
							<Skeleton className="h-6 w-16 rounded-full" />
						</div>

						{/* Duration and questions */}
						<div className="flex items-center gap-4">
							<Skeleton className="h-5 w-24" />
							<Skeleton className="h-5 w-28" />
						</div>

						{/* Parts label */}
						<Skeleton className="h-5 w-20" />

						{/* Start button */}
						<Skeleton className="h-12 w-full rounded-full" />
					</div>
				))}
			</div>
		</div>
	);
}