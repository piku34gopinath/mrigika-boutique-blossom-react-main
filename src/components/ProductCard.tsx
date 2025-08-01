import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../types";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { useAppContext } from "../context/AppContext";

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const navigate = useNavigate();
	const { addToCart, toggleFavorite, isFavorite } = useAppContext();
	const [open, setOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	// Auto-slide on hover
	useEffect(() => {
		if (!isHovered) return;

		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % (product.image?.length || 1));
		}, 2000); // Change image every 2 seconds

		return () => clearInterval(interval);
	}, [isHovered, product.image?.length]);

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % (product.image?.length || 1));
	};

	const prevImage = () => {
		setCurrentImageIndex(
			(prev) => (prev - 1 + (product.image?.length || 1)) % (product.image?.length || 1)
		);
	};

	const handleModalOpen = () => {
		setOpen(true);
		setCurrentImageIndex(0);
	};

	const handleViewProduct = () => {
		navigate(`/products/${product.id}`);
	};

	const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
		addToCart(product);
	};

	const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
		toggleFavorite(product);
	};

	return (
		<div className="product-card group cursor-pointer" onClick={handleViewProduct}>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<div
						className="relative overflow-hidden rounded-xl mb-4"
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
                        onClick={(e) => {e.stopPropagation(); handleModalOpen()}}
					>
						<img
							src={product.image?.[currentImageIndex] || ''}
							alt={product.name}
							className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

						{/* Image indicators */}
						<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
							{product.image?.map((_, index) => (
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
								onClick={handleToggleFavorite}
								aria-label={
									isFavorite(product) ? "Remove from favorites" : "Add to favorites"
								}
							>
								{isFavorite(product) ? (
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
							src={product.image?.[currentImageIndex] || ''}
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
							{currentImageIndex + 1} / {product.image?.length || 1}
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<div className="space-y-3">
				<div>
					<h3
						className="font-playfair font-semibold text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer"
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
					onClick={handleAddToCart}
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
