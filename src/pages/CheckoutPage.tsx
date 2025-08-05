
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '../types';
import { CreditCard, Truck, CheckCircle, Trash2, Plus, Minus, Tag, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useToast } from '@/hooks/use-toast';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { cartItems, updateCartQuantity, removeFromCart, clearCart } = useAppContext();
    const { toast } = useToast();
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const [customer, setCustomer] = useState<Customer>({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
    });

    const [errors, setErrors] = useState<Partial<Customer>>({});

    useEffect(() => {
        if (localStorage.getItem('whatsapp_redirect')) {
            clearCart();
            toast({
                title: 'Order Placed!',
                description: 'Your order has been placed successfully.',
            });
            localStorage.removeItem('whatsapp_redirect');
            navigate('/');
        }
    }, [clearCart, navigate, toast]);

    const total = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
    const shipping = useMemo(() => (total >= 1999 ? 0 : 99), [total]);

    const finalTotal = useMemo(() => {
        const discountedTotal = total * (1 - discount);
        return discountedTotal + shipping;
    }, [total, discount, shipping]);

    const handleApplyCoupon = () => {
        if (couponCode.trim().toLowerCase() === 'mrigika3') {
            setDiscount(0.20); // 20% discount
            toast({
                title: 'Coupon Applied!',
                description: 'You\'ve received a 20% discount.',
            });
        } else {
            setDiscount(0);
            toast({
                title: 'Invalid Coupon',
                description: 'The coupon code you entered is not valid.',
                variant: 'destructive',
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Customer> = {};
        if (!customer.name.trim()) newErrors.name = 'Name is required';
        if (!customer.email.trim()) newErrors.email = 'Email is required';
        if (!customer.phone.trim()) newErrors.phone = 'Phone is required';
        if (!customer.address.trim()) newErrors.address = 'Address is required';
        if (!customer.city.trim()) newErrors.city = 'City is required';
        if (!customer.pincode.trim()) newErrors.pincode = 'Pincode is required';

        if (customer.email && !/\S+@\S+\.\S+/.test(customer.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (customer.phone && !/^\d{10}$/.test(customer.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const orderDetails = `
*New Order Received!*

*Customer Details:*
Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}
Address: ${customer.address}, ${customer.city}, ${customer.pincode}

*Order Summary:*
${cartItems.map(item => `${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`).join('\n')}

Subtotal: ₹${total.toLocaleString()}
Discount: -₹${(total * discount).toLocaleString()}
Shipping: ${shipping === 0 ? 'Free' : `₹${shipping}`}
*Total: ₹${finalTotal.toLocaleString()}*
            `;

            const whatsappUrl = `https://api.whatsapp.com/send?phone=+917978439518&text=${encodeURIComponent(orderDetails)}`;
            localStorage.setItem('whatsapp_redirect', 'true');
            window.location.href = whatsappUrl;
        }
    };

    const handleInputChange = (field: keyof Customer, value: string) => {
        setCustomer(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center py-8 sm:py-16"> {/* Responsive padding */}
                <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-primary mb-3 sm:mb-4" /> {/* Responsive icon size and margin */}
                <h1 className="text-2xl sm:text-3xl font-playfair font-bold mb-2 sm:mb-2">Your Cart is Empty</h1> {/* Responsive font size and margin */}
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">Looks like you haven't added anything to your cart yet.</p> {/* Responsive font size and margin */}
                <button
                    onClick={() => navigate('/shop')}
                    className="btn-boutique flex items-center justify-center space-x-2 text-sm sm:text-base px-5 py-2 sm:px-6 sm:py-2.5" /* Responsive padding and font size */
                >
                    <span>Continue Shopping</span>
                </button>
            </div>
        );
    }
    return (
        <div className="min-h-screen py-6 sm:py-8"> {/* Responsive vertical padding */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Responsive horizontal padding */}
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-playfair font-bold mb-6 sm:mb-8">Checkout</h1> {/* Responsive font size and margin */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"> {/* Responsive grid gap */}
                        {/* Shipping Information */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-soft"> {/* Responsive padding */}
                                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6"> {/* Responsive spacing and margin */}
                                    <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> {/* Responsive icon size */}
                                    <h2 className="text-lg sm:text-xl font-playfair font-semibold">Shipping Information</h2> {/* Responsive font size */}
                                </div>
                                <div className="space-y-3 sm:space-y-4"> {/* Responsive spacing */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"> {/* Responsive grid gap */}
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Full Name *</label> {/* Responsive font size and margin */}
                                            <input
                                                type="text"
                                                value={customer.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base ${errors.name ? 'border-destructive' : 'border-border'
                                                    }`} /* Responsive padding and font size */
                                                placeholder="Enter your full name"
                                            />
                                            {errors.name && <p className="text-destructive text-xs sm:text-sm mt-1">{errors.name}</p>} {/* Responsive font size */}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Email Address *</label> {/* Responsive font size and margin */}
                                            <input
                                                type="email"
                                                value={customer.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base ${errors.email ? 'border-destructive' : 'border-border'
                                                    }`} /* Responsive padding and font size */
                                                placeholder="Enter your email"
                                            />
                                            {errors.email && <p className="text-destructive text-xs sm:text-sm mt-1">{errors.email}</p>} {/* Responsive font size */}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Phone Number *</label> {/* Responsive font size and margin */}
                                        <input
                                            type="tel"
                                            value={customer.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base ${errors.phone ? 'border-destructive' : 'border-border'
                                                }`} /* Responsive padding and font size */
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && <p className="text-destructive text-xs sm:text-sm mt-1">{errors.phone}</p>} {/* Responsive font size */}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Address *</label> {/* Responsive font size and margin */}
                                        <textarea
                                            value={customer.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none text-sm sm:text-base ${errors.address ? 'border-destructive' : 'border-border'
                                                }`} /* Responsive padding and font size */
                                            rows={3}
                                            placeholder="Enter your complete address"
                                        />
                                        {errors.address && <p className="text-destructive text-xs sm:text-sm mt-1">{errors.address}</p>} {/* Responsive font size */}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"> {/* Responsive grid gap */}
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">City *</label> {/* Responsive font size and margin */}
                                            <input
                                                type="text"
                                                value={customer.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base ${errors.city ? 'border-destructive' : 'border-border'
                                                    }`} /* Responsive padding and font size */
                                                placeholder="Enter your city"
                                            />
                                            {errors.city && <p className="text-destructive text-xs sm:text-sm mt-1">{errors.city}</p>} {/* Responsive font size */}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Pincode *</label> {/* Responsive font size and margin */}
                                            <input
                                                type="text"
                                                value={customer.pincode}
                                                onChange={(e) => handleInputChange('pincode', e.target.value)}
                                                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base ${errors.pincode ? 'border-destructive' : 'border-border'
                                                    }`} /* Responsive padding and font size */
                                                placeholder="Enter pincode"
                                            />
                                            {errors.pincode && <p className="text-destructive text-xs sm:text-sm mt-1">{errors.pincode}</p>} {/* Responsive font size */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-soft"> {/* Responsive padding */}
                                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6"> {/* Responsive spacing and margin */}
                                    <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> {/* Responsive icon size */}
                                    <h2 className="text-lg sm:text-xl font-playfair font-semibold">Payment Method</h2> {/* Responsive font size */}
                                </div>
                                <div className="space-y-3 sm:space-y-4"> {/* Responsive spacing */}
                                    <div className="border border-border rounded-lg p-3 sm:p-4"> {/* Responsive padding */}
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <input
                                                type="radio"
                                                id="cod"
                                                name="payment"
                                                defaultChecked
                                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary"
                                            />
                                            <label htmlFor="cod" className="font-medium text-sm sm:text-base">Cash on Delivery</label> {/* Responsive font size */}
                                        </div>
                                        <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 ml-6 sm:ml-7">
                                            Pay when your order is delivered to your doorstep
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-soft sticky top-8 lg:top-24"> {/* Responsive padding and sticky top */}
                                <h2 className="text-lg sm:text-xl font-playfair font-semibold mb-4 sm:mb-6">Order Summary</h2> {/* Responsive font size and margin */}

                                {/* Order Items */}
                                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6"> {/* Responsive spacing and margin */}
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-3 sm:space-x-4">
                                            <img
                                                src={item.image[0]}
                                                alt={item.name}
                                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" /* Responsive image size */
                                            />
                                            <div className="flex-grow">
                                                <h4 className="font-medium text-sm sm:text-base">{item.name}</h4> {/* Responsive font size */}
                                                <div className="flex items-center space-x-1.5 sm:space-x-2 mt-1">
                                                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="p-1 rounded-full bg-secondary hover:bg-secondary/80">
                                                        <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    </button>
                                                    <span className="text-sm sm:text-base">{item.quantity}</span>
                                                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-secondary hover:bg-secondary/80">
                                                        <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-semibold text-sm sm:text-base">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </span>
                                                <button onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80 mt-1">
                                                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Coupon Code */}
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-6"> {/* Responsive layout and spacing */}
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter coupon code"
                                        className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary text-sm sm:text-base" /* Responsive padding and font size */
                                    />
                                    <button onClick={handleApplyCoupon} className="btn-boutique flex items-center justify-center space-x-2 text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5"> {/* Responsive padding and font size */}
                                        <Tag className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span>Apply</span>
                                    </button>
                                </div>

                                {/* Pricing */}
                                <div className="space-y-2 sm:space-y-3 border-t border-border pt-4 sm:pt-6 text-sm sm:text-base"> {/* Responsive spacing, padding, and font size */}
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{total.toLocaleString()}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-primary">
                                            <span>Discount (20%)</span>
                                            <span>-₹{(total * discount).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? 'text-primary' : ''}>
                                            {shipping === 0 ? 'Free' : `₹${shipping}`}
                                        </span>
                                    </div>
                                    <div className="border-t border-border pt-3 sm:pt-4">
                                        <div className="flex justify-between text-base sm:text-lg font-semibold">
                                            <span>Total</span>
                                            <span>₹{finalTotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    onClick={handleSubmit}
                                    className="btn-boutique w-full mt-4 sm:mt-6 flex items-center justify-center space-x-2 text-sm sm:text-base px-5 py-2 sm:px-auto sm:py-auto" /* Responsive margin, padding and font size */
                                >
                                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span>Place Order</span>
                                </button>
                                <p className="text-muted-foreground text-xs text-center mt-3 sm:mt-4">
                                    By placing your order, you agree to our Terms of Service and Privacy Policy
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
