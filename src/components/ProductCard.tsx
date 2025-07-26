import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../types";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";

interface ProductCardProps {
	product: Product;
	onAddToCart: (product: Product) => void;
	onViewProduct: (product: Product) => void;
	isFavorite?: boolean;
	onToggleFavorite?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onAddToCart,
	onViewProduct,
	isFavorite = false,
	onToggleFavorite,
}) => {
	const [open, setOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	// Generate multiple images for each product (using the same image for demo)
	const productImages = [
		product.image,
		product.image, // In real app, these would be different images
		product.image,
	];

	// Auto-slide on hover
	useEffect(() => {
		if (!isHovered) return;

		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
		}, 2000); // Change image every 2 seconds

		return () => clearInterval(interval);
	}, [isHovered, productImages.length]);

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
	};

	const prevImage = () => {
		setCurrentImageIndex(
			(prev) => (prev - 1 + productImages.length) % productImages.length
		);
	};

	const handleModalOpen = () => {
		setOpen(true);
		setCurrentImageIndex(0);
	};

	return (
		<div className="product-card group cursor-pointer">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<div
						className="relative overflow-hidden rounded-xl mb-4"
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<img
							src={productImages[currentImageIndex]}
							alt={product.name}
							className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
							onClick={handleModalOpen}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

						{/* Image indicators */}
						<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
							{productImages.map((_, index) => (
								<div
									key={index}
									className={`w-2 h-2 rounded-full transition-all duration-300 ${
										index === currentImageIndex ? "bg-white" : "bg-white/50"
									}`}
								/>
							))}
						</div>

						{/* Quick actions */}
						<div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<button
								className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
								onClick={(e) => {
									e.stopPropagation();
									onToggleFavorite && onToggleFavorite(product);
								}}
								aria-label={
									isFavorite ? "Remove from favorites" : "Add to favorites"
								}
							>
								{isFavorite ? (
									<Heart className="h-4 w-4 text-red-500 fill-red-500" />
								) : (
									<Heart className="h-4 w-4 text-muted-foreground" />
								)}
							</button>
						</div>

						{/* Featured badge */}
						{product.featured && (
							<div className="absolute top-4 left-4">
								<span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
									Featured
								</span>
							</div>
						)}
					</div>
				</DialogTrigger>
				<DialogContent className="max-w-4xl p-0 bg-transparent shadow-none border-none flex items-center justify-center">
					<div className="relative w-full h-auto max-h-[80vh]">
						<img
							src={productImages[currentImageIndex]}
							alt={product.name}
							className="w-full h-auto max-h-[80vh] object-contain rounded-xl animate-zoom-in"
							style={{ animation: "zoomIn 0.4s cubic-bezier(0.4,0,0.2,1)" }}
						/>

						{/* Navigation buttons */}
						<button
							onClick={prevImage}
							className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
						>
							<ChevronLeft className="h-6 w-6" />
						</button>
						<button
							onClick={nextImage}
							className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
						>
							<ChevronRight className="h-6 w-6" />
						</button>

						{/* Image counter */}
						<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
							{currentImageIndex + 1} / {productImages.length}
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<div className="space-y-3">
				<div>
					<h3
						className="font-playfair font-semibold text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer"
						onClick={() => onViewProduct(product)}
					>
						{product.name}
					</h3>
					<p className="text-muted-foreground text-sm line-clamp-2">
						{product.description}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-xl font-semibold text-primary">
						₹{product.price.toLocaleString()}
					</span>
					<span className="text-xs text-muted-foreground capitalize bg-muted px-2 py-1 rounded-full">
						{product.category}
					</span>
				</div>

				<button
					onClick={() => onAddToCart(product)}
					className="btn-boutique w-full flex items-center justify-center space-x-2"
				>
					<ShoppingCart className="h-4 w-4" />
					<span>Add to Cart</span>
				</button>
			</div>
		</div>
	);
};

export default ProductCard;

// Add keyframes for zoom-in animation
// In your global CSS (e.g., index.css or App.css), add:
// @keyframes zoomIn {
//   0% { transform: scale(0.8); opacity: 0; }
//   100% { transform: scale(1); opacity: 1; }
// }
