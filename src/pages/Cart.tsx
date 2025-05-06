
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const { cartState, removeFromCart, updateQuantity, clearCart } = useCart();
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`Removed ${name} from cart`);
  };

  const handleCheckout = () => {
    if (!authState.isAuthenticated) {
      toast.error("Please log in to proceed to checkout");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    
    if (cartState.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    navigate("/checkout");
  };
  
  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-8">Your Cart</h1>
        
        {cartState.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 font-semibold">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
                
                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                  {cartState.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center animate-fade-in">
                      {/* Product */}
                      <div className="col-span-1 md:col-span-6 flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-md mr-4" 
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <button 
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="text-sm text-red-500 flex items-center hover:text-red-700 transition-colors mt-1"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden">Price:</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden">Quantity:</span>
                        <div className="flex items-center border rounded-md">
                          <button 
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden">Total:</span>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Cart Actions */}
                <div className="flex justify-between p-4 bg-gray-50">
                  <Link to="/menu">
                    <Button variant="outline" className="flex items-center">
                      <ArrowLeft size={16} className="mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => {
                      clearCart();
                      toast.success("Cart cleared");
                    }}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartState.totalItems} items)</span>
                    <span>${cartState.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>$3.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${(cartState.totalAmount * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${(cartState.totalAmount + 3.99 + cartState.totalAmount * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-foodRed hover:bg-foodOrange text-white" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                
                {/* Promo Code */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold mb-2">Have a promo code?</h3>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Enter promo code" 
                      className="flex-grow border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed" 
                    />
                    <Button className="rounded-l-none bg-foodGold hover:bg-foodOrange">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <img 
              src="https://img.icons8.com/color/96/000000/shopping-cart--v1.png" 
              alt="Empty Cart" 
              className="mx-auto mb-4 animate-bounce-light" 
            />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/menu">
              <Button className="bg-foodRed hover:bg-foodOrange text-white">
                Browse Menu
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
