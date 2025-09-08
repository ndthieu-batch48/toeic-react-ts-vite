import { Button } from "@/components/ui/button";
import { TmaLogo } from "../../../components/tma-logo";
import { Link } from "@tanstack/react-router";

export function LandingHeader() {
	return (
		<header className="container mx-auto bg-primary-foreground">
			<nav className="flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<TmaLogo />
					<span className="text-2xl font-bold bg-primary bg-clip-text text-transparent">
						TMA TOEIC
					</span>
				</div>
				<div className="flex items-center space-x-4">
					<Button asChild variant="link" className="px-1">
						<Link to="/login">Login</Link>
					</Button>

					<Button className="bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-300">
						Try a Demo
					</Button>
				</div>
			</nav>
		</header>
	)
}