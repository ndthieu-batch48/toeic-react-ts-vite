import TMA_LOGO from "@/assets/images/tma_logo.png";

export function TmaLogo() {
	return (
		<div className="w-20 h-20 p-1	bg-primary rounded-2xl flex items-center justify-center">
			<img src={TMA_LOGO} alt="TMA Solutions" />
		</div>
	);
}
