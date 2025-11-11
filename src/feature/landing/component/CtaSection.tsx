import { Button } from "@/shadcn/component/ui/button";
import { CTA_SECTION } from "../const/landing_const";
import { Link } from "@tanstack/react-router";

export function CtaSection() {
	return (
		<section className="container mx-auto px-6 py-16">
			<div className="bg-primary p-12 text-center text-primary-foreground shadow-2xl rounded-2xl">
				<h2 className="text-4xl font-bold mb-4 ">{CTA_SECTION.title}</h2>
				<p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto ">
					{CTA_SECTION.description}
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						size="lg"
						className="bg-card text-primary hover:bg-card/90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
						asChild
					>
						<Link to="/test">
							{CTA_SECTION.buttonText}
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}