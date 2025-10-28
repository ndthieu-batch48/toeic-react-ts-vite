import { Skeleton } from "@/component/ui/skeleton";

export default function TestSetupSkeleton() {
	return (
		<div className="w-full max-w-6xl mx-auto p-6">
			{/* Header */}
			<div className="flex items-center gap-3 mb-6">
				<Skeleton className="h-8 w-32" />
				<Skeleton className="h-5 w-48" />
			</div>

			{/* Practice/Exam tabs */}
			<div className="flex gap-2 mb-6">
				<Skeleton className="h-12 w-24 rounded-lg" />
				<Skeleton className="h-12 w-24 rounded-lg" />
			</div>

			{/* Overview card */}
			<div className="border rounded-lg p-6 bg-white">
				<div className="flex items-center justify-between mb-6">
					<Skeleton className="h-6 w-64" />
					<div className="flex items-center gap-4">
						<Skeleton className="h-5 w-20" />
						<Skeleton className="h-10 w-32 rounded" />
						<Skeleton className="h-5 w-8" />
					</div>
				</div>

				{/* Select All/Deselect All buttons */}
				<div className="flex gap-3 mb-6">
					<Skeleton className="h-10 w-24 rounded" />
					<Skeleton className="h-10 w-28 rounded" />
				</div>

				{/* Part list */}
				<div className="space-y-4">
					{Array.from({ length: 7 }).map((_, i) => (
						<div key={i} className="border-b pb-4 last:border-b-0">
							<div className="flex items-start gap-3">
								<Skeleton className="h-5 w-5 rounded mt-1 flex-shrink-0" />
								<div className="flex-1 space-y-2">
									<div className="flex items-center gap-2">
										<Skeleton className="h-6 w-48" />
										<Skeleton className="h-5 w-24" />
									</div>
									<Skeleton className="h-4 w-full" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}