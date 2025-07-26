import React, { useState, useMemo, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import HomePage from "./HomePage";
import ShopPage from "./ShopPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import ContactPage from "./ContactPage";
import ProductDetailPage from "./ProductDetailPage";
import FavoritesPage from "./FavoritesPage";
import OfferPage from "./OfferPage";
import { products } from "../data/products";
import { Product, CartItem, Customer } from "../types";
import { toast } from "../hooks/use-toast";

type Page =
	| "home"
	| "shop"
	| "cart"
	| "checkout"
	| "contact"
	| "product-detail"
	| "favorites"
	| "offer";

const Index = () => {
	const [currentPage, setCurrentPage] = useState<Page>("home");
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	// Get featured products
	const featuredProducts = useMemo(
		() => products.filter((product) => product.featured),
		[]
	);

	// Get products by category
	const productsByCategory = useMemo(
		() => ({
			sarees: products.filter((product) => product.category === "sarees"),
			lehengas: products.filter((product) => product.category === "lehengas"),
			customized: products.filter(
				(product) => product.category === "customized"
			),
			kids: products.filter((product) => product.category === "kids"),
		}),
		[]
	);

	// Debug logs
	console.log("All products:", products);
	console.log("Products by category:", productsByCategory);

	// Category filter state
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	// Favorites state
	const [favorites, setFavorites] = useState<Product[]>(() => {
		const stored = localStorage.getItem("favorites");
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	const isFavorite = (product: Product) =>
		favorites.some((fav) => fav.id === product.id);
	const addToFavorites = (product: Product) => {
		if (!isFavorite(product)) {
			setFavorites((prev) => [...prev, product]);
			toast({
				title: "Added to favorites!",
				description: `${product.name} has been added to your favorites.`,
			});
		}
	};
	const removeFromFavorites = (product: Product) => {
		setFavorites((prev) => prev.filter((fav) => fav.id !== product.id));
	};
	const toggleFavorite = (product: Product) => {
		isFavorite(product)
			? removeFromFavorites(product)
			: addToFavorites(product);
	};

	// Calculate total cart items count
	const cartItemsCount = cartItems.reduce(
		(sum, item) => sum + item.quantity,
		0
	);

	const handleAddToCart = (
		product: Product,
		selectedSize?: string,
		selectedColor?: string
	) => {
		const existingItem = cartItems.find(
			(item) =>
				item.id === product.id &&
				item.selectedSize === selectedSize &&
				item.selectedColor === selectedColor
		);

		if (existingItem) {
			// Update quantity if item already exists
			setCartItems((prevItems) =>
				prevItems.map((item) =>
					item.id === product.id &&
					item.selectedSize === selectedSize &&
					item.selectedColor === selectedColor
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			);
		} else {
			// Add new item to cart
			const newCartItem: CartItem = {
				...product,
				quantity: 1,
				selectedSize,
				selectedColor,
			};
			setCartItems((prevItems) => [...prevItems, newCartItem]);
		}

		toast({
			title: "Added to cart!",
			description: `${product.name} has been added to your cart.`,
		});
	};

	const handleUpdateQuantity = (productId: string, quantity: number) => {
		if (quantity === 0) {
			handleRemoveItem(productId);
			return;
		}

		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === productId ? { ...item, quantity } : item
			)
		);
	};

	const handleRemoveItem = (productId: string) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.id !== productId)
		);
		toast({
			title: "Item removed",
			description: "Item has been removed from your cart.",
		});
	};

	const handleViewProduct = (product: Product) => {
		setSelectedProduct(product);
		setCurrentPage("product-detail");
	};

	const handlePageChange = (page: string) => {
		setCurrentPage(page as Page);
	};

	const handleShopNow = () => {
		setCurrentPage("shop");
	};

	const handleCategoryFilter = (category: string) => {
		setSelectedCategory(category);
	};

	const handleGoToCheckout = () => {
		if (cartItems.length === 0) {
			toast({
				title: "Cart is empty",
				description: "Please add some items to your cart before checkout.",
			});
			return;
		}
		setCurrentPage("checkout");
	};

	const handlePlaceOrder = (customer: Customer) => {
		// Here you would typically send the order to a backend
		toast({
			title: "Order placed successfully!",
			description: `Thank you ${customer.name}! Your order has been confirmed and will be processed soon.`,
		});

		// Clear cart and redirect to home
		setCartItems([]);
		setCurrentPage("home");
	};

	const handleGoBack = () => {
		setCurrentPage("shop");
		setSelectedProduct(null);
	};

	return (
		<div className="min-h-screen bg-background">
			<Navigation
				cartItemsCount={cartItemsCount}
				currentPage={currentPage}
				onPageChange={handlePageChange}
				favoritesCount={favorites.length}
				showOfferButton={true}
			/>

			<main>
				{currentPage === "home" && (
					<HomePage
						featuredProducts={featuredProducts}
						productsByCategory={productsByCategory}
						onAddToCart={handleAddToCart}
						onViewProduct={handleViewProduct}
						onShopNow={handleShopNow}
						onCategoryFilter={handleCategoryFilter}
						favorites={favorites}
						onToggleFavorite={toggleFavorite}
					/>
				)}

				{currentPage === "shop" && (
					<ShopPage
						products={products}
						onAddToCart={handleAddToCart}
						onViewProduct={handleViewProduct}
						initialCategory={selectedCategory}
						favorites={favorites}
						onToggleFavorite={toggleFavorite}
					/>
				)}

				{currentPage === "cart" && (
					<CartPage
						cartItems={cartItems}
						onUpdateQuantity={handleUpdateQuantity}
						onRemoveItem={handleRemoveItem}
						onGoToShop={handleShopNow}
						onCheckout={handleGoToCheckout}
					/>
				)}

				{currentPage === "checkout" && (
					<CheckoutPage cartItems={cartItems} onPlaceOrder={handlePlaceOrder} />
				)}

				{currentPage === "contact" && <ContactPage />}

				{currentPage === "product-detail" && selectedProduct && (
					<ProductDetailPage
						product={selectedProduct}
						onAddToCart={handleAddToCart}
						onGoBack={handleGoBack}
					/>
				)}

				{currentPage === "favorites" && (
					<FavoritesPage
						favorites={favorites}
						onViewProduct={handleViewProduct}
						onRemoveFavorite={removeFromFavorites}
					/>
				)}

				{currentPage === "offer" && <OfferPage />}
			</main>

			<Footer />
		</div>
	);
};

export default Index;
