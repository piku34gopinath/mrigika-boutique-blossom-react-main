import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import VideoSection from "../components/VideoSection";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import { Star, Truck, Shield, RefreshCw } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "../components/ui/carousel";
import sareeImg from "../assets/saree/cookiesSaree1.jpg";
import lehengaImg from "../assets/saree/saree2.jpg";
import customizedImg from "../assets/saree/saree3.jpg";
import kidsImg from "../assets/jewelry-product.jpg";

const featuredProducts: Product[] = [
    // Replace with actual data fetching later
    { id: '1', name: 'Elegant Saree', price: 1999, image: [sareeImg], category: 'sarees' },
    { id: '2', name: 'Designer Lehenga', price: 4999, image: [lehengaImg], category: 'lehengas' },
    { id: '3', name: 'Customized Gown', price: 7999, image: [customizedImg], category: 'customized' },
];

const HomePage: React.FC = () => {
	const navigate = useNavigate();

	const features = [
		{
			icon: <Truck className="h-8 w-8 text-primary" />,
			title: "Free Shipping",
			description: "Free delivery on orders above ₹1999",
		},
		{
			icon: <Shield className="h-8 w-8 text-primary" />,
			title: "Secure Payment",
			description: "100% secure payment processing",
		},
		{
			icon: <RefreshCw className="h-8 w-8 text-primary" />,
			title: "Easy Returns",
			description: "7-day hassle-free return policy",
		},
		{
			icon: <Star className="h-8 w-8 text-primary" />,
			title: "Premium Quality",
			description: "Handpicked premium fabrics and materials",
		},
	];

	const categories = [
		{
			key: "sarees",
			name: "Sarees",
			description: "Traditional handwoven sarees from Odisha",
		},
		{
			key: "lehengas",
			name: "Lehengas",
			description: "Elegant lehengas for special occasions",
		},
		{
			key: "customized",
			name: "Customized Garments",
			description: "Personalized designs tailored for you",
		},
		{
			key: "kids",
			name: "Kids Collection",
			description: "Beautiful ethnic wear for children",
		},
	];

	const categoryImages = {
		sarees: sareeImg,
		lehengas: lehengaImg,
		customized: customizedImg,
		kids: kidsImg,
	};

	const handleViewCategory = (categoryKey: string) => {
		navigate(`/shop?category=${categoryKey}`);
	};

	const heroContent = [
		null, // For the first image
		{
			tagline: "✨ New Kurtis Collection",
			title: (
				<>
					Comfort
					<span className="block bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
						in Style
					</span>
				</>
			),
			subtitle:
				"Discover our range of elegant and comfortable kurtis, perfect for any occasion.",
		},
		{
			tagline: "✨ Stunning Accessories",
			title: (
				<>
					The Final
					<span className="block bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
						Touch
					</span>
				</>
			),
			subtitle:
				"Complete your look with our exquisite collection of handcrafted jewelry.",
		},
	];

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<div className="fade-in scale-up animate-hero">
				<Hero onShopNow={() => navigate("/shop")} content={heroContent} />
			</div>

			{/* Video Section */}
			<div className="fade-in slide-up">
				<VideoSection />
			</div>

		

			{/* Product Categories Section */}
			<section className="py-16 fade-in slide-up">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-playfair font-bold mb-4 text-primary">
							Our Collections
						</h2>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Explore our diverse range of handcrafted ethnic wear and
							customized garments
						</p>
					</div>

					{/* Category Carousel */}
					<div className="fade-in slide-in-left animate-carousel">
						<Carousel
							opts={{ loop: true, align: "center" }}
							className="mb-16 w-full"
						>
							<CarouselContent>
								{categories.map((category) => (
									<CarouselItem key={category.key}>
										<div
											className="relative cursor-pointer group rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-glow animate-pop"
											style={{ animationDelay: "0.5s", height: "400px" }}
											onClick={() => handleViewCategory(category.key)}
										>
											<img
												src={
													categoryImages[
														category.key as keyof typeof categoryImages
													]
												}
												alt={category.name}
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
											/>
											<div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-end opacity-90 group-hover:opacity-100 transition-opacity">
												<h3 className="text-3xl font-playfair font-bold text-white mb-2 drop-shadow-lg">
													{category.name}
												</h3>
												<p className="text-white text-lg drop-shadow-md">
													{category.description}
												</p>
											</div>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section className="py-16 bg-secondary/30 fade-in slide-up">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-playfair font-bold mb-4 text-primary">
							Featured Collection
						</h2>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Discover our handpicked selection of the finest pieces from our
							latest collection
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
						{featuredProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
							/>
						))}
					</div>

					<div className="text-center">
						<button onClick={() => navigate("/shop")} className="btn-boutique">
							View All Products
						</button>
					</div>
				</div>
			</section>

				{/* Features Section */}
				<section className="py-16 bg-muted/30 fade-in slide-up">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className={`text-center p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300 fade-in slide-up animate-feature-card`}
								style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
							>
								<div className="flex justify-center mb-4">{feature.icon}</div>
								<h3 className="font-playfair font-semibold text-lg mb-2 text-primary">
									{feature.title}
								</h3>
								<p className="text-muted-foreground text-sm">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* About Section */}
			<section className="py-16 bg-secondary fade-in slide-up">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl font-playfair font-bold mb-6 text-primary">
							About Mrigika
						</h2>
						<p className="text-lg text-muted-foreground leading-relaxed mb-8">
							At Mrigika, we celebrate the rich heritage of Odisha handloom
							craftsmanship. Every piece in our collection is a testament to the
							skilled artisans who weave stories into fabric. From traditional
							Sambalpuri sarees to contemporary lehengas, customized garments to
							beautiful kids' wear, we bring you authentic handloom creations
							that embody the essence of Odisha's textile tradition.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="https://www.instagram.com/mrigika/?igsh=MTAwazc0MTA0N29jbQ=="
								target="_blank"
								rel="noopener noreferrer"
								className="btn-secondary"
							>
								Our Story on Instagram
							</a>
							<button onClick={() => navigate("/contact")} className="btn-secondary">Visit Our Store</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;