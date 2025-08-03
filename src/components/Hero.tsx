import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "../assets/banner/banner1.png";
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
}

const heroImages = [heroImage, heroImage2, heroImage3];

const Hero: React.FC<HeroProps> = ({ onShopNow, content }) => {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % heroImages.length);
		}, 10000); // 10 seconds
		return () => clearInterval(interval);
	}, []);

	const currentContent = content?.[current];

	return (
		<section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
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
				<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
			</div>

			{/* Floating Elements */}
			<div className="absolute top-20 left-10 opacity-20">
				<Sparkles className="h-8 w-8 text-accent float-animation" />
			</div>
			<div className="absolute bottom-32 right-16 opacity-20">
				<Sparkles
					className="h-6 w-6 text-primary float-animation"
					style={{ animationDelay: "2s" }}
				/>
			</div>

			{/* Content */}
			{currentContent && (
				<div className="relative z-10 text-center max-w-4xl mx-auto px-4">
					<div className="fade-in-up">
						{currentContent.tagline && (
							<span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium mb-6">
								{currentContent.tagline}
							</span>
						)}

						{currentContent.title && (
							<h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
								{currentContent.title}
							</h1>
						)}

						{currentContent.subtitle && (
							<p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
								{currentContent.subtitle}
							</p>
						)}

						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<button onClick={onShopNow} className="btn-boutique group">
								<span>Shop Collection</span>
								<ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</button>

							<button className="btn-secondary group">
								<span>View Lookbook</span>
							</button>
						</div>
					</div>
				</div>
			)}
			{/* Scroll Indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
				{/* Dots Navigation */}

				<div className="flex flex-col items-center text-white/70">
					<span className="text-sm mb-2">Scroll to explore</span>
					<div className="w-px h-8 bg-white/30 animate-pulse" />
				</div>
				<div className="flex gap-2 mb-4">
					{heroImages.map((_, idx) => (
						<button
							key={idx}
							onClick={() => setCurrent(idx)}
							aria-label={`Go to slide ${idx + 1}`}
							className={`w-3 h-3 rounded-full border-2 transition-all duration-300 focus:outline-none
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