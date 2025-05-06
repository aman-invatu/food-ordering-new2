
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    alt: "Pepperoni Pizza",
    category: "Pizza"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Cheeseburger with Fries",
    category: "Burgers"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    alt: "Mediterranean Salad",
    category: "Salads"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
    alt: "Sushi Platter",
    category: "Seafood"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    alt: "Chicken Tacos",
    category: "Mexican"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Chocolate Cake",
    category: "Desserts"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Pasta Carbonara",
    category: "Pasta"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1087&q=80",
    alt: "Grilled Steak",
    category: "Meat"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    alt: "Vegetable Curry",
    category: "Vegetarian"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "French Fries",
    category: "Sides"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Chicken Sandwich",
    category: "Sandwiches"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    alt: "Pancakes with Berries",
    category: "Breakfast"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    alt: "Burger with Beer",
    category: "Burgers"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1525518392674-39ba1febe311?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    alt: "Lemon Meringue Pie",
    category: "Desserts"
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1092&q=80",
    alt: "Vegetable Stir Fry",
    category: "Vegetarian"
  }
];

// Get unique categories
const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter images when search query or category changes
  useEffect(() => {
    let result = galleryImages;
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(img => img.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(img => 
        img.alt.toLowerCase().includes(query) || 
        img.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredImages(result);
  }, [selectedCategory, searchQuery]);

  // Open image modal
  const openImageModal = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  // Close image modal
  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Get next image id
  const getNextImageId = () => {
    if (selectedImage === null) return null;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    return currentIndex < filteredImages.length - 1 ? filteredImages[currentIndex + 1].id : filteredImages[0].id;
  };

  // Get previous image id
  const getPrevImageId = () => {
    if (selectedImage === null) return null;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    return currentIndex > 0 ? filteredImages[currentIndex - 1].id : filteredImages[filteredImages.length - 1].id;
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="Food Gallery" 
            className="w-full h-full object-cover opacity-20" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Food Gallery</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 animate-fade-in animate-delay-200">
              Feast your eyes on our mouthwatering culinary creations. Each dish is crafted with passion and the finest ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
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
                placeholder="Search gallery..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-foodRed"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className={`overflow-hidden rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105 animate-fade-in animate-delay-${index % 5 * 100}`}
                  onClick={() => openImageModal(image.id)}
                >
                  <div className="relative group">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-64 object-cover" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-center p-4">
                        <h3 className="font-semibold text-lg">{image.alt}</h3>
                        <p className="text-sm">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-2">No images found</h3>
              <p className="text-gray-600 mb-6">Try changing your search or category filter</p>
              <Button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeImageModal}>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="relative">
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-opacity"
                onClick={closeImageModal}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              {/* Navigation buttons */}
              <button 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(getPrevImageId());
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <button 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(getNextImageId());
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              
              {/* Image */}
              <img 
                src={galleryImages.find(img => img.id === selectedImage)?.src} 
                alt={galleryImages.find(img => img.id === selectedImage)?.alt} 
                className="w-full h-auto rounded-lg shadow-2xl" 
              />
              
              {/* Caption */}
              <div className="bg-black bg-opacity-70 text-white p-4 absolute bottom-0 left-0 right-0 rounded-b-lg">
                <h3 className="font-semibold text-lg">{galleryImages.find(img => img.id === selectedImage)?.alt}</h3>
                <p className="text-sm text-gray-300">{galleryImages.find(img => img.id === selectedImage)?.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
