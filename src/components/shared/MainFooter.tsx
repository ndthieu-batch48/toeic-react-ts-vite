import { TmaLogo } from "./TmaLogo";
import { FacebookIcon, LinkedInIcon, TikTokIcon, YouTubeIcon } from "./SocialMediaIcon";
import { TMA_INFO, APP_INFO } from "../const/appConst";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function MainFooter() {
	return (
		<footer className="w-full h-80 bg-primary text-primary-foreground">
			<div className="flex flex-col items-center text-center pt-5">

				<TmaLogo className="h-15 w-auto" />

				<p className="w-full">
					{APP_INFO.INTRODUCTION}
				</p>

				{/* Social Media Section */}
				<h3 className="text-sm font-medium mt-5">Follow Us</h3>

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

				{/* Separator */}
				<Separator className="my-3" />

				{/* Copyright Section */}

				<p className="text-sm">
					{APP_INFO.FOOTER_COPYRIGHT}
				</p>

			</div>
		</footer>
	);
}