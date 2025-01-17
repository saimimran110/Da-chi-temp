import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  quickLinks: Array<{ name: string; href: string }>;
}

export default function Footer({ quickLinks }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12" id="footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-['Playfair_Display']">Da-chi</h3>
            <p className="mb-4">Discover your signature scent with our exquisite collection of perfumes.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Facebook />
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Instagram />
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors">
                <Twitter />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-amber-300 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p>123 Perfume Street</p>
            <p>Fragrance City, FC 12345</p>
            <p>Email: info@da-chi.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 Da-chi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
