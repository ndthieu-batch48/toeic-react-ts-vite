import { Button } from "@/components/ui/button"
import type { Part } from "../types/test"
import { PartTab } from "../components/PartTabs"
import { QuestionTab } from "../components/QuestionTab"
import { CountDownTimer } from "../components/CountdownTimer"
import { Link, useParams } from "@tanstack/react-router"
import { CreateSubmit } from "../components/SubmitTestButton"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useScrollControl } from "@/hook/useScrollControl"
import { useRef } from "react"


type TestPracticePageProps = {
	testId: number
	testTitle: string
	testDuration: number
	partData: Part[],
}

export const TestPracticePage: React.FC<TestPracticePageProps> = ({ testTitle, testDuration, partData }) => {
	const params = useParams({ from: '/_protected/test/$testId/practice' })

	const { ref, scrollPosition, scrollTo, isScrolling } = useScrollControl('window');
	const pageRef = useRef<Record<number, HTMLElement | null>>({});

	const handleScrollPartTab = (mediaId: number) => {
		setTimeout(() => {
			const questionCard = pageRef.current[mediaId]

			if (questionCard) {
				const elementTop = questionCard.offsetTop;
				scrollTo(0, elementTop - 10);
			}
		}, 100);
	}

	return (
		<div className="bg-primary/10">
			<div className="flex justify-center items-center w-full h-32 gap-2">
				<Label className="text-xl font-bold text-foreground">{testTitle}</Label>
				<Button
					className="border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground text-lg"
					variant="outline"
					asChild>
					<Link
						to="/test/$testId"
						replace={true}
						params={{ testId: params.testId }}
					>
						Exit
					</Link>
				</Button>
			</div>

			<div className="flex flex-col md:flex-row gap-4 px-2">
				<PartTab
					scrollRef={ref}
					pageRef={pageRef}
					className="flex-1 min-w-0"
					partData={partData} />

				<div
					className="flex flex-col gap-1 self-start flex-shrink-0 md:w-70 md:h-90 md:sticky md:top-4"
					style={{
						transform: isScrolling ? `translateY(${scrollPosition.y * 0.0005}px)` : 'translateY(0)',
						transition: isScrolling ? 'none' : 'transform 0.2s ease-out'
					}}
				>
					<CreateSubmit />
					<CountDownTimer className="h-20" duration={testDuration} />
					<QuestionTab
						partData={partData}
						onQuestionActive={handleScrollPartTab}
					/>
				</div>

			</div>
		</div>
	)
}