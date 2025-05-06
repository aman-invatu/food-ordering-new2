
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Check, Home, Package } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const orderNumber = `FE-${Math.floor(100000 + Math.random() * 900000)}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + 45);
  
  const formattedDeliveryTime = `${estimatedDelivery.getHours()}:${String(estimatedDelivery.getMinutes()).padStart(2, '0')}`;

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-bounce-light">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-6">Your order has been successfully placed.</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="text-sm text-gray-500 mb-1">Order Number</div>
            <div className="text-lg font-semibold">{orderNumber}</div>
            
            <div className="border-t border-gray-200 my-4"></div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-gray-500">Estimated Delivery Time</div>
                <div className="font-semibold">Today, {formattedDeliveryTime}</div>
              </div>
              <Package className="text-foodOrange h-8 w-8" />
            </div>
            
            <div className="text-sm text-gray-600 text-left">
              <p>We'll send you updates about your order via email and SMS.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Link to="/orders">
              <Button variant="outline" className="w-full">Track Your Order</Button>
            </Link>
            <Link to="/">
              <Button className="w-full bg-foodRed hover:bg-foodOrange text-white">
                <Home className="mr-2 h-4 w-4" />
                Return to Home Page
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-gray-500 text-sm">
            <p>Having trouble? <Link to="/contact" className="text-foodRed hover:underline">Contact our support team</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
