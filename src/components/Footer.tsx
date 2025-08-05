import React from 'react';
import { Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';
import logo from "../assets/logo.jpg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-8 sm:py-12"> {/* Adjusted padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"> {/* Adjusted grid columns and gap */}
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
            <img src={logo} alt="Mrigika" className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Adjusted logo size */}
              <h3 className="text-xl sm:text-2xl font-playfair font-bold gradient-text">Mrigika</h3> {/* Adjusted font size */}
            </div>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Your destination for elegant and contemporary women's fashion. 
              Curating beautiful pieces that celebrate femininity and style.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/mrigika?igsh=MTAwazc0MTA0N29jbQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Adjusted icon size */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-playfair font-semibold text-foreground text-lg sm:text-xl">Quick Links</h4> {/* Adjusted font size */}
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shop</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-playfair font-semibold text-foreground text-lg sm:text-xl">Categories</h4> {/* Adjusted font size */}
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sarees</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Kurtis</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Accessories</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Jewelry</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-playfair font-semibold text-foreground text-lg sm:text-xl">Get in Touch</h4> {/* Adjusted font size */}
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" /> {/* Adjusted icon size */}
                <span>mrigika.studio@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" /> {/* Adjusted icon size */}
                <span>+91 7008284799</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5" /> {/* Adjusted icon size */}
                <span>Rabitakiz square,Bhubaneswar, Odisha 751002</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left"> {/* Adjusted padding and alignment */}
          <p className="text-muted-foreground text-sm sm:text-base mb-4 md:mb-0">
            © 2021 Mrigika. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mt-4 md:mt-0"> {/* Adjusted spacing and direction */}
            <a href="#" className="text-muted-foreground hover:text-primary text-sm sm:text-base transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm sm:text-base transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm sm:text-base transition-colors">
              Return Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;