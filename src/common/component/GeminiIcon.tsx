// GeminiIcon.tsx
import { Sparkle } from 'lucide-react';

export const GeminiGradientDefs = () => (
	<svg width="0" height="0" className="absolute">
		<defs>
			<linearGradient id="gemini-accurate" x1="100%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" style={{ stopColor: 'var(--gemini-blue)', stopOpacity: 1 }} />
				<stop offset="50%" style={{ stopColor: 'var(--gemini-blue)', stopOpacity: 0.95 }} />
				<stop offset="65%" style={{ stopColor: 'var(--gemini-red)', stopOpacity: 1 }} />
				<stop offset="80%" style={{ stopColor: 'var(--gemini-yellow)', stopOpacity: 1 }} />
				<stop offset="100%" style={{ stopColor: 'var(--gemini-green)', stopOpacity: 1 }} />
			</linearGradient>
		</defs>
	</svg>
);

export const GeminiIconFill = ({ size = 24, withGlow = true, className = '' }) => {
	return (
		<div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
			{withGlow && (
				<div className="absolute inset-0 blur-md opacity-60">
					<Sparkle
						size={size}
						style={{ stroke: 'url(#gemini-accurate)', fill: 'url(#gemini-accurate)' }}
						strokeWidth={2}
					/>
				</div>
			)}
			<Sparkle
				size={size}
				style={{ stroke: 'url(#gemini-accurate)', fill: 'url(#gemini-accurate)' }}
				strokeWidth={2}
				className="relative"
			/>
		</div>
	);
};

export const GeminiIconOutline = ({ size = 24, strokeWidth = 2, className = '' }) => {
	return (
		<div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
			<Sparkle
				size={size}
				style={{ stroke: 'url(#gemini-accurate)', fill: 'none' }}
				strokeWidth={strokeWidth}
			/>
		</div>
	);
};