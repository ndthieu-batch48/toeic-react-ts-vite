import type { Part } from "../types/test"
import { PartTab } from "../components/PartTabs"
import { QuestionTab } from "../components/QuestionTab"

import { useScrollControl } from "@/hook/useScrollControl"
import { useRef } from "react"
import { Card } from "@/components/ui/card"

type TestPracticePageProps = {
	testId: number
	testTitle: string
	partData: Part[],
}

export const TestPracticePage: React.FC<TestPracticePageProps> = ({ partData }) => {
	const { ref, scrollPosition, scrollTo, isScrolling } = useScrollControl('window');
	const pageRef = useRef<Record<number, HTMLElement | null>>({});

	const handleScrollPartTab = (mediaId: number) => {
		setTimeout(() => {
			const questionCard = pageRef.current[mediaId]

			if (questionCard) {
				const elementTop = questionCard.offsetTop;
				scrollTo(0, elementTop - 70);
			}
		}, 100);
	}


	return (
		<div className="bg-primary/10 min-h-screen">

			<div className="flex flex-col md:flex-row pt-10 pb-50">

				<PartTab
					className="flex-1 min-w-0"
					scrollRef={ref}
					pageRef={pageRef}
					partData={partData}
				/>

				{/* Question Tab Div */}
				<Card
					className="flex flex-col flex-shrink-0 md:w-70 md:h-105 md:sticky md:top-0 z-10 bg-background rounded-md shadow-md overflow-hidden"
					style={{
						transform: isScrolling ? `translateY(${scrollPosition.y * 0.0005}px)` : 'translateY(0)',
						transition: isScrolling ? 'none' : 'transform 0.2s ease-out'
					}}
				>
					<QuestionTab
						partData={partData}
						onQuestionActive={handleScrollPartTab}
					/>
				</Card>
			</div>
		</div>
	)
}