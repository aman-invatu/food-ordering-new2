
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Users, Clock, Award } from 'lucide-react';

const AboutSection: React.FC<{
  title: string;
  description: string;
  index: number;
  image: string;
  reversed?: boolean;
}> = ({ title, description, index, image, reversed = false }) => {
  return (
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
      <div className={`w-full md:w-1/2 animate-fade-in animate-delay-${index * 100}`}>
        <img 
          src={image} 
          alt={title} 
          className="rounded-lg shadow-lg w-full h-auto object-cover" 
        />
      </div>
      <div className={`w-full md:w-1/2 animate-fade-in animate-delay-${index * 200}`}>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Executive Chef",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "Alex brings 15 years of culinary expertise from top restaurants around the world."
    },
    {
      name: "Sarah Chen",
      role: "Operations Manager",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      description: "Sarah ensures our restaurant runs smoothly and every customer leaves satisfied."
    },
    {
      name: "Michael Rodriguez",
      role: "Customer Experience",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      description: "Michael is dedicated to making every customer interaction exceptional."
    },
    {
      name: "Emily Wilson",
      role: "Head of Delivery",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      description: "Emily makes sure your food reaches you hot, fresh, and on time, every time."
    }
  ];

  // Stats data
  const stats = [
    {
      value: "12K+",
      label: "Happy Customers",
      icon: Users
    },
    {
      value: "15+",
      label: "Years of Experience",
      icon: Clock
    },
    {
      value: "50+",
      label: "Menu Items",
      icon: Award
    },
    {
      value: "4.8",
      label: "Customer Rating",
      icon: Star
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover opacity-20" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Our Story</h1>
            <p className="text-lg md:text-xl text-gray-200 animate-fade-in animate-delay-200">
              Discover the passion and dedication behind FoodEats, where we combine culinary excellence with exceptional service to create memorable dining experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-gray-600">
              From a small food truck to a beloved restaurant chain, our journey has been fueled by our passion for great food and exceptional customer service.
            </p>
          </div>
          
          <div className="space-y-16">
            <AboutSection
              title="Humble Beginnings"
              description="FoodEats started in 2008 as a small food truck serving gourmet burgers. Our founder, James Wilson, had a simple vision: to create delicious, high-quality food that brought people together. With just three menu items and a passion for culinary excellence, the first FoodEats food truck quickly gained a loyal following."
              index={1}
              image="https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1651&q=80"
            />
            
            <AboutSection
              title="Growing Together"
              description="By 2012, we opened our first brick-and-mortar restaurant, expanding our menu to include a variety of cuisines while staying true to our core values of quality and community. Over the next few years, we listened to our customers, refined our recipes, and created a dining experience that feels like home."
              index={2}
              image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
              reversed
            />
            
            <AboutSection
              title="Today & Tomorrow"
              description="Today, FoodEats operates in multiple locations, with a dedicated team committed to culinary innovation and excellent service. Our online ordering platform has made it easier than ever to enjoy our food wherever you are. As we look to the future, we remain committed to sustainable practices, supporting local suppliers, and creating memorable dining experiences."
              index={3}
              image="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-full bg-foodRed text-white flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're on a mission to redefine food delivery by combining culinary excellence with technological innovation, ensuring every meal is an experience to remember.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-xl mb-2">Quality Food</h3>
                <p className="text-gray-600">We use only the freshest ingredients, preparing each dish with care and attention to detail.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-xl mb-2">Community Focus</h3>
                <p className="text-gray-600">We're committed to supporting local suppliers and giving back to the communities we serve.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-xl mb-2">Customer First</h3>
                <p className="text-gray-600">Your satisfaction is our priority. We strive to exceed expectations with every order.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The talented individuals behind FoodEats who work tirelessly to bring you exceptional food and service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-60 object-cover" 
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-foodRed mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-foodRed text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience FoodEats?</h2>
          <p className="text-lg mb-8">Join thousands of satisfied customers and order your first meal today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/menu">
              <Button size="lg" className="bg-white text-foodRed hover:bg-gray-100">
                Browse Our Menu
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

export default About;
