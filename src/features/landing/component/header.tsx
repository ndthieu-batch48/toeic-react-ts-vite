import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/features/auth/components/auth-dialog";
import { TmaLogo } from "./tma-logo";

export function LandingHeader() {

	return (
		<header className="container mx-auto px-6 py-6">
			<nav className="flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<TmaLogo />
					<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						TMA TOEIC
					</span>
				</div>
				<div className="flex items-center space-x-4">
					<AuthDialog>
						<Button variant="link" className="px-1">
							Login
						</Button>
					</AuthDialog>
					<Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
						Try a Demo
					</Button>
				</div>
			</nav>
		</header>
	)
}