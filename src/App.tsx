import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Sun, Moon } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
	const [isDark, setIsDark] = useState(false);

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
				{/* Theme Toggle Button */}
				<button
					onClick={toggleTheme}
					className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300 text-primary"
					aria-label="Toggle theme"
				>
					{isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
				</button>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Index />} />
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</QueryClientProvider>
	);
};

export default App;
