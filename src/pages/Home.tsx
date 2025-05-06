
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Calendar, ChefHat, Clock, Filter, Heart, MapPin, MessageSquare, Phone, Search, Shield, Star, Tag, ThumbsUp, Truck, Utensils } from "lucide-react";
import FoodCard from '@/components/FoodCard';
import { useToast } from "@/hooks/use-toast";

// Sample food data
const popularItems = [
  {
    id: '1',
    name: 'Double Cheese Burger',
    description: 'Double beef patties with extra cheese, lettuce, tomatoes, and our special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    category: 'Burgers',
    bestSeller: true
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, fresh basil, salt, and olive oil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    category: 'Pizza'
  },
  {
    id: '3',
    name: 'Chicken Salad',
    description: 'Fresh vegetables with grilled chicken breast, avocado, and honey mustard dressing',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    category: 'Salads',
    featured: true
  },
  {
    id: '4',
    name: 'Beef Tacos',
    description: 'Three crunchy tacos with seasoned beef, lettuce, tomato, and cheese',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    category: 'Mexican'
  }
];

// ... keep existing code (testimonials, menuCategories, specialOffers, blogPosts, awards constants)

// Popular restaurant brands
const popularRestaurants = [
  { id: 1, name: 'Organic', logo: 'https://img.freepik.com/free-vector/organic-food-logo_23-2148459253.jpg?w=200' },
  { id: 2, name: 'Tasty Food', logo: 'https://img.freepik.com/free-vector/restaurant-logo-design_23-2147850982.jpg?w=200' },
  { id: 3, name: 'FoodChef', logo: 'https://img.freepik.com/free-vector/chef-food-logo-template_23-2149193708.jpg?w=200' },
  { id: 4, name: 'Master Chef', logo: 'https://img.freepik.com/free-vector/chef-food-logo-fun-logo-restaurant-cafe_23-2148684930.jpg?w=200' },
  { id: 5, name: 'Master Chef', logo: 'https://img.freepik.com/free-vector/creative-chef-logo-template_23-2149543119.jpg?w=200' },
  { id: 6, name: 'Food Corner', logo: 'https://img.freepik.com/free-vector/fast-food-logo_23-2147508311.jpg?w=200' },
  { id: 7, name: 'Chef Catering', logo: 'https://img.freepik.com/free-vector/chef-food-logo-template_23-2148986332.jpg?w=200' },
];

