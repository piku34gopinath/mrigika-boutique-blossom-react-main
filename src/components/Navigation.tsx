import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Instagram, Heart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface NavigationProps {
	cartItemsCount: number;
	currentPage: string;
	onPageChange: (page: string) => void;
	favoritesCount?: number;
	showOfferButton?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
	cartItemsCount,
	currentPage,
	onPageChange,
	favoritesCount = 0,
	showOfferButton = false,
}) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		setIsLoggedIn(!!storedUser);
	}, []);

	const handleProfileClick = () => {
		if (isLoggedIn) {
			navigate("/profile");
		} else {
			navigate("/signin");
		}
	};

	const navigationItems = [
		{ id: "home", label: "Home", path: "/" },
		{ id: "shop", label: "Shop", path: "/shop" },
		{ id: "contact", label: "Contact", path: "/contact" },
	];

	return (
		<nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-lg border-b border-border shadow-lg transition-all">
			<div className="container mx-auto px-6">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<Link to="/" className="flex items-center space-x-3 cursor-pointer select-none group">
						<span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary shadow-md group-hover:scale-105 transition-transform">
							<Heart className="h-7 w-7 text-white" />
						</span>
						<span className="text-3xl font-extrabold font-playfair gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
							Mrigika
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-10">
						{navigationItems.map((item) => (
							<Link
								key={item.id}
								to={item.path}
								className={`font-medium text-lg px-3 py-1 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40 hover:scale-105 hover:shadow-md
                  ${
										currentPage === item.id
											? "text-primary border-b-2 border-primary bg-primary/10 shadow-lg scale-105"
											: "text-muted-foreground hover:text-primary hover:bg-primary/5"
									}
                `}
							>
								{item.label}
							</Link>
						))}
						{showOfferButton && (
							<Link
								to="/offer"
								className={`font-semibold text-lg px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:shadow-lg transition-all duration-300 ml-2 hover:scale-105 hover:shadow-xl
                  ${
										currentPage === "offer"
											? "ring-2 ring-primary shadow-xl scale-105"
											: "hover:shadow-primary/25"
									}
                `}
							>
								Offers
							</Link>
						)}
					</div>

					{/* Right Section */}
					<div className="flex items-center space-x-5">
						<a
							href="https://www.instagram.com/mrigika?igsh=MTAwazc0MTA0N29jbQ=="
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:rotate-12"
						>
							<Instagram className="h-6 w-6" />
						</a>

						{/* Favorite button */}
						<Link
							to="/favorites"
							className={`relative p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-md rounded-full
                ${
									currentPage === "favorites"
										? "text-primary scale-110 shadow-lg"
										: ""
								}
              `}
						>
							<Heart className="h-6 w-6" />
							{favoritesCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center shadow">
									{favoritesCount}
								</span>
							)}
						</Link>

						<Link
							to="/cart"
							className={`relative p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-md rounded-full
                ${
									currentPage === "cart"
										? "text-primary scale-110 shadow-lg"
										: ""
								}
              `}
						>
							<ShoppingBag className="h-6 w-6" />
							{cartItemsCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center shadow">
									{cartItemsCount}
								</span>
							)}
						</Link>

						<button
							onClick={handleProfileClick}
							className={`relative p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-md rounded-full ${
								currentPage === "profile" || currentPage === "signin"
									? "text-primary scale-110 shadow-lg"
									: ""
							}`}
						>
							<User className="h-6 w-6" />
						</button>

						{/* Mobile menu button */}
						<button
							className="md:hidden p-2 hover:scale-110 transition-all duration-300"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMobileMenuOpen && (
					<div className="md:hidden py-4 border-t border-border bg-background/90 backdrop-blur-lg shadow-lg rounded-b-xl animate-slide-in-up">
						{navigationItems.map((item) => (
							<Link
								key={item.id}
								to={item.path}
								onClick={() => setIsMobileMenuOpen(false)}
								className={`block w-full text-left py-3 px-6 font-medium text-lg rounded transition-all duration-300 hover:scale-105 hover:shadow-md
                  ${
										currentPage === item.id
											? "text-primary bg-primary/10 shadow-lg scale-105"
											: "text-muted-foreground hover:text-primary hover:bg-primary/5"
									}
                `}
							>
								{item.label}
							</Link>
						))}
						{showOfferButton && (
							<Link
								to="/offer"
								onClick={() => setIsMobileMenuOpen(false)}
								className={`block w-full text-left py-3 px-6 font-semibold text-lg rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:shadow-lg transition-all duration-300 mt-2 hover:scale-105 hover:shadow-xl
                  ${
										currentPage === "offer"
											? "ring-2 ring-primary shadow-xl scale-105"
											: ""
									}
                `}
							>
								Offers
							</Link>
						)}
						<Link
							to="/favorites"
							onClick={() => setIsMobileMenuOpen(false)}
							className={`block w-full text-left py-3 px-6 font-medium text-lg rounded transition-all duration-300 hover:scale-105 hover:shadow-md
                ${
									currentPage === "favorites"
										? "text-primary bg-primary/10 shadow-lg scale-105"
										: "text-muted-foreground hover:text-primary hover:bg-primary/5"
								}
              `}
						>
							Favorites
						</Link>
						<Link
							to="/cart"
							onClick={() => setIsMobileMenuOpen(false)}
							className={`block w-full text-left py-3 px-6 font-medium text-lg rounded transition-all duration-300 hover:scale-105 hover:shadow-md
                ${
									currentPage === "cart"
										? "text-primary bg-primary/10 shadow-lg scale-105"
										: "text-muted-foreground hover:text-primary hover:bg-primary/5"
								}
              `}
						>
							Cart
						</Link>
						<button
							onClick={() => {
								handleProfileClick();
								setIsMobileMenuOpen(false);
							}}
							className={`block w-full text-left py-3 px-6 font-medium text-lg rounded transition-all duration-300 hover:scale-105 hover:shadow-md ${
								currentPage === "profile" || currentPage === "signin"
									? "text-primary bg-primary/10 shadow-lg scale-105"
									: "text-muted-foreground hover:text-primary hover:bg-primary/5"
							}`}
						>
							{isLoggedIn ? "Profile" : "Sign In"}
						</button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navigation;
