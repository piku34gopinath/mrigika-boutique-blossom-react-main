import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, Customer } from '../types';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import sareeImg from "../assets/saree/cookiesSaree1.jpg";

const initialCartItems: CartItem[] = [
    // Replace with actual data fetching later
    { id: '1', name: 'Elegant Saree', price: 1999, image: sareeImg, category: 'sarees', quantity: 1, selectedSize: 'M', selectedColor: 'Red', description: 'A beautiful saree for all occasions.' },
];

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [cartItems] = useState(initialCartItems);
    const [customer, setCustomer] = useState<Customer>({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
    });

    const [errors, setErrors] = useState<Partial<Customer>>({});

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = total >= 1999 ? 0 : 99;
    const finalTotal = total + shipping;

    const validateForm = (): boolean => {
        const newErrors: Partial<Customer> = {};

        if (!customer.name.trim()) newErrors.name = 'Name is required';
        if (!customer.email.trim()) newErrors.email = 'Email is required';
        if (!customer.phone.trim()) newErrors.phone = 'Phone is required';
        if (!customer.address.trim()) newErrors.address = 'Address is required';
        if (!customer.city.trim()) newErrors.city = 'City is required';
        if (!customer.pincode.trim()) newErrors.pincode = 'Pincode is required';

        // Email validation
        if (customer.email && !/\S+@\S+\.\S+/.test(customer.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Phone validation
        if (customer.phone && !/^\d{10}$/.test(customer.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log('Placing order with customer:', customer);
            // onPlaceOrder(customer);
        }
    };

    const handleInputChange = (field: keyof Customer, value: string) => {
        setCustomer(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-playfair font-bold mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Shipping Information */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                                <div className="flex items-center space-x-3 mb-6">
                                    <Truck className="h-6 w-6 text-primary" />
                                    <h2 className="text-xl font-playfair font-semibold">Shipping Information</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                value={customer.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className={`w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.name ? 'border-destructive' : 'border-border'
                                                    }`}
                                                placeholder="Enter your full name"
                                            />
                                            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email Address *</label>
                                            <input
                                                type="email"
                                                value={customer.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={`w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.email ? 'border-destructive' : 'border-border'
                                                    }`}
                                                placeholder="Enter your email"
                                            />
                                            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={customer.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.phone ? 'border-destructive' : 'border-border'
                                                }`}
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Address *</label>
                                        <textarea
                                            value={customer.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none ${errors.address ? 'border-destructive' : 'border-border'
                                                }`}
                                            rows={3}
                                            placeholder="Enter your complete address"
                                        />
                                        {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">City *</label>
                                            <input
                                                type="text"
                                                value={customer.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                                className={`w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.city ? 'border-destructive' : 'border-border'
                                                    }`}
                                                placeholder="Enter your city"
                                            />
                                            {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Pincode *</label>
                                            <input
                                                type="text"
                                                value={customer.pincode}
                                                onChange={(e) => handleInputChange('pincode', e.target.value)}
                                                className={`w-full px-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${errors.pincode ? 'border-destructive' : 'border-border'
                                                    }`}
                                                placeholder="Enter pincode"
                                            />
                                            {errors.pincode && <p className="text-destructive text-sm mt-1">{errors.pincode}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                                <div className="flex items-center space-x-3 mb-6">
                                    <CreditCard className="h-6 w-6 text-primary" />
                                    <h2 className="text-xl font-playfair font-semibold">Payment Method</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="border border-border rounded-lg p-4">
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                id="cod"
                                                name="payment"
                                                defaultChecked
                                                className="w-4 h-4 text-primary"
                                            />
                                            <label htmlFor="cod" className="font-medium">Cash on Delivery</label>
                                        </div>
                                        <p className="text-muted-foreground text-sm mt-2 ml-7">
                                            Pay when your order is delivered to your doorstep
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft sticky top-8">
                                <h2 className="text-xl font-playfair font-semibold mb-6">Order Summary</h2>

                                {/* Order Items */}
                                <div className="space-y-4 mb-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-grow">
                                                <h4 className="font-medium">{item.name}</h4>
                                                <p className="text-muted-foreground text-sm">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <span className="font-semibold">
                                                ₹{(item.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Pricing */}
                                <div className="space-y-3 border-t border-border pt-6">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? 'text-primary' : ''}>
                                            {shipping === 0 ? 'Free' : `₹${shipping}`}
                                        </span>
                                    </div>
                                    <div className="border-t border-border pt-3">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span>₹{finalTotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    onClick={handleSubmit}
                                    className="btn-boutique w-full mt-6 flex items-center justify-center space-x-2"
                                >
                                    <CheckCircle className="h-5 w-5" />
                                    <span>Place Order</span>
                                </button>

                                <p className="text-muted-foreground text-xs text-center mt-4">
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
