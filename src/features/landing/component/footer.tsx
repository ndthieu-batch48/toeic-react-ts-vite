import { TmaLogo } from "./tma-logo";

export function LandingFooter() {
	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="container mx-auto px-6">
				<div className="grid md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center space-x-3 mb-4">
							<TmaLogo />
							<span className="text-xl font-bold">TMA TOEIC</span>
						</div>
						<p className="text-gray-400 leading-relaxed">
							The most comprehensive TOEIC preparation platform trusted by students worldwide.
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Product</h4>
						<ul className="space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white transition-colors">Practice Tests</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Score Tracking</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Study Plans</a></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Company</h4>
						<ul className="space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Support</h4>
						<ul className="space-y-2 text-gray-400">
							<li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
							<li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
						</ul>
					</div>
				</div>
				<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
					<p>&copy; 2025 TMA TOEIC. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)

}