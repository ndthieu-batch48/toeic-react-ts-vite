import type { Test } from "../types/test"
import { PartTabs } from "./part-tabs"

type TestPracticeProps = {
	testData: Test
}

export const TestPractice: React.FC<TestPracticeProps> = ({ testData }) => {

	const partData = testData.part_list;

	return (
		<>
			<PartTabs partData={partData} />

		</>
	)
}