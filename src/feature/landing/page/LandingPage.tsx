import { HeroContent } from "../component/HeroContent";
import { CarouselItems } from "../component/CarouselItems";
import { FeaturesSection } from "../component/FeaturesSection";
import { TestimonialsSection } from "../component/TestimonialsSection";
import { CtaSection } from "../component/CtaSection";

export const LandingPage = () => {
	return (
		<>
			<HeroContent />
			<CarouselItems />
			<FeaturesSection />
			<TestimonialsSection />
			<CtaSection />
		</>
	);
}