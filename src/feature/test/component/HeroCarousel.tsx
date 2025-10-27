import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const HeroCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const slides = [
		{ id: 1, alt: "TOEIC Preparation" },
		{ id: 2, alt: "Practice Tests" },
		{ id: 3, alt: "Improve Your Score" }
	];

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 5000);
		return () => clearInterval(timer);
	}, [slides.length]);

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	return (
		<div className="relative w-full h-[200px] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden group">
			<div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
				<div className="text-center">
					<BookOpen className="w-20 h-20 mx-auto mb-4" />
					<p className="text-2xl font-semibold">Slide {currentSlide + 1}</p>
					<p className="text-lg mt-2">{slides[currentSlide].alt}</p>
				</div>
			</div>

			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-900"
				aria-label="Previous slide"
			>
				<ChevronLeft className="w-6 h-6" />
			</button>

			<button
				onClick={nextSlide}
				className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-900"
				aria-label="Next slide"
			>
				<ChevronRight className="w-6 h-6" />
			</button>

			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-3 h-3 rounded-full transition-all ${currentSlide === index
							? 'bg-blue-600 w-8'
							: 'bg-white/60 hover:bg-white/80'
							}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}