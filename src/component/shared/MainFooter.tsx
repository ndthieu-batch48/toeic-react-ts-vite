import { TmaLogo } from "./TmaLogo";
import { FacebookIcon, LinkedInIcon, TikTokIcon, YouTubeIcon } from "./SocialMediaIcon";
import { TMA_INFO, APP_INFO } from "../const/appConst";
import { Separator } from "@/component/ui/separator";
import { Button } from "@/component/ui/button";

export function MainFooter() {
	return (
		<footer className="bg-primary text-primary-foreground py-3">
			<div className="mx-auto flex flex-col items-center text-center space-y-2 px-4">

				<TmaLogo className="h-15 w-auto" />

				<p className="w-full max-w-2xl">
					{APP_INFO.INTRODUCTION}
				</p>

				{/* Social Media Section */}
				<div className="space-y-1">
					<h3 className="text-sm font-medium">Follow Us</h3>

					<div className="flex items-center">
						{[
							{ href: TMA_INFO.FACEBOOK, icon: FacebookIcon, label: "Facebook" },
							{ href: TMA_INFO.LINKEDIN, icon: LinkedInIcon, label: "LinkedIn" },
							{ href: TMA_INFO.TIKTOK, icon: TikTokIcon, label: "TikTok" },
							{ href: TMA_INFO.YOUTUBE, icon: YouTubeIcon, label: "YouTube" },
						].map(({ href, icon: Icon, label }) => (
							<Button
								key={label}
								variant="ghost"
								size="icon"
								asChild
								className="h-10 w-10"
							>
								<a
									href={href}
									aria-label={`Follow us on ${label}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Icon className="h-5 w-5" />
								</a>
							</Button>
						))}
					</div>
				</div>

				{/* Separator */}
				<Separator className="my-3 w-full max-w-2xl" />

				{/* Copyright Section */}
				<p className="text-sm">
					{APP_INFO.FOOTER_COPYRIGHT}
				</p>

			</div>
		</footer>
	);
}