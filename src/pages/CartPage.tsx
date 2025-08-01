import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import sareeImg from "../assets/saree/cookiesSaree1.jpg";

const initialCartItems: CartItem[] = [
    // Replace with actual data fetching later
    { id: '1', name: 'Elegant Saree', price: 1999, image: sareeImg, category: 'sarees', quantity: 1, selectedSize: 'M', selectedColor: 'Red', description: 'A beautiful saree for all occasions.' },
];

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const onUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(cartItems.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const onRemoveItem = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleGoToShop = () => {
    navigate('/shop');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-playfair font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <button onClick={handleGoToShop} className="btn-boutique">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleGoToShop}
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mr-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </button>
          <div>
            <h1 className="text-4xl font-playfair font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">{itemCount} items in your cart</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-2xl p-6 shadow-soft"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow space-y-3">
                    <div>
                      <h3 className="font-playfair font-semibold text-xl">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>

                    {/* Product Options */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      {item.selectedSize && (
                        <span className="bg-muted px-3 py-1 rounded-full">
                          Size: {item.selectedSize}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span className="bg-muted px-3 py-1 rounded-full">
                          Color: {item.selectedColor}
                        </span>
                      )}
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-primary">
                        ₹{item.price.toLocaleString()}
                      </span>

                      <div className="flex items-center space-x-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 bg-muted rounded-full">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-background rounded-full transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-background rounded-full transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <span className="text-lg font-semibold">
                        Total: ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft sticky top-24">
              <h3 className="font-playfair font-semibold text-xl mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-primary">
                    {total >= 1999 ? 'Free' : '₹99'}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{(total + (total >= 1999 ? 0 : 99)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {total < 1999 && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-accent-foreground">
                    Add ₹{(1999 - total).toLocaleString()} more for free shipping!
                  </p>
                </div>
              )}

              <button onClick={handleCheckout} className="btn-boutique w-full">
                Proceed to Checkout
              </button>

              <button onClick={handleGoToShop} className="btn-secondary w-full mt-3">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
