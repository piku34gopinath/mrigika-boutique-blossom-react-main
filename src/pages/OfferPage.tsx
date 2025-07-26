import React, { useEffect, useState } from "react";

const offers = [
	{
		title: "Basic Offer",
		subtitle: "Welcome Bonus",
		description:
			"Get 20% OFF on your first purchase! Use code: WELCOME20 at checkout.",
		cta: "Shop Now",
		date: "",
		image: "https://img.icons8.com/color/96/discount--v1.png",
		backgroundImage:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
		details:
			"Valid for new customers only. Minimum purchase ₹999. Cannot be combined with other offers.",
	},
	{
		title: "Shop Anniversary Offer",
		subtitle: "11th August Only",
		description:
			"Flat 50% OFF on everything! Celebrate our anniversary with us.",
		cta: "Celebrate Now",
		date: "11th August",
		image: "https://img.icons8.com/color/96/birthday-cake--v1.png",
		backgroundImage:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
		details:
			"No minimum purchase. Offer valid only on 11th August. Limited stock available.",
	},
	{
		title: "Independence Day Offer",
		subtitle: "Freedom Sale",
		description:
			"Special deals to celebrate freedom! Extra 15% OFF on ethnic wear.",
		cta: "View Offers",
		date: "15th August",
		image: "https://img.icons8.com/color/96/independence-day.png",
		backgroundImage:
			"https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
		details:
			"Use code: FREEDOM15. Valid on select categories. Offer ends 15th August.",
	},
	{
		title: "Clearance Sale",
		subtitle: "Last Chance",
		description:
			"Up to 70% OFF on clearance items. Grab your favorites before they're gone!",
		cta: "Shop Clearance",
		date: "",
		image: "https://img.icons8.com/color/96/sale--v1.png",
		backgroundImage:
			"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
		details:
			"Discount applied at checkout. No returns on clearance items. While stocks last.",
	},
];

const OFFERS_PER_VIEW = 1;
const SLIDE_INTERVAL = 10000; // 10 seconds

const OfferPage: React.FC = () => {
	const [startIdx, setStartIdx] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setStartIdx((prev) => (prev + OFFERS_PER_VIEW) % offers.length);
		}, SLIDE_INTERVAL);
		return () => clearInterval(interval);
	}, []);

	const visibleOffers = [offers[startIdx]];

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-background">
			<h1 className="text-4xl font-extrabold font-playfair text-primary mb-8 animate-fade-in">
				Special Offers
			</h1>
			<div className="relative w-full flex justify-center items-center overflow-hidden">
				<div
					className="flex transition-transform duration-700 animate-slide-in-up w-full justify-center"
					style={{ transform: `translateX(0)` }}
				>
					{visibleOffers.map((offer, idx) => (
						<div
							key={offer.title}
							className="relative bg-card rounded-3xl shadow-2xl border-4 border-primary flex flex-col md:flex-row items-center px-8 py-12 animate-pop overflow-hidden"
							style={{
								animationDelay: `${idx * 0.2}s`,
								width: "90vw",
								maxWidth: "1100px",
								minHeight: "480px",
							}}
						>
							{/* Background image */}
							<div
								className="absolute inset-0 w-full h-full z-0"
								style={{
									backgroundImage: `url(${offer.backgroundImage})`,
									backgroundSize: "cover",
									backgroundPosition: "center",
									opacity: 0.18,
									filter: "blur(1px)",
								}}
								aria-hidden="true"
							/>
							{/* Overlay for readability */}
							<div
								className="absolute inset-0 bg-background/70 z-10"
								aria-hidden="true"
							/>
							{/* Offer Content */}
							<div className="relative z-20 flex-shrink-0 flex items-center justify-center w-56 h-56 md:w-72 md:h-72 mr-0 md:mr-10 mb-8 md:mb-0 animate-bounce-slow bg-secondary rounded-2xl overflow-hidden">
								<img
									src={offer.image}
									alt={offer.title}
									className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-xl animate-fade-in"
									style={{ animationDelay: "0.2s" }}
									onError={(e) => (e.currentTarget.style.display = "none")}
								/>
							</div>
							<div
								className="relative z-20 flex-1 flex flex-col justify-center items-start animate-fade-in"
								style={{ animationDelay: "0.4s" }}
							>
								<h2 className="text-4xl font-bold text-primary mb-2 text-left animate-slide-in-left">
									{offer.title}
								</h2>
								{offer.subtitle && (
									<div className="text-lg text-accent mb-1 animate-fade-in delay-200">
										{offer.subtitle}
									</div>
								)}
								{offer.date && (
									<div className="text-sm text-muted-foreground mb-1 animate-fade-in delay-300">
										{offer.date}
									</div>
								)}
								<p className="text-2xl text-muted-foreground mb-4 animate-slide-in-right">
									{offer.description}
								</p>
								<div className="text-base text-muted-foreground mb-6 animate-fade-in delay-500">
									{offer.details}
								</div>
								<button className="btn-boutique px-10 py-4 text-xl animate-pop delay-700">
									{offer.cta}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="flex gap-2 mt-8">
				{offers.map((_, i) => (
					<span
						key={i}
						className={`w-3 h-3 rounded-full ${
							startIdx === i ? "bg-primary" : "bg-border"
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default OfferPage;
