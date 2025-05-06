
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import FoodCard from '@/components/FoodCard';
import { Search } from 'lucide-react';

// Import food items data
const foodItems = [
  // Burgers
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
    name: 'BBQ Bacon Burger',
    description: 'Juicy beef patty with crispy bacon, cheddar cheese, BBQ sauce, and onion rings',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    category: 'Burgers'
  },
  {
    id: '3',
    name: 'Veggie Burger',
    description: 'Plant-based patty with lettuce, tomato, pickles, and vegan mayo on a whole grain bun',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.3,
    category: 'Burgers',
    featured: true
  },
  
  // Pizza
  {
    id: '4',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, fresh basil, salt, and olive oil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    category: 'Pizza'
  },
  {
    id: '5',
    name: 'Pepperoni Pizza',
    description: 'Tomato sauce, mozzarella cheese, and pepperoni slices',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    category: 'Pizza',
    bestSeller: true
  },
  {
    id: '6',
    name: 'Veggie Supreme Pizza',
    description: 'Loaded with bell peppers, onions, olives, mushrooms, and tomatoes on a thin crust',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    category: 'Pizza'
  },
  
  // Salads
  {
    id: '7',
    name: 'Chicken Caesar Salad',
    description: 'Romaine lettuce, grilled chicken, croutons, parmesan cheese with caesar dressing',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    category: 'Salads'
  },
  {
    id: '8',
    name: 'Greek Salad',
    description: 'Cucumber, olives, tomatoes, bell pepper, red onion, feta cheese with olive oil dressing',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    category: 'Salads',
    featured: true
  },
  
  // Mexican
  {
    id: '9',
    name: 'Beef Tacos',
    description: 'Three crunchy tacos with seasoned beef, lettuce, tomato, and cheese',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    category: 'Mexican'
  },
  {
    id: '10',
    name: 'Chicken Quesadilla',
    description: 'Flour tortilla filled with seasoned chicken, bell peppers, onions, and melted cheese',
    price: 12.49,
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    category: 'Mexican'
  },
  
  // Desserts
  {
    id: '11',
    name: 'Chocolate Brownie',
    description: 'Rich and fudgy brownie with vanilla ice cream and chocolate sauce',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    category: 'Desserts',
    bestSeller: true
  },
  {
    id: '12',
    name: 'New York Cheesecake',
    description: 'Creamy cheesecake with graham cracker crust topped with berry compote',
    price: 8.49,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    category: 'Desserts'
  }
];

// Get unique categories from food items
const categories = ['All', ...Array.from(new Set(foodItems.map(item => item.category)))];

const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState(foodItems);

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter items when search query or category changes
  useEffect(() => {
    let result = foodItems;
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(result);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Our Menu</h1>
          <p className="text-xl max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Explore our wide variety of delicious options prepared with fresh ingredients and love
          </p>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex overflow-x-auto pb-2 space-x-2 w-full md:w-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? 'default' : 'outline'}
                className={category === selectedCategory ? 'bg-foodRed hover:bg-foodOrange' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search menu..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-foodRed"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try changing your search or category filter</p>
            <Button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Special Offer Banner */}
      <div className="bg-foodRed text-white py-12 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Special Deal for Today!</h2>
          <p className="text-xl mb-6">Use code <span className="font-bold">SPECIAL25</span> at checkout for 25% off your entire order</p>
          <Link to="/cart">
            <Button className="bg-white text-foodRed hover:bg-gray-100">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Do you offer vegetarian options?</h3>
              <p className="text-gray-600">Yes, we have a variety of vegetarian options available on our menu. Look for items marked with the vegetarian icon.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Can I customize my order?</h3>
              <p className="text-gray-600">Absolutely! You can add special instructions or customization requests when adding items to your cart.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">What is the delivery time?</h3>
              <p className="text-gray-600">Our average delivery time is 30-45 minutes, depending on your location and the time of day.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Do you cater for large groups?</h3>
              <p className="text-gray-600">Yes, we offer catering services for events of all sizes. Please contact us for more information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