// Food categories with images for the new food categories section
const foodCategories = [
  { name: 'Pizza', image: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=740&t=st=1715019065~exp=1715019665~hmac=ebaad5e9cade1a53a2bd3118a121243d86c6ae66acbcc149c8ae244bb35e74f4' },
  { name: 'Burgers', image: 'https://img.freepik.com/free-photo/beef-burger-with-chopped-onions-tomatoes-inside-bun-generative-ai_188544-12325.jpg?w=740&t=st=1715019088~exp=1715019688~hmac=e8e244c1e5fe885517671e7ae9f58c968e25ef4c5062c56bab695aaed87adcb2' },
  { name: 'Chicken', image: 'https://img.freepik.com/free-photo/baked-chicken-wings-asian-style_2829-10159.jpg?w=740&t=st=1715019107~exp=1715019707~hmac=60f6715a6e0855cbc26adcf47cd40d6ed8711bf4642af96d5e964f6e08a36371' },
  { name: 'Broast', image: 'https://img.freepik.com/free-photo/crispy-fried-chicken-plate-with-salad-carrot_1150-20212.jpg?w=740&t=st=1715019126~exp=1715019726~hmac=f0a1c11ff8235681e75f4b2f01fb214f18e9f31a9d3eb5143c3ffce52e539869' },
];

// Food items for the food showcase section
const topFoodItems = [
  {
    id: '101',
    name: 'Cauliflower Pizza',
    description: 'Special Cauliflower Pizza, Add your favourite toppings and create your own',
    price: 12.99,
    originalPrice: 16.99,
    image: 'https://img.freepik.com/free-photo/delicious-italian-pizza-with-tomato-olives-pepperoni_23-2148296565.jpg?w=740&t=st=1715019179~exp=1715019779~hmac=83d6be4e157e70cc5a9af3a08ccf96c1e8642f3d2df8ce0f64df6f72a0e66c1f',
    category: 'Pizza',
    discount: '20% OFF'
  },
  {
    id: '102',
    name: 'Tikka Heat Pizza',
    description: 'Medium size special tikka heart pizza with Green Peppers, Mushrooms, Onions',
    price: 15.99,
    originalPrice: 19.99,
    image: 'https://img.freepik.com/free-photo/tasty-pepperoni-pizza-black-concrete-background_1150-44363.jpg?w=740&t=st=1715019216~exp=1715019816~hmac=e452d2fee7c55f9f6792910b4882682bfcf507db0d3227ec019aae242b01c730',
    category: 'Pizza',
    discount: '15% OFF'
  },
  {
    id: '103',
    name: 'Sicilian Pizza',
    description: 'Sillicon Pizza with Chapli Chicken, Green Chilli, Green Peppers, Onions',
    price: 16.99,
    originalPrice: 21.99,
    image: 'https://img.freepik.com/free-photo/mixed-pizza-with-various-ingridients_140725-3790.jpg?w=740&t=st=1715019233~exp=1715019833~hmac=815f8283fab7effa8afaad5d65533105b3345cf1f187e36cbc16167e1d6b615b',
    category: 'Pizza',
    discount: '22% OFF'
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    comment: "The food is absolutely delicious! I ordered the Double Cheese Burger and it was perfect. Quick delivery and great service.",
    rating: 5,
    date: "March 15, 2023",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    comment: "I'm impressed with the quality of food. Everything tastes fresh and the portions are generous. Will definitely order again!",
    rating: 4,
    date: "April 22, 2023",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    comment: "The pizza was amazing! Crispy crust, fresh toppings, and arrived hot. The online ordering system is also very convenient.",
    rating: 5,
    date: "May 7, 2023",
    image: "https://randomuser.me/api/portraits/women/19.jpg"
  }
];

// Featured menu categories
const menuCategories = [
  {
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    count: 12
  },
  {
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    count: 8
  },
  {
    name: "Pasta",
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    count: 10
  },
  {
    name: "Salads",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    count: 6
  },
  {
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    count: 9
  },
  {
    name: "Drinks",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    count: 7
  }
];

// Special offers
const specialOffers = [
  {
    id: 1,
    title: "Family Meal Deal",
    description: "2 Large Pizzas + 1 Garlic Bread + 1L Drink",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    discount: "25% OFF"
  },
  {
    id: 2,
    title: "Weekend Burger Special",
    description: "Buy 2 Premium Burgers and Get 1 Free",
    price: 19.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    discount: "33% OFF"
  },
  {
    id: 3,
    title: "Healthy Lunch Box",
    description: "Salad + Grilled Chicken + Fresh Juice",
    price: 14.99,
    originalPrice: 18.99,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    discount: "20% OFF"
  }
];

// Blog posts
const blogPosts = [
  {
    id: 1,
    title: "10 Healthy Recipes You Can Make in 15 Minutes",
    excerpt: "Quick and healthy meals for busy days that don't compromise on taste.",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Chef Maria"
  },
  {
    id: 2,
    title: "The Secret to Perfect Homemade Pizza",
    excerpt: "Learn the techniques professional chefs use to create the perfect pizza at home.",
    date: "April 28, 2023",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Chef Antonio"
  },
  {
    id: 3,
    title: "Exploring Street Food from Around the World",
    excerpt: "A culinary journey through the most delicious street foods across different cultures.",
    date: "April 10, 2023",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Food Explorer"
  }
];

// Awards and recognitions
const awards = [
  {
    id: 1,
    title: "Best Food Delivery Service",
    organization: "City Food Awards",
    year: "2023",
    icon: <Award className="h-10 w-10 text-foodGold" />
  },
  {
    id: 2,
    title: "Customer Satisfaction Excellence",
    organization: "National Restaurant Association",
    year: "2023",
    icon: <ThumbsUp className="h-10 w-10 text-foodGold" />
  },
  {
    id: 3,
    title: "Fastest Delivery Service",
    organization: "Food Delivery Summit",
    year: "2022",
    icon: <Truck className="h-10 w-10 text-foodGold" />
  },
  {
    id: 4,
    title: "Best Mobile App Experience",
    organization: "Digital Food Awards",
    year: "2022",
    icon: <Phone className="h-10 w-10 text-foodGold" />
  }
];

const Home: React.FC = () => {
  // State for filtering popular items
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredPopularItems, setFilteredPopularItems] = useState(popularItems);
  const { toast } = useToast();
  
  // Filter items when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPopularItems(popularItems);
    } else {
      setFilteredPopularItems(popularItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);
  
  // Extract unique categories from popularItems
  const categories = ['All', ...Array.from(new Set(popularItems.map(item => item.category)))];
  
  // Notification handlers for button clicks
  const handleAreaCheck = () => {
    toast({
      title: "Location Checked",
      description: "Your area is within our delivery range. You can place an order now!",
    });
  };
  
  const handleGetDirections = () => {
    toast({
      title: "Directions Ready",
      description: "Directions to our restaurant have been prepared. Check your email.",
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section with Enhanced Animated Elements */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 opacity-80"></div>
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
            alt="Delicious Food" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Enhanced Animated Food Elements */}
        <div className="absolute top-1/4 left-[5%] z-10 animate-[bounce_6s_ease-in-out_infinite]">
          <img 
            src="https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
            alt="Garlic" 
            className="w-24 h-24 object-cover rounded-full shadow-lg"
          />
        </div>
        
        <div className="absolute bottom-1/4 right-[10%] z-10 animate-[bounce_8s_ease-in-out_infinite]">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
            alt="Ginger" 
            className="w-30 h-36 object-cover rounded-full shadow-lg"
          />
        </div>
        
        {/* Additional Floating Food Items */}
        <div className="absolute top-1/3 right-[20%] z-10 animate-[bounce_7s_ease-in-out_infinite]">
          <img 
            src="https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80" 
            alt="Herbs" 
            className="w-20 h-20 object-cover rounded-full shadow-lg"
          />
        </div>
        
        <div className="absolute bottom-1/3 left-[15%] z-10 animate-[bounce_9s_ease-in-out_infinite]">
          <img 
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
            alt="Food" 
            className="w-28 h-28 object-cover rounded-full shadow-lg"
          />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-xl space-y-6">
            <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
              Delicious Food <span className="text-foodRed">Delivered</span> to Your Doorstep
            </h1>
            <p className="text-white text-xl animate-fade-in animate-delay-200">
              Experience the taste of premium quality food made with fresh ingredients and delivered fast to your location.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in animate-delay-300">
              <Link to="/menu">
                <Button size="lg" className="bg-white text-foodRed hover:bg-gray-100 transform transition-transform hover:scale-105">
                  View Menu
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-foodRed transform transition-transform hover:scale-105">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* NEW SECTION: Top Food Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block rounded-full bg-foodRed/10 px-3 py-1 text-sm font-semibold text-foodRed mb-3">
              TOP FOOD
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-2">Menu</h2>
            <div className="w-24 h-1 bg-foodRed mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {foodCategories.map((category, index) => (
              <Link to="/menu" key={index} className="group">
                <div className="relative overflow-hidden rounded-xl shadow-lg h-56 md:h-64 transition-all duration-300 hover:shadow-xl">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-white text-xl md:text-2xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/menu">
              <Button className="bg-foodRed hover:bg-foodOrange transform transition-transform hover:scale-105">
                View Full Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* NEW SECTION: Food Showcase */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-32 bg-[url('https://img.freepik.com/free-photo/wooden-board-empty-table-top-blurred-background_1253-1584.jpg?w=1380&t=st=1715019272~exp=1715019872~hmac=71b7cd1fa3c4c99facc8b27755b23a0615937ab01159211559cbbd2932cff7a0')] bg-cover opacity-20"></div>
        <div className="absolute right-0 bottom-0 w-full h-32 bg-[url('https://img.freepik.com/free-photo/wooden-board-empty-table-top-blurred-background_1253-1584.jpg?w=1380&t=st=1715019272~exp=1715019872~hmac=71b7cd1fa3c4c99facc8b27755b23a0615937ab01159211559cbbd2932cff7a0')] bg-cover opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topFoodItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-foodRed text-white px-3 py-1 text-sm font-bold rounded-full">
                    {item.discount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-foodRed">${item.price}</span>
                      <span className="text-gray-500 text-sm line-through ml-2">${item.originalPrice}</span>
                    </div>
                    <Link to="/menu">
                      <Button size="sm" className="bg-foodRed hover:bg-foodOrange">
                        Order Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* NEW SECTION: Popular Restaurant */}
      <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold">Popular Restaurant</h2>
              <p className="text-gray-300 mt-2">Discover our partner restaurants</p>
            </div>
            
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search Keywords"
                className="w-full pl-12 pr-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-foodRed"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-foodGold hover:bg-amber-500 h-10 px-3">
                <Search size={18} />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {popularRestaurants.map((restaurant) => (
              <Link to="/menu" key={restaurant.id} className="bg-gray-800 p-4 rounded-lg w-24 h-24 flex items-center justify-center transform transition-transform hover:scale-110">
                <img 
                  src={restaurant.logo} 
                  alt={restaurant.name} 
                  className="max-w-full max-h-full"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We take pride in offering the best food delivery experience with quality ingredients, professional chefs, and lightning-fast delivery.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md feature-card transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Utensils className="h-7 w-7 text-foodRed" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-gray-600">We use only the freshest ingredients to prepare delicious meals that satisfy your cravings.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md feature-card transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <ChefHat className="h-7 w-7 text-foodRed" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
              <p className="text-gray-600">Our professional chefs are trained to create flavorful dishes that will delight your taste buds.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md feature-card transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Truck className="h-7 w-7 text-foodRed" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">We deliver your food hot and fresh in record time so you can enjoy it at its best.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Items Section with Added Filter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Popular Items</h2>
              <p className="text-gray-600">Discover our most loved dishes that customers can't get enough of.</p>
            </div>
            <Link to="/menu" className="hidden md:flex items-center text-foodRed hover:text-foodOrange transition-colors">
              <span className="mr-1">View All Menu</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {/* Category Filter */}
          <div className="mb-8 flex items-center">
            <Filter className="mr-2 text-foodRed" />
            <span className="mr-4 font-medium">Filter:</span>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  className={category === selectedCategory ? "bg-foodRed hover:bg-foodOrange" : ""}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPopularItems.map(item => (
              <FoodCard key={item.id} {...item} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/menu">
              <Button className="bg-foodRed hover:bg-foodOrange">
                View All Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-cover bg-center relative" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')`
      }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hungry? We've Got You Covered</h2>
            <p className="text-xl mb-8">Order now and get a 10% discount on your first order with code: <span className="font-bold">WELCOMEFOOD</span></p>
            <Link to="/menu">
              <Button size="lg" className="bg-foodRed hover:bg-foodOrange transform transition-transform hover:scale-105">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Getting your favorite food delivered to your door is just a few simple steps away.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-foodRed text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 animate-bounce-light">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse Menu</h3>
              <p className="text-gray-600">Explore our extensive menu and select your favorite dishes.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-foodOrange text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 animate-bounce-light animate-delay-200">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Place Your Order</h3>
              <p className="text-gray-600">Add items to your cart, customize them to your liking, and check out.</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-foodGold text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 animate-bounce-light animate-delay-300">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive & Enjoy</h3>
              <p className="text-gray-600">Your delicious food will be delivered to you in no time. Enjoy!</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* NEW SECTION 1: Menu Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Menu Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From delicious pizzas to healthy salads, we have something for everyone.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuCategories.map((category, index) => (
              <Link to="/menu" key={category.name}>
                <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer h-64">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.count} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* NEW SECTION 2: Special Offers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Take advantage of our limited-time deals and save on your favorite meals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialOffers.map(offer => (
              <div key={offer.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-foodRed text-white text-sm font-bold px-3 py-1 rounded-full">
                    {offer.discount}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-foodRed">${offer.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${offer.originalPrice}</span>
                    </div>
                    <Link to="/menu">
                      <Button size="sm" className="bg-foodRed hover:bg-foodOrange">Order Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* NEW SECTION 3: Food Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Food Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A visual feast of our delicious offerings prepared with love and care.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => {
              const imageUrls = [
                "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              ];
              
              return (
                <div key={i} className="relative overflow-hidden rounded-lg group">
                  <img 
                    src={imageUrls[i]} 
                    alt={`Food ${i+1}`} 
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                    <Link to="/gallery">
                      <Button variant="outline" className="opacity-0 group-hover:opacity-100 border-white text-white hover:bg-white hover:text-foodRed">
                        View Gallery
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/gallery">
              <Button className="bg-foodRed hover:bg-foodOrange">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* NEW SECTION 4: Blog & Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Food Blog & Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Read our latest blog posts about food, cooking tips, and healthy eating habits.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link to="#" className="text-foodRed font-medium hover:text-foodOrange flex items-center">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* NEW SECTION 5: Awards & Recognition */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're proud to be recognized for our commitment to quality and service excellence.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map(award => (
              <div key={award.id} className="bg-white rounded-lg p-6 shadow-md text-center transform transition duration-300 hover:-translate-y-2">
                <div className="mx-auto mb-4">
                  {award.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                <p className="text-gray-600 mb-1">{award.organization}</p>
                <p className="text-gray-500 text-sm">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* NEW SECTION 6: Locations & Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We deliver to multiple areas in the city. Check if we deliver to your location!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Service Areas</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-foodRed mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Downtown</h4>
                    <p className="text-gray-600 text-sm">15-25 min delivery time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-foodRed mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Westside</h4>
                    <p className="text-gray-600 text-sm">20-30 min delivery time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-foodRed mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Northend</h4>
                    <p className="text-gray-600 text-sm">25-35 min delivery time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-foodRed mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Eastgate</h4>
                    <p className="text-gray-600 text-sm">20-30 min delivery time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-foodRed mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Southpoint</h4>
                    <p className="text-gray-600 text-sm">25-40 min delivery time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-foodRed mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Central District</h4>
                    <p className="text-gray-600 text-sm">15-25 min delivery time</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button 
                  className="bg-foodRed hover:bg-foodOrange transform transition-transform hover:scale-105"
                  onClick={handleAreaCheck}
                >
                  Check Your Area
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Our Main Restaurant</h3>
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Restaurant Location" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-foodRed mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">123 Gourmet Street, Foodville, FC 98765</p>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-foodRed mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">(555) 123-4567</p>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-foodRed mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700">Mon-Fri: 10:00 AM - 10:00 PM</p>
                    <p className="text-gray-700">Sat-Sun: 11:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button 
                  className="bg-foodRed hover:bg-foodOrange transform transition-transform hover:scale-105"
                  onClick={handleGetDirections}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Special Offer */}
      <section className="py-16 bg-cover bg-center relative" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')`
      }}>
        <div className="absolute inset-0 discount-gradient"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 text-white mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enjoy with Family and Friends</h2>
            <div className="border-2 border-dashed border-foodGold p-6 inline-block">
              <span className="text-5xl md:text-6xl font-bold block">25% OFF</span>
              <span className="text-xl">for Family Parties! Coupon: FAMILY25</span>
            </div>
          </div>
          <div className="md:w-1/3 text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-foodGold hover:bg-foodOrange text-white">
                Make a Reservation
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Here's what our satisfied customers have to say about us.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-foodGold fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">"{testimonial.comment}"</p>
                <span className="text-xs text-gray-500">{testimonial.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Download App Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Download Our Mobile App</h2>
              <p className="text-gray-300 mb-6">Get exclusive offers, order food, make reservations, and more with our mobile app.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="#">
                  <img 
                    src="https://img.freepik.com/free-vector/app-store-google-play-badges_102902-156.jpg?w=740&t=st=1715019548~exp=1715020148~hmac=7496e75c6c78863d13a8a7511f640d9cdc1db50ab5925c387920e8165e731940" 
                    alt="App Store" 
                    className="h-12" 
                  />
                </Link>
                <Link to="#">
                  <img 
                    src="https://img.freepik.com/free-vector/app-store-google-play-badges_102902-156.jpg?w=740&t=st=1715019548~exp=1715020148~hmac=7496e75c6c78863d13a8a7511f640d9cdc1db50ab5925c387920e8165e731940" 
                    alt="Google Play" 
                    className="h-12" 
                  />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://img.freepik.com/free-vector/food-delivery-app-interface_23-2148497381.jpg?w=1380&t=st=1715019570~exp=1715020170~hmac=1920b2d10c9d43c216be5a5dcaf86548830eab5c78d956608c5f0d0a5d11908a" 
                alt="App Interface" 
                className="max-w-full md:max-w-sm rounded-xl shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
