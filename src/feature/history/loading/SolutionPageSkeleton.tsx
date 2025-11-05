import { Skeleton } from "@/component/ui/skeleton";

export default function SolutionPageSkeleton() {
	return (
		<div className="w-full mx-auto p-6">
			{/* Heading with tabs */}
			<div className="flex gap-2 mb-6">
				{Array.from({ length: 7 }).map((_, i) => (
					<Skeleton key={i} className="h-16 w-28 rounded-lg" />
				))}
			</div>

			<div className="flex gap-6">
				{/* Question cards */}
				<div className="flex-1 space-y-6">
					{[1, 2, 3, 4, 5, 6].map((card) => (
						<div key={card} className="border rounded-lg p-6 space-y-4 bg-white">
							<Skeleton className="h-15 w-2xl rounded-xl" />
							<div className="space-y-3 mt-4">
								{[1, 2, 3, 4].map((i) => (
									<div key={i} className="flex items-center gap-3 p-4 border rounded-lg">
										<Skeleton className="h-10 w-10 rounded-full" />
										<Skeleton className="h-8 w-1/3" />
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Question board - RIGHT SIDE */}
				<div className="w-60 flex-shrink-0">
					<div className="border rounded-lg p-4 bg-white sticky top-6">
						{/* Part sections */}
						{[1, 2, 3].map((section) => (
							<div key={section} className="mb-4">
								<Skeleton className="h-10 w-40 rounded-lg mb-4" />
								<div className="grid grid-cols-7 gap-3">
									{Array.from({ length: 14 }).map((_, i) => (
										<Skeleton key={i} className="min-w-[26px] min-h-[26px] rounded-2xl" />
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}