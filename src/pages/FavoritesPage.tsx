import React from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

interface FavoritesPageProps {
	favorites: Product[];
	onViewProduct: (product: Product) => void;
	onRemoveFavorite: (product: Product) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({
	favorites,
	onViewProduct,
	onRemoveFavorite,
}) => {
	return (
		<div className="container mx-auto px-4 py-12 min-h-screen">
			<h2 className="text-4xl font-playfair font-bold mb-8 text-primary text-center">
				Your Favorites
			</h2>
			{favorites.length === 0 ? (
				<div className="text-center text-muted-foreground text-lg">
					No favorite products yet.
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{favorites.map((product) => (
						<div key={product.id} className="relative">
							<ProductCard
								product={product}
								onViewProduct={onViewProduct}
								onAddToCart={() => {}}
							/>
							<button
								className="absolute top-2 right-2 bg-white/80 rounded-full p-2 shadow hover:bg-red-100"
								onClick={() => onRemoveFavorite(product)}
								aria-label="Remove from favorites"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 text-red-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FavoritesPage;
