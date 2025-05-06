
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin, Clock, Twitter, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd handle the subscription logic here
    console.log("Subscription submitted");
    // Show a success message
    alert("Thanks for subscribing!");
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center space-x-2">
              <img 
                src="https://img.icons8.com/color/48/000000/hamburger.png" 
                alt="FoodEats Logo" 
                className="w-10 h-10" 
              />
              <span className="font-bold text-2xl">FoodEats</span>
            </div>
            <p className="text-gray-300">
              Delicious food delivered to your doorstep. 
              Enjoy our wide variety of culinary delights prepared with the finest ingredients.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-foodOrange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foodOrange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foodOrange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-foodOrange transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Opening Hours */}
          <div className="space-y-4 animate-fade-in animate-delay-200">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>Mon - Fri: 10:00 AM - 11:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>Saturday: 10:00 AM - 11:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>Sunday: 10:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4 animate-fade-in animate-delay-300">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-foodOrange transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-foodOrange transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foodOrange transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-foodOrange transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-foodOrange transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foodOrange transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="space-y-4 animate-fade-in animate-delay-400">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Contact & Subscribe</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>123 Food Street, Cuisine City</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@foodeats.com</span>
              </div>
            </div>
            <form onSubmit={handleSubscribe} className="mt-4 space-y-2">
              <p className="text-sm text-gray-300">Subscribe for exclusive offers:</p>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Email address" 
                  className="rounded-r-none focus-visible:ring-offset-0" 
                  required 
                />
                <Button type="submit" className="bg-foodOrange hover:bg-foodRed rounded-l-none text-white">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} FoodEats. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-foodOrange transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foodOrange transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
