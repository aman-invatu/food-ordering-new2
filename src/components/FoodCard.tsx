
import React from 'react';
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from 'sonner';
import { Heart, Plus, Star } from 'lucide-react';

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  category?: string;
  featured?: boolean;
  bestSeller?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  rating = 4.5,
  category,
  featured = false,
  bestSeller = false,
}) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
    });
    
    toast.success(`Added ${name} to cart!`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl menu-item">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110" 
        />
        
        {bestSeller && (
          <div className="absolute top-2 left-2 bg-foodRed text-white text-xs py-1 px-2 rounded-full animate-pulse">
            Best Seller
          </div>
        )}
        
        {featured && (
          <div className="absolute top-2 right-2 bg-foodGold text-white text-xs py-1 px-2 rounded-full">
            Featured
          </div>
        )}
        
        <button className="absolute top-2 right-2 bg-white bg-opacity-70 p-1.5 rounded-full hover:bg-opacity-100 transition-all duration-300">
          <Heart className="h-4 w-4 text-gray-500 hover:text-red-500 transition-colors" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          <span className="text-foodRed font-bold">${price.toFixed(2)}</span>
        </div>
        
        {category && (
          <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-2">
            {category}
          </span>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 text-foodGold fill-current mr-1" />
            <span className="font-medium">{rating}</span>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            size="sm"
            className="bg-foodRed hover:bg-foodOrange text-white flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
