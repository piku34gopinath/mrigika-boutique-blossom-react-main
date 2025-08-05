import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, toggleFavorite, isFavorite } = useAppContext(); // Get functions from context
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Find product from the centralized products array
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct || null);
  }, [id, products]); // Add products to dependency array

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    // Use addToCart from context
    addToCart(product, quantity, selectedSize, selectedColor);
  };
  
  const onGoBack = () => {
      navigate('/shop');
  }

  const benefits = [
    {
      icon: <Truck className="h-4 w-4 sm:h-5 sm:w-5" />,
      text: "Free shipping on orders above ₹1999"
    },
    {
      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />,
      text: "100% authentic products"
    },
    {
      icon: <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />,
      text: "7-day easy return policy"
    }
  ];

  return (
    <div className="min-h-screen py-6 sm:py-8"> {/* Adjusted vertical padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted horizontal padding */}
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onGoBack}
            className="flex items-center space-x-1.5 sm:space-x-2 text-muted-foreground hover:text-primary transition-colors mb-6 sm:mb-8 text-sm sm:text-base" /* Adjusted spacing, margin, and font size */
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Shop</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"> {/* Adjusted gap */}
            {/* Product Images */}
            <div className="space-y-3 sm:space-y-4"> {/* Adjusted spacing */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                <img
                  src={product.image[currentImageIndex]}
                  alt={`${product.name} - image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                {product.image.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => (prev - 1 + product.image.length) % product.image.length)}
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 hover:scale-110" /* Adjusted position and padding */
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Adjusted icon size */}
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => (prev + 1) % product.image.length)}
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 hover:scale-110" /* Adjusted position and padding */
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Adjusted icon size */}
                    </button>
                  </>
                )}
              </div>
              {product.image.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4"> {/* Adjusted grid columns and gap */}
                  {product.image.map((img, index) => (
                    <div
                      key={index}
                      className={`aspect-square overflow-hidden rounded-lg cursor-pointer border-2 ${currentImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-4 sm:space-y-6"> {/* Adjusted spacing */}
              <div>
                <div className="flex items-center space-x-2 mb-1.5 sm:mb-2"> {/* Adjusted spacing and margin */}
                  <span className="text-xs sm:text-sm text-muted-foreground capitalize bg-muted px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full"> {/* Adjusted padding and font size */}
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="text-xs sm:text-sm bg-accent text-accent-foreground px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full"> {/* Adjusted padding and font size */}
                      Featured
                    </span>
                  )}
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-playfair font-bold mb-3 sm:mb-4">{product.name}</h1> {/* Adjusted font size and margin */}
                
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4"> {/* Adjusted spacing and margin */}
                  <span className="text-2xl sm:text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span> {/* Adjusted font size */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => {
                      return <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-accent text-accent" />;
                    })}
                    <span className="text-xs sm:text-sm ml-1.5 sm:ml-2 text-muted-foreground">(4.8) • 24 reviews</span> {/* Adjusted font size and margin */}
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg">Size</h3> {/* Adjusted margin and font size */}
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border transition-colors text-sm sm:text-base ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-background hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg">Color</h3> {/* Adjusted margin and font size */}
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border transition-colors text-sm sm:text-base ${
                          selectedColor === color
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-background hover:border-primary'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-3 sm:space-y-4"> {/* Adjusted spacing */}
                <div>
                  <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg">Quantity</h3> {/* Adjusted margin and font size */}
                  <div className="flex items-center space-x-2 bg-muted rounded-full w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 sm:p-3 hover:bg-background rounded-full transition-colors text-base sm:text-lg" /* Adjusted padding and font size */
                    >
                      -
                    </button>
                    <span className="w-10 sm:w-12 text-center font-medium text-base sm:text-lg">{quantity}</span> {/* Adjusted width and font size */}
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 sm:p-3 hover:bg-background rounded-full transition-colors text-base sm:text-lg" /* Adjusted padding and font size */
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4"> {/* Adjusted gap and added flex-wrap */}
                  <button onClick={handleAddToCart} className="btn-boutique flex-1 text-sm sm:text-base px-4 py-2 sm:px-auto sm:py-auto"> {/* Adjusted padding and font size */}
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" /> {/* Adjusted icon size and margin */}
                    Add to Cart
                  </button>
                  
                  <button 
                    onClick={() => toggleFavorite(product)}
                    className="btn-secondary flex items-center space-x-1.5 sm:space-x-2 text-sm sm:text-base px-4 py-2 sm:px-auto sm:py-auto" /* Adjusted padding, font size and spacing */
                  >
                    {isFavorite(product) ? (
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 fill-red-500 text-red-500" /> 
                      
                    ) : (
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5" /> 
                      
                    )}
                  </button>
                  
                  <button className="btn-secondary flex items-center space-x-1.5 sm:space-x-2 text-sm sm:text-base px-4 py-2 sm:px-auto sm:py-auto"> {/* Adjusted padding, font size and spacing */}
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5" /> {/* Adjusted icon size */}
                  </button>
                </div>
              </div>

              {/* Benefits */}
              <div className="border-t border-border pt-4 sm:pt-6"> {/* Adjusted padding */}
                <div className="space-y-2 sm:space-y-3"> {/* Adjusted spacing */}
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-muted-foreground"> {/* Adjusted spacing and font size */}
                      <div className="text-primary">
                        {benefit.icon}
                      </div>
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t border-border pt-4 sm:pt-6"> {/* Adjusted padding */}
                <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Product Details</h3> {/* Adjusted margin and font size */}
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm"> {/* Adjusted spacing and font size */}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SKU:</span>
                    <span>MRG-{(product.id || '').padStart(4, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="text-primary">In Stock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;