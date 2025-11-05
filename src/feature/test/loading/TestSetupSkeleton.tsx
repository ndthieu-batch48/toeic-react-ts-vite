import { Skeleton } from "@/component/ui/skeleton";
import { Separator } from "@/component/ui/separator";

export default function TestSetupPageSkeleton() {
	return (
		<div className="h-screen w-full p-10">
			{/* Header Section */}
			<div className="flex items-start gap-1 pb-2">
				<Skeleton className="h-8 w-3xl" />
			</div>

			{/* Practice/Exam Buttons */}
			<div className="flex gap-3 pb-3">
				<Skeleton className="h-10 w-24 rounded-lg" />
				<Skeleton className="h-10 w-24 rounded-lg" />
			</div>

			{/* Main Content */}
			<div className="border rounded-lg py-3">
				{/* Header */}
				<div className="px-3 pb-4">
					<div className="flex items-center gap-2">
						<Skeleton className="h-6 w-48" />
						<Skeleton className="h-5 w-96" />
					</div>
				</div>

				{/* Content */}
				<div className="px-3 space-y-3">
					{/* Select All/Deselect All and Time Picker */}
					<div className="flex justify-between items-start">
						<div className="flex gap-1">
							<Skeleton className="h-10 w-24 rounded" />
							<Skeleton className="h-10 w-28 rounded" />
						</div>
						<Skeleton className="h-10 w-64 rounded" />
					</div>

					<Separator className="my-3" />

					{/* Part Items */}
					<div className="space-y-3">
						{Array.from({ length: 7 }).map((_, i) => (
							<div key={i} className="flex flex-col pb-3 space-y-2">
								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-5 rounded" />
									<Skeleton className="h-5 w-96" />
								</div>
								<Skeleton className="h-4 w-full max-w-2xl ml-6" />
							</div>
						))}
					</div>
				</div>

				{/* Footer */}
				<div className="px-3 mt-4">
					<Separator className="mb-3" />
					<Skeleton className="h-11 w-32 rounded" />

				</div>
			</div>
		</div>
	);
}