import type { Part } from "../types/test"
import { PartTab } from "../components/PartTabs"
import { QuestionTab } from "../components/QuestionTab"

import { Card } from "@/components/ui/card"
import { useScrollControl } from "@/hook/useScrollControl"

type TestPracticePageProps = {
	testId: number
	testTitle: string
	partData: Part[],
}

export const TestPracticePage: React.FC<TestPracticePageProps> = ({ partData }) => {
	const { isScrolling, scrollPosition } = useScrollControl('window');

	return (
		<div className="bg-primary/10 min-h-screen">

			<div className="flex flex-col md:flex-row pt-13 pb-15">

				<PartTab
					className="flex-1 min-w-0"
					partData={partData}
				/>

				{/* Question Tab Div */}
				<Card
					className="flex flex-col flex-shrink-0 md:max-w-60 md:h-120 md:sticky md:top-13 z-10 bg-background rounded-md shadow-md py-2"
					style={{
						transform: isScrolling ? `translateY(${scrollPosition.y * 0.0005}px)` : 'translateY(0)',
						transition: isScrolling ? 'none' : 'transform 0.2s ease-out'
					}}
				>
					<QuestionTab
						partData={partData}
					/>
				</Card>
			</div>
		</div>
	)
}