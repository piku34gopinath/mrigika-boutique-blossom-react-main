import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "../assets/banner/banner2.png";
import heroImage2 from "../assets/kurti-product.jpg";
import heroImage3 from "../assets/jewelry-product.jpg";

interface HeroContent {
	title?: React.ReactNode;
	subtitle?: string;
	tagline?: string;
}

interface HeroProps {
	onShopNow: () => void;
	content?: (HeroContent | null)[];
	resetTrigger: number;
}

const heroImages = [heroImage, heroImage2, heroImage3];

const Hero: React.FC<HeroProps> = ({ onShopNow, content, resetTrigger }) => {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		setCurrent(0);
	}, [resetTrigger]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % heroImages.length);
		}, 10000); // 10 seconds
		return () => clearInterval(interval);
	}, []);

	const currentContent = content?.[current];

	return (
		<section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden py-10 md:py-0"> {/* Responsive height and padding */}
			{/* Background Images Slider */}
			<div className="absolute inset-0">
				{heroImages.map((img, idx) => (
					<img
						key={img}
						src={img}
						alt="Mrigika Boutique Collection"
						className={`w-full h-full object-cover transition-opacity duration-1000 absolute inset-0 ${
							idx === current ? "opacity-100 z-0" : "opacity-0 z-0"
						}`}
						style={{ transitionProperty: "opacity" }}
					/>
				))}
				<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" /> {/* Adjusted gradient */}
			</div>

			{/* Floating Elements */}
			<div className="absolute top-10 left-5 sm:top-20 sm:left-10 opacity-20"> {/* Responsive position */}
				<Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-accent float-animation" /> {/* Responsive size */}
			</div>
			<div className="absolute bottom-10 right-5 sm:bottom-32 sm:right-16 opacity-20"> {/* Responsive position */}
				<Sparkles
					className="h-5 w-5 sm:h-6 sm:w-6 text-primary float-animation" /* Responsive size */
					style={{ animationDelay: "2s" }}
				/>
			</div>

			{/* Content */}
			{currentContent && (
				<div className="relative z-10 text-center max-w-xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Responsive max-width and padding */}
					<div className="fade-in-up">
						{currentContent.tagline && (
							<span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs sm:text-sm font-medium mb-4 sm:mb-6"> {/* Responsive padding, font size, margin */}
								{currentContent.tagline}
							</span>
						)}

						{currentContent.title && (
							<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-4 sm:mb-6 leading-tight"> {/* Responsive font size, margin */}
								{currentContent.title}
							</h1>
						)}

						{currentContent.subtitle && (
							<p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed"> {/* Responsive font size, margin, max-width */}
								{currentContent.subtitle}
							</p>
						)}

						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"> {/* Responsive gap */}
							<button onClick={onShopNow} className="btn-boutique group text-sm sm:text-base px-6 py-2.5 sm:px-8 sm:py-3"> {/* Responsive padding and font size */}
								<span>Shop Collection</span>
							</button>

							<button className="btn-secondary group text-sm sm:text-base px-6 py-2.5 sm:px-8 sm:py-3"> {/* Responsive padding and font size */}
								<span>View Lookbook</span>
							</button>
						</div>
					</div>
				</div>
			)}
			{/* Scroll Indicator */}
			<div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"> {/* Responsive bottom position */}
				<div className="flex flex-col items-center text-white/70">
					<span className="text-xs sm:text-sm mb-1 sm:mb-2">Scroll to explore</span> {/* Responsive font size and margin */}
					<div className="w-px h-6 sm:h-8 bg-white/30 animate-pulse" /> {/* Responsive height */}
				</div>
				<div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-4"> {/* Responsive gap and margin */}
					{heroImages.map((_, idx) => (
						<button
							key={idx}
							onClick={() => setCurrent(idx)}
							aria-label={`Go to slide ${idx + 1}`}
							className={`w-2.5 h-2.5 sm:w-3 h-3 rounded-full border-2 transition-all duration-300 focus:outline-none
								${
									current === idx
										? "bg-primary border-primary scale-125 shadow-glow"
										: "bg-white/40 border-white/60 hover:bg-primary/60 hover:border-primary"
								}
							`}
							style={{ outline: "none" }}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Hero;