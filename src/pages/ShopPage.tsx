import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "../data/products"; // Import products from data/products.ts

const ShopPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category');

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
        { id: "customized", label: "Customized" },
		{ id: "kids", label: "Kids" },
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
		{ id: "price-low", label: "Price: Low to High" },		{ id: "price-high", label: "Price: High to Low" },
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
				// Add a default sort for featured if it's not a property on the product
				break;
		}

		return filtered;
	}, [products, selectedCategory, priceRange, sortBy]);

	return (
		<div className="min-h-screen py-6 sm:py-8"> {/* Adjusted vertical padding */}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted horizontal padding */}
				{/* Header */}
				<div className="mb-6 sm:mb-8"> {/* Adjusted margin */}
					<h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-2 sm:mb-4"> {/* Adjusted font size and margin */}
						Shop Collection
					</h1>
					<p className="text-base sm:text-lg text-muted-foreground">
						Discover our complete range of elegant clothing and accessories
					</p>
				</div>

				{/* Category Buttons */}
				<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8"> {/* Adjusted gap and margin */}
					{categories.map((category) => (
						<Button
							key={category.id}
							variant={selectedCategory === category.id ? "default" : "outline"}
							onClick={() => setSelectedCategory(category.id)}
							className="rounded-full text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2" /* Adjusted padding and font size */
						>
							{category.label}
						</Button>
					))}
				</div>

				{/* Filters and Sort */}
				<div className="mb-6 sm:mb-8">
					<div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"> {/* Changed lg to md for flex-direction change */}
						{/* Mobile Filter Toggle */}
						<button
							onClick={() => setShowFilters(!showFilters)}
							className="md:hidden btn-secondary flex items-center space-x-2 text-sm px-3 py-1.5" /* Adjusted mobile button classes */
						>
							<SlidersHorizontal className="h-4 w-4" />
							<span>Filters</span>
						</button>

						{/* Desktop Filters */}
						<div
							className={`${
								showFilters ? "block" : "hidden"
							} md:flex flex-wrap gap-4 w-full md:w-auto`} /* Changed lg to md */
						>
							{/* Price Filter */}
							<div className="space-y-2 w-full sm:w-auto"> {/* Responsive width for filter dropdown */}
								<label className="text-sm font-medium text-muted-foreground">
									Price Range
								</label>
								<select
									value={priceRange}
									onChange={(e) => setPriceRange(e.target.value)}
									className="px-3 py-1.5 sm:px-4 sm:py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent w-full" /* Responsive padding and full width */
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
						<div className="space-y-2 w-full sm:w-auto"> {/* Responsive width for sort dropdown */}
							<label className="text-sm font-medium text-muted-foreground">
								Sort By
							</label>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="px-3 py-1.5 sm:px-4 sm:py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent w-full" /* Responsive padding and full width */
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
				<div className="mb-6 text-sm sm:text-base"> {/* Adjusted font size */}
					<p className="text-muted-foreground">
						Showing {filteredAndSortedProducts.length} of {products.length}{" "}
						products
					</p>
				</div>

				{/* Products Grid */}
				{filteredAndSortedProducts.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"> {/* Adjusted grid columns and gap */}
						{filteredAndSortedProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
							/>
						))}
					</div>
				) : (
					<div className="text-center py-10 sm:py-16"> {/* Adjusted vertical padding */}
						<Filter className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-3 sm:mb-4" /> {/* Adjusted icon size and margin */}
						<h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">No products found</h3> {/* Adjusted font size and margin */}
						<p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6"> {/* Adjusted font size and margin */}
							Try adjusting your filters to see more products
						</p>
						<button
							onClick={() => {
								setSelectedCategory("all");
								setPriceRange("all");
								setSortBy("featured");
							}}
							className="btn-secondary text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-2.5" /* Adjusted padding and font size */
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