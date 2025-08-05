import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Instagram, Heart, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

interface NavigationProps {
	cartItemsCount: number;
	favoritesCount?: number;
	showOfferButton?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
	cartItemsCount,
	favoritesCount = 0,
	showOfferButton = false,
}) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

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

	const isCurrentPage = (path: string) => location.pathname === path;

	return (
		<nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-lg border-b border-border shadow-lg transition-all">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted padding */}
				<div className="flex items-center justify-between h-16 sm:h-20"> {/* Adjusted height */}
					{/* Logo */}
					<Link to="/" className="flex items-center space-x-2 sm:space-x-3 cursor-pointer select-none group"> {/* Adjusted spacing */}
						<span className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12"> {/* Adjusted size */}
							<img src={logo} alt="Mrigika" className="h-6 w-6 sm:h-7 sm:w-7" /> {/* Adjusted size */}
						</span>
						<span className="text-2xl sm:text-3xl font-extrabold font-playfair gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide"> {/* Adjusted font size */}
							Mrigika
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-6 lg:space-x-10"> {/* Adjusted spacing */}
						{navigationItems.map((item) => (
							<Link
								key={item.id}
								to={item.path}
								className={`font-medium text-base lg:text-lg px-3 py-1 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40 hover:scale-105 hover:shadow-md
                  ${
									isCurrentPage(item.path)
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
								to="/offers"
								className={`font-semibold text-base lg:text-lg px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:shadow-lg transition-all duration-300 ml-2 hover:scale-105 hover:shadow-xl
                  ${
									isCurrentPage("/offers")
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
					<div className="flex items-center space-x-3 sm:space-x-5"> {/* Adjusted spacing */}
						<a
							href="https://www.instagram.com/mrigika?igsh=MTAwazc0MTA0N29jbQ=="
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:rotate-12"
						>
							<Instagram className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Adjusted size */}
						</a>

						{/* Favorite button */}
						<Link
							to="/favorites"
							className={`relative p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-md rounded-full
                ${
									isCurrentPage("/favorites")
										? "text-primary scale-110 shadow-lg"
										: ""
								}
              `}
						>
							<Heart className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Adjusted size */}
							{favoritesCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center shadow"> {/* Adjusted size */}
									{favoritesCount}
								</span>
							)}
						</Link>

						<Link
							to="/cart"
							className={`relative p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-md rounded-full
                ${
									isCurrentPage("/cart")
										? "text-primary scale-110 shadow-lg"
										: ""
								}
              `}
						>
							<ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Adjusted size */}
							{cartItemsCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center shadow"> {/* Adjusted size */}
									{cartItemsCount}
								</span>
							)}
						</Link>

						<button
							onClick={handleProfileClick}
							className={`relative p-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-md rounded-full ${
								isCurrentPage("/profile") || isCurrentPage("/signin")
									? "text-primary scale-110 shadow-lg"
									: ""
							}`}
						>
							<User className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Adjusted size */}
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
								className={`block w-full text-left py-2 px-4 text-base font-medium rounded transition-all duration-300 hover:scale-[1.02] hover:shadow-md
                  ${
									isCurrentPage(item.path)
										? "text-primary bg-primary/10 shadow-lg"
										: "text-muted-foreground hover:text-primary hover:bg-primary/5"
								}
                `}
							>
								{item.label}
							</Link>
						))}
						{showOfferButton && (
							<Link
								to="/offers"
								onClick={() => setIsMobileMenuOpen(false)}
								className={`block w-full text-left py-2 px-4 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow hover:shadow-lg transition-all duration-300 mt-2 hover:scale-[1.02] hover:shadow-xl
                  ${
									isCurrentPage("/offers")
										? "ring-2 ring-primary shadow-xl"
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
							className={`block w-full text-left py-2 px-4 text-base font-medium rounded transition-all duration-300 hover:scale-[1.02] hover:shadow-md
                ${
									isCurrentPage("/favorites")
										? "text-primary bg-primary/10 shadow-lg"
										: "text-muted-foreground hover:text-primary hover:bg-primary/5"
								}
              `}
						>
							Favorites
						</Link>
						<Link
							to="/cart"
							onClick={() => setIsMobileMenuOpen(false)}
							className={`block w-full text-left py-2 px-4 text-base font-medium rounded transition-all duration-300 hover:scale-[1.02] hover:shadow-md
                ${
									isCurrentPage("/cart")
										? "text-primary bg-primary/10 shadow-lg"
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
							className={`block w-full text-left py-2 px-4 text-base font-medium rounded transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
								isCurrentPage("/profile") || isCurrentPage("/signin")
									? "text-primary bg-primary/10 shadow-lg"
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