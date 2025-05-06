
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <img 
            src="https://img.icons8.com/color/96/000000/hamburger.png" 
            alt="FoodEats Logo" 
            className="mx-auto h-24 w-24 animate-bounce-light" 
          />
        </div>
        
        <h1 className="text-6xl font-bold text-foodRed mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! Looks like the page you're looking for is not on our menu.
          Let's get you back to our delicious offerings.
        </p>
        
        <Link to="/">
          <Button className="bg-foodRed hover:bg-foodOrange text-white flex items-center mx-auto">
            <Home className="mr-2 h-5 w-5" />
            Go Back Home
          </Button>
        </Link>
        
        <div className="mt-12">
          <p className="text-gray-500 text-sm mb-2">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/menu" className="text-foodRed hover:text-foodOrange hover:underline">Our Menu</Link>
            <span className="text-gray-300">|</span>
            <Link to="/contact" className="text-foodRed hover:text-foodOrange hover:underline">Contact Us</Link>
            <span className="text-gray-300">|</span>
            <Link to="/about" className="text-foodRed hover:text-foodOrange hover:underline">About Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
