import TMA_LOGO from "@/assets/images/tma_logo.png";
import { cn } from "@/lib/utils";

export function TmaLogo({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={
			cn("w-full h-full bg-primary rounded-lg flex items-center justify-center overflow-hidden p-2", className)}{...props}>
			<img src={TMA_LOGO} alt="TMA Solutions" className="max-w-full max-h-full object-contain" />
		</div>
	);
}
