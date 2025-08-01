import React from "react";
import Navigation from "../components/Navigation";
import Footer from "./Footer";
import { useAppContext } from "@/context/AppContext";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { cartItemsCount, favoritesCount } = useAppContext();

	return (
		<div className="flex flex-col min-h-screen">
			<Navigation
				cartItemsCount={cartItemsCount}
				favoritesCount={favoritesCount}
				showOfferButton={true}
			/>
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
