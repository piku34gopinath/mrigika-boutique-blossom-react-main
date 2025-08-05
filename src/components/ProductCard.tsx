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

	const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation(); // Crucial: Stop event propagation here
		setCurrentImageIndex((prev) => {
			const newIndex = (prev + 1) % (product.image?.length || 1);
			console.log('Next Image Clicked, new index:', newIndex);
			return newIndex;
		});
	};

	const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation(); // Crucial: Stop event propagation here
		setCurrentImageIndex((prev) => {
			const newIndex = (prev - 1 + (product.image?.length || 1)) % (product.image?.length || 1);
			console.log('Previous Image Clicked, new index:', newIndex);
			return newIndex;
		});
	};

	const handleModalOpen = () => {
		setOpen(true);
		setCurrentImageIndex(0);
		console.log("Modal Opened!"); // Confirm modal opening
	};

	const handleViewProduct = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ensure this click doesn't propagate further
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
		<div className="product-card group">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<div
						className="relative overflow-hidden rounded-xl mb-4 cursor-pointer aspect-w-1 aspect-h-1 sm:aspect-auto sm:h-80" /* Responsive aspect ratio and height */
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
                        onClick={(e) => {e.stopPropagation(); handleModalOpen()}}
					>
						<img
							src={product.image?.[currentImageIndex] || ''}
							alt={product.name}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
									<Heart className="h-4 w-4" />
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
				<DialogContent className="max-w-xs sm:max-w-2xl md:max-w-4xl p-0 bg-transparent shadow-none border-none flex items-center justify-center"> {/* Responsive max-width */}
					<div className="relative w-full h-auto max-h-[70vh] sm:max-h-[80vh]"> {/* Responsive max-height */}
						<img
							src={product.image?.[currentImageIndex] || ''}
							alt={product.name}
							className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-xl animate-zoom-in cursor-pointer" /* Responsive max-height */
							style={{ animation: "zoomIn 0.4s cubic-bezier(0.4,0,0.2,1)" }}
							onClick={handleViewProduct}
						/>

						{/* Navigation buttons */}
						<button
							onClick={prevImage}
							className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 hover:scale-110 z-10" /* Responsive position and padding */
						>
							<ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Responsive size */}
						</button>
						<button
							onClick={nextImage}
							className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 hover:scale-110 z-10" /* Responsive position and padding */
						>
							<ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Responsive size */}
						</button>

						{/* Image counter */}
						<div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm z-10"> {/* Responsive position, padding, font size */}
							{currentImageIndex + 1} / {product.image?.length || 1}
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<div className="space-y-2 sm:space-y-3"> {/* Adjusted spacing */}
				<div>
					<h3
						className="font-playfair font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors cursor-pointer" /* Responsive font size */
						onClick={handleViewProduct}
					>
						{product.name}
					</h3>
					<p className="text-muted-foreground text-xs sm:text-sm line-clamp-2"> {/* Responsive font size */}
						{product.description}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-lg sm:text-xl font-semibold text-primary"> {/* Responsive font size */}
						₹{product.price.toLocaleString()}
					</span>
					<span className="text-xs text-muted-foreground capitalize bg-muted px-2 py-1 rounded-full">
						{product.category}
					</span>
				</div>

				<button
					onClick={handleAddToCart}
					className="btn-boutique w-full flex items-center justify-center space-x-2 text-sm sm:text-base px-4 py-2 sm:px-auto sm:py-auto" /* Responsive padding and font size */
				>
					<ShoppingCart className="h-4 w-4" />
					<span>Add to Cart</span>
				</button>
			</div>
		</div>
	);
};

export default ProductCard;