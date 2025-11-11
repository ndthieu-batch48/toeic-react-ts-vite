import { Button } from '@/shadcn/component/ui/button'
import { ArrowUp } from 'lucide-react'

type ScrollToTopProps = {
	isVisible: boolean
	onScrollToTop: () => void

}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ isVisible, onScrollToTop }) => {
	if (!isVisible) return null;

	return (
		<Button
			className="bg-positive/80 hover:bg-positive fixed bottom-2 right-6 z-50 h-10 w-10 lg:h-15 lg:w-15 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
			aria-label="Scroll to top"
			onClick={onScrollToTop}
		>
			<ArrowUp />
		</Button>
	);
}