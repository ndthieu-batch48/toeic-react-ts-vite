import { Button } from "@/components/ui/button"
import { Link, useParams } from "@tanstack/react-router"

import { Label } from "@radix-ui/react-dropdown-menu"
import type { Part } from "@/features/tests/types/test"
import { SolutionPartTab } from "../components/SolutionPartTabs"
import { SolutionQuestionTab } from "../components/SolutionQuestionTab"
import type { HistoryResultDetailResponse } from "../types/history"
import { useScrollControl } from "@/hook/useScrollControl"
import { useRef } from "react"


type SolutionPageProps = {
	detailHistory: HistoryResultDetailResponse
	partData: Part[]
}

export const SolutionPage: React.FC<SolutionPageProps> = ({ detailHistory, partData }) => {
	const params = useParams({ from: '/_protected/history/$historyId/solution' })

	const { ref, scrollPosition, scrollTo, isScrolling } = useScrollControl('window');
	const pageRef = useRef<Record<number, HTMLElement | null>>({});

	const handleScrollPartTab = (mediaId: number) => {
		setTimeout(() => {
			const questionCard = pageRef.current[mediaId]

			if (questionCard) {
				const elementTop = questionCard.offsetTop;
				scrollTo(0, elementTop);
			}
		}, 100);
	}

	return (
		<div className="bg-primary/10">
			<div className="flex justify-center items-center w-full h-32 gap-2">
				<Label className="text-xl font-bold text-foreground">{detailHistory.test_name}</Label>
				<Button
					className="border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground text-lg"
					variant="outline"
					asChild>
					<Link
						to="/history/$historyId"
						params={{ historyId: params.historyId }}
						replace={true}
					>
						Exit
					</Link>
				</Button>
			</div>

			<div className="flex flex-col md:flex-row gap-4 px-2">
				<SolutionPartTab
					scrollRef={ref}
					pageRef={pageRef}
					className="flex-1 min-w-0"
					partData={partData}
					isScrolling={isScrolling}
					scrollPosition={scrollPosition}
				/>

				<div
					className="flex flex-col gap-1 self-start flex-shrink-0 md:w-70 md:h-100 md:sticky md:top-4"
					style={{
						transform: isScrolling ? `translateY(${scrollPosition.y * 0.0005}px)` : 'translateY(0)',
						transition: isScrolling ? 'none' : 'transform 0.2s ease-out'
					}}
				>
					<SolutionQuestionTab
						partData={partData}
						onQuestionActive={handleScrollPartTab}
					/>
				</div>

			</div>
		</div>
	)
}