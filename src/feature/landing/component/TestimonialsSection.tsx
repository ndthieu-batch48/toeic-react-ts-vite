import { Card, CardContent } from "@/shadcn/component/ui/card";
import { Star } from "lucide-react";
import { TESTIMONIALS, TESTIMONIALS_SECTION } from "../const/landing_const";

export function TestimonialsSection() {
	return (
		<section className="bg-muted/50 backdrop-blur-sm py-16">
			<div className="container mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold mb-4 text-foreground ">{TESTIMONIALS_SECTION.title}</h2>
					<p className="text-xl text-muted-foreground ">{TESTIMONIALS_SECTION.description}</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{TESTIMONIALS.map((testimonial, index) => (
						<Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
							<CardContent className="p-8">
								<div className="flex mb-4">
									{[...Array(5)].map((_, i) => (
										<Star key={i} className="w-5 h-5 text-rating fill-rating" />
									))}
								</div>
								<blockquote className="text-lg text-card-foreground mb-6 italic leading-relaxed">
									"{testimonial.quote}"
								</blockquote>
								<div className="flex items-center justify-between">
									<div>
										<p className="font-semibold text-card-foreground">{testimonial.name}</p>
										<p className="text-sm text-muted-foreground">TOEIC Student</p>
									</div>
									<div className="text-right">
										<p className="text-2xl font-bold text-primary">{testimonial.score}</p>
										<p className="text-sm text-muted-foreground">TOEIC Score</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}