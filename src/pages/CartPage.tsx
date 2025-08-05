import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartQuantity, removeFromCart, cartItemsCount } = useAppContext();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleGoToShop = () => {
    navigate('/shop');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-10 sm:py-16"> {/* Adjusted vertical padding */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted horizontal padding */}
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-20 w-20 sm:h-24 sm:w-24 text-muted-foreground mx-auto mb-4 sm:mb-6" /> {/* Adjusted icon size and margin */}
            <h2 className="text-xl sm:text-2xl font-playfair font-bold mb-3 sm:mb-4">Your cart is empty</h2> {/* Adjusted font size and margin */}
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <button onClick={handleGoToShop} className="btn-boutique text-sm sm:text-base px-5 py-2 sm:px-6 sm:py-2.5"> {/* Adjusted padding and font size */}
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-8"> {/* Adjusted vertical padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted horizontal padding */}
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8"> {/* Adjusted alignment and margin */}
          <button
            onClick={handleGoToShop}
            className="flex items-center space-x-1.5 sm:space-x-2 text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-0 sm:mr-6 text-sm sm:text-base" /* Adjusted spacing, margin, and font size */
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold">Shopping Cart</h1> {/* Adjusted font size */}
            <p className="text-sm sm:text-base text-muted-foreground">{cartItemsCount} items in your cart</p> {/* Adjusted font size */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"> {/* Adjusted gap */}
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`}
                className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-soft" /* Adjusted padding */
              >
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6"> {/* Adjusted gap */}
                  {/* Product Image */}
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <img
                      src={item.image ? item.image[0] : ''}
                      alt={item.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow space-y-2 sm:space-y-3 text-center md:text-left"> {/* Adjusted spacing and text alignment */}
                    <div>
                      <h3 className="font-playfair font-semibold text-lg sm:text-xl">{item.name}</h3> {/* Adjusted font size */}
                      <p className="text-muted-foreground text-xs sm:text-sm">{item.description}</p> {/* Adjusted font size */}
                    </div>

                    {/* Product Options */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 text-xs sm:text-sm"> {/* Adjusted gap and alignment */}
                      {item.selectedSize && (
                        <span className="bg-muted px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                          Size: {item.selectedSize}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span className="bg-muted px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                          Color: {item.selectedColor}
                        </span>
                      )}
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-3 sm:mt-4"> {/* Adjusted alignment and margin */}
                      <span className="text-xl sm:text-2xl font-semibold text-primary mb-2 sm:mb-0">
                        ₹{item.price.toLocaleString()}
                      </span>

                      <div className="flex items-center space-x-2 sm:space-x-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-1 sm:space-x-2 bg-muted rounded-full">
                          <button
                            onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1.5 sm:p-2 hover:bg-background rounded-full transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 sm:p-2 hover:bg-background rounded-full transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 sm:p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right mt-2 sm:mt-0">
                      <span className="text-base sm:text-lg font-semibold">
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
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-soft sticky top-20 sm:top-24"> {/* Adjusted padding and sticky top */}
              <h3 className="font-playfair font-semibold text-lg sm:text-xl mb-4 sm:mb-6">Order Summary</h3> {/* Adjusted font size and margin */}

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 text-sm sm:text-base"> {/* Adjusted spacing, margin, and font size */}
                <div className="flex justify-between">
                  <span>Subtotal ({cartItemsCount} items)</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-primary">
                    {total >= 1999 ? 'Free' : '₹99'}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground text-xs sm:text-sm">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-border pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{(total + (total >= 1999 ? 0 : 99)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {total < 1999 && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-accent-foreground">
                    Add ₹{(1999 - total).toLocaleString()} more for free shipping!
                  </p>
                </div>
              )}

              <button onClick={handleCheckout} className="btn-boutique w-full text-sm sm:text-base px-4 py-2 sm:px-auto sm:py-auto"> {/* Adjusted padding and font size */}
                Proceed to Checkout
              </button>

              <button onClick={handleGoToShop} className="btn-secondary w-full mt-2 sm:mt-3 text-sm sm:text-base px-4 py-2 sm:px-auto sm:py-auto"> {/* Adjusted margin, padding and font size */}
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