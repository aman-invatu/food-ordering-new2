
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from 'sonner';
import { ArrowLeft, CreditCard, MapPin } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cartState, clearCart } = useCart();
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: authState.user?.name || '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: authState.user?.name || '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If cart is empty, redirect to cart page
    if (cartState.items.length === 0) {
      toast.error("Your cart is empty");
      navigate('/cart');
      return;
    }
    
    // If user is not authenticated, redirect to login
    if (!authState.isAuthenticated) {
      toast.error("Please log in to proceed to checkout");
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [cartState.items.length, authState.isAuthenticated, navigate]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const formatted = value
        .replace(/\s/g, '') // Remove any existing spaces
        .replace(/(\d{4})(?=\d)/g, '$1 ') // Add a space after every 4 digits
        .slice(0, 19); // Limit to 16 digits plus 3 spaces
      
      setPaymentInfo(prev => ({
        ...prev,
        [name]: formatted
      }));
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      
      setPaymentInfo(prev => ({
        ...prev,
        [name]: formatted
      }));
      return;
    }
    
    // Limit CVV to 3 or 4 digits
    if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setPaymentInfo(prev => ({
        ...prev,
        [name]: cleaned
      }));
      return;
    }
    
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (
      !deliveryAddress.fullName ||
      !deliveryAddress.streetAddress ||
      !deliveryAddress.city ||
      !deliveryAddress.state ||
      !deliveryAddress.zipCode ||
      !deliveryAddress.phone ||
      !paymentInfo.cardNumber ||
      !paymentInfo.cardHolder ||
      !paymentInfo.expiryDate ||
      !paymentInfo.cvv
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(deliveryAddress.phone.replace(/\D/g, ''))) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    
    // Card number validation (ensure it has 16 digits)
    if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return;
    }
    
    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(paymentInfo.expiryDate)) {
      toast.error("Please enter a valid expiry date (MM/YY)");
      return;
    }
    
    // CVV validation (3 or 4 digits)
    if (paymentInfo.cvv.length < 3) {
      toast.error("Please enter a valid CVV");
      return;
    }
    
    // Process payment
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Order placed successfully!");
      clearCart();
      navigate('/order-success');
    }, 2000);
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="mr-2" size={20} />
                  Delivery Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={deliveryAddress.fullName}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={deliveryAddress.streetAddress}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryAddress.city}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={deliveryAddress.state}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={deliveryAddress.zipCode}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={deliveryAddress.phone}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Details */}
              <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in animate-delay-200">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="mr-2" size={20} />
                  Payment Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={paymentInfo.cardHolder}
                      onChange={handlePaymentChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-foodRed"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between">
                <Link to="/cart">
                  <Button variant="outline" className="flex items-center">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Cart
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  className="bg-foodRed hover:bg-foodOrange text-white"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1 animate-fade-in animate-delay-300">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {/* Item List */}
              <div className="max-h-60 overflow-y-auto mb-4">
                {cartState.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <span className="bg-foodRed text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">
                        {item.quantity}
                      </span>
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
