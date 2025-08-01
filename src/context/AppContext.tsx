
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { useToast } from '@/hooks/use-toast';

interface AppContextType {
    cartItems: CartItem[];
    favorites: Product[];
    addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
    removeFromCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    toggleFavorite: (product: Product) => void;
    isFavorite: (product: Product) => boolean;
    cartItemsCount: number;
    favoritesCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { toast } = useToast();
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem("cartItems");
        return stored ? JSON.parse(stored) : [];
    });
    const [favorites, setFavorites] = useState<Product[]>(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            const cartItem: CartItem = { ...product, quantity, selectedSize, selectedColor };
            return [...prev, cartItem];
        });
        toast({
            title: "Added to cart!",
            description: `${product.name} has been added to your cart.`,
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateCartQuantity = (productId: string, quantity: number) => {
        setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
    };

    const isFavorite = (product: Product) => favorites.some((fav) => fav.id === product.id);

    const toggleFavorite = (product: Product) => {
        setFavorites(prev => {
            if (isFavorite(product)) {
                toast({
                    title: "Removed from favorites",
                    description: `${product.name} has been removed from your favorites.`,
                });
                return prev.filter((fav) => fav.id !== product.id);
            } else {
                toast({
                    title: "Added to favorites!",
                    description: `${product.name} has been added to your favorites.`,
                });
                return [...prev, product];
            }
        });
    };

    const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const favoritesCount = favorites.length;

    return (
        <AppContext.Provider value={{
            cartItems,
            favorites,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            toggleFavorite,
            isFavorite,
            cartItemsCount,
            favoritesCount
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
