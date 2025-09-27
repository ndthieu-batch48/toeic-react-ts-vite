import { Button } from "@/components/ui/button"
import type { Part } from "../types/test"
import { PartTab } from "../components/PartTabs"
import { QuestionTab } from "../components/QuestionTab"
import { CountDownTimer } from "../components/CountdownTimer"
import { Link } from "@tanstack/react-router"
import { CreateSubmit } from "../components/SubmitTestButton"
import { Label } from "@radix-ui/react-dropdown-menu"


type TestPracticeProps = {
	testId: number
	testTitle: string
	testDuration: number
	partData: Part[],
}

export const TestPractice: React.FC<TestPracticeProps> = ({ testTitle, testDuration, partData }) => {

	return (
		<>
			<div className="flex justify-center items-center w-full h-32 gap-2">
				<Label className="text-xl font-bold text-foreground">{testTitle}</Label>
				<Button
					className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
					variant="outline"
					asChild>
					<Link
						to=".."
						replace={true}
					>
						Exit
					</Link>
				</Button>
			</div>

			<div className="flex flex-col md:flex-row gap-4 px-2">
				<PartTab
					className="flex-1"
					partData={partData}
				/>

				<div className="flex flex-col gap-3 md:sticky md:top-32 self-start md:w-80 h-150">
					<CreateSubmit />
					<CountDownTimer className="mb-1 h-20" duration={testDuration} />
					<QuestionTab partData={partData}></QuestionTab>
				</div>

			</div>
		</>
	)
}