
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Cake, Calendar, ChefHat, Clock, Gift, HeartHandshake, Package, Truck, User, Utensils } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow animate-fade-in animate-delay-${index * 100}`}>
      <div className="mb-4 text-foodRed">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Truck className="h-10 w-10" />,
      title: "Fast Delivery",
      description: "Get your favorite food delivered to your doorstep in 30 minutes or less. Our efficient delivery network ensures your food arrives hot and fresh."
    },
    {
      icon: <Utensils className="h-10 w-10" />,
      title: "Catering Services",
      description: "From corporate events to family gatherings, our catering service provides delicious food options customized to your needs and budget."
    },
    {
      icon: <Gift className="h-10 w-10" />,
      title: "Gift Cards",
      description: "Give the gift of delicious food with our digital and physical gift cards, perfect for birthdays, holidays, or any special occasion."
    },
    {
      icon: <Calendar className="h-10 w-10" />,
      title: "Private Events",
      description: "Host your next private event with us. We offer customizable packages including venue space, catering, and dedicated staff."
    },
    {
      icon: <ChefHat className="h-10 w-10" />,
      title: "Cooking Classes",
      description: "Learn to cook your favorite dishes with our expert chefs. Group and private classes available for all skill levels."
    },
    {
      icon: <Cake className="h-10 w-10" />,
      title: "Custom Orders",
      description: "Have a special dietary need or craving? We accommodate custom orders with advance notice to ensure your satisfaction."
    }
  ];

  const businessServices = [
    {
      icon: <Package className="h-8 w-8" />,
      title: "Corporate Catering",
      description: "Impress clients and keep employees happy with our corporate catering services. From daily lunches to special events, we've got you covered."
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: "Partnerships",
      description: "Join our network of business partners and enjoy exclusive benefits, including special pricing and priority service."
    },
    {
      icon: <User className="h-8 w-8" />,
      title: "White Label Solutions",
      description: "Enhance your business with our white label food services. Offer branded food options without the overhead of a full kitchen."
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
            alt="Restaurant Services" 
            className="w-full h-full object-cover opacity-30" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Our Services</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fade-in animate-delay-200">
              Discover the wide range of services we offer to enhance your dining experience, from fast delivery to catering and private events.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-foodRed hover:bg-foodOrange">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At FoodEats, we go beyond just delivering great food. Explore our comprehensive range of services designed to meet all your culinary needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Delivery Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Delivery Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've streamlined our delivery process to ensure your food arrives quickly and in perfect condition, every time.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative flex flex-col items-center max-w-xs text-center">
              <div className="w-16 h-16 rounded-full bg-foodRed text-white flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Place Your Order</h3>
              <p className="text-gray-600">Choose your favorite dishes from our extensive menu and place your order online or by phone.</p>
              
              {/* Connector (hidden on mobile) */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300"></div>
            </div>
            
            <div className="relative flex flex-col items-center max-w-xs text-center">
              <div className="w-16 h-16 rounded-full bg-foodOrange text-white flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Food Preparation</h3>
              <p className="text-gray-600">Our chefs prepare your meal with fresh ingredients, ensuring quality and taste.</p>
              
              {/* Connector (hidden on mobile) */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300"></div>
            </div>
            
            <div className="flex flex-col items-center max-w-xs text-center">
              <div className="w-16 h-16 rounded-full bg-foodGold text-white flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Our delivery team brings your food to your location hot and fresh, ready to enjoy.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Business Services */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Businesses</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Special services tailored for businesses to enhance workplace satisfaction and client relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessServices.map((service, index) => (
              <div key={index} className={`bg-gray-800 rounded-lg p-6 animate-fade-in animate-delay-${index * 200}`}>
                <div className="mb-4 text-foodRed">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Service Hours */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-foodRed text-white text-center">
              <Clock className="h-10 w-10 mx-auto mb-2" />
              <h2 className="text-2xl font-bold">Service Hours</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Delivery Hours</span>
                  <span className="text-gray-600">10:00 AM - 10:00 PM (Daily)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Catering Requests</span>
                  <span className="text-gray-600">48 hours in advance</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Private Events</span>
                  <span className="text-gray-600">1 week in advance</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Cooking Classes</span>
                  <span className="text-gray-600">Weekends, 2:00 PM - 5:00 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Customer Support</span>
                  <span className="text-gray-600">9:00 AM - 11:00 PM (Daily)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and policies.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">What is the delivery radius?</h3>
              <p className="text-gray-600">We currently deliver within a 10-mile radius of our restaurant locations. Enter your address at checkout to check if we deliver to your area.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How do I place a catering order?</h3>
              <p className="text-gray-600">You can place catering orders through our website or by calling our catering hotline. We recommend at least 48 hours notice for all catering orders.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Are there any delivery fees?</h3>
              <p className="text-gray-600">Delivery fees start at $3.99 and may vary based on distance and order size. Orders over $35 qualify for free delivery within 5 miles.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Can I modify my order after placing it?</h3>
              <p className="text-gray-600">Orders can be modified within 5 minutes of placement. After that, please contact our customer service team for assistance.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-foodRed text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Services?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Whether you're ordering food for yourself, planning a corporate event, or looking for catering services, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/menu">
              <Button size="lg" className="bg-white text-foodRed hover:bg-gray-100">
                Order Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foodRed">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
