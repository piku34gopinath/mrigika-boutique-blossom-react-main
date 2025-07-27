import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Sun, Moon } from "lucide-react";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import OfferPage from "./pages/OfferPage";
import { products } from "./data/products";
import { toast } from "./hooks/use-toast";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => {
	const [isDark, setIsDark] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState(() => {
		const stored = localStorage.getItem("favorites");
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	const isFavorite = (product) => favorites.some((fav) => fav.id === product.id);

	const addToFavorites = (product) => {
		if (!isFavorite(product)) {
			setFavorites((prev) => [...prev, product]);
			toast({
				title: "Added to favorites!",
				description: `${product.name} has been added to your favorites.`,
			});
		}
	};

	const removeFromFavorites = (product) => {
		setFavorites((prev) => prev.filter((fav) => fav.id !== product.id));
	};

	const toggleFavorite = (product) => {
		isFavorite(product)
			? removeFromFavorites(product)
			: addToFavorites(product);
	};

	const handleAddToCart = (product, selectedSize, selectedColor) => {
		const existingItem = cartItems.find(
			(item) =>
				item.id === product.id &&
				item.selectedSize === selectedSize &&
				item.selectedColor === selectedColor
		);

		if (existingItem) {
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
			const newCartItem = {
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

	const handleUpdateQuantity = (productId, quantity) => {
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

	const handleRemoveItem = (productId) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.id !== productId)
		);
		toast({
			title: "Item removed",
			description: "Item has been removed from your cart.",
		});
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("theme");
			const html = document.documentElement;
			if (saved === "dark") {
				html.classList.add("dark");
				setIsDark(true);
			} else if (saved === "light") {
				html.classList.remove("dark");
				setIsDark(false);
			} else {
				setIsDark(html.classList.contains("dark"));
			}
		}
	}, []);

	const toggleTheme = () => {
		if (typeof window !== "undefined") {
			const html = document.documentElement;
			if (html.classList.contains("dark")) {
				html.classList.remove("dark");
				localStorage.setItem("theme", "light");
				setIsDark(false);
			} else {
				html.classList.add("dark");
				localStorage.setItem("theme", "dark");
				setIsDark(true);
			}
		}
	};

	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<button
					onClick={toggleTheme}
					className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300 text-primary"
					aria-label="Toggle theme"
				>
					{isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
				</button>
				<BrowserRouter>
					<Layout
						cartItemsCount={cartItems.reduce(
							(sum, item) => sum + item.quantity,
							0
						)}
						favoritesCount={favorites.length}
					>
						<Routes>
							<Route path="/" element={<Index />} />
							<Route path="/signin" element={<SignInPage />} />
							<Route path="/profile" element={<ProfilePage />} />
							<Route
								path="/shop"
								element={
									<ShopPage
										products={products}
										onAddToCart={handleAddToCart}
										favorites={favorites}
										onToggleFavorite={toggleFavorite}
									/>
								}
							/>
							<Route path="/contact" element={<ContactPage />} />
							<Route
								path="/cart"
								element={
									<CartPage
										cartItems={cartItems}
										onUpdateQuantity={handleUpdateQuantity}
										onRemoveItem={handleRemoveItem}
									/>
								}
							/>
							<Route
								path="/checkout"
								element={<CheckoutPage cartItems={cartItems} />}
							/>
							<Route
								path="/product/:id"
								element={<ProductDetailPage onAddToCart={handleAddToCart} />}
							/>
							<Route
								path="/favorites"
								element={
									<FavoritesPage
										favorites={favorites}
										onRemoveFavorite={removeFromFavorites}
									/>
								}
							/>
							<Route path="/offer" element={<OfferPage />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Layout>
				</BrowserRouter>
			</TooltipProvider>
		</QueryClientProvider>
	);
};

export default App;
