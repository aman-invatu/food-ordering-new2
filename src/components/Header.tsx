
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, Menu, ShoppingCart, User, X } from "lucide-react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartState } = useCart();
  const { authState, logout } = useAuth();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-yellow-300 bg-opacity-90 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo1 */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://img.icons8.com/color/48/000000/hamburger.png" 
              alt="FoodEats Logo" 
              className="w-10 h-10 animate-bounce-light" 
            />
            <span className={`font-bold text-2xl ${isScrolled ? 'text-foodRed' : 'text-white'}`}>FoodEats</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`nav-link ${isScrolled ? 'text-gray-800' : 'text-white'} ${isActive('/') ? 'font-medium' : ''}`}>
              Home
            </Link>
            <Link to="/menu" className={`nav-link ${isScrolled ? 'text-gray-800' : 'text-white'} ${isActive('/menu') ? 'font-medium' : ''}`}>
              Menu 
            </Link>
            <Link to="/about" className={`nav-link ${isScrolled ? 'text-gray-800' : 'text-white'} ${isActive('/about') ? 'font-medium' : ''}`}>
              About
            </Link>
            <Link to="/services" className={`nav-link ${isScrolled ? 'text-gray-800' : 'text-white'} ${isActive('/services') ? 'font-medium' : ''}`}>
              Services
            </Link>
            <Link to="/gallery" className={`nav-link ${isScrolled ? 'text-gray-800' : 'text-white'} ${isActive('/gallery') ? 'font-medium' : ''}`}>
              Gallery
            </Link>
            <Link to="/contact" className={`nav-link ${isScrolled ? 'text-gray-800' : 'text-white'} ${isActive('/contact') ? 'font-medium' : ''}`}>
              Contact
            </Link>
          </nav>
          
          {/* User Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                <ShoppingCart className="h-6 w-6" />
                {cartState.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-foodRed text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartState.totalItems}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* User Menu */}
            {authState.isAuthenticated ? (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  onClick={toggleUserMenu} 
                  className={`flex items-center space-x-1 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm">{authState.user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                    <div className="py-2">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/orders" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }} 
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`border-2 ${isScrolled ? 'border-foodRed text-foodRed hover:bg-foodRed hover:text-white' : 'border-white text-white hover:bg-white hover:text-foodRed'}`}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
              {cartState.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-foodRed text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartState.totalItems}
                </span>
              )}
            </Link>
            <button onClick={toggleMobileMenu} className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col">
          <Link 
            to="/" 
            className={`py-3 border-b border-gray-200 ${isActive('/') ? 'text-foodRed font-medium' : 'text-gray-800'}`}
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className={`py-3 border-b border-gray-200 ${isActive('/menu') ? 'text-foodRed font-medium' : 'text-gray-800'}`}
            onClick={toggleMobileMenu}
          >
            Menu
          </Link>
          <Link 
            to="/about" 
            className={`py-3 border-b border-gray-200 ${isActive('/about') ? 'text-foodRed font-medium' : 'text-gray-800'}`}
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link 
            to="/services" 
            className={`py-3 border-b border-gray-200 ${isActive('/services') ? 'text-foodRed font-medium' : 'text-gray-800'}`}
            onClick={toggleMobileMenu}
          >
            Services
          </Link>
          <Link 
            to="/gallery" 
            className={`py-3 border-b border-gray-200 ${isActive('/gallery') ? 'text-foodRed font-medium' : 'text-gray-800'}`}
            onClick={toggleMobileMenu}
          >
            Gallery
          </Link>
          <Link 
            to="/contact" 
            className={`py-3 border-b border-gray-200 ${isActive('/contact') ? 'text-foodRed font-medium' : 'text-gray-800'}`}
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
          
          {/* User Account in Mobile Menu */}
          {authState.isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="py-3 border-b border-gray-200 text-gray-800"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
              <Link 
                to="/orders" 
                className="py-3 border-b border-gray-200 text-gray-800"
                onClick={toggleMobileMenu}
              >
                Orders
              </Link>
              <button 
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
                className="py-3 text-left text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="py-3 text-foodRed font-medium"
              onClick={toggleMobileMenu}
            >
              Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
