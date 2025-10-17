import React from 'react';
import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">DC</span>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">DEAL CLOSED</h3>
            <p className="text-gray-600 text-sm mb-2">Amsterdam, The Netherlands</p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Email:</span> info@dealclosed.com
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Useful Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                  Explore Freelancers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                  Assignments
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Other Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                  Find Business
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-600 text-sm transition-colors">
                  Terms Of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-green-600 hover:bg-green-600 hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          {/* Copyright */}
          <p className="text-center text-gray-600 text-sm">
            @ 2025 <span className="font-bold">Deal closed</span>. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;