import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import LandingCarousel from "./carousel";
import { features, testimonials } from "../constants";

export function LandingMainContent() {

	return (
		<div className="w-full">
			<section className="container mx-auto px-6 py-12">
				
				<div className="text-center mb-12">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
						Achieve Your Dream
						<br />
						<span className="text-primary">TOEIC Score</span>
					</h1>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
						Master the TOEIC exam with our AI-powered practice platform. Join over 100,000 students who've improved their scores with our comprehensive training system.
					</p>
					<div className="flex gap-4 justify-center items-center">
						<Button size="lg" className="cursor-pointer">
							Get Started
							<ArrowRight className="ml-2 w-5 h-5" />
						</Button>
					</div>
				</div>

				<div className="mb-16">
					<LandingCarousel />
				</div>
			</section>

			<section className="container mx-auto px-6 py-16">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold mb-4 text-foreground ">Why Choose TMA TOEIC ?</h2>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Everything you need to ace the TOEIC exam in one comprehensive platform
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<Card key={index} className="border-border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card backdrop-blur-sm">
							<CardContent className="p-8 text-center">
								<div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
									<feature.icon className="w-8 h-8 text-primary-foreground" />
								</div>
								<h3 className="text-xl font-semibold mb-3 text-card-foreground ">{feature.title}</h3>
								<p className="text-muted-foreground leading-relaxed ">{feature.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="bg-muted/50 backdrop-blur-sm py-16">
				<div className="container mx-auto px-6">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold mb-4 text-foreground ">Success Stories</h2>
						<p className="text-xl text-muted-foreground ">See how our students achieved their goals</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<Card key={index} className="border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
								<CardContent className="p-8">
									<div className="flex mb-4">
										{[...Array(5)].map((_, i) => (
											<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
										))}
									</div>
									<blockquote className="text-lg text-card-foreground mb-6 italic leading-relaxed ">
										"{testimonial.quote}"
									</blockquote>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-semibold text-card-foreground ">{testimonial.name}</p>
											<p className="text-sm text-muted-foreground ">TOEIC Student</p>
										</div>
										<div className="text-right">
											<p className="text-2xl font-bold text-primary ">{testimonial.score}</p>
											<p className="text-sm text-muted-foreground ">TOEIC Score</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="container mx-auto px-6 py-16">
				<div className="bg-primary p-12 text-center text-primary-foreground shadow-2xl rounded-2xl">
					<h2 className="text-4xl font-bold mb-4 ">Ready to Start Your TOEIC Journey?</h2>
					<p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto ">
						Join thousands of successful students. Start your free trial today and see the difference.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="bg-card text-primary hover:bg-card/90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ">
							Start Free Demo
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}