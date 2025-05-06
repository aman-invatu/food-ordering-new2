
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="Contact Us" 
            className="w-full h-full object-cover opacity-20" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Get in Touch</h1>
            <p className="text-lg md:text-xl text-gray-200 animate-fade-in animate-delay-200">
              Have questions, feedback, or want to place a special order? Reach out to our friendly team and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              
              <div className="flex items-start space-x-4">
                <div className="bg-foodRed rounded-full p-3 text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit Us</h3>
                  <address className="not-italic text-gray-600 mt-1">
                    123 Food Street<br />
                    Cuisine City, FS 12345<br />
                    United States
                  </address>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-foodRed rounded-full p-3 text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <p className="text-gray-600 mt-1">
                    <a href="tel:+1-234-567-8900" className="hover:text-foodRed transition-colors">+1 (234) 567-8900</a><br />
                    <span className="text-sm">Monday-Friday: 9AM - 10PM</span><br />
                    <span className="text-sm">Weekend: 10AM - 11PM</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-foodRed rounded-full p-3 text-white">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="text-gray-600 mt-1">
                    <a href="mailto:info@foodeats.com" className="hover:text-foodRed transition-colors">info@foodeats.com</a><br />
                    <a href="mailto:support@foodeats.com" className="hover:text-foodRed transition-colors">support@foodeats.com</a>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-200 hover:bg-foodRed hover:text-white transition-colors p-2 rounded-full">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-200 hover:bg-foodRed hover:text-white transition-colors p-2 rounded-full">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.01 14.35-1.77-1.28c-.2-.15-.33-.39-.33-.65V9.5c0-.28.22-.5.5-.5h2c.28 0 .5.22.5.5v4.28c0 .33-.16.65-.43.83l-1.43.93c-.34.22-.79.22-1.13 0zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-5.36 1.35-1.43-.93c-.27-.18-.43-.5-.43-.83V9.5c0-.28.22-.5.5-.5h2c.28 0 .5.22.5.5v4.92c0 .26-.13.5-.33.65l-1.77 1.28c-.34.22-.79.22-1.13 0z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-200 hover:bg-foodRed hover:text-white transition-colors p-2 rounded-full">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.8 5.5c-.8.4-1.6.6-2.5.8.9-.5 1.6-1.4 1.9-2.4-.8.5-1.8.9-2.7 1.1-.8-.9-1.9-1.4-3.1-1.4-2.3 0-4.2 1.9-4.2 4.2 0 .3 0 .6.1.9-3.5-.2-6.7-1.9-8.8-4.5-.4.7-.6 1.5-.6 2.3 0 1.6.8 3 2 3.8-.7 0-1.4-.2-2-.5v.1c0 2.2 1.6 4 3.7 4.4-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.8 2.2 3.1 4.2 3.1-1.5 1.2-3.5 1.9-5.6 1.9-.4 0-.7 0-1.1-.1 2 1.3 4.3 2 6.9 2 8.3 0 12.8-6.8 12.8-12.8 0-.2 0-.4 0-.6.9-.6 1.7-1.4 2.3-2.3z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-200 hover:bg-foodRed hover:text-white transition-colors p-2 rounded-full">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.1-11.5c0 .42-.34.76-.76.76h-4.68c-.42 0-.76-.34-.76-.76v-1c0-.42.34-.76.76-.76h4.68c.42 0 .76.34.76.76v1zm0 4c0 .42-.34.76-.76.76H8.9c-.42 0-.76-.34-.76-.76v-1c0-.42.34-.76.76-.76h5.44c.42 0 .76.34.76.76v1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="animate-fade-in animate-delay-200">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foodRed"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foodRed"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foodRed"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foodRed"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="Catering Request">Catering Request</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foodRed"
                    required
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-foodRed hover:bg-foodOrange text-white flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Us</h2>
          <div className="h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03606367955!2d-74.25987368715491!3d40.69767006766623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1650234514036!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FoodEats Location Map"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">What are your business hours?</h3>
              <p className="text-gray-600">Our restaurant is open from 10:00 AM to 10:00 PM Monday through Friday, and 10:00 AM to 11:00 PM on weekends. Our customer service team is available from 9:00 AM to 11:00 PM daily.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How long does it take to respond to inquiries?</h3>
              <p className="text-gray-600">We aim to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our customer service hotline.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Do you offer franchise opportunities?</h3>
              <p className="text-gray-600">Yes, we are currently expanding through franchise partnerships. Please contact our business development team at franchising@foodeats.com for more information.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">How can I provide feedback about my experience?</h3>
              <p className="text-gray-600">We value your feedback! You can share your experience by filling out our contact form, emailing feedback@foodeats.com, or calling our customer service line.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
