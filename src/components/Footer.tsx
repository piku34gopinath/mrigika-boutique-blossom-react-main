import React from 'react';
import { Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary fill-current" />
              <h3 className="text-xl font-playfair font-bold gradient-text">Mrigika</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
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
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-playfair font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shop</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-playfair font-semibold text-foreground">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sarees</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Kurtis</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Accessories</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Jewelry</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-playfair font-semibold text-foreground">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>mrigika.studio@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 7008284799</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Rabitakiz square,Bhubaneswar, Odisha 751002</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2021 Mrigika. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Return Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;