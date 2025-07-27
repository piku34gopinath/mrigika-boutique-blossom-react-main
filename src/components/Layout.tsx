import React from "react";
import Navigation from "../components/Navigation";
import { useLocation } from "react-router-dom";

interface LayoutProps {
	children: React.ReactNode;
	cartItemsCount: number;
	favoritesCount: number;
}

const Layout: React.FC<LayoutProps> = ({
	children,
	cartItemsCount,
	favoritesCount,
}) => {
	const location = useLocation();

	const getPageFromPath = (path) => {
		if (path === "/") return "home";
		const page = path.substring(1);
		if (page.startsWith("product/")) return "productDetail";
		return page;
	};

	return (
		<div>
			<Navigation
				cartItemsCount={cartItemsCount}
				favoritesCount={favoritesCount}
				currentPage={getPageFromPath(location.pathname)}
				onPageChange={() => {}}
			/>
			<main>{children}</main>
		</div>
	);
};

export default Layout;
