import { Skeleton } from "@/component/ui/skeleton";

export default function HistoryPageSkeleton() {
	return (
		<div className="h-screen w-full mx-auto p-6 space-y-4">
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className="border rounded-lg p-6 bg-white">
					{/* Header row */}
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-3">
							<Skeleton className="h-7 w-32" />
						</div>

						<div className="flex items-center gap-6">
							<Skeleton className="h-9 w-28 rounded" />
						</div>

					</div>

					{/* Date and duration */}
					<div className="flex items-center gap-6 mb-3">
						<Skeleton className="h-5 w-40" />
						<Skeleton className="h-5 w-24" />
					</div>

					{/* Parts */}
					<div className="flex gap-2">
						{Array.from({ length: 7 }).map((_, j) => (
							<Skeleton key={j} className="h-6 w-14 rounded" />
						))}
					</div>
				</div>
			))}
		</div>
	);
}