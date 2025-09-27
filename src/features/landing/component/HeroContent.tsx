import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HERO_CONTENT } from "../const/landing_const";

export function HeroContent() {
	return (
		<section className="container mx-auto px-6 py-12">
			<div className="text-center mb-12">
				<h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
					{HERO_CONTENT.title}
					<br />
					<span className="text-primary">{HERO_CONTENT.subtitle}</span>
				</h1>
				<p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
					{HERO_CONTENT.description}
				</p>
				<div className="flex gap-4 justify-center items-center">
					<Button size="lg" className="cursor-pointer">
						{HERO_CONTENT.buttonText}
						<ArrowRight className="ml-2 w-5 h-5" />
					</Button>
				</div>
			</div>
		</section>
	);
}