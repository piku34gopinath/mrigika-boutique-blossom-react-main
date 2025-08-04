
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

// Pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import SignInPage from './pages/SignInPage';
import ProfilePage from './pages/ProfilePage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import OfferPage from './pages/OfferPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

const queryClient = new QueryClient();

const MainLayout = () => (
    <Layout>
        <Outlet />
    </Layout>
);

const App = () => (
    <AppProvider>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        <Route path="/admin" element={<AdminDashboardPage />} />
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Index />} />
                            <Route path="/signin" element={<SignInPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/shop" element={<ShopPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/favorites" element={<FavoritesPage />} />
                            <Route path="/offer" element={<OfferPage />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    </AppProvider>
);

export default App;
