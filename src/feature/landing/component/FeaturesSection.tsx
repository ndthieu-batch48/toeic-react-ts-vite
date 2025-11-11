import { Card, CardContent } from "@/shadcn/component/ui/card";
import { FEATURES, FEATURES_SECTION } from "../const/landing_const";

export function FeaturesSection() {
	return (
		<section className="container mx-auto px-6 py-16">
			<div className="text-center mb-12">
				<h2 className="text-4xl font-bold mb-4 text-foreground ">{FEATURES_SECTION.title}</h2>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					{FEATURES_SECTION.description}
				</p>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				{FEATURES.map((feature, index) => (
					<Card key={index} className="border-border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card backdrop-blur-sm">
						<CardContent className="p-8 text-center">
							<div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
								<feature.icon className="w-8 h-8 text-primary-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
							<p className="text-muted-foreground leading-relaxed">{feature.description}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}