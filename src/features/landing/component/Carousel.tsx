import * as React from "react"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { CAROUSEL_ITEMS } from "../const/landing_const"

export function LandingCarousel() {
	const [api, setApi] = React.useState<CarouselApi>()
	const [current, setCurrent] = React.useState(0)

	React.useEffect(() => {
		if (!api) {
			return
		}

		setCurrent(api.selectedScrollSnap() + 1)

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])

	// Auto-play functionality
	React.useEffect(() => {
		if (!api) {
			return
		}

		const timer = setInterval(() => {
			if (api.canScrollNext()) {
				api.scrollNext()
			} else {
				api.scrollTo(0)
			}
		}, 7000)

		return () => clearInterval(timer)
	}, [api])

	return (
		<section className="container mx-auto px-6">
			<div className="mb-16">
				<div className="w-full">
					<Carousel
						setApi={setApi}
						className="w-full"
						opts={{
							align: "start",
							loop: true,
						}}
					>
						<CarouselContent>
							{CAROUSEL_ITEMS.map((item, index) => (
								<CarouselItem key={index}>
									<Card className="h-96 bg-primary">

										<CardContent className="z-10 h-full flex items-center justify-center p-8">
											<div className="text-center text-primary-foreground space-y-6">
												<div className="text-6xl mb-4 animate-pulse">{item.image}</div>

												<div className="space-y-4">
													<h3 className="text-4xl font-bold leading-tight">
														{item.title}
													</h3>
													<p className="text-xl opacity-90 leading-relaxed max-w-2xl ">
														{item.subtitle}
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>

						{/* Navigation buttons */}
						<CarouselPrevious className="left-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 border-2 w-12 h-12 transition-all duration-300 hover:scale-110" />
						<CarouselNext className="right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 border-2 w-12 h-12 transition-all duration-300 hover:scale-110" />
					</Carousel>

					{/* Slide indicators */}
					<div className="flex justify-center mt-6 space-x-2">
						{CAROUSEL_ITEMS.map((_, index) => (
							<button
								key={index}
								onClick={() => api?.scrollTo(index)}
								className={`w-3 h-3 rounded-2xl transition-all duration-300 ${index + 1 === current
									? 'bg-primary scale-125 shadow-lg'
									: 'bg-muted-foreground/20 hover:bg-muted-foreground/50'
									}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default LandingCarousel