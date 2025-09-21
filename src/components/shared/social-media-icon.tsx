import { cn } from "@/lib/utils"
import FACEBOOK_LOGO from "@/assets/icons/facebook.svg"
import LINKEDIN_LOGO from "@/assets/icons/linkedin.svg"
import TIKTOK_LOGO from "@/assets/icons/tiktok.svg"
import YOUTUBE_LOGO from "@/assets/icons/youtube.svg"
import GOOGLE_LOGO from "@/assets/icons/google.svg"

export const LinkedInIcon = ({ className }: React.ComponentProps<"div">) => {
	return (
		<img src={LINKEDIN_LOGO} alt="LinkedIn" className={cn("w-6 h-6", className)} />
	)
}

export const FacebookIcon = ({ className }: React.ComponentProps<"div">) => {
	return (
		<img src={FACEBOOK_LOGO} alt="Facebook" className={cn("w-6 h-6", className)} />
	)
}

export const TikTokIcon = ({ className }: React.ComponentProps<"div">) => {
	return (
		<img src={TIKTOK_LOGO} alt="TikTok" className={cn("w-6 h-6", className)} />
	)
}

export const YouTubeIcon = ({ className }: React.ComponentProps<"div">) => {
	return (
		<img src={YOUTUBE_LOGO} alt="YouTube" className={cn("w-6 h-6", className)} />
	)
}

export const GoogleIcon = ({ className }: React.ComponentProps<"div">) => {
	return (
		<img src={GOOGLE_LOGO} alt="Google" className={cn("w-6 h-6", className)} />
	)
}
