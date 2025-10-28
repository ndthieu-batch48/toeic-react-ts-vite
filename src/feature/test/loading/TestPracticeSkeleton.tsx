import { Skeleton } from "@/component/ui/skeleton";

export default function TestPracticeSkeleton() {
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
							<Skeleton className="h-10 w-32 rounded-full" />
							<Skeleton className="h-5 w-full" />
							<Skeleton className="h-5 w-3/4" />
							<Skeleton className="h-8 w-48 mt-4" />
							<div className="space-y-3 mt-4">
								{[1, 2, 3, 4].map((i) => (
									<div key={i} className="flex items-center gap-3 p-4 border rounded-lg">
										<Skeleton className="h-5 w-5 rounded-full" />
										<Skeleton className="h-4 w-1/3" />
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Question navigation board - RIGHT SIDE */}
				<div className="w-60 flex-shrink-0">
					<div className="border rounded-lg p-4 bg-white sticky top-6">
						<Skeleton className="h-12 w-40 rounded-lg mb-4" />

						{/* Part sections */}
						{[1, 2, 3].map((section) => (
							<div key={section} className="mb-4">
								<Skeleton className="h-4 w-30 mb-3" />
								<div className="grid grid-cols-7 gap-2">
									{Array.from({ length: 14 }).map((_, i) => (
										<Skeleton key={i} className="h-8 w-8 rounded-full" />
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