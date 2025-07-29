import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShopPageProps {
	products: Product[];
	onAddToCart: (product: Product) => void;
	onViewProduct: (product: Product) => void;
	initialCategory?: string;
	favorites: Product[];
	onToggleFavorite: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({
	products,
	onAddToCart,
	onViewProduct,
	initialCategory,
	favorites,
	onToggleFavorite,
}) => {
	const [selectedCategory, setSelectedCategory] = useState<string>(
		initialCategory || "all"
	);
	const [priceRange, setPriceRange] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("featured");
	const [showFilters, setShowFilters] = useState(false);

	useEffect(() => {
		if (initialCategory) {
			setSelectedCategory(initialCategory);
		}
	}, [initialCategory]);

	const categories = [
		{ id: "all", label: "All Products" },
		{ id: "sarees", label: "Sarees" },
		{ id: "kurtis", label: "Kurtis" },
		{ id: "lehengas", label: "Lehengas" },
		{ id: "accessories", label: "Accessories" },
	];

	const priceRanges = [
		{ id: "all", label: "All Prices" },
		{ id: "under-1000", label: "Under ₹1,000" },
		{ id: "1000-2000", label: "₹1,000 - ₹2,000" },
		{ id: "2000-5000", label: "₹2,000 - ₹5,000" },
		{ id: "above-5000", label: "Above ₹5,000" },
	];

	const sortOptions = [
		{ id: "featured", label: "Featured" },
		{ id: "price-low", label: "Price: Low to High" },
		{ id: "price-high", label: "Price: High to Low" },
		{ id: "name", label: "Name A-Z" },
	];

	const filteredAndSortedProducts = useMemo(() => {
		let filtered = products;

		// Filter by category
		if (selectedCategory !== "all") {
			filtered = filtered.filter(
				(product) => product.category === selectedCategory
			);
		}

		// Filter by price range
		if (priceRange !== "all") {
			filtered = filtered.filter((product) => {
				switch (priceRange) {
					case "under-1000":
						return product.price < 1000;
					case "1000-2000":
						return product.price >= 1000 && product.price < 2000;
					case "2000-5000":
						return product.price >= 2000 && product.price < 5000;
					case "above-5000":
						return product.price >= 5000;
					default:
						return true;
				}
			});
		}

		// Sort products
		switch (sortBy) {
			case "price-low":
				filtered.sort((a, b) => a.price - b.price);
				break;
			case "price-high":
				filtered.sort((a, b) => b.price - a.price);
				break;
			case "name":
				filtered.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "featured":
			default:
				filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
				break;
		}

		return filtered;
	}, [products, selectedCategory, priceRange, sortBy]);

	return (
		<div className="min-h-screen py-8">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-playfair font-bold mb-4">
						Shop Collection
					</h1>
					<p className="text-muted-foreground text-lg">
						Discover our complete range of elegant clothing and accessories
					</p>
				</div>

				{/* Category Buttons */}
				<div className="flex flex-wrap justify-center gap-4 mb-8">
					{categories.map((category) => (
						<Button
							key={category.id}
							variant={selectedCategory === category.id ? "default" : "outline"}
							onClick={() => setSelectedCategory(category.id)}
							className="rounded-full"
						>
							{category.label}
						</Button>
					))}
				</div>

				{/* Filters and Sort */}
				<div className="mb-8">
					<div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
						{/* Mobile Filter Toggle */}
						<button
							onClick={() => setShowFilters(!showFilters)}
							className="lg:hidden btn-secondary flex items-center space-x-2"
						>
							<SlidersHorizontal className="h-4 w-4" />
							<span>Filters</span>
						</button>

						{/* Desktop Filters */}
						<div
							className={`${
								showFilters ? "block" : "hidden"
							} lg:flex flex-wrap gap-4 w-full lg:w-auto`}
						>
							{/* Price Filter */}
							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">
									Price Range
								</label>
								<select
									value={priceRange}
									onChange={(e) => setPriceRange(e.target.value)}
									className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
								>
									{priceRanges.map((range) => (
										<option key={range.id} value={range.id}>
											{range.label}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Sort */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-muted-foreground">
								Sort By
							</label>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
							>
								{sortOptions.map((option) => (
									<option key={option.id} value={option.id}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Results Count */}
				<div className="mb-6">
					<p className="text-muted-foreground">
						Showing {filteredAndSortedProducts.length} of {products.length}{" "}
						products
					</p>
				</div>

				{/* Products Grid */}
				{filteredAndSortedProducts.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{filteredAndSortedProducts.map((product) => (
							<div
								key={product.id}
								className="cursor-pointer"
								onClick={() => onViewProduct(product)}
							>
								<ProductCard
									product={product}
									onAddToCart={onAddToCart}
									onViewProduct={onViewProduct}
									isFavorite={favorites?.some((fav) => fav.id === product.id)}
									onToggleFavorite={onToggleFavorite}
								/>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">No products found</h3>
						<p className="text-muted-foreground mb-6">
							Try adjusting your filters to see more products
						</p>
						<button
							onClick={() => {
								setSelectedCategory("all");
								setPriceRange("all");
								setSortBy("featured");
							}}
							className="btn-secondary"
						>
							Clear Filters
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ShopPage;